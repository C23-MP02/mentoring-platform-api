import { Repository } from "./index.repository";
import { Transaction } from "../typings/prisma.type";

export default class MentorRepository extends Repository {
  async getAllMentors() {
    const mentors = await this.prisma.mentor.findMany({
      include: {
        User: true,
      },
    });
    return mentors;
  }

  async getMentorById(user_id: string) {
    const mentor = await this.prisma.mentor.findUnique({
      where: {
        user_id,
      },
      include: {
        User: true,
      },
    });
    return mentor;
  }

  async getMentorSummaryById(user_id: string) {
    const mentor = await this.prisma.mentor.findUnique({
      where: {
        user_id,
      },
      select: {
        average_rating: true,
        rating_count: true,
        feedback_summary: true,
        feedback_summary_last_update: true,
      },
    });
    return mentor;
  }

  async createMentor(user_id: string, tx?: Transaction) {
    const client = tx ?? this.prisma;
    const mentor = await client.mentor.create({
      data: {
        user_id,
      },
    });
    return mentor;
  }

  async deleteMentor(user_id: string, tx?: Transaction) {
    const client = tx ?? this.prisma;
    const mentor = await client.mentor.delete({
      where: {
        user_id,
      },
    });
    return mentor;
  }

  async getMentorRating(user_id: string) {
    const mentor = await this.prisma.mentor.findUnique({
      where: {
        user_id,
      },
      select: {
        average_rating: true,
        rating_count: true,
      },
    });
    return mentor;
  }

  async updateMentorRating(
    user_id: string,
    average_rating: number,
    tx?: Transaction
  ) {
    const client = tx ?? this.prisma;
    const mentor = await client.mentor.update({
      where: {
        user_id,
      },
      data: {
        rating_count: {
          increment: 1,
        },
        average_rating,
        updated_at: new Date(),
      },
    });
    return mentor;
  }

  async updateMentorFeedbackSummary(
    user_id: string,
    feedback_summary: string,
    tx?: Transaction
  ) {
    const client = tx ?? this.prisma;
    const currentTime = new Date();
    const mentor = await client.mentor.update({
      where: {
        user_id,
      },
      data: {
        feedback_summary,
        feedback_summary_last_update: currentTime,
        updated_at: currentTime,
      },
    });
    return mentor;
  }
}
