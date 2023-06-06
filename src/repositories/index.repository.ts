import { PrismaClient } from "@prisma/client";

export class Repository {
  protected prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }
}
