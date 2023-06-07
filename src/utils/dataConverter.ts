export function getSentimentId(sentiment: string) {
  switch (sentiment) {
    case "positive":
      return 2;
    case "negative":
      return 1;
    default:
      return 2;
  }
}
