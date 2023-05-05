import { PrismaClient } from "@prisma/client";
import { User } from "../models/user.model";

const prisma = new PrismaClient();

export class UserRepository {
  async createUser(user: User): Promise<User> {
    const newUser = await prisma.user.create({
      data: user,
    });
    return newUser;
  }

  async findUserByEmail(email: string): Promise<User | null> {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    return user;
  }
}
