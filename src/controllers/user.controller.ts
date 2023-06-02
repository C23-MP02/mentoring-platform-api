import { AuthenticatedRequest } from "../typings/request.type";
import { Response } from "express";
import { deleteImage, uploadImage } from "../helpers/image";
import userService from "../services/user.service";

export const getProfile = async (req: AuthenticatedRequest, res: Response) => {
  try {
    console.log(req);
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
    let parsedGenderId: number | undefined;

    if (gender_id) {
      parsedGenderId = parseInt(gender_id, 10);
    }

    const updatedUser = await userService.updateUser(id!, {
      name,
      email,
      gender_id: parsedGenderId,
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

    const interestBoolean = {
      is_path_android: is_path_android == "true",
      is_path_web: is_path_web == "true",
      is_path_ios: is_path_ios == "true",
      is_path_ml: is_path_ml == "true",
      is_path_flutter: is_path_flutter == "true",
      is_path_fe: is_path_fe == "true",
      is_path_be: is_path_be == "true",
      is_path_react: is_path_react == "true",
      is_path_devops: is_path_devops == "true",
      is_path_gcp: is_path_gcp == "true",
    };

    const updatedUser = await userService.updateUserInterests(
      id!,
      interestBoolean
    );

    return res
      .status(200)
      .json({ message: "Update user success", updatedUser });
  } catch (error: any) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};

// TODO: Update Role
// export const updateRole = async (req: AuthenticatedRequest, res: Response) => {
//   try {
//     const id = req.userId;
//     const { role_id } = req.body;

//     const updatedUser = await userService.updateUserRole(id!, Number(role_id));

//     return res
//       .status(200)
//       .json({ message: "Update user success", updatedUser });
//   } catch (error: any) {
//     console.log(error);
//     return res.status(500).json({ message: error.message });
//   }
// };

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

    const daysAvailability = {
      is_monday_available: is_monday_available == "true",
      is_tuesday_available: is_tuesday_available == "true",
      is_wednesday_available: is_wednesday_available == "true",
      is_thursday_available: is_thursday_available == "true",
      is_friday_available: is_friday_available == "true",
      is_saturday_available: is_saturday_available == "true",
      is_sunday_available: is_sunday_available == "true",
    };

    const updatedUser = await userService.updateUserDaysAvailability(
      id!,
      daysAvailability
    );

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
