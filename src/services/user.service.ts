import {
  User,
  UserDaysAvailability,
  UserInterests,
  UserUpdateInput,
} from "../models/user.model";
import AuthRepository from "../repositories/auth.repository";
import UserRepository from "../repositories/user.repository";

export class UserService {
  private userRepository: UserRepository;
  private authRepository: AuthRepository;

  constructor() {
    this.userRepository = new UserRepository();
    this.authRepository = new AuthRepository();
  }

  async getUserById(id: string): Promise<User | null> {
    const user = await this.userRepository.getUserById(id);
    return user;
  }

  async getUserInterestsById(id: string): Promise<UserInterests | null> {
    const user = await this.userRepository.getUserInterestsById(id);
    return user;
  }

  async getUserProfilePictureById(id: string): Promise<string | null> {
    const user = await this.userRepository.getUserProfilePictureById(id);
    return user;
  }

  async getUserDaysAvailabilityById(
    id: string
  ): Promise<UserDaysAvailability | null> {
    const user = await this.userRepository.getUserDaysAvailabilityById(id);
    return user;
  }

  async getUserByEmail(email: string): Promise<User | null> {
    const user = await this.userRepository.getUserByEmail(email);
    return user;
  }

  async updateUser(id: string, user: UserUpdateInput): Promise<User> {
    const updatedUser = await this.userRepository.updateUser(id, user);

    await this.authRepository.updateUser(updatedUser.id, {
      name: updatedUser.name,
      email: updatedUser.email === "" ? undefined : updatedUser.email,
      phoneNumber: updatedUser.phone === "" ? undefined : updatedUser.phone,
      photoURL:
        updatedUser.profile_picture_url === ""
          ? undefined
          : updatedUser.profile_picture_url,
    });

    return updatedUser;
  }

  async updateUserInterests(
    id: string,
    interests: UserInterests
  ): Promise<UserInterests> {
    const updatedUser = await this.userRepository.updateUser(id, interests);

    return updatedUser;
  }

  async updateUserDaysAvailability(
    id: string,
    daysAvailability: UserDaysAvailability
  ): Promise<User> {
    const updatedUser = await this.userRepository.updateUser(
      id,
      daysAvailability
    );

    return updatedUser;
  }

  // TODO: Adjust so that user can have multiple roles
  // async updateUserRole(id: number, role_id: number): Promise<User> {
  //   const updatedUser = await this.userRepository.updateUser(id, { role_id });

  //   const roleName = getRoleNameFromRoleId(role_id);

  //   if (roleName === "mentor") {
  //     await this.menteeRepository.deleteMentee(id);
  //     await this.mentorRepository.createMentor(id);
  //   } else if (roleName === "mentee") {
  //     await this.mentorRepository.deleteMentor(id);
  //     await this.menteeRepository.createMentee(id);
  //   }

  //   await this.authRepository.setRoleClaims(id.toString(), {
  //     roles: [roleName!],
  //   });

  //   return updatedUser;
  // }
}

const userService = new UserService();
export default userService;
