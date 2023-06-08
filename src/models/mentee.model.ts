import { User } from "./user.model";

export type Mentee = {
  user_id: string;
  created_at: Date;
  updated_at: Date;
  User?: User;
};
