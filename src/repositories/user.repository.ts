import { User } from "@prisma/client";
import {
  UserCreateInput,
  UserDaysAvailability,
  UserInterests,
  UserUpdateInput,
} from "../models/user.model";
import { Repository } from "./index.repository";

export class UserRepository extends Repository {
  async createUser(user: UserCreateInput): Promise<User> {
    const newUser = await this.prisma.user.create({
      data: user,
    });
    return newUser;
  }

  async findUserByEmail(email: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
      where: {
        email,
      },
    });
    return user;
  }

  async updateUser(id: number, user: UserUpdateInput): Promise<User> {
    const updatedUser = await this.prisma.user.update({
      where: {
        id,
      },
      data: {
        ...user,
        updated_at: new Date(),
      },
    });
    return updatedUser;
  }

  async getUserById(id: number): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
      where: {
        id,
      },
    });
    return user;
  }

  async getUserInterestsById(id: number): Promise<UserInterests | null> {
    const user = await this.prisma.user.findUnique({
      where: {
        id,
      },
      select: {
        is_path_android: true,
        is_path_web: true,
        is_path_ios: true,
        is_path_ml: true,
        is_path_flutter: true,
        is_path_fe: true,
        is_path_be: true,
        is_path_react: true,
        is_path_devops: true,
        is_path_gcp: true,
      },
    });
    return user;
  }

  async getUserProfilePictureById(id: number): Promise<string | null> {
    const user = await this.prisma.user.findUnique({
      where: {
        id,
      },
      select: {
        profile_picture_url: true,
      },
    });
    return user!.profile_picture_url;
  }

  async getUserDaysAvailabilityById(
    id: number
  ): Promise<UserDaysAvailability | null> {
    const user = await this.prisma.user.findUnique({
      where: {
        id,
      },
      select: {
        is_monday_available: true,
        is_tuesday_available: true,
        is_wednesday_available: true,
        is_thursday_available: true,
        is_friday_available: true,
        is_saturday_available: true,
        is_sunday_available: true,
      },
    });
    return user;
  }
}
