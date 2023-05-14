import { Storage } from "@google-cloud/storage";

require("dotenv").config();
const serviceAccount = JSON.parse(process.env.SERVICE_ACCOUNT_KEY || "");
// import serviceAccount from "../../serviceAccountKey.json";

const config = {
  projectId: serviceAccount.project_id,
  keyFilename: "serviceAccountKey.json",
  bucketName: "gs://dicoding-mp",
};

export const storage = new Storage(config);

export const bucket = storage.bucket(config.bucketName);
