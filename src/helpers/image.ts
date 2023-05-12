import { bucket } from "../config/storage";
import { format } from "util";
import { v4 as uuidv4 } from "uuid";

interface File {
  originalname: string;
  buffer: Buffer;
}

/**
 *
 * @param { File } object file object that will be uploaded
 * @description - This function does the following
 * - It uploads a file to the image bucket on Google Cloud
 * - It accepts an object as an argument with the
 *   "originalname" and "buffer" as keys
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
        reject(`Unable to upload image, something went wrong`);
      })
      .end(buffer);
  });

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
        // console.error("Error deleting image:", error);
        reject("Unable to delete image");
      } else {
        resolve();
      }
    });
  });
