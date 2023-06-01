import { Response } from "express";
import { AuthenticatedRequest } from "../typings/request.type";
import mentorService from "../services/mentor.service";
import mentoringService from "../services/mentoring.service";

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

export const getMentoringsSchedule = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  try {
    const user_id = req.userId;
    const { from_date } = req.query;

    const mentorings = await mentoringService.getMentoringsSchedule(
      Number(user_id),
      "mentor",
      from_date as string
    );

    return res.status(200).json({
      message: "Mentorings retrieved successfully",
      data: mentorings,
    });
  } catch (error: any) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};
