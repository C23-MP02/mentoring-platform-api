import { Service } from "./index.service";
import AuthRepository from "../repositories/auth.repository";
import UserRepository from "../repositories/user.repository";
import MentorRepository from "../repositories/mentor.repository";
import MenteeRepository from "../repositories/mentee.repository";
import FirestoreRepository from "../repositories/user.firestore.repository";
import { UserRecord } from "firebase-admin/lib/auth";
import { User } from "../models/user.model";

export class AuthService extends Service {
  private authRepository: AuthRepository;
  private userRepository: UserRepository;
  private menteeRepository: MenteeRepository;
  private mentorRepository: MentorRepository;
  private firestoreRepository: FirestoreRepository;

  constructor() {
    super();
    this.authRepository = new AuthRepository();
    this.userRepository = new UserRepository(this.prisma);
    this.menteeRepository = new MenteeRepository(this.prisma);
    this.mentorRepository = new MentorRepository(this.prisma);
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

    const user = await this.prisma.$transaction(async (tx) => {
      const createdUser = await this.userRepository.createUser(newUser, tx);

      if (role === "mentor") {
        await this.mentorRepository.createMentor(createdUser.id, tx);
      } else {
        await this.menteeRepository.createMentee(createdUser.id, tx);
      }
    });

    await this.authRepository.setRoleClaims(uid, {
      role,
    });

    await this.firestoreRepository.createDocument("users", uid, {
      name,
      groups: [],
    });

    return user;
  }

  private async updateRolesAndClaims(user: User, role: string) {
    return await this.prisma.$transaction(async (tx) => {
      if (role === "mentor" && !user.is_mentor) {
        await this.userRepository.updateUser(user.id, { is_mentor: true }, tx);
        await this.mentorRepository.createMentor(user.id, tx);
      } else if (role === "mentee" && !user.is_mentee) {
        await this.menteeRepository.createMentee(user.id, tx);
        await this.userRepository.updateUser(user.id, { is_mentee: true }, tx);
      }

      await this.authRepository.setRoleClaims(user.id, {
        role,
      });
    });
  }
}

const authService = new AuthService();
export default authService;
