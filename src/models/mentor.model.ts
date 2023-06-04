import { User } from "./user.model";

export interface Mentor {
    user_id: string;
    average_rating: number | null;
    rating_count: number;
    created_at: Date;
    updated_at: Date;
    User: User;
  }