import { AuthenticatedRequest } from "../typings/request.type";
import { Response } from "express";
import { deleteImage, uploadImage } from "../helpers/image";
import { UserService } from "../services/user.service";
import { AuthService } from "../services/auth.service";

const userService = new UserService();
const authService = new AuthService();

export const getProfile = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const id = req.userId;
    const user = await userService.getUserById(id!);

    return res.status(200).json({ message: "Get user success", user });
  } catch (error: any) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};

export const getInterest = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const id = req.userId;
    const user = await userService.getUserInterestsById(id!);

    return res.status(200).json({ message: "Get user interest success", user });
  } catch (error: any) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};

export const getAvailability = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  try {
    const id = req.userId;
    const user = await userService.getUserDaysAvailabilityById(id!);

    return res
      .status(200)
      .json({ message: "Get user availability success", user });
  } catch (error: any) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};

export const updateProfile = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  try {
    const id = req.userId;
    const { name, email, gender_id, bio, phone } = req.body;

    const updatedUser = await userService.updateUser(id!, {
      name,
      email,
      gender_id,
      bio,
      phone,
    });

    return res
      .status(200)
      .json({ message: "Update user success", updatedUser });
  } catch (error: any) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};

export const updateInterests = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  try {
    const id = req.userId;
    const {
      is_path_android,
      is_path_web,
      is_path_ios,
      is_path_ml,
      is_path_flutter,
      is_path_fe,
      is_path_be,
      is_path_react,
      is_path_devops,
      is_path_gcp,
    } = req.body;

    const updatedUser = await userService.updateUser(id!, {
      is_path_android,
      is_path_web,
      is_path_ios,
      is_path_ml,
      is_path_flutter,
      is_path_fe,
      is_path_be,
      is_path_react,
      is_path_devops,
      is_path_gcp,
    });

    return res
      .status(200)
      .json({ message: "Update user success", updatedUser });
  } catch (error: any) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};

export const updateRole = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const id = req.userId;
    const { role_id } = req.body;

    const updatedUser = await userService.updateUserRole(id!, role_id);

    return res
      .status(200)
      .json({ message: "Update user success", updatedUser });
  } catch (error: any) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};

export const updateDaysAvailability = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  try {
    const id = req.userId;
    const {
      is_monday_available,
      is_tuesday_available,
      is_wednesday_available,
      is_thursday_available,
      is_friday_available,
      is_saturday_available,
      is_sunday_available,
    } = req.body;

    const updatedUser = await userService.updateUserDaysAvailability(id!, {
      is_monday_available,
      is_tuesday_available,
      is_wednesday_available,
      is_thursday_available,
      is_friday_available,
      is_saturday_available,
      is_sunday_available,
    });

    return res
      .status(200)
      .json({ message: "Update user success", updatedUser });
  } catch (error: any) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};

export const uploadAvatar = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  try {
    const id = req.userId;
    const file = req.file;

    const oldProfilePictureUrl = await userService.getUserProfilePictureById(
      id!
    );

    if (oldProfilePictureUrl) {
      await deleteImage(oldProfilePictureUrl);
    }

    const imageUrl = await uploadImage(file!);

    const updatedUser = await userService.updateUser(id!, {
      profile_picture_url: imageUrl,
    });

    return res
      .status(200)
      .json({ message: "Update user success", updatedUser });
  } catch (error: any) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};
