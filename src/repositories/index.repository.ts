import { PrismaClient } from "@prisma/client";

export class Repository {
  protected prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }
}
