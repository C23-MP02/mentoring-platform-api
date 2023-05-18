import { Repository } from "./index.repository";

export class MentoringRepository extends Repository {
  async getMentoringById(id: number) {
    const mentoring = await this.prisma.mentoring.findUnique({
      where: {
        id,
      },
    });
    return mentoring;
  }

  async getMentoringsByMentorId(mentor_id: number) {
    const mentorings = await this.prisma.mentoring.findMany({
      where: {
        mentor_id,
      },
    });
    return mentorings;
  }

  async createMentoring(mentor_id: number, start_time: Date, end_time: Date) {
    const mentoring = await this.prisma.mentoring.create({
      data: {
        mentor_id,
        start_time,
        end_time,
      },
    });
    return mentoring;
  }

  async updateMentoring(id: number, start_time: Date, end_time: Date) {
    const mentoring = await this.prisma.mentoring.update({
      where: {
        id,
      },
      data: {
        start_time,
        end_time,
        updated_at: new Date(),
      },
    });
    return mentoring;
  }

  async deleteMentoring(id: number) {
    const mentoring = await this.prisma.mentoring.delete({
      where: {
        id,
      },
    });
    return mentoring;
  }
}
