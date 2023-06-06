import { PrismaClient, Prisma } from "@prisma/client";

export type Transaction = Omit<
  PrismaClient<
    Prisma.PrismaClientOptions,
    never,
    Prisma.RejectOnNotFound | Prisma.RejectPerOperation | undefined
  >,
  "$connect" | "$disconnect" | "$on" | "$transaction" | "$use"
>;
