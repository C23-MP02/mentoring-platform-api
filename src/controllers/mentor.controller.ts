import { Response } from "express";
import { AuthenticatedRequest } from "../typings/request.type";
import mentorService from "../services/mentor.service";

export const getAllMentors = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  try {
    const mentors = await mentorService.getAllMentors();

    return res
      .status(200)
      .json({ message: "Get all mentors success", mentors });
  } catch (error: any) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};

export const getMentorDashboard = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  try {
    const mentor_id = req.userId;

    const dashboard = await mentorService.getMentorDashboard(Number(mentor_id));

    return res
      .status(200)
      .json({ message: "Get mentor dashboard success", dashboard });
  } catch (error: any) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};
