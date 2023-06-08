import { AuthenticatedRequest } from "../typings/request.type";
import { Response } from "express";
import { deleteImage, uploadImage } from "../helpers/image";
import userService from "../services/user.service";
import handleErrorResponse from "../utils/handleErrorResponse";

/**
 * Retrieves the user profile.
 *
 * @param {AuthenticatedRequest} req - The authenticated request object containing the user ID.
 * @param {Response} res - The response object used to send the JSON response.
 * @return {Promise<Response>} - A promise that resolves with the JSON response.
 */
export const getProfile = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<Response> => {
  try {
    const id = req.userId;
    const user = await userService.getUserById(id!);

    return res.json({ message: "Get user success", user });
  } catch (error: any) {
    return handleErrorResponse(res, error);
  }
};

/**
 * Retrieves the user interests.
 *
 * @param {AuthenticatedRequest} req - The authenticated request object containing the user ID.
 * @param {Response} res - The response object used to send the JSON response.
 * @return {Promise<Response>} - A promise that resolves with the JSON response.
 */
export const getInterest = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<Response> => {
  try {
    const id = req.userId;
    const user = await userService.getUserInterestsById(id!);

    return res.json({ message: "Get user interest success", user });
  } catch (error: any) {
    return handleErrorResponse(res, error);
  }
};

/**
 * Retrieves the user's availability.
 *
 * @param {AuthenticatedRequest} req - The authenticated request object containing the user ID.
 * @param {Response} res - The response object used to send the JSON response.
 * @return {Promise<Response>} - A promise that resolves with the JSON response.
 */
export const getAvailability = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<Response> => {
  try {
    const id = req.userId;
    const user = await userService.getUserDaysAvailabilityById(id!);

    return res.json({ message: "Get user availability success", user });
  } catch (error: any) {
    return handleErrorResponse(res, error);
  }
};

/**
 * Updates the user profile.
 *
 * @param {AuthenticatedRequest} req - The authenticated request object containing the user ID and updated profile data.
 * @param {Response} res - The response object used to send the JSON response.
 * @return {Promise<Response>} - A promise that resolves with the JSON response.
 */
export const updateProfile = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<Response> => {
  try {
    const id = req.userId;

    const { name, email, gender_id, bio, phone } = req.body;
    const parsedGenderId = gender_id ? parseInt(gender_id, 10) : undefined;

    const updatedUser = await userService.updateUser(id!, {
      name,
      email,
      gender_id: parsedGenderId,
      bio,
      phone,
    });

    return res.json({ message: "Update user success", updatedUser });
  } catch (error: any) {
    return handleErrorResponse(res, error);
  }
};

/**
 * Updates the user's interests.
 *
 * @param {AuthenticatedRequest} req - The authenticated request object containing the user ID and updated interest data.
 * @param {Response} res - The response object used to send the JSON response.
 * @return {Promise<Response>} - A promise that resolves with the JSON response.
 */
export const updateInterests = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<Response> => {
  try {
    const id = req.userId;
    const {
      is_path_android,
      is_path_web,
      is_path_ios,
      is_path_ml,
      is_path_flutter,
      is_path_fe,
      is_path_be,
      is_path_react,
      is_path_devops,
      is_path_gcp,
    } = req.body;

    const interestBoolean = {
      is_path_android: is_path_android === "true",
      is_path_web: is_path_web === "true",
      is_path_ios: is_path_ios === "true",
      is_path_ml: is_path_ml === "true",
      is_path_flutter: is_path_flutter === "true",
      is_path_fe: is_path_fe === "true",
      is_path_be: is_path_be === "true",
      is_path_react: is_path_react === "true",
      is_path_devops: is_path_devops === "true",
      is_path_gcp: is_path_gcp === "true",
    };

    const updatedUser = await userService.updateUserInterests(
      id!,
      interestBoolean
    );

    return res.json({ message: "Update user success", updatedUser });
  } catch (error: any) {
    return handleErrorResponse(res, error);
  }
};

/**
 * Updates the user's availability for each day of the week.
 *
 * @param {AuthenticatedRequest} req - The authenticated request object containing the user ID and updated availability data.
 * @param {Response} res - The response object used to send the JSON response.
 * @return {Promise<Response>} - A promise that resolves with the JSON response.
 */
export const updateDaysAvailability = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<Response> => {
  try {
    const id = req.userId;
    const {
      is_monday_available,
      is_tuesday_available,
      is_wednesday_available,
      is_thursday_available,
      is_friday_available,
      is_saturday_available,
      is_sunday_available,
    } = req.body;

    const daysAvailability = {
      is_monday_available: is_monday_available === "true",
      is_tuesday_available: is_tuesday_available === "true",
      is_wednesday_available: is_wednesday_available === "true",
      is_thursday_available: is_thursday_available === "true",
      is_friday_available: is_friday_available === "true",
      is_saturday_available: is_saturday_available === "true",
      is_sunday_available: is_sunday_available === "true",
    };

    const updatedUser = await userService.updateUserDaysAvailability(
      id!,
      daysAvailability
    );

    return res.json({ message: "Update user success", updatedUser });
  } catch (error: any) {
    return handleErrorResponse(res, error);
  }
};

/**
 * Uploads the user's avatar image.
 *
 * @param {AuthenticatedRequest} req - The authenticated request object containing the user ID and uploaded file.
 * @param {Response} res - The response object used to send the JSON response.
 * @return {Promise<Response>} - A promise that resolves with the JSON response.
 */
export const uploadAvatar = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<Response> => {
  try {
    const id = req.userId;
    const file = req.file;

    const oldProfilePictureUrl = await userService.getUserProfilePictureById(
      id!
    );

    if (oldProfilePictureUrl) {
      await deleteImage(oldProfilePictureUrl);
    }

    const imageUrl = await uploadImage(file!);

    const updatedUser = await userService.updateUser(id!, {
      profile_picture_url: imageUrl,
    });

    return res.json({ message: "Update user success", updatedUser });
  } catch (error: any) {
    return handleErrorResponse(res, error);
  }
};
