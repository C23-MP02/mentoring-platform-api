import { Response } from "express";
import { AuthenticatedRequest } from "../typings/request.type";

import mentoringService from "../services/mentoring.service";
import { timeManipulation } from "../utils/dateFunctions";
import handleErrorResponse from "../utils/handleErrorResponse";

/**
 * Creates a mentoring session.
 *
 * @param {AuthenticatedRequest} req - The authenticated request object containing the mentor's user ID and mentoring data.
 * @param {Response} res - The response object used to send the JSON response.
 * @return {Promise<Response>} - A promise that resolves with the JSON response.
 */
export const createMentoring = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<Response> => {
  const {
    mentees_id,
    start_time,
    end_time = timeManipulation(new Date(start_time), 1).toISOString(),
  } = req.body;
  const mentor_id = req.userId;

  try {
    const mentoring = await mentoringService.createMentoring(
      mentor_id!,
      mentees_id,
      start_time,
      end_time
    );

    return res.json({
      message: "Mentoring created successfully",
      data: mentoring,
    });
  } catch (error: any) {
    return handleErrorResponse(res, error);
  }
};

/**
 * Creates mentoring feedback.
 *
 * @param {AuthenticatedRequest} req - The authenticated request object containing the mentee's user ID and feedback data.
 * @param {Response} res - The response object used to send the JSON response.
 * @return {Promise<Response>} - A promise that resolves with the JSON response.
 */
export const createMentoringFeedback = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<Response> => {
  try {
    const mentee_id = req.userId;
    const { mentoring_id, feedback, rating } = req.body;

    const mentoringFeedback = await mentoringService.createMentoringFeedback(
      Number(mentoring_id),
      mentee_id!,
      feedback,
      Number(rating)
    );

    return res.json({
      message: "Mentoring feedback created successfully",
      data: mentoringFeedback,
    });
  } catch (error: any) {
    return handleErrorResponse(res, error);
  }
};

/**
 * Updates a mentoring session.
 *
 * @param {AuthenticatedRequest} req - The authenticated request object containing the user ID and updated mentoring data.
 * @param {Response} res - The response object used to send the JSON response.
 * @return {Promise<Response>} - A promise that resolves with the JSON response.
 */
export const updateMentoring = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<Response> => {
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

    return res.json({
      message: "Mentoring updated successfully",
      data: mentoring,
    });
  } catch (error: any) {
    return handleErrorResponse(res, error);
  }
};

/**
 * Retrieves the mentorings schedule.
 *
 * @param {AuthenticatedRequest} req - The authenticated request object containing the user ID, role, and date query parameter.
 * @param {Response} res - The response object used to send the JSON response.
 * @return {Promise<Response>} - A promise that resolves with the JSON response.
 */
export const getMentoringsSchedule = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<Response> => {
  try {
    const user_id = req.userId;
    const role = req.role;
    const { from_date } = req.query;

    const mentorings = await mentoringService.getMentoringsSchedule(
      user_id!,
      role!,
      from_date as string
    );

    return res.json({
      message: "Mentorings retrieved successfully",
      data: mentorings,
    });
  } catch (error: any) {
    return handleErrorResponse(res, error);
  }
};
