import { MentoringUpdateInput } from "../typings/mentoring.type";
import { Repository } from "./index.repository";
import { Transaction } from "../typings/prisma.type";

/**
 * A repository class for handling all the database operations related to mentoring.
 */
export default class MentoringRepository extends Repository {
  /**
   * Retrieves a mentoring session by ID.
   *
   * @param {number} id - The ID of the mentoring session.
   * @returns {Promise} - A promise that resolves with the mentoring session data.
   */
  async getMentoringById(id: number) {
    return this.prisma.mentoring.findUnique({
      where: { id },
      include: {
        Mentoring_Attendee: {
          include: { Mentee: true },
        },
      },
    });
  }

  /**
   * Retrieves a mentor's ID by mentoring session ID.
   *
   * @param {number} id - The ID of the mentoring session.
   * @returns {Promise} - A promise that resolves with the mentor's ID.
   */
  async getMentorIdByMentoringId(id: number) {
    return this.prisma.mentoring.findUnique({
      where: { id },
      select: { mentor_id: true },
    });
  }

  /**
   * Retrieves all mentoring sessions by a specific mentor.
   *
   * @param {string} mentor_id - The ID of the mentor.
   * @returns {Promise} - A promise that resolves with the list of mentoring sessions.
   */
  async getMentoringsByMentorId(mentor_id: string) {
    return this.prisma.mentoring.findMany({
      where: { mentor_id },
      include: {
        Mentoring_Attendee: {
          include: {
            Mentee: {
              include: { User: true },
            },
          },
        },
      },
    });
  }

  /**
   * Retrieves filtered mentoring sessions by a specific mentor and from a specific date.
   *
   * @param {string} mentor_id - The ID of the mentor.
   * @param {string} from_date - The date from which to retrieve mentoring sessions.
   * @returns {Promise} - A promise that resolves with the list of filtered mentoring sessions.
   */
  async getFilteredMentoringsByMentorIdAndFromDate(
    mentor_id: string,
    from_date: string
  ) {
    return this.prisma.mentoring.findMany({
      where: {
        mentor_id,
        start_time: { gte: from_date },
      },
      include: {
        Mentoring_Attendee: {
          include: {
            Mentee: {
              include: { User: true },
            },
          },
        },
      },
    });
  }

  /**
   * Retrieves mentoring sessions with feedback by a specific mentor.
   *
   * @param {string} mentor_id - The ID of the mentor.
   * @returns {Promise} - A promise that resolves with the list of mentoring sessions.
   */
  async getMentoringsFeedbackByMentorId(mentor_id: string) {
    return this.prisma.mentoring.findMany({
      where: {
        mentor_id,
        Mentoring_Attendee: {
          every: { rating: { not: null } },
        },
      },
      include: {
        Mentoring_Attendee: {
          include: {
            Sentiment: true,
            Mentee: { include: { User: true } },
          },
        },
      },
    });
  }

  /**
   * Creates a new mentoring session.
   *
   * @param {string} mentor_id - The ID of the mentor.
   * @param {string} start_time - The start time of the mentoring session.
   * @param {string} end_time - The end time of the mentoring session.
   * @param {Transaction} tx - A transaction instance.
   * @returns {Promise} - A promise that resolves with the newly created mentoring session data.
   */
  async createMentoring(
    mentor_id: string,
    start_time: string,
    end_time: string,
    tx?: Transaction
  ) {
    return (tx ?? this.prisma).mentoring.create({
      data: { mentor_id, start_time, end_time },
    });
  }

  /**
   * Updates a mentoring session by ID.
   *
   * @param {number} id - The ID of the mentoring session.
   * @param {MentoringUpdateInput} data - The updated data of the mentoring session.
   * @param {Transaction} tx - A transaction instance.
   * @returns {Promise} - A promise that resolves with the updated mentoring session data.
   */
  async updateMentoringById(
    id: number,
    data: MentoringUpdateInput,
    tx?: Transaction
  ) {
    return (tx ?? this.prisma).mentoring.update({
      where: { id },
      data: {
        ...data,
        updated_at: new Date(),
      },
    });
  }

  /**
   * Updates the time of a mentoring session by ID.
   *
   * @param {number} id - The ID of the mentoring session.
   * @param {string} start_time - The new start time of the mentoring session.
   * @param {string} end_time - The new end time of the mentoring session.
   * @param {Transaction} tx - A transaction instance.
   * @returns {Promise} - A promise that resolves with the updated mentoring session data.
   */
  async updateMentoringTimeById(
    id: number,
    start_time: string,
    end_time: string,
    tx?: Transaction
  ) {
    return (tx ?? this.prisma).mentoring.update({
      where: { id },
      data: {
        start_time,
        end_time,
        updated_at: new Date(),
      },
    });
  }

  /**
   * Deletes a mentoring session by ID.
   *
   * @param {number} id - The ID of the mentoring session.
   * @param {Transaction} tx - A transaction instance.
   * @returns {Promise} - A promise that resolves with the deleted mentoring session data.
   */
  async deleteMentoringById(id: number, tx?: Transaction): Promise<any> {
    return (tx ?? this.prisma).mentoring.delete({
      where: { id },
    });
  }
}
