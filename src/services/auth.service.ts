import AuthRepository from "../repositories/auth.repository";
import UserRepository from "../repositories/user.repository";
import MentorRepository from "../repositories/mentor.repository";
import MenteeRepository from "../repositories/mentee.repository";
import FirestoreRepository from "../repositories/user.firestore.repository";

import { UserRecord } from "firebase-admin/lib/auth";
import { getRoleNameFromRoleId } from "../helpers/role";

export class AuthService {
  private authRepository: AuthRepository;
  private userRepository: UserRepository;
  private menteeRepository: MenteeRepository;
  private mentorRepository: MentorRepository;
  private firestoreRepository: FirestoreRepository;

  constructor() {
    this.authRepository = new AuthRepository();
    this.userRepository = new UserRepository();
    this.menteeRepository = new MenteeRepository();
    this.mentorRepository = new MentorRepository();
    this.firestoreRepository = new FirestoreRepository();
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

      await this.firestoreRepository.createDocument("users", uid, {
        name: userRecord.displayName,
        groups: [],
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

const authService = new AuthService();
export default authService;
