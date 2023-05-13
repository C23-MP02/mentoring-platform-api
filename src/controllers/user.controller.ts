import { Response } from "express";
import { deleteImage, uploadImage } from "../helpers/image";
import { AuthenticatedRequest } from "../typings/request.type";
import { UserService } from "../services/user.service";
import { AuthService } from "../services/auth.service";

const userService = new UserService();
const authService = new AuthService();

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

export const updateInterest = async (
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

    await authService.update(id!.toString(), {
      photoURL: imageUrl,
    });

    return res
      .status(200)
      .json({ message: "Update user success", updatedUser });
  } catch (error: any) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};
