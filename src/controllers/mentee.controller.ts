import { Response } from "express";
import { AuthenticatedRequest } from "../typings/request.type";
import menteeService from "../services/mentee.service";

/**
 * Retrieves all mentors for a mentee.
 *
 * @param {AuthenticatedRequest} req - The authenticated request object containing the mentee's user ID.
 * @param {Response} res - The response object used to send the JSON response.
 * @return {Promise<Response>} - A promise that resolves with the JSON response.
 */
export const getAllMentors = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<Response> => {
  try {
    const mentee_id = req.userId;
    const mentors = await menteeService.getAllMentors(mentee_id!);

    return res
      .status(200)
      .json({ message: "Get all mentors success", mentors });
  } catch (error: any) {
    console.log(error);
    return res.status(error.statusCode || 500).json({ message: error.message });
  }
};
