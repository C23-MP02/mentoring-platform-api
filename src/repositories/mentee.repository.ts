import { Repository } from "./index.repository";
import { Transaction } from "../typings/prisma.type";
import { Mentee } from "../models/mentee.model";

export default class MenteeRepository extends Repository {
  /**
   * Creates a new mentee record.
   *
   * @param {string} user_id - The user ID associated with the mentee.
   * @param {Transaction} tx - Optional transaction object for database operations.
   * @returns {Promise<Mentee>} - A promise that resolves with the created mentee record.
   */
  async createMentee(user_id: string, tx?: Transaction): Promise<Mentee> {
    const mentee = await (tx ?? this.prisma).mentee.create({
      data: {
        user_id,
      },
    });
    return mentee;
  }

  /**
   * Retrieves a mentee record by user ID.
   *
   * @param {string} user_id - The user ID associated with the mentee.
   * @returns {Promise<Mentee>} - A promise that resolves with the retrieved mentee record.
   */
  async getMenteeById(user_id: string): Promise<Mentee | null> {
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

  /**
   * Deletes a mentee record by user ID.
   *
   * @param {string} user_id - The user ID associated with the mentee.
   * @param {Transaction} tx - Optional transaction object for database operations.
   * @returns {Promise<Mentee>} - A promise that resolves with the deleted mentee record.
   */
  async deleteMentee(user_id: string, tx?: Transaction): Promise<Mentee> {
    const mentee = await (tx ?? this.prisma).mentee.delete({
      where: {
        user_id,
      },
    });
    return mentee;
  }
}
