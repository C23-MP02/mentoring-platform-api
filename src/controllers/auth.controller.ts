import { Request, Response } from "express";
import { User } from "../models/user.model";
import { PrismaClient } from "@prisma/client";
import { firebaseAuth } from "../config/firebase";

const prisma = new PrismaClient();

export const register = async (req: Request, res: Response) => {
  try {
    const { email, name, password } = req.body;

    const newUser = await prisma.user.create({
      data: {
        email,
        name,
      },
    });

    const uid = newUser.id.toString();

    const firebaseAccount = await firebaseAuth.createUser({
      email,
      displayName: name,
      password,
      uid,
    });

    await firebaseAuth.setCustomUserClaims(uid, { role: "mentee" });

    return res
      .status(201)
      .json({ message: "User created", data: firebaseAccount });
  } catch (error: any) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};
