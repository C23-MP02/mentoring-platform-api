export type translatedAndSentimentedFeedback = {
  data: Array<{
    feedback: string;
    sentiment: string;
    translate: string;
  }>;
};
