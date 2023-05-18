import { Repository } from "./index.repository";

export class MenteeRepository extends Repository {
  async createMentee(user_id: number) {
    const mentee = await this.prisma.mentee.create({
      data: {
        user_id,
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
