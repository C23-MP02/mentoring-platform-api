import { MentoringScheduleByMentee } from "../typings/mentoring.type";
import { Repository } from "./index.repository";

export default class MentoringAttendeeRepository extends Repository {
  async createMentoringAttendee(mentoring_id: number, mentee_id: string) {
    const mentoringAttendee = await this.prisma.mentoring_Attendee.create({
      data: {
        mentoring_id,
        mentee_id,
      },
    });
    return mentoringAttendee;
  }

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

  async createMentoringFeedback(
    mentoring_id: number,
    mentee_id: string,
    feedback: string,
    en_feedback: string,
    sentiment_id: number,
    rating: number
  ) {
    const mentoringFeedback = await this.prisma.mentoring_Attendee.update({
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
}
