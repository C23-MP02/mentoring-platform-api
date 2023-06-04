import APIRepository from "../repositories/api.repository";
import MentorRepository from "../repositories/mentor.repository";
import UserRepository from "../repositories/user.repository";

export class MenteeService {
  private apiRespository: APIRepository;
  private mentorRepository: MentorRepository;
  private userRepository: UserRepository;

  constructor() {
    this.apiRespository = new APIRepository();
    this.mentorRepository = new MentorRepository();
    this.userRepository = new UserRepository();
  }

  async getAllMentors(mentee_id: string) {
    const mentors = await this.mentorRepository.getAllMentors();
    const mentee = await this.userRepository.getUserById(mentee_id);
    const data = {
      mentee: mentee!,
      mentors,
    };

    console.log(mentors);

    const matchmakingResult = await this.apiRespository.getMatchmakingResult(
      data
    );

    console.log(matchmakingResult);

    const sortedMentors = mentors.sort((a, b) => {
      const indexA = matchmakingResult.indexOf(a.user_id);
      const indexB = matchmakingResult.indexOf(b.user_id);
      return indexA - indexB;
    });
    return sortedMentors;
  }
}

const menteeService = new MenteeService();
export default menteeService;
