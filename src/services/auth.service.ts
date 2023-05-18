import { AuthRepository } from "../repositories/auth.repository";
import { UserRecord } from "firebase-admin/lib/auth";
import { UserRepository } from "../repositories/user.repository";
import { FirebaseUpdateData } from "../typings/firebase.type";
import { getRoleNameFromRoleId } from "../helpers/role";
import { MentorRepository } from "../repositories/mentor.repository";
import { MenteeRepository } from "../repositories/mentee.repository";

export class AuthService {
  private authRepository: AuthRepository;
  private userRepository: UserRepository;
  private menteeRepository: MenteeRepository;
  private mentorRepository: MentorRepository;

  constructor() {
    this.authRepository = new AuthRepository();
    this.userRepository = new UserRepository();
    this.menteeRepository = new MenteeRepository();
    this.mentorRepository = new MentorRepository();
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

      const roleName = getRoleNameFromRoleId(role_id);

      if (roleName === "mentor") {
        await this.mentorRepository.createMentor(createdUser.id);
      } else {
        await this.menteeRepository.createMentee(createdUser.id);
      }

      await this.authRepository.setRoleClaims(uid, {
        role: roleName!,
      });

      return {
        success: true,
        data: userRecord,
      };
    } catch (error: any) {
      return { success: false, message: error.message };
    }
  }
}
