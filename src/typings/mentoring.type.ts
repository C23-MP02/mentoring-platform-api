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
    meeting_id: string | null;
    event_id: string | null;
    Mentor: {
      User: {
        name: string;
      };
    };
  };
}

export interface MentoringScheduleByMentor {
  mentoring_id: number;
  mentee_id: number;
  start_time: Date;
  end_time: Date;
  event_id: string | null;
  meeting_id: string | null;
  created_at: Date;
  updated_at: Date;
  Mentoring_Attendee: [{
    mentoring_id: number;
    mentee_id: number;
    rating: number | null;
    feedback: string | null;
    en_feedback: string | null;
    sentiment_id: number | null;
    created_at: Date;
    updated_at: Date;
    Mentee: {
      user_id: number;
      name: string;
      role_id: number;
      gender_id: number;
      address: string | null;
      phone: string | null;
      bio: string | null;
      profile_picture: string | null;
      is_path_android: boolean;
      is_path_web:  boolean;
      is_path_ios: boolean;
      is_path_ml: boolean;
      is_path_flutter: boolean;
      is_path_fe: boolean;
      is_path_be: boolean;
      is_path_react: boolean;
      is_path_devops: boolean;
      is_path_gcp: boolean;
      is_monday_available: boolean;
      is_tuesday_available: boolean;
      is_wednesday_available: boolean;
      is_thursday_available: boolean;
      is_friday_available: boolean;
      is_saturday_available: boolean;
      is_sunday_available: boolean;
      created_at: Date;
      updated_at: Date;
    };
  }
  ];
}

export type MentoringUpdateInput = {
  start_time?: Date | string;
  end_time?: Date | string;
  event_id?: string | null;
  meeting_id?: string | null;
  created_at?: Date | string;
  updated_at?: Date | string;
};
