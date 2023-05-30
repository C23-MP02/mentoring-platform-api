import {
  Mentoring,
  Mentoring_Attendee,
  Mentee,
  User,
  Sentiment,
} from "@prisma/client";

export type DashboardRawData = {
  reviews: (Mentoring & {
    Mentoring_Attendee: (Mentoring_Attendee & {
      Mentee: Mentee & {
        User: User;
      };
      Sentiment: Sentiment | null;
    })[];
  })[];
  average_rating?: number;
  rating_count?: number;
  feedback_summary?: string;
};
