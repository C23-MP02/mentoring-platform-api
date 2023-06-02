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

export class MentoringService {
  private mentoringRepository: MentoringRepository;
  private mentoringAttendeeRepository: MentoringAttendeeRepository;
  private mentorRepository: MentorRepository;
  private menteeRepository: MenteeRepository;
  private googleCalendarRepository: GoogleCalendarRepository;
  private APIRepository: APIRepository;

  constructor() {
    this.mentoringRepository = new MentoringRepository();
    this.mentoringAttendeeRepository = new MentoringAttendeeRepository();
    this.mentorRepository = new MentorRepository();
    this.menteeRepository = new MenteeRepository();
    this.googleCalendarRepository = new GoogleCalendarRepository();
    this.APIRepository = new APIRepository();
  }

  // TESTING REQUIRED
  async createMentoring(
    mentor_id: number,
    mentees_id: string[],
    start_time: string,
    end_time: string
  ) {
    const mentorData = await this.mentorRepository.getMentorById(mentor_id);
    const menteesData = [];

    const mentoring = await this.mentoringRepository.createMentoring(
      mentor_id,
      start_time,
      end_time
    );

    for (const mentee_id of mentees_id) {
      // Converting mentee_id from string to int
      const int_mentee_id = Number(mentee_id);

      await this.mentoringAttendeeRepository.createMentoringAttendee(
        mentoring.id,
        int_mentee_id
      );

      const menteeData = await this.menteeRepository.getMenteeById(
        int_mentee_id
      );
      menteesData.push(menteeData);
    }

    const calendarData = await this.googleCalendarRepository.createEvent(
      start_time,
      end_time,
      `Mentoring Session with ${mentorData!.User.name}`,
      `Mentee(s): ${menteesData.map((mentee) => mentee!.User.name).join(", ")}`,
      mentorData!.User.email,
      menteesData.map((mentee) => mentee!.User.email)
    );

    const updatedMentoring = await this.mentoringRepository.updateMentoringById(
      mentoring.id,
      {
        event_id: calendarData.id,
        meeting_id: calendarData.conferenceData?.conferenceId,
      }
    );

    return updatedMentoring;
  }

  // TESTING REQUIRED
  async createMentoringFeedback(
    mentoring_id: number,
    mentee_id: number,
    feedback: string,
    rating: number
  ) {
    // Call Machine Learning API
    const { translate, sentiment } =
      await this.APIRepository.translateAndSentimentFeedback(feedback);
    const sentiment_id = getSentimentId(sentiment);

    // Insert data to db
    const mentoringFeedback =
      await this.mentoringAttendeeRepository.createMentoringFeedback(
        mentoring_id,
        mentee_id,
        feedback,
        translate,
        sentiment_id,
        rating
      );

    const mentor = await this.mentoringRepository.getMentorIdByMentoringId(
      mentoring_id
    );

    const mentorRating = await this.mentorRepository.getMentorRating(
      mentor!.mentor_id
    );

    if (mentorRating?.average_rating && mentorRating?.rating_count) {
      const newRating =
        (mentorRating.average_rating * mentorRating.rating_count + rating) /
        (mentorRating.rating_count + 1);

      await this.mentorRepository.updateMentorRating(
        mentor!.mentor_id,
        newRating
      );
    } else {
      await this.mentorRepository.updateMentorRating(mentor!.mentor_id, rating);
    }

    return mentoringFeedback;
  }

  async getMentoringsSchedule(
    user_id: number,
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
      // if role is mentee
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

  async updateMentoring(
    mentoring_id: number,
    mentor_id: number,
    data: MentoringUpdateInput
  ) {
    const mentoring = await this.mentoringRepository.getMentoringById(
      mentoring_id
    );

    if (mentoring?.mentor_id !== mentor_id) {
      throw new Error("Unauthorized");
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
