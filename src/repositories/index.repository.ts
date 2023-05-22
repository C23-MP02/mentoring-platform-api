import { PrismaClient } from "@prisma/client";

const prismaClient = new PrismaClient();

export class Repository {
  protected prisma: PrismaClient;

  constructor() {
    this.prisma = prismaClient;
  }
}
