import { Service } from "./index.service";
import MentorRepository from "../repositories/mentor.repository";
import MentoringRepository from "../repositories/mentoring.repository";
import APIRepository from "../repositories/api.repository";
import GoogleTranslateRepository from "../repositories/google.translate.repository";
import { dateManipulation, compareDate } from "../utils/dateFunctions";

export class MentorService extends Service {
  private mentorRepository: MentorRepository;
  private mentoringRepository: MentoringRepository;
  private apiRepository: APIRepository;
  private googleTranslateRepository: GoogleTranslateRepository;
  constructor() {
    super();
    this.mentorRepository = new MentorRepository(this.prisma);
    this.mentoringRepository = new MentoringRepository(this.prisma);
    this.apiRepository = new APIRepository();
    this.googleTranslateRepository = new GoogleTranslateRepository();
  }

  async getMentorDashboard(mentor_id: string) {
    // Retrieve mentor summary and feedbacks asynchronously
    const [mentor, feedbacks] = await Promise.all([
      this.mentorRepository.getMentorSummaryById(mentor_id),
      this.mentoringRepository.getMentoringsFeedbackByMentorId(mentor_id),
    ]);

    // Check if mentor summary needs to be renewed based on last update date
    const renewMentorSummary =
      mentor?.feedback_summary === null ||
      compareDate(
        mentor?.feedback_summary_last_update as Date,
        "<",
        dateManipulation(new Date(), -7)
      );

    // Collect new feedbacks for summary update and count the number of feedbacks for each sentiment category
    const newFeedbacks: string[] = [];
    const sentimentCount: Record<string, number> = {
      negative: 0,
      positive: 0,
    };

    // Format and process each feedback entry
    const formattedFeedbacks = feedbacks.map((data) => {
      const mentoringAttendee = data.Mentoring_Attendee[0];
      const sentimentName = mentoringAttendee.Sentiment!.name;
      const menteeName = mentoringAttendee.Mentee.User.name;
      const censoredMenteeName = "*".repeat(menteeName.length);

      // Increment sentiment count for each feedback
      sentimentCount[sentimentName]++;

      // Collect new feedbacks for summary update
      if (
        renewMentorSummary &&
        mentoringAttendee.en_feedback !== null &&
        compareDate(data.updated_at, ">", dateManipulation(new Date(), -7))
      ) {
        newFeedbacks.push(mentoringAttendee.en_feedback);
      }

      // Format feedback data for output
      return {
        start_time: data.start_time,
        end_time: data.end_time,
        created_at: data.created_at,
        updated_at: data.updated_at,
        mentoring_id: mentoringAttendee.mentoring_id,
        rating: mentoringAttendee.rating,
        feedback: mentoringAttendee.feedback,
        sentiment: sentimentName,
        mentee_name: censoredMenteeName,
      };
    });

    // Calculate the total number of reviews
    const totalReview = formattedFeedbacks.length;

    // Calculate the percentage of each sentiment category
    const sentimentPercentage = {
      negative: parseFloat(
        ((sentimentCount.negative / totalReview) * 100).toFixed(1)
      ),
      positive: parseFloat(
        ((sentimentCount.positive / totalReview) * 100).toFixed(1)
      ),
    };

    // Update mentor summary if needed
    const updatedMentor = renewMentorSummary
      ? await this.updateMentorSummary(mentor_id, newFeedbacks)
      : null;

    // Format the final data to be returned
    const formattedData = {
      average_rating: mentor!.average_rating
        ? parseFloat(mentor!.average_rating.toFixed(1))
        : null,
      rating_count: mentor!.rating_count,
      feedback_summary:
        updatedMentor?.feedback_summary ?? mentor!.feedback_summary,
      sentiment: sentimentPercentage,
      feedbacks: formattedFeedbacks,
    };

    return formattedData;
  }

  async updateMentorSummary(mentor_id: string, feedbacks: string[]) {
    const summarizedFeedback = await this.apiRepository.summarizeFeedback(
      feedbacks
    );

    const translatedFeedback =
      await this.googleTranslateRepository.translateText(
        summarizedFeedback,
        "en",
        "id"
      );
    const newMentorData =
      await this.mentorRepository.updateMentorFeedbackSummary(
        mentor_id,
        translatedFeedback[0]
      );

    return newMentorData;
  }
}

const mentorService = new MentorService();
export default mentorService;
