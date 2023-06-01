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
      const roleName = getRoleNameFromRoleId(role_id);

      const firebaseUser: UserRecord = await this.authRepository.createUser(
        name,
        email,
        password
      );

      const provider_id = firebaseUser.uid;

      const newUser = {
        name,
        email,
        role_id,
        provider_id,
        is_mentor: roleName === "mentor",
        is_mentee: roleName === "mentee",
      };

      const createdUser = await this.userRepository.createUser(newUser);

      if (roleName === "mentor") {
        await this.mentorRepository.createMentor(createdUser.id);
      } else {
        await this.menteeRepository.createMentee(createdUser.id);
      }

      await this.authRepository.setRoleClaims(provider_id, {
        roles: [roleName!],
        record_id: createdUser.id,
      });

      await this.firestoreRepository.createDocument("users", provider_id, {
        name: firebaseUser.displayName,
        groups: [],
      });

      return {
        success: true,
        data: firebaseUser,
      };
    } catch (error: any) {
      return { success: false, message: error.message };
    }
  }
}

const authService = new AuthService();
export default authService;
