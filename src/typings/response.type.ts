export type translatedAndSentimentedFeedback = {
  data: translatedAndSentimentedFeedbackData[];
};

export type translatedAndSentimentedFeedbackData = {
  feedback: string;
  sentiment: string;
  translate: string;
};

export type mentorRanking = {
  [key: string]: string[];
};

export type summariedFeedback = {
  feedback: string[];
};
