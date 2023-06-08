import { Request, Response } from "express";
import authService from "../services/auth.service";
import { AuthenticatedRequest } from "../typings/request.type";

/**
 * Handles the registration process.
 *
 * @param {Request} req - The request object containing the registration data.
 * @param {Response} res - The response object used to send the JSON response.
 * @return {Promise<Response>} - A promise that resolves with the JSON response.
 */
export const register = async (
  req: Request,
  res: Response
): Promise<Response> => {
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
    return res.status(error.statusCode || 500).json({ message: error.message });
  }
};

/**
 * Handles the provider login process.
 *
 * @param {Request} req - The request object containing the login data.
 * @param {Response} res - The response object used to send the JSON response.
 * @return {Promise<Response>} - A promise that resolves with the JSON response.
 */
export const providerLogin = async (
  req: Request,
  res: Response
): Promise<Response> => {
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
    return res.status(error.statusCode || 500).json({ message: error.message });
  }
};

/**
 * Handles the login callback process.
 *
 * @param {AuthenticatedRequest} req - The authenticated request object containing the user ID.
 * @param {Response} res - The response object used to send the JSON response.
 * @return {Promise<Response>} - A promise that resolves with the JSON response.
 */
export const loginCallback = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<Response> => {
  try {
    const { role } = req.body;

    await authService.login(req.userId!, role);

    return res.status(200).json({
      message: "Login successful",
      role,
    });
  } catch (error: any) {
    console.log(error);
    return res.status(error.statusCode || 500).json({ message: error.message });
  }
};
