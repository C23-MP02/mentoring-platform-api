import { PrismaClient } from "@prisma/client";

export class Service {
  protected prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }
}
