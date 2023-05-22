import { MentorRepository } from "../repositories/mentor.repository";
import { MentoringRepository } from "../repositories/mentoring.repository";
import { MentoringAttendeeRepository } from "../repositories/mentoringAttendee.repository";

export class MentoringService {
  private mentoringRepository: MentoringRepository;
  private mentoringAttendeeRepository: MentoringAttendeeRepository;
  private mentorRepository: MentorRepository;

  constructor() {
    this.mentoringRepository = new MentoringRepository();
    this.mentoringAttendeeRepository = new MentoringAttendeeRepository();
    this.mentorRepository = new MentorRepository();
  }

  async createMentoring(
    mentor_id: number,
    mentees_id: number[],
    start_time: Date,
    end_time: Date
  ) {
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
    }

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

    if (mentorRating?.rating_average && mentorRating?.rating_count) {
      const newRating =
        (mentorRating.rating_average * mentorRating.rating_count + rating) /
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
