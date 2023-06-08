import { Response } from "express";
import { AuthenticatedRequest } from "../typings/request.type";
import mentorService from "../services/mentor.service";

/**
 * Retrieves the mentor dashboard.
 *
 * @param {AuthenticatedRequest} req - The authenticated request object containing the mentor's user ID.
 * @param {Response} res - The response object used to send the JSON response.
 * @return {Promise<Response>} - A promise that resolves with the JSON response.
 */
export const getMentorDashboard = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<Response> => {
  try {
    const { userId } = req;
    const dashboard = await mentorService.getMentorDashboard(userId!);

    return res.json({
      message: "Get mentor dashboard success",
      dashboard,
    });
  } catch (error: any) {
    console.log(error);
    return res.status(error.statusCode || 500).json({ message: error.message });
  }
};
