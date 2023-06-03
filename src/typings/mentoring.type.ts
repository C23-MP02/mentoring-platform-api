import { Mentee, Mentoring, Mentoring_Attendee, User } from "@prisma/client";

export interface MentoringScheduleByMentee {
  mentoring_id: number;
  mentee_id: string;
  rating: number | null;
  feedback: string | null;
  en_feedback: string | null;
  sentiment_id: number | null;
  created_at: Date;
  updated_at: Date;
  Mentoring: {
    start_time: Date;
    end_time: Date;
    meeting_id: string | null;
    event_id: string | null;
    Mentor: {
      User: {
        name: string;
      };
    };
  };
}

export type MentoringScheduleByMentor = Mentoring & {
  Mentoring_Attendee: (Mentoring_Attendee & {
    Mentee: Mentee & { User: User };
  })[];
};

export type MentoringUpdateInput = {
  start_time?: Date | string;
  end_time?: Date | string;
  event_id?: string | null;
  meeting_id?: string | null;
  created_at?: Date | string;
  updated_at?: Date | string;
  is_finished?: boolean;
};

export type MentoringFeedbackInput = {
  mentoring_id: number;
  mentee_id: string;
  feedback: string;
  en_feedback: string;
  sentiment: string;
  rating: number;
};
