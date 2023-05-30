import MentorRepository from "../repositories/mentor.repository";
import MentoringRepository from "../repositories/mentoring.repository";
import { DashboardRawData } from "../typings/mentor.type";

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
    const mentor = await this.mentorRepository.getMentorSummaryById(mentor_id);

    const reviews =
      await this.mentoringRepository.getMentoringsFeedbackByMentorId(mentor_id);

    // Merge data
    const dashboardRawData = { ...mentor, reviews };

    // Format data
    const formattedData = {
      average_rating: dashboardRawData.average_rating,
      rating_count: dashboardRawData.rating_count,
      feedback_summary: dashboardRawData.feedback_summary,
      reviews: dashboardRawData.reviews.map((review) => ({
        start_time: review.start_time,
        end_time: review.end_time,
        created_at: review.created_at,
        updated_at: review.updated_at,
        mentoring_id: review.Mentoring_Attendee[0].mentoring_id,
        rating: review.Mentoring_Attendee[0].rating,
        feedback: review.Mentoring_Attendee[0].feedback,
        sentiment: review.Mentoring_Attendee[0].Sentiment!.name,
        mentee_name: review.Mentoring_Attendee[0].Mentee.User.name,
      })),
    };

    return formattedData;
  }
}

const mentorService = new MentorService();
export default mentorService;
