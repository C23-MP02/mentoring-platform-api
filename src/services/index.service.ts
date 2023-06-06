import { PrismaClient } from "@prisma/client";
import { prisma } from "../config/prisma";

export class Service {
  protected prisma: PrismaClient;

  constructor() {
    this.prisma = prisma;
  }
}
