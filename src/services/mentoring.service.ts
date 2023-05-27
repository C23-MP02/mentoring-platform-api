import GoogleCalendarRepository from "../repositories/google.calendar.repository";
import MenteeRepository from "../repositories/mentee.repository";
import MentorRepository from "../repositories/mentor.repository";
import MentoringRepository from "../repositories/mentoring.repository";
import MentoringAttendeeRepository from "../repositories/mentoringAttendee.repository";
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

  constructor() {
    this.mentoringRepository = new MentoringRepository();
    this.mentoringAttendeeRepository = new MentoringAttendeeRepository();
    this.mentorRepository = new MentorRepository();
    this.menteeRepository = new MenteeRepository();
    this.googleCalendarRepository = new GoogleCalendarRepository();
  }

  // TESTING REQUIRED
  async createMentoring(
    mentor_id: number,
    mentees_id: number[],
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
      await this.mentoringAttendeeRepository.createMentoringAttendee(
        mentoring.id,
        mentee_id
      );

      const menteeData = await this.menteeRepository.getMenteeById(mentee_id);
      menteesData.push(menteeData);
    }

    const calendarData = await this.googleCalendarRepository.createEvent(
      start_time,
      end_time,
      `Mentoring Session with ${mentorData!.User.name}`,
      `This event is created automatically by Mentoring Platform.
      \nMentee(s): ${menteesData.map((mentee) => mentee!.User.name).join(", ")}
        \nMentor: ${mentorData!.User.name}
        `,
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
    const mentoringFeedback =
      await this.mentoringAttendeeRepository.createMentoringFeedback(
        mentoring_id,
        mentee_id,
        feedback,
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
}

const mentoringService = new MentoringService();
export default mentoringService;
