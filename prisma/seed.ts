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

  const times = await prisma.time.findMany();
  if (times.length === 0) {
  }

  await prisma.time.createMany;

  // const times = await prisma.({
  //   data: [
  //     { start_time: "00:00:00", end_time: "01:00:00" },
  //     { start_time: "01:00:00", end_time: "02:00:00" },
  //     { start_time: "02:00:00", end_time: "03:00:00" },
  //     { start_time: "03:00:00", end_time: "04:00:00" },
  //     { start_time: "04:00:00", end_time: "05:00:00" },
  //     { start_time: "05:00:00", end_time: "06:00:00" },
  //     { start_time: "06:00:00", end_time: "07:00:00" },
  //     { start_time: "07:00:00", end_time: "08:00:00" },
  //     { start_time: "08:00:00", end_time: "09:00:00" },
  //     { start_time: "09:00:00", end_time: "10:00:00" },
  //     { start_time: "10:00:00", end_time: "11:00:00" },
  //     { start_time: "11:00:00", end_time: "12:00:00" },
  //     { start_time: "12:00:00", end_time: "13:00:00" },
  //     { start_time: "13:00:00", end_time: "14:00:00" },
  //     { start_time: "14:00:00", end_time: "15:00:00" },
  //     { start_time: "15:00:00", end_time: "16:00:00" },
  //     { start_time: "16:00:00", end_time: "17:00:00" },
  //     { start_time: "17:00:00", end_time: "18:00:00" },
  //     { start_time: "18:00:00", end_time: "19:00:00" },
  //     { start_time: "19:00:00", end_time: "20:00:00" },
  //     { start_time: "20:00:00", end_time: "21:00:00" },
  //     { start_time: "21:00:00", end_time: "22:00:00" },
  //     { start_time: "22:00:00", end_time: "23:00:00" },
  //     { start_time: "23:00:00", end_time: "00:00:00" },
  //   ],
  // });
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
