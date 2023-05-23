import { Repository } from "./index.repository";

export default class MentorRepository extends Repository {
  async getAllMentors() {
    const mentors = await this.prisma.mentor.findMany({
      include: {
        User: true,
      },
    });
    return mentors;
  }

  async getMentorById(user_id: number) {
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

  async createMentor(user_id: number) {
    const mentor = await this.prisma.mentor.create({
      data: {
        user_id,
      },
    });
    return mentor;
  }

  async deleteMentor(user_id: number) {
    const mentor = await this.prisma.mentor.delete({
      where: {
        user_id,
      },
    });
    return mentor;
  }

  async getMentorRating(user_id: number) {
    const mentor = await this.prisma.mentor.findUnique({
      where: {
        user_id,
      },
      select: {
        rating_average: true,
        rating_count: true,
      },
    });
    return mentor;
  }

  async updateMentorRating(user_id: number, rating_average: number) {
    const mentor = await this.prisma.mentor.update({
      where: {
        user_id,
      },
      data: {
        rating_count: {
          increment: 1,
        },
        rating_average,
      },
    });
    return mentor;
  }
}
