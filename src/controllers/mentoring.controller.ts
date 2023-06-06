import { DateTime } from "luxon";
import { Response } from "express";

import { AuthenticatedRequest } from "../typings/request.type";
import mentoringService from "../services/mentoring.service";

export const createMentoring = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  const { mentees_id, start_time } = req.body;
  let { end_time } = req.body;
  const mentor_id = req.userId;

  if (!end_time) {
    end_time = DateTime.fromISO(start_time).plus({ hours: 1 }).toISO();
  }

  try {
    const mentoring = await mentoringService.createMentoring(
      mentor_id!,
      mentees_id,
      start_time,
      end_time
    );

    return res.status(200).json({
      message: "Mentoring created successfully",
      data: mentoring,
    });
  } catch (error: any) {
    console.log(error);
    return res.status(error.statusCode || 500).json({ message: error.message });
  }
};

export const createMentoringFeedback = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  try {
    const mentee_id = req.userId;
    const { mentoring_id, feedback, rating } = req.body;

    const mentoringFeedback = await mentoringService.createMentoringFeedback(
      Number(mentoring_id),
      mentee_id!,
      feedback,
      Number(rating)
    );

    return res.status(200).json({
      message: "Mentoring feedback created successfully",
      data: mentoringFeedback,
    });
  } catch (error: any) {
    console.log(error);
    return res.status(error.statusCode || 500).json({ message: error.message });
  }
};

export const updateMentoring = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  try {
    const user_id = req.userId;
    const { mentoring_id, start_time, end_time, is_finished } = req.body;

    const mentoring_status = is_finished === "true";

    const mentoring = await mentoringService.updateMentoring(
      Number(mentoring_id),
      user_id!,
      {
        start_time,
        end_time,
        is_finished: mentoring_status,
      }
    );

    return res.status(200).json({
      message: "Mentoring updated successfully",
      data: mentoring,
    });
  } catch (error: any) {
    console.log(error);
    return res.status(error.statusCode || 500).json({ message: error.message });
  }
};

export const getMentoringsSchedule = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  try {
    const user_id = req.userId;
    const role = req.role;
    const { from_date } = req.query;

    const mentorings = await mentoringService.getMentoringsSchedule(
      user_id!,
      role!,
      from_date as string
    );

    return res.status(200).json({
      message: "Mentorings retrieved successfully",
      data: mentorings,
    });
  } catch (error: any) {
    console.log(error);
    return res.status(error.statusCode || 500).json({ message: error.message });
  }
};
