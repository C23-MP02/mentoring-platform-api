export interface IUser {
  id: number;
  name: string;
  gender: string;
  email: string;
  address: string;
  education: string;
  role: string;
  experience?: string;
  int_android?: boolean;
  int_web?: boolean;
  int_ios?: boolean;
  int_ml?: boolean;
  int_flutter?: boolean;
  int_fe?: boolean;
  int_be?: boolean;
  int_react?: boolean;
  int_devops?: boolean;
  int_gcp?: boolean;
  created_at: string;
  updated_at: string;
}
