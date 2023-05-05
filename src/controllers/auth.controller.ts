import { Request, Response } from "express";
import { UserService } from "../services/user.service";
import { User } from "../models/user.model";

const userService = new UserService();

export const register = async (req: Request, res: Response) => {
  try {
    const { auth, email, name, phone, address, role_id } = req.body;

    const user: User = {
      auth,
      email,
      name,
      phone,
      address,
      role_id,
    };

    const result = await userService.register(user);

    if (result.success) {
      return res.status(201).json(result.data);
    } else {
      return res.status(400).json({ message: result.message });
    }
  } catch (error: any) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};
