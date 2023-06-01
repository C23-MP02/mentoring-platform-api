import { Request, Response } from "express";
import authService from "../services/auth.service";
import userService from "../services/user.service";

export const register = async (req: Request, res: Response) => {
  try {
    const { email, name, password, role } = req.body;

    const registrationResult = await authService.register(
      name,
      email,
      password,
      role ?? "mentee"
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

export const providerLogin = async (req: Request, res: Response) => {
  try {
    const { email, name, role, profile_picture_url, provider_id } = req.body;

    // check if email is already registered
    const user = await userService.getUserByEmail(email);

    if (user) {
      return res.status(200).json({
        message: "Login successful",
      });
    }

    const loginResult = await authService.providerLogin(
      provider_id,
      name,
      email,
      profile_picture_url,
      role ?? "mentee"
    );

    if (loginResult.success) {
      return res.status(201).json({
        message: "Register successful",
        token: loginResult.token,
      });
    } else {
      return res.status(400).json({ message: loginResult.message });
    }
  } catch (error: any) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};
