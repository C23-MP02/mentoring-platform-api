import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { firebaseAuth } from "../config/firebase";
import { deleteImage, uploadImage } from "../helpers/image";
import { AuthenticatedRequest } from "../typings/types";

const prisma = new PrismaClient();

export const updateProfile = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  try {
    const id = Number(req.userId);
    const { name, email, gender_id, bio, phone } = req.body;

    const updatedUser = await prisma.user.update({
      where: {
        id,
      },
      data: {
        name,
        gender_id,
        email,
        phone,
        bio,
        updated_at: new Date(),
      },
    });

    await firebaseAuth.updateUser(id.toString(), {
      displayName: name,
      email,
      phoneNumber: phone,
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

    const updatedUser = await prisma.user.update({
      where: {
        id,
      },
      data: {
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
        updated_at: new Date(),
      },
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
    const user = await prisma.user.findUnique({
      where: {
        id: Number(id),
      },
      select: {
        id: true,
        name: true,
        phone: true,
        email: true,
        bio: true,
        Gender: true,
      },
    });

    return res.status(200).json({ message: "Get user success", user });
  } catch (error: any) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};

export const getInterest = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const id = req.userId;
    const user = await prisma.user.findUnique({
      where: {
        id: Number(id),
      },
      select: {
        is_path_android: true,
        is_path_web: true,
        is_path_ios: true,
        is_path_ml: true,
        is_path_flutter: true,
        is_path_fe: true,
        is_path_be: true,
        is_path_react: true,
        is_path_devops: true,
        is_path_gcp: true,
      },
    });

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

    const user = await prisma.user.findUnique({
      where: {
        id,
      },
      select: {
        profile_picture_url: true,
      },
    });

    if (user?.profile_picture_url) {
      await deleteImage(user.profile_picture_url);
    }

    const imageUrl = await uploadImage(file!);

    const updatedUser = await prisma.user.update({
      where: {
        id,
      },
      data: {
        profile_picture_url: imageUrl,
        updated_at: new Date(),
      },
    });

    await firebaseAuth.updateUser(id!.toString(), {
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
