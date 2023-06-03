import AuthRepository from "../repositories/auth.repository";
import UserRepository from "../repositories/user.repository";
import MentorRepository from "../repositories/mentor.repository";
import MenteeRepository from "../repositories/mentee.repository";
import FirestoreRepository from "../repositories/user.firestore.repository";
import { UserRecord } from "firebase-admin/lib/auth";
import { User } from "../models/user.model";

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

      const createdUser = await this.createUserAndSetClaims(
        firebaseUser.uid,
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
    uid: string,
    name: string,
    email: string,
    profile_picture_url: string,
    role: string
  ) {
    try {
      const user = await this.userRepository.getUserByEmail(email);

      if (user) {
        await this.updateRolesAndClaims(user, role);
      } else {
        await this.createUserAndSetClaims(
          uid,
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

  async login(uid: string, role: string) {
    const user = await this.userRepository.getUserById(uid);

    if (user) {
      await this.updateRolesAndClaims(user, role);
    }
  }

  async createUserAndSetClaims(
    uid: string,
    name: string,
    email: string,
    profile_picture_url: string,
    role: string
  ) {
    const newUser = {
      id: uid,
      name,
      email,
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

    await this.authRepository.setRoleClaims(uid, {
      role,
    });

    await this.firestoreRepository.createDocument("users", uid, {
      name,
      groups: [],
    });

    return createdUser;
  }

  private async updateRolesAndClaims(user: User, role: string) {
    if (role === "mentor" && !user.is_mentor) {
      await this.userRepository.updateUser(user.id, { is_mentor: true });
      await this.mentorRepository.createMentor(user.id);
    } else if (role === "mentee" && !user.is_mentee) {
      await this.menteeRepository.createMentee(user.id);
      await this.userRepository.updateUser(user.id, { is_mentee: true });
    }

    await this.authRepository.setRoleClaims(user.id, {
      role,
    });
  }
}

const authService = new AuthService();
export default authService;
