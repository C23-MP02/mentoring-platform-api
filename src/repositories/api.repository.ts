import axios from "axios";
import {
  mentorRanking,
  translatedAndSentimentedFeedback,
} from "../typings/response.type";
import { MatchmakingRequest } from "../typings/request.type";

export default class APIRepository {
  private machineLearningAPI = `${process.env.ML_API}`;

  async translateAndSentimentFeedback(feedback: string) {
    const translatedAndSentimentedFeedback: translatedAndSentimentedFeedback =
      await axios.post(`${this.machineLearningAPI}/translated-sentiment`, [
        {
          feedback,
        },
      ]);

    return translatedAndSentimentedFeedback.data[0];
  }

  async getMatchmakingResult(data: MatchmakingRequest): Promise<string> {
    const matchmakingResult: mentorRanking = await axios.post(
      `${this.machineLearningAPI}/cosine_sim`,
      data
    );
    return Object.values(matchmakingResult.data)[0];
  }

  // TODO: wait for ML to create summarize feedback API
  async summarizeFeedback(feedback: string[]): Promise<string> {
    const summarizedFeedback = await axios.post(
      `${this.machineLearningAPI}/feedback_summarizer`,
      { feedback }
    );
    return summarizedFeedback.data.feedback[0];
  }
}
