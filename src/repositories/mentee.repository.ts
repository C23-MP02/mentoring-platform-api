import { Repository } from "./index.repository";

export default class MenteeRepository extends Repository {
  async createMentee(user_id: number) {
    const mentee = await this.prisma.mentee.create({
      data: {
        user_id,
      },
    });
    return mentee;
  }

  async getMenteeById(user_id: number) {
    const mentee = await this.prisma.mentee.findUnique({
      where: {
        user_id,
      },
      include: {
        User: true,
      },
    });
    return mentee;
  }

  async deleteMentee(user_id: number) {
    const mentee = await this.prisma.mentee.delete({
      where: {
        user_id,
      },
    });
    return mentee;
  }
}
