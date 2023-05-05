import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

export const register = async (req: Request, res: Response) => {
  const { auth, email, name, phone, address, role_id } = req.body;

  try {
    // Check if the email already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return res.status(400).json({ message: "Email already taken" });
    }

    // Create the new user
    const newUser = await prisma.user.create({
      data: {
        auth,
        email,
        name,
        phone,
        address,
        role_id,
      },
    });
    return res.status(201).json({ user: newUser });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};
