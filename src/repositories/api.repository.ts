import axios from "axios";
import { translatedAndSentimentedFeedback } from "../typings/response.type";

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

  async getMatchmakingResult (matchmaking: string){
    
  }
}
