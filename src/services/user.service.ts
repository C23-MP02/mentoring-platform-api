import { UserRepository } from "../repositories/user.repository";
import { User } from "../models/user.model";

export class UserService {
  private userRepository: UserRepository;

  constructor() {
    this.userRepository = new UserRepository();
  }

  async register(user: User) {
    const { email } = user;

    const existingUser = await this.userRepository.findUserByEmail(email);

    if (existingUser) {
      return { success: false, message: "Email already taken" };
    }

    const newUser = await this.userRepository.createUser(user);

    return { success: true, data: { user: newUser } };
  }
}
