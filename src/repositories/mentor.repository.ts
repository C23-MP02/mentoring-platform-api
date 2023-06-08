import { Repository } from "./index.repository";
import { Transaction } from "../typings/prisma.type";
import { MentorSummary } from "../typings/mentor.type";
import { Mentor } from "../models/mentor.model";

export default class MentorRepository extends Repository {
  /**
   * Retrieves all mentors.
   *
   * @returns {Promise<Mentor[]>} - A promise that resolves with an array of mentor records.
   */
  async getAllMentors(): Promise<Mentor[]> {
    const mentors = await this.prisma.mentor.findMany({
      include: {
        User: true,
      },
    });
    return mentors;
  }

  /**
   * Retrieves a mentor record by user ID.
   *
   * @param {string} user_id - The user ID associated with the mentor.
   * @returns {Promise<Mentor>} - A promise that resolves with the retrieved mentor record.
   */
  async getMentorById(user_id: string): Promise<Mentor | null> {
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

  /**
   * Retrieves a summary of a mentor's information by user ID.
   *
   * @param {string} user_id - The user ID associated with the mentor.
   * @returns {Promise<MentorSummary>} - A promise that resolves with the mentor's summary information.
   */
  async getMentorSummaryById(user_id: string): Promise<MentorSummary> {
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

  /**
   * Creates a new mentor record.
   *
   * @param {string} user_id - The user ID associated with the mentor.
   * @param {Transaction} tx - Optional transaction object for database operations.
   * @returns {Promise<Mentor>} - A promise that resolves with the created mentor record.
   */
  async createMentor(user_id: string, tx?: Transaction): Promise<Mentor> {
    const client = tx ?? this.prisma;
    const mentor = await (tx ?? this.prisma).mentor.create({
      data: {
        user_id,
      },
    });
    return mentor;
  }

  /**
   * Deletes a mentor record by user ID.
   *
   * @param {string} user_id - The user ID associated with the mentor.
   * @param {Transaction} tx - Optional transaction object for database operations.
   * @returns {Promise<Mentor>} - A promise that resolves with the deleted mentor record.
   */
  async deleteMentor(user_id: string, tx?: Transaction): Promise<Mentor> {
    const client = tx ?? this.prisma;
    const mentor = await (tx ?? this.prisma).mentor.delete({
      where: {
        user_id,
      },
    });
    return mentor;
  }

  /**
   * Updates a mentor's rating by user ID.
   *
   * @param {string} user_id - The user ID associated with the mentor.
   * @param {number} average_rating - The new average rating value.
   * @param {Transaction} tx - Optional transaction object for database operations.
   * @returns {Promise<Mentor>} - A promise that resolves with the updated mentor record.
   */
  async updateMentorRating(
    user_id: string,
    average_rating: number,
    tx?: Transaction
  ): Promise<Mentor> {
    const client = tx ?? this.prisma;
    const mentor = await (tx ?? this.prisma).mentor.update({
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

  /**
   * Updates a mentor's feedback summary by user ID.
   *
   * @param {string} user_id - The user ID associated with the mentor.
   * @param {string} feedback_summary - The new feedback summary value.
   * @param {Transaction} tx - Optional transaction object for database operations.
   * @returns {Promise<Mentor>} - A promise that resolves with the updated mentor record.
   */
  async updateMentorFeedbackSummary(
    user_id: string,
    feedback_summary: string,
    tx?: Transaction
  ): Promise<Mentor> {
    const client = tx ?? this.prisma;
    const currentTime = new Date();
    const mentor = await (tx ?? this.prisma).mentor.update({
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
