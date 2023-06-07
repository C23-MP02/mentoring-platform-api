import { Storage } from "@google-cloud/storage";

require("dotenv").config();
const serviceAccount = JSON.parse(process.env.SERVICE_ACCOUNT_KEY || "");
// import serviceAccount from "../../serviceAccountKey.json";

const config = {
  projectId: serviceAccount.project_id,
  credentials: {
    client_email: serviceAccount.client_email,
    private_key: serviceAccount.private_key,
  },
  bucketName: process.env.STORAGE_BUCKET_NAME!,
};

export const storage = new Storage(config);

export const bucket = storage.bucket(config.bucketName);
