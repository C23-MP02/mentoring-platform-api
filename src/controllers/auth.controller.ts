import { Request, Response } from "express";
import { AuthService } from "../services/auth.service";

export const register = async (req: Request, res: Response) => {
  try {
    const { email, name, password } = req.body;
    const menteeRole = 3;

    const authService = new AuthService();

    const registrationResult = await authService.register(
      name,
      email,
      password,
      menteeRole
    );

    if (registrationResult.success) {
      return res.status(200).json({
        message: "Registration successful",
        data: registrationResult.data,
      });
    } else {
      return res.status(400).json({ message: registrationResult.message });
    }
  } catch (error: any) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};
