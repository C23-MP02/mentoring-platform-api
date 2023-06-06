import { MentoringUpdateInput } from "../typings/mentoring.type";
import { Repository } from "./index.repository";
import { Transaction } from "../typings/prisma.type";

export default class MentoringRepository extends Repository {
  async getMentoringById(id: number) {
    const mentoring = await this.prisma.mentoring.findUnique({
      where: {
        id,
      },
      include: {
        Mentoring_Attendee: {
          include: {
            Mentee: true,
          },
        },
      },
    });

    return mentoring;
  }

  async getMentorIdByMentoringId(id: number) {
    const mentoring = await this.prisma.mentoring.findUnique({
      where: {
        id,
      },
      select: {
        mentor_id: true,
      },
    });

    return mentoring;
  }

  async getMentoringsByMentorId(mentor_id: string) {
    const mentorings = await this.prisma.mentoring.findMany({
      where: {
        mentor_id,
      },
      include: {
        Mentoring_Attendee: {
          include: {
            Mentee: {
              include: {
                User: true,
              },
            },
          },
        },
      },
    });

    return mentorings;
  }

  async getFilteredMentoringsByMentorIdAndFromDate(
    mentor_id: string,
    from_date: string
  ) {
    const mentorings = await this.prisma.mentoring.findMany({
      where: {
        mentor_id,
        start_time: {
          gte: from_date,
        },
      },
      include: {
        Mentoring_Attendee: {
          include: {
            Mentee: {
              include: {
                User: true,
              },
            },
          },
        },
      },
    });

    return mentorings;
  }

  async getMentoringsFeedbackByMentorId(mentor_id: string) {
    const mentorings = await this.prisma.mentoring.findMany({
      where: {
        mentor_id,
        Mentoring_Attendee: {
          every: {
            rating: {
              not: null,
            },
          },
        },
      },
      include: {
        Mentoring_Attendee: {
          include: {
            Sentiment: true,
            Mentee: {
              include: {
                User: true,
              },
            },
          },
        },
      },
    });

    return mentorings;
  }

  async createMentoring(
    mentor_id: string,
    start_time: string,
    end_time: string,
    tx?: Transaction
  ) {
    const client = tx ?? this.prisma;
    const mentoring = await client.mentoring.create({
      data: {
        mentor_id,
        start_time,
        end_time,
      },
    });
    return mentoring;
  }

  async updateMentoringById(
    id: number,
    data: MentoringUpdateInput,
    tx?: Transaction
  ) {
    const client = tx ?? this.prisma;
    const mentoring = await client.mentoring.update({
      where: {
        id,
      },
      data: {
        ...data,
        updated_at: new Date(),
      },
    });
    return mentoring;
  }

  async updateMentoringTimeById(
    id: number,
    start_time: string,
    end_time: string,
    tx?: Transaction
  ) {
    const client = tx ?? this.prisma;
    const mentoring = await client.mentoring.update({
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

  async deleteMentoringById(id: number, tx?: Transaction) {
    const client = tx ?? this.prisma;
    const mentoring = await client.mentoring.delete({
      where: {
        id,
      },
    });
    return mentoring;
  }
}
