const { PrismaClient } = require("@prisma/client");
const { user } = require("./data.js");
const prisma = new PrismaClient();

const load = async () => {
  try {
    await prisma.user.deleteMany();
    console.log("Deleted records in user table");

    // await prisma.product.deleteMany();
    // console.log("Deleted records in product table");

    await prisma.$queryRaw`ALTER TABLE User AUTO_INCREMENT = 1`;
    console.log("reset user auto increment to 1");

    // await prisma.$queryRaw`ALTER TABLE Category AUTO_INCREMENT = 1`;
    // console.log("reset category auto increment to 1");

    await prisma.user.createMany({
      data: user,
    });
    console.log("Added users data");
  } catch (e) {
    console.error(e);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
};

load();
