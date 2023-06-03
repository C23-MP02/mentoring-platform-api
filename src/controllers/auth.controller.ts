import { Request, Response } from "express";
import authService from "../services/auth.service";
import { AuthenticatedRequest } from "../typings/request.type";

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
    const { uid, email, name, role, profile_picture_url } = req.body;

    const loginResult = await authService.providerLogin(
      uid,
      name,
      email,
      profile_picture_url,
      role ?? "mentee"
    );

    if (loginResult.success) {
      return res.status(201).json({
        message: "Register successful.",
      });
    } else {
      return res.status(400).json({ message: loginResult.message });
    }
  } catch (error: any) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};

export const loginCallback = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  try {
    const { role } = req.body;

    await authService.login(req.userId!, role);

    return res.status(200).json({
      message: "Login successful",
      role,
    });
  } catch (error: any) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};
