import { Service } from "./index.service";
import APIRepository from "../repositories/api.repository";
import GoogleCalendarRepository from "../repositories/google.calendar.repository";
import MenteeRepository from "../repositories/mentee.repository";
import MentorRepository from "../repositories/mentor.repository";
import MentoringRepository from "../repositories/mentoring.repository";
import MentoringAttendeeRepository from "../repositories/mentoringAttendee.repository";
import { MentoringUpdateInput } from "../typings/mentoring.type";
import { getSentimentId } from "../utils/dataConverter";
import {
  formatMentoringDataFromMentee,
  formatMentoringDataFromMentor,
} from "../utils/dataFormatter";
import { CustomError } from "../errors/CustomError";

/**
 * Mentoring Service class.
 * Handles mentoring-related operations.
 */
export class MentoringService extends Service {
  private mentoringRepository: MentoringRepository;
  private mentoringAttendeeRepository: MentoringAttendeeRepository;
  private mentorRepository: MentorRepository;
  private menteeRepository: MenteeRepository;
  private googleCalendarRepository: GoogleCalendarRepository;
  private APIRepository: APIRepository;

  constructor() {
    super();
    this.mentoringRepository = new MentoringRepository(this.prisma);
    this.mentoringAttendeeRepository = new MentoringAttendeeRepository(
      this.prisma
    );
    this.mentorRepository = new MentorRepository(this.prisma);
    this.menteeRepository = new MenteeRepository(this.prisma);
    this.googleCalendarRepository = new GoogleCalendarRepository();
    this.APIRepository = new APIRepository();
  }

  /**
   * Creates a mentoring session.
   * @param mentor_id - ID of the mentor.
   * @param mentees_id - Comma-separated IDs of the mentees.
   * @param start_time - Start time of the mentoring session.
   * @param end_time - End time of the mentoring session.
   * @returns The created mentoring session.
   */
  async createMentoring(
    mentor_id: string,
    mentees_id: string,
    start_time: string,
    end_time: string
  ) {
    return await this.prisma.$transaction(async (tx) => {
      const menteesIdArray = mentees_id.split(",");
      if (menteesIdArray.length === 0) {
        throw new Error("Mentees not found");
      }
      const mentorData = await this.mentorRepository.getMentorById(mentor_id);

      const menteesData = [];

      const mentoring = await this.mentoringRepository.createMentoring(
        mentor_id,
        start_time,
        end_time,
        tx
      );

      for (const mentee_id of menteesIdArray) {
        await this.mentoringAttendeeRepository.createMentoringAttendee(
          mentoring.id,
          mentee_id,
          tx
        );

        const menteeData = await this.menteeRepository.getMenteeById(mentee_id);
        menteesData.push(menteeData);
      }
      const calendarData = await this.googleCalendarRepository.createEvent(
        start_time,
        end_time,
        `Mentoring Session with ${mentorData!.User!.name}`,
        `Mentee(s): ${menteesData
          .map((mentee) => mentee!.User!.name)
          .join(", ")}`,
        mentorData!.User!.email,
        menteesData.map((mentee) => mentee!.User!.email)
      );
      const updatedMentoring =
        await this.mentoringRepository.updateMentoringById(
          mentoring.id,
          {
            event_id: calendarData.id,
            meeting_id: calendarData.conferenceData?.conferenceId,
          },
          tx
        );

      return updatedMentoring;
    });
  }

  /**
   * Creates a mentoring feedback for a mentoring session.
   * @param mentoring_id - ID of the mentoring session.
   * @param mentee_id - ID of the mentee.
   * @param feedback - Feedback message.
   * @param rating - Rating given by the mentee.
   * @returns The created mentoring feedback.
   */
  async createMentoringFeedback(
    mentoring_id: number,
    mentee_id: string,
    feedback: string,
    rating: number
  ) {
    return await this.prisma.$transaction(async (tx) => {
      const mentoringAttendee =
        await this.mentoringAttendeeRepository.getMentoringAttendeeByMenteeIdAndMentoringId(
          mentee_id,
          mentoring_id
        );

      if (!mentoringAttendee) {
        throw new CustomError("Mentoring session not found", 404);
      }

      if (mentoringAttendee.rating) {
        throw new CustomError(
          "You have already provided feedback for this mentoring session!",
          403
        );
      }

      const { translate, sentiment } =
        await this.APIRepository.translateAndSentimentFeedback(feedback);
      const sentiment_id = getSentimentId(sentiment);

      const mentoringFeedback =
        await this.mentoringAttendeeRepository.createMentoringFeedback(
          mentoring_id,
          mentee_id,
          feedback,
          translate,
          sentiment_id,
          rating,
          tx
        );

      const mentor = await this.mentoringRepository.getMentorIdByMentoringId(
        mentoring_id
      );

      const mentorData = await this.mentorRepository.getMentorById(
        mentor!.mentor_id
      );

      if (mentorData?.average_rating && mentorData?.rating_count) {
        const newRating =
          (mentorData.average_rating * mentorData.rating_count + rating) /
          (mentorData.rating_count + 1);

        await this.mentorRepository.updateMentorRating(
          mentor!.mentor_id,
          newRating,
          tx
        );
      } else {
        await this.mentorRepository.updateMentorRating(
          mentor!.mentor_id,
          rating,
          tx
        );
      }

      return mentoringFeedback;
    });
  }

  /**
   * Retrieves the schedule of mentorings for a user.
   * @param user_id - ID of the user.
   * @param role - Role of the user (mentor or mentee).
   * @param from_date - Optional start date to filter the mentorings.
   * @returns The schedule of mentorings.
   */
  async getMentoringsSchedule(
    user_id: string,
    role: string,
    from_date?: string
  ) {
    let mentoring;
    if (role === "mentor") {
      if (from_date) {
        mentoring =
          await this.mentoringRepository.getFilteredMentoringsByMentorIdAndFromDate(
            user_id,
            from_date
          );
      } else {
        mentoring = await this.mentoringRepository.getMentoringsByMentorId(
          user_id
        );
      }
      return formatMentoringDataFromMentor(mentoring);
    } else {
      if (from_date) {
        mentoring =
          await this.mentoringAttendeeRepository.getFilteredMentoringsByMenteeIdAndFromDate(
            user_id,
            from_date
          );
      } else {
        mentoring =
          await this.mentoringAttendeeRepository.getMentoringsByMenteeId(
            user_id
          );
      }
      return formatMentoringDataFromMentee(mentoring);
    }
  }

  /**
   * Updates a mentoring session.
   * @param mentoring_id - ID of the mentoring session.
   * @param mentor_id - ID of the mentor.
   * @param data - Updated mentoring data.
   * @returns The updated mentoring session.
   */
  async updateMentoring(
    mentoring_id: number,
    mentor_id: string,
    data: MentoringUpdateInput
  ) {
    const mentoring = await this.mentoringRepository.getMentoringById(
      mentoring_id
    );

    if (mentoring?.mentor_id !== mentor_id) {
      throw new CustomError("Unauthorized", 401);
    }

    const updatedMentoring = await this.mentoringRepository.updateMentoringById(
      mentoring_id,
      data
    );

    return updatedMentoring;
  }
}

const mentoringService = new MentoringService();
export default mentoringService;
