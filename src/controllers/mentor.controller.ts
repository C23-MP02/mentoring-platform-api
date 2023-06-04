import { Response } from "express";
import { AuthenticatedRequest } from "../typings/request.type";
import mentorService from "../services/mentor.service";
import mentoringService from "../services/mentoring.service";

export const getMentorDashboard = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  try {
    const dashboard = await mentorService.getMentorDashboard(req.userId!);

    return res
      .status(200)
      .json({ message: "Get mentor dashboard success", dashboard });
  } catch (error: any) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};


