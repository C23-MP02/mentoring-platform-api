import { Repository } from "./index.repository";

export default class SentimentRepository extends Repository {
  async getSentimentIdBySentiment(sentiment: string) {
    const sentimentId = await this.prisma.sentiment.findUnique({
      where: {
        name: sentiment,
      },
    });
    return sentimentId;
  }
}
