import { Repository } from "./index.repository";

export class MentorRepository extends Repository {
  async getAllMentors() {
    const mentors = await this.prisma.mentor.findMany({
      include: {
        User: true,
      },
    });
    return mentors;
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
}
