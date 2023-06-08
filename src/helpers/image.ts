import { bucket } from "../config/storage";
import { format } from "util";
import { v4 as uuidv4 } from "uuid";

interface File {
  originalname: string;
  buffer: Buffer;
}

/**
 * Uploads an image file to the image bucket on Google Cloud Storage.
 *
 * @param {File} file - The file object containing the original name and buffer of the image.
 * @returns {Promise<string>} - A promise that resolves with the public URL of the uploaded image.
 */
export const uploadImage = (file: File): Promise<string> =>
  new Promise((resolve, reject) => {
    const { originalname, buffer } = file;

    const uniqueFileName = uuidv4();

    const blob = bucket.file(
      `${uniqueFileName}_${originalname.replace(/ /g, "_")}`
    );
    const blobStream = blob.createWriteStream({
      resumable: false,
    });

    blobStream
      .on("finish", () => {
        const publicUrl = format(
          `https://storage.googleapis.com/${bucket.name}/${blob.name}`
        );
        resolve(publicUrl);
      })
      .on("error", (error: any) => {
        console.log(error);
        reject("Unable to upload image, something went wrong");
      })
      .end(buffer);
  });

/**
 * Deletes an image file from the image bucket on Google Cloud Storage.
 *
 * @param {string} imageUrl - The URL of the image to be deleted.
 * @returns {Promise<void>} - A promise that resolves when the image is successfully deleted.
 */
export const deleteImage = (imageUrl: string): Promise<void> =>
  new Promise((resolve, reject) => {
    const regex = /^(?:https?:\/\/storage.googleapis.com\/)?[^/]+\/([^/]+)/i;
    const matchResult = imageUrl.match(regex);

    if (!matchResult) {
      reject("Invalid image URL");
      return;
    }

    const [_, fileName] = matchResult;
    const file = bucket.file(fileName);

    file.delete((error) => {
      if (error) {
        reject("Unable to delete image");
      } else {
        resolve();
      }
    });
  });
