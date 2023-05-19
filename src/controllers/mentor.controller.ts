import { Response } from "express";
import { MentorService } from "../services/mentor.service";
import { AuthenticatedRequest } from "../typings/request.type";

const mentorService = new MentorService();

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
