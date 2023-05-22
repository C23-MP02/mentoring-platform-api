import { Repository } from "./index.repository";

export class MentoringAttendeeRepository extends Repository {
  async createMentoringAttendee(mentoring_id: number, mentee_id: number) {
    const mentoringAttendee = await this.prisma.mentoring_Attendee.create({
      data: {
        mentoring_id,
        mentee_id,
      },
    });
    return mentoringAttendee;
  }

  async getMentoringAttendeeByMenteeIdAndMentoringId(
    mentee_id: number,
    mentoring_id: number
  ) {
    const mentoringAttendee = await this.prisma.mentoring_Attendee.findUnique({
      where: {
        mentoring_id_mentee_id: {
          mentoring_id,
          mentee_id,
        },
      },
    });
    return mentoringAttendee;
  }

  async createMentoringFeedback(
    mentoring_id: number,
    mentee_id: number,
    feedback: string,
    rating: number
  ) {
    const mentoringFeedback = await this.prisma.mentoring_Attendee.update({
      where: {
        mentoring_id_mentee_id: {
          mentoring_id,
          mentee_id,
        },
      },
      data: {
        feedback,
        rating,
      },
    });

    return mentoringFeedback;
  }
}
