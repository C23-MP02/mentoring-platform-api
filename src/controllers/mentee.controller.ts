import { Response } from "express";
import { AuthenticatedRequest } from "../typings/request.type";
import menteeService from "../services/mentee.service";

export const getAllMentors = async (
  req: AuthenticatedRequest,
  res: Response
) => {
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
