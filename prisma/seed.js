import bcrypt from "bcrypt";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {

  // insert user
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

  // insert category
  await prisma.category.createMany({
    data: [
      { name: "Espresso Based" },
      { name: "Manual Brew" },
      { name: "Kopi Susu & Lokal" },
      { name: "Iced Coffee" },
      { name: "Signature / Flavored Coffee" }
    ]
  })

}

main()
  .catch((e) => console.error(e))
  .finally(() => prisma.$disconnect());
