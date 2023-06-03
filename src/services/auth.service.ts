import AuthRepository from "../repositories/auth.repository";
import UserRepository from "../repositories/user.repository";
import MentorRepository from "../repositories/mentor.repository";
import MenteeRepository from "../repositories/mentee.repository";
import FirestoreRepository from "../repositories/user.firestore.repository";

import { UserRecord } from "firebase-admin/lib/auth";

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

  async createUserAndSetClaims(
    provider_id: string,
    name: string,
    email: string,
    profile_picture_url: string,
    role: string
  ) {
    const newUser = {
      name,
      email,
      provider_id,
      profile_picture_url,
      is_mentor: role === "mentor",
      is_mentee: role === "mentee",
    };

    const createdUser = await this.userRepository.createUser(newUser);

    if (role === "mentor") {
      await this.mentorRepository.createMentor(createdUser.id);
    } else {
      await this.menteeRepository.createMentee(createdUser.id);
    }

    await this.authRepository.setRoleClaims(provider_id, {
      role,
      record_id: createdUser.id,
    });

    await this.firestoreRepository.createDocument("users", provider_id, {
      name,
      groups: [],
    });

    return createdUser;
  }

  async register(
    name: string,
    email: string,
    password: string,
    role: string
  ): Promise<{
    success: boolean;
    uid?: string;
    data?: UserRecord;
    message?: string;
  }> {
    try {
      const firebaseUser: UserRecord = await this.authRepository.createUser(
        name,
        email,
        password
      );

      const provider_id = firebaseUser.uid;

      const createdUser = await this.createUserAndSetClaims(
        provider_id,
        name,
        email,
        "", // No profile picture URL provided during registration
        role
      );

      return {
        success: true,
        data: firebaseUser,
      };
    } catch (error: any) {
      return { success: false, message: error.message };
    }
  }

  async providerLogin(
    provider_id: string,
    name: string,
    email: string,
    profile_picture_url: string,
    role: string
  ) {
    try {
      const user = await this.userRepository.getUserByEmail(email);
      // check if user is already registered
      if (user) {
        if (role === "mentor" && !user.is_mentor) {
          await this.userRepository.updateUser(user.id, { is_mentor: true });
          await this.mentorRepository.createMentor(user.id);
        } else if (role === "mentee" && !user.is_mentee) {
          await this.menteeRepository.createMentee(user.id);
          await this.userRepository.updateUser(user.id, { is_mentee: true });
        }

        await this.authRepository.setRoleClaims(provider_id, {
          role,
          record_id: user.id,
        });
      } else {
        await this.createUserAndSetClaims(
          provider_id,
          name,
          email,
          profile_picture_url,
          role
        );
      }
      return {
        success: true,
      };
    } catch (error: any) {
      return { success: false, message: error.message };
    }
  }

  async login(provider_id: string, role: string, record_id: number) {
    const user = await this.userRepository.getUserById(record_id);

    if (role === "mentor" && !user?.is_mentor) {
      await this.userRepository.updateUser(record_id, { is_mentor: true });
      await this.mentorRepository.createMentor(record_id);
    } else if (role === "mentee" && !user?.is_mentee) {
      await this.menteeRepository.createMentee(record_id);
      await this.userRepository.updateUser(record_id, { is_mentee: true });
    }

    await this.authRepository.setRoleClaims(provider_id, {
      role,
      record_id,
    });
  }
}

const authService = new AuthService();
export default authService;
