export type User = {
  id: number;
  name: string;
  gender_id: number | null;
  email: string;
  address: string | null;
  phone: string | null;
  bio: string | null;
  profile_picture_url: string | null;
  is_path_android: boolean;
  is_path_web: boolean;
  is_path_ios: boolean;
  is_path_ml: boolean;
  is_path_flutter: boolean;
  is_path_fe: boolean;
  is_path_be: boolean;
  is_path_react: boolean;
  is_path_devops: boolean;
  is_path_gcp: boolean;
  created_at: Date;
  updated_at: Date;
};

export type UserCreateInput = {
  name: string;
  email: string;
  provider_id: string;
  profile_picture_url?: string;
  is_mentor?: boolean;
  is_mentee?: boolean;
};

export type UserUpdateInput = {
  name?: string;
  gender_id?: number | null;
  email?: string;
  address?: string | null;
  phone?: string | null;
  bio?: string | null;
  profile_picture_url?: string | null;
  is_path_android?: boolean;
  is_path_web?: boolean;
  is_path_ios?: boolean;
  is_path_ml?: boolean;
  is_path_flutter?: boolean;
  is_path_fe?: boolean;
  is_path_be?: boolean;
  is_path_react?: boolean;
  is_path_devops?: boolean;
  is_path_gcp?: boolean;
  is_monday_available?: boolean;
  is_tuesday_available?: boolean;
  is_wednesday_available?: boolean;
  is_thursday_available?: boolean;
  is_friday_available?: boolean;
  is_saturday_available?: boolean;
  is_sunday_available?: boolean;
};

export type UserInterests = {
  is_path_android: boolean;
  is_path_web: boolean;
  is_path_ios: boolean;
  is_path_ml: boolean;
  is_path_flutter: boolean;
  is_path_fe: boolean;
  is_path_be: boolean;
  is_path_react: boolean;
  is_path_devops: boolean;
  is_path_gcp: boolean;
};

export type UserDaysAvailability = {
  is_monday_available: boolean;
  is_tuesday_available: boolean;
  is_wednesday_available: boolean;
  is_thursday_available: boolean;
  is_friday_available: boolean;
  is_saturday_available: boolean;
  is_sunday_available: boolean;
};
