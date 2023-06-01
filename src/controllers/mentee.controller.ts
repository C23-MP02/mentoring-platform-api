import { Response } from "express";
import { AuthenticatedRequest } from "../typings/request.type";
import mentorService from "../services/mentor.service";
import mentoringService from "../services/mentoring.service";

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

export const getMentoringsSchedule = async (
    req: AuthenticatedRequest,
    res: Response
  ) => {
    try {
      const user_id = req.userId;
      const { from_date } = req.query;
  
      const mentorings = await mentoringService.getMentoringsSchedule(
        Number(user_id),
        "mentee",
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
