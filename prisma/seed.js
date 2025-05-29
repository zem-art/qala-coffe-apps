import bcrypt from "bcrypt";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // // Hash password
  const password = "password"
  const hashedPassword = await bcrypt.hash(password, 10);
  await prisma.user.create({
    data: {
      name: "admin",
      email: "admin@mail.com",
      password : hashedPassword,
      passwordHash : password,
      role : "1",
    },
  });
}

main()
  .catch((e) => console.error(e))
  .finally(() => prisma.$disconnect());
