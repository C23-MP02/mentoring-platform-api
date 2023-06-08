import { translationClient } from "../config/translate";

export default class GoogleTranslateRepository {
  /**
   * Translates the given text using the Translation API.
   *
   * @param text The text to translate.
   * @param src The source language code. Defaults to 'id'.
   * @param dest The target language code. Defaults to 'en'.
   * @returns An array of translated texts.
   */
  async translateText(text: string, src?: string, dest?: string) {
    // Construct request
    const request = {
      parent: `projects/${process.env.GOOGLE_CLOUD_PROJECT_ID}/locations/global`,
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
}
