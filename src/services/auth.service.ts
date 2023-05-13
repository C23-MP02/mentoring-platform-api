import { AuthRepository } from "../repositories/auth.repository";
import { UserRecord } from "firebase-admin/lib/auth";
import { UserRepository } from "../repositories/user.repository";
import { FirebaseUpdateData } from "../typings/firebase.type";

export class AuthService {
  private authRepository: AuthRepository;
  private userRepository: UserRepository;

  constructor() {
    this.authRepository = new AuthRepository();
    this.userRepository = new UserRepository();
  }

  async register(
    name: string,
    email: string,
    password: string,
    role_id: number
  ): Promise<{
    success: boolean;
    uid?: string;
    data?: UserRecord;
    message?: string;
  }> {
    try {
      const existingUser = await this.userRepository.findUserByEmail(email);

      if (existingUser) {
        return { success: false, message: "Email already taken" };
      }

      const newUser = {
        name,
        email,
        role_id,
      };

      const createdUser = await this.userRepository.createUser(newUser);

      const uid = createdUser.id.toString();

      const userRecord: UserRecord = await this.authRepository.createUser(
        uid,
        name,
        email,
        password
      );

      if (role_id === 1) {
        await this.authRepository.setRoleClaims(uid, {
          role: "mentee",
        });
      } else if (role_id === 2) {
        await this.authRepository.setRoleClaims(uid, {
          role: "mentee",
        });
      } else if (role_id === 3) {
        await this.authRepository.setRoleClaims(uid, {
          role: "mentor",
        });
      }

      return {
        success: true,
        data: userRecord,
      };
    } catch (error: any) {
      return { success: false, message: error.message };
    }
  }

  async update(
    uid: string,
    data: FirebaseUpdateData
  ): Promise<{
    success: boolean;
    data?: UserRecord;
    message?: string;
  }> {
    try {
      const userRecord: UserRecord = await this.authRepository.updateUser(
        uid,
        data
      );
      return {
        success: true,
        data: userRecord,
      };
    } catch (error: any) {
      return { success: false, message: error.message };
    }
  }
}
