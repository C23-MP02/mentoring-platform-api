import { Service } from "./index.service";
import {
  User,
  UserDaysAvailability,
  UserInterests,
  UserUpdateInput,
} from "../models/user.model";
import AuthRepository from "../repositories/auth.repository";
import UserRepository from "../repositories/user.repository";

export class UserService extends Service {
  private userRepository: UserRepository;
  private authRepository: AuthRepository;

  constructor() {
    super();
    this.userRepository = new UserRepository(this.prisma);
    this.authRepository = new AuthRepository();
  }

  /**
   * Retrieves a user by their ID.
   * @param id - User ID.
   * @returns The user object or null if not found.
   */
  async getUserById(id: string): Promise<User | null> {
    const user = await this.userRepository.getUserById(id);
    return user;
  }

  /**
   * Retrieves a user's interests by their ID.
   * @param id - User ID.
   * @returns The user's interests or null if not found.
   */
  async getUserInterestsById(id: string): Promise<UserInterests | null> {
    const user = await this.userRepository.getUserInterestsById(id);
    return user;
  }

  /**
   * Retrieves a user's profile picture by their ID.
   * @param id - User ID.
   * @returns The URL of the user's profile picture or null if not found.
   */
  async getUserProfilePictureById(id: string): Promise<string | null> {
    const user = await this.userRepository.getUserProfilePictureById(id);
    return user;
  }

  /**
   * Retrieves a user's days availability by their ID.
   * @param id - User ID.
   * @returns The user's days availability or null if not found.
   */
  async getUserDaysAvailabilityById(
    id: string
  ): Promise<UserDaysAvailability | null> {
    const user = await this.userRepository.getUserDaysAvailabilityById(id);
    return user;
  }

  /**
   * Retrieves a user by their email.
   * @param email - User email.
   * @returns The user object or null if not found.
   */
  async getUserByEmail(email: string): Promise<User | null> {
    const user = await this.userRepository.getUserByEmail(email);
    return user;
  }

  /**
   * Updates a user's information.
   * @param id - User ID.
   * @param user - Updated user data.
   * @returns The updated user object.
   */
  async updateUser(id: string, user: UserUpdateInput): Promise<User> {
    return await this.prisma.$transaction(async (tx) => {
      const updatedUser = await this.userRepository.updateUser(id, user, tx);

      // Update user data in the authentication repository
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
    });
  }

  /**
   * Updates a user's interests.
   * @param id - User ID.
   * @param interests - Updated interests data.
   * @returns The updated user's interests.
   */
  async updateUserInterests(
    id: string,
    interests: UserInterests
  ): Promise<UserInterests> {
    const updatedUser = await this.userRepository.updateUser(id, interests);
    return updatedUser;
  }

  /**
   * Updates a user's days availability.
   * @param id - User ID.
   * @param daysAvailability - Updated days availability data.
   * @returns The updated user object.
   */
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
}

const userService = new UserService();
export default userService;

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
