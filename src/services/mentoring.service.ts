import { MentoringRepository } from "../repositories/mentoring.repository";
import { MentoringAttendeeRepository } from "../repositories/mentoringAttendee.repository";

export class MentoringService {
  private mentoringRepository: MentoringRepository;
  private mentoringAttendeeRepository: MentoringAttendeeRepository;

  constructor() {
    this.mentoringRepository = new MentoringRepository();
    this.mentoringAttendeeRepository = new MentoringAttendeeRepository();
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

  async createMentoringFeedback(
    mentee_id: number,
    mentoring_id: number,
    feedback: string,
    rating: number
  ) {
    const mentoringAttendee =
      await this.mentoringAttendeeRepository.getMentoringAttendeeByMenteeIdAndMentoringId(
        mentee_id,
        mentoring_id
      );

    if (!mentoringAttendee) {
      throw new Error("Mentoring Attendee not found");
    }

    const mentoringFeedback =
      await this.mentoringAttendeeRepository.createMentoringFeedback(
        mentoringAttendee!.id,
        feedback,
        rating
      );

    return mentoringFeedback;
  }
}
