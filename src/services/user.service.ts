import { getRoleNameFromRoleId } from "../helpers/role";
import {
  User,
  UserDaysAvailability,
  UserInterests,
  UserUpdateInput,
} from "../models/user.model";
import { AuthRepository } from "../repositories/auth.repository";
import { MenteeRepository } from "../repositories/mentee.repository";
import { MentorRepository } from "../repositories/mentor.repository";
import { UserRepository } from "../repositories/user.repository";

export class UserService {
  private userRepository: UserRepository;
  private authRepository: AuthRepository;
  private menteeRepository: MenteeRepository;
  private mentorRepository: MentorRepository;

  constructor() {
    this.userRepository = new UserRepository();
    this.authRepository = new AuthRepository();
    this.menteeRepository = new MenteeRepository();
    this.mentorRepository = new MentorRepository();
  }

  async getUserById(id: number): Promise<User | null> {
    const user = await this.userRepository.getUserById(id);
    return user;
  }

  async getUserInterestsById(id: number): Promise<UserInterests | null> {
    const user = await this.userRepository.getUserInterestsById(id);
    return user;
  }

  async getUserProfilePictureById(id: number): Promise<string | null> {
    const user = await this.userRepository.getUserProfilePictureById(id);
    return user;
  }

  async getUserDaysAvailabilityById(
    id: number
  ): Promise<UserDaysAvailability | null> {
    const user = await this.userRepository.getUserDaysAvailabilityById(id);
    return user;
  }

  async updateUser(id: number, user: UserUpdateInput): Promise<User> {
    const updatedUser = await this.userRepository.updateUser(id, user);

    await this.authRepository.updateUser(id.toString(), {
      name: updatedUser.name,
      email: updatedUser.email,
      phoneNumber: updatedUser.phone,
      photoURL: updatedUser.profile_picture_url,
    });

    return updatedUser;
  }

  async updateUserInterests(
    id: number,
    interests: UserInterests
  ): Promise<UserInterests> {
    const updatedUser = await this.userRepository.updateUser(id, interests);

    return updatedUser;
  }

  async updateUserDaysAvailability(
    id: number,
    daysAvailability: UserDaysAvailability
  ): Promise<User> {
    const updatedUser = await this.userRepository.updateUser(
      id,
      daysAvailability
    );

    return updatedUser;
  }

  async updateUserRole(id: number, role_id: number): Promise<User> {
    const updatedUser = await this.userRepository.updateUser(id, { role_id });

    const roleName = getRoleNameFromRoleId(role_id);

    if (roleName === "mentor") {
      await this.menteeRepository.deleteMentee(id);
      await this.mentorRepository.createMentor(id);
    } else if (roleName === "mentee") {
      await this.mentorRepository.deleteMentor(id);
      await this.menteeRepository.createMentee(id);
    }

    await this.authRepository.setRoleClaims(id.toString(), {
      role: roleName!,
    });

    return updatedUser;
  }
}
