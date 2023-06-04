export type translatedAndSentimentedFeedback = {
  data: Array<{
    feedback: string;
    sentiment: string;
    translate: string;
  }>;
};

export type mentorRanking = {
    [key: string]: string[];
};
  