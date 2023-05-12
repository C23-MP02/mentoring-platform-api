import { AuthRepository } from "../repositories/auth.repository";
import { UserRecord } from "firebase-admin/lib/auth";

export class AuthService {
  private authRepository: AuthRepository;

  constructor() {
    this.authRepository = new AuthRepository();
  }

  async register(
    name: string,
    email: string,
    password: string,
    role_id: number
  ): Promise<{
    success: boolean;
    uid?: string;
    data?: any;
    message?: string;
  }> {
    try {
      const userRecord: UserRecord = await this.authRepository.createUser(
        email,
        password
      );

      if (role_id === 1) {
        await this.authRepository.setRoleClaims(userRecord.uid, {
          role: "mentee",
        });
      } else if (role_id === 2) {
        await this.authRepository.setRoleClaims(userRecord.uid, {
          role: "mentor",
        });
      }

      return {
        success: true,
        uid: userRecord.uid,
        data: userRecord,
      };
    } catch (error: any) {
      return { success: false, message: error.message };
    }
  }
}
