import axios from "axios";
import {
  mentorRanking,
  translatedAndSentimentedFeedback,
  translatedAndSentimentedFeedbackData,
} from "../typings/response.type";
import { MatchmakingRequest } from "../typings/request.type";

export default class APIRepository {
  private machineLearningAPI = process.env.ML_API;

  /**
   * Translates and performs sentiment analysis on the given feedback using the machine learning API.
   *
   * @param {string} feedback - The feedback to be translated and analyzed.
   * @returns - A promise that resolves with the translated and sentiment analyzed feedback.
   */
  async translateAndSentimentFeedback(
    feedback: string
  ): Promise<translatedAndSentimentedFeedbackData> {
    const translatedAndSentimentedFeedback: translatedAndSentimentedFeedback =
      await axios.post(`${this.machineLearningAPI}/translated-sentiment`, [
        {
          feedback,
        },
      ]);

    return translatedAndSentimentedFeedback.data[0];
  }

  /**
   * Retrieves the matchmaking result from the machine learning API based on the given data.
   *
   * @param {MatchmakingRequest} data - The data for matchmaking.
   * @returns {Promise<string>} - A promise that resolves with the matchmaking result.
   */
  async getMatchmakingResult(data: MatchmakingRequest): Promise<string> {
    const matchmakingResult: mentorRanking = await axios.post(
      `${this.machineLearningAPI}/cosine_sim`,
      data
    );
    return Object.values(matchmakingResult.data)[0];
  }

  /**
   * Summarizes the given feedback using the machine learning API.
   *
   * @param {string[]} feedback - The feedback to be summarized.
   * @returns {Promise<string>} - A promise that resolves with the summarized feedback.
   */
  async summarizeFeedback(feedback: string[]): Promise<string> {
    const summarizedFeedback = await axios.post(
      `${this.machineLearningAPI}/feedback_summarizer`,
      { feedback }
    );
    return summarizedFeedback.data.feedback[0];
  }
}
