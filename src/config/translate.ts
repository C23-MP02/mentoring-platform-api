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
const translationClient = new TranslationServiceClient(config);

const loc = "global";

export async function translateText(text: string, src?: string, dest?: string) {
  // Construct request
  const request = {
    parent: `projects/${serviceAccount.project_id}/locations/${loc}`,
    contents: [text],
    mimeType: "text/plain", // mime types: text/plain, text/html
    sourceLanguageCode: src ?? "id",
    targetLanguageCode: dest ?? "en",
  };

  // Run request
  const [response] = await translationClient.translateText(request);

  const translations: string[] = [];
  for (const translation of response.translations!) {
    translations.push(translation.translatedText!);
  }

  return translations;
}
