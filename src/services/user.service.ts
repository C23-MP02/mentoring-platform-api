import { getRoleNameFromRoleId } from "../helpers/role";
import { User, UserInterests, UserUpdateInput } from "../models/user.model";
import { AuthRepository } from "../repositories/auth.repository";
import { UserRepository } from "../repositories/user.repository";

export class UserService {
  private userRepository: UserRepository;
  private authRepository: AuthRepository;

  constructor() {
    this.userRepository = new UserRepository();
    this.authRepository = new AuthRepository();
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

  async updateUser(id: number, user: UserUpdateInput): Promise<User> {
    const updatedUser = await this.userRepository.updateUser(id, user);

    await this.authRepository.updateUser(id.toString(), {
      name: updatedUser.name,
      email: updatedUser.email,
      phoneNumber: updatedUser.phone,
    });

    return updatedUser;
  }

  async updateUserRole(id: number, role_id: number): Promise<User> {
    const updatedUser = await this.userRepository.updateUser(id, { role_id });

    const roleName = getRoleNameFromRoleId(role_id);

    await this.authRepository.setRoleClaims(id.toString(), {
      role: roleName!,
    });

    return updatedUser;
  }
}
