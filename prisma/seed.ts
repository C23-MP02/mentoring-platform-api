import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Roles
  const roles = await prisma.role.findMany();
  if (roles.length === 0) {
    await prisma.role.createMany({
      data: [{ name: "admin" }, { name: "mentor" }, { name: "mentee" }],
    });
  }

  // Gender
  const genders = await prisma.gender.findMany();
  if (genders.length === 0) {
    await prisma.gender.createMany({
      data: [{ name: "male" }, { name: "female" }],
    });
  }

  // Sentiment
  const sentiments = await prisma.sentiment.findMany();
  if (sentiments.length === 0) {
    await prisma.sentiment.createMany({
      data: [{ name: "negative" }, { name: "positive" }],
    });
  }
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
