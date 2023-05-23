import MentorRepository from "../repositories/mentor.repository";

export class MentorService {
  private mentorRepository: MentorRepository;
  constructor() {
    this.mentorRepository = new MentorRepository();
  }
  async getAllMentors() {
    const mentors = await this.mentorRepository.getAllMentors();
    return mentors;
  }
}

const mentorService = new MentorService();
export default mentorService;
