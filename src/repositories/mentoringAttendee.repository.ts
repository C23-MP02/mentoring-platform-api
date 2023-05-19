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

  // TODO 
  async getMentoringAttendeeByMenteeIdAndMentoringId(
    mentee_id: number,
    mentoring_id: number
  ) {
    const mentoringAttendee = await this.prisma.mentoring_Attendee.findFirst({
      where: {
        mentee_id,
        mentoring_id,
      },
    });
    return mentoringAttendee;
  }

  // WARNING: This method is not tested. Change a prisma type in line 12968
  async createMentoringFeedback(id: number, feedback: string, rating: number) {
    const mentoringFeedback = await this.prisma.mentoring_Attendee.update({
      where: {
        id,
      },
      data: {
        feedback,
        rating,
      },
    });

    return mentoringFeedback;
  }
}
