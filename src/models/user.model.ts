export type User = {
  id: number;
  name: string;
  role_id: number;
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
  role_id: number;
  email: string;
};

export type UserUpdateInput = {
  name?: string;
  role_id?: number;
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
