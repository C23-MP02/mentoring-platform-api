export function getSentimentId(sentiment: string) {
  switch (sentiment) {
    case "positive":
      return 3;
    case "neutral":
      return 2;
    case "negative":
      return 1;
    default:
      return 2;
  }
}
