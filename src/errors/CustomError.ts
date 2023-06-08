/**
 * Custom error class that extends the Error class to include a statusCode property.
 */
export class CustomError extends Error {
  /**
   * Creates a new instance of CustomError.
   * @param {string} message - The error message.
   * @param {number} statusCode - The HTTP status code associated with the error.
   */
  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
  }

  /**
   * The HTTP status code associated with the error.
   */
  statusCode: number;
}
