import { TranslationServiceClient } from "@google-cloud/translate";

const serviceAccount = JSON.parse(
  process.env.CLOUD_TRANSLATE_SERVICE_ACCOUNT_KEY || ""
);

const config = {
  projectId: serviceAccount.project_id,
  credentials: {
    client_email: serviceAccount.client_email,
    private_key: serviceAccount.private_key,
  },
};

// Instantiates a client
export const translationClient = new TranslationServiceClient(config);
