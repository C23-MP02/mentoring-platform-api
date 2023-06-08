import { Service } from "./index.service";
import APIRepository from "../repositories/api.repository";
import MentorRepository from "../repositories/mentor.repository";
import UserRepository from "../repositories/user.repository";
import { MatchmakingRequest } from "../typings/request.type";

export class MenteeService extends Service {
  private apiRepository: APIRepository;
  private mentorRepository: MentorRepository;
  private userRepository: UserRepository;

  constructor() {
    super();
    this.apiRepository = new APIRepository();
    this.mentorRepository = new MentorRepository(this.prisma);
    this.userRepository = new UserRepository(this.prisma);
  }

  /**
   * Retrieves all mentors for a mentee and sorts them based on the matchmaking result.
   * @param mentee_id - The ID of the mentee.
   * @returns An array of sorted mentors.
   */
  async getAllMentors(mentee_id: string) {
    const mentors = await this.mentorRepository.getAllMentors();
    const mentee = await this.userRepository.getUserById(mentee_id);
    const data: MatchmakingRequest = {
      mentee: mentee!,
      mentors,
    };

    const matchmakingResult = await this.apiRepository.getMatchmakingResult(
      data
    );

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
