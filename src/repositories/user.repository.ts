import { User } from "@prisma/client";
import {
  UserCreateInput,
  UserDaysAvailability,
  UserInterests,
  UserUpdateInput,
} from "../models/user.model";
import { Repository } from "./index.repository";
import { Transaction } from "../typings/prisma.type";

export default class UserRepository extends Repository {
  async createUser(user: UserCreateInput, tx?: Transaction): Promise<User> {
    const client = tx ?? this.prisma;
    const newUser = await client.user.create({
      data: user,
    });
    return newUser;
  }

  async getUserByEmail(email: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
      where: {
        email,
      },
    });
    return user;
  }

  async updateUser(
    id: string,
    user: UserUpdateInput,
    tx?: Transaction
  ): Promise<User> {
    const client = tx ?? this.prisma;
    const updatedUser = await client.user.update({
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

  async getUserById(id: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
      where: {
        id,
      },
    });
    return user;
  }

  async getUserInterestsById(id: string): Promise<UserInterests | null> {
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

  async getUserProfilePictureById(id: string): Promise<string | null> {
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
    id: string
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
