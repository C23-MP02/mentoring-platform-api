import { MentoringScheduleByMentee } from "../typings/mentoring.type";
import { Repository } from "./index.repository";
import { Transaction } from "../typings/prisma.type";

export default class MentoringAttendeeRepository extends Repository {
  /**
   * Creates a new mentoring attendee.
   * @param mentoring_id - The ID of the mentoring session.
   * @param mentee_id - The ID of the mentee.
   * @param tx - Optional transaction object.
   * @returns The created mentoring attendee.
   */
  async createMentoringAttendee(
    mentoring_id: number,
    mentee_id: string,
    tx?: Transaction
  ) {
    const client = tx ?? this.prisma;
    const mentoringAttendee = await client.mentoring_Attendee.create({
      data: {
        mentoring_id,
        mentee_id,
      },
    });
    return mentoringAttendee;
  }

  /**
   * Retrieves a mentoring attendee by mentee ID and mentoring ID.
   * @param mentee_id - The ID of the mentee.
   * @param mentoring_id - The ID of the mentoring session.
   * @returns The found mentoring attendee, if any.
   */
  async getMentoringAttendeeByMenteeIdAndMentoringId(
    mentee_id: string,
    mentoring_id: number
  ) {
    const mentoringAttendee = await this.prisma.mentoring_Attendee.findUnique({
      where: {
        mentoring_id_mentee_id: {
          mentoring_id,
          mentee_id,
        },
      },
    });
    return mentoringAttendee;
  }

  /**
   * Creates or updates mentoring feedback.
   * @param mentoring_id - The ID of the mentoring session.
   * @param mentee_id - The ID of the mentee.
   * @param feedback - The feedback text.
   * @param en_feedback - The feedback text in English.
   * @param sentiment_id - The ID of the sentiment.
   * @param rating - The feedback rating.
   * @param tx - Optional transaction object.
   * @returns The created or updated mentoring feedback.
   */
  async createMentoringFeedback(
    mentoring_id: number,
    mentee_id: string,
    feedback: string,
    en_feedback: string,
    sentiment_id: number,
    rating: number,
    tx?: Transaction
  ) {
    const client = tx ?? this.prisma;
    const mentoringFeedback = await client.mentoring_Attendee.update({
      where: {
        mentoring_id_mentee_id: {
          mentoring_id,
          mentee_id,
        },
      },
      data: {
        feedback,
        rating,
        en_feedback,
        sentiment_id,
        updated_at: new Date(),
      },
    });

    return mentoringFeedback;
  }

  /**
   * Retrieves mentorings by mentee ID.
   * @param mentee_id - The ID of the mentee.
   * @returns An array of mentorings associated with the mentee.
   */
  async getMentoringsByMenteeId(mentee_id: string) {
    const mentoring: MentoringScheduleByMentee[] =
      await this.prisma.mentoring_Attendee.findMany({
        where: {
          mentee_id,
        },
        include: {
          Mentoring: {
            select: {
              start_time: true,
              end_time: true,
              meeting_id: true,
              event_id: true,
              Mentor: {
                select: {
                  User: {
                    select: {
                      name: true,
                    },
                  },
                },
              },
            },
          },
        },
      });

    return mentoring;
  }

  /**
   * Retrieves filtered mentorings by mentee ID and starting from a specific date.
   * @param mentee_id - The ID of the mentee.
   * @param from_date - The starting date to filter mentorings.
   * @returns An array of filtered mentorings associated with the mentee.
   */
  async getFilteredMentoringsByMenteeIdAndFromDate(
    mentee_id: string,
    from_date: string
  ) {
    const mentoring: MentoringScheduleByMentee[] =
      await this.prisma.mentoring_Attendee.findMany({
        where: {
          mentee_id,
          Mentoring: {
            start_time: {
              gte: new Date(from_date),
            },
          },
        },

        include: {
          Mentoring: {
            include: {
              Mentor: {
                include: {
                  User: true,
                },
              },
            },
          },
        },
      });

    return mentoring;
  }

  // async getMentoringFeedbacksByMentorId(mentor_id: string, date_from?: Date) {
  //   const mentoringFeedback = await this.prisma.mentoring_Attendee.findMany({
  //     where: {
  //       feedback: {
  //         not: null,
  //       },
  //       Mentoring: {
  //         mentor_id,
  //         // is_finished: true,
  //         start_time: {
  //           gte: date_from,
  //         },
  //       },
  //     },
  //   });

  //   return mentoringFeedback;
  // }
}
