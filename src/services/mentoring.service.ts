import GoogleCalendarRepository from "../repositories/google.calendar.repository";
import MenteeRepository from "../repositories/mentee.repository";
import MentorRepository from "../repositories/mentor.repository";
import MentoringRepository from "../repositories/mentoring.repository";
import MentoringAttendeeRepository from "../repositories/mentoringAttendee.repository";

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
    const mentoring = await this.mentoringRepository.createMentoring(
      mentor_id,
      start_time,
      end_time
    );

    const mentorData = await this.mentorRepository.getMentorById(mentor_id);

    const menteesData = [];

    for (const mentee_id of mentees_id) {
      await this.mentoringAttendeeRepository.createMentoringAttendee(
        mentoring.id,
        mentee_id
      );

      const menteeData = await this.menteeRepository.getMenteeById(mentee_id);
      menteesData.push(menteeData);
    }

    await this.googleCalendarRepository.createEvent(
      start_time,
      end_time,
      "Mentoring 1-on-1",
      "Description",
      mentorData!.User.email,
      menteesData.map((mentee) => mentee!.User.email)
    );

    return mentoring;
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
}

const mentoringService = new MentoringService();
export default mentoringService;
