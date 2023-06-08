import { Repository } from "./index.repository";

export default class SentimentRepository extends Repository {
  /**
   * Retrieves the sentiment ID by sentiment name.
   * @param sentiment - The name of the sentiment.
   * @returns The found sentiment ID, if any.
   */
  async getSentimentIdBySentiment(sentiment: string) {
    const sentimentId = await this.prisma.sentiment.findUnique({
      where: {
        name: sentiment,
      },
    });
    return sentimentId;
  }
}
