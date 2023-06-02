import MentorRepository from "../repositories/mentor.repository";
import MentoringRepository from "../repositories/mentoring.repository";

export class MentorService {
  private mentorRepository: MentorRepository;
  private mentoringRepository: MentoringRepository;
  constructor() {
    this.mentorRepository = new MentorRepository();
    this.mentoringRepository = new MentoringRepository();
  }
  async getAllMentors() {
    // TODO: Integrate with ML API
    const mentors = await this.mentorRepository.getAllMentors();
    return mentors;
  }

  async getMentorDashboard(mentor_id: number) {
    const [mentor, reviews] = await Promise.all([
      this.mentorRepository.getMentorSummaryById(mentor_id),
      this.mentoringRepository.getMentoringsFeedbackByMentorId(mentor_id),
    ]);

    const sentimentCount: Record<string, number> = {
      negative: 0,
      neutral: 0,
      positive: 0,
    };

    const formattedReviews = reviews.map((review) => {
      const mentoringAttendee = review.Mentoring_Attendee[0];
      const sentimentName = mentoringAttendee.Sentiment!.name;
      const menteeName = mentoringAttendee.Mentee.User.name;

      sentimentCount[sentimentName] += 1;

      return {
        start_time: review.start_time,
        end_time: review.end_time,
        created_at: review.created_at,
        updated_at: review.updated_at,
        mentoring_id: mentoringAttendee.mentoring_id,
        rating: mentoringAttendee.rating,
        feedback: mentoringAttendee.feedback,
        sentiment: sentimentName,
        mentee_name: menteeName,
      };
    });

    const totalReview = formattedReviews.length;

    const sentimentPercentage = {
      negative: (sentimentCount.negative / totalReview) * 100,
      neutral: (sentimentCount.neutral / totalReview) * 100,
      positive: (sentimentCount.positive / totalReview) * 100,
    };

    const formattedData = {
      average_rating: mentor!.average_rating,
      rating_count: mentor!.rating_count,
      feedback_summary: mentor!.feedback_summary,
      sentiment: sentimentPercentage,
      reviews: formattedReviews,
    };

    return formattedData;
  }
}

const mentorService = new MentorService();
export default mentorService;
