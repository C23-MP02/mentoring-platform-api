export interface MentoringScheduleByMentee {
  mentoring_id: number;
  mentee_id: number;
  rating: number | null;
  feedback: string | null;
  en_feedback: string | null;
  sentiment_id: number | null;
  created_at: Date;
  updated_at: Date;
  Mentoring: {
    start_time: Date;
    end_time: Date;
    Mentor: {
      User: {
        name: string;
      };
    };
  };
}
