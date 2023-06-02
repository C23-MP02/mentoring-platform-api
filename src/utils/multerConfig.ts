import multer from "multer";
import createError from "http-errors";

export const multerMid = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 1 * 1024 * 1024,
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith("image")) {
      cb(null, true);
    } else {
      cb(createError(400, "Not an image"));
    }
  },
});
