import { Response } from "express";
import { CustomError } from "../errors/CustomError";

/**
 * Handles error responses by logging the error and returning an appropriate JSON response.
 *
 * @param {Response} res - The response object used to send the JSON response.
 * @param {Error} error - The error object containing the error message and status code.
 * @return {Response} - The JSON response with the error message and status code.
 */
const handleErrorResponse = (res: Response, error: CustomError): Response => {
  console.log(error);
  return res.status(error.statusCode || 500).json({ message: error.message });
};

export default handleErrorResponse;
