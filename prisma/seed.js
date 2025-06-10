import bcrypt from "bcrypt";
import { PrismaClient } from "@prisma/client";
import { ReviewData }  from "./json/review.js";
import { ProductData } from "./json/product.js";

const prisma = new PrismaClient();

async function main() {

  // insert user
  // Hash password
  const password = "password"
  const hashedPassword = await bcrypt.hash(password, 10);
  await prisma.user.createMany({
    data: [
      {
        name: "admin",
        email: "admin@mail.com",
        password : hashedPassword,
        passwordHash : password,
        role : "1",
      },
      {
        name: "kasep",
        email: "kasep@mail.com",
        password : hashedPassword,
        passwordHash : password,
        role : "2",
      }
    ],
  });

  // insert category
  await prisma.category.createMany({
    data: [
      { name: "espresso based" },
      { name: "manual brew" },
      { name: "kopi susu & lokal" },
      { name: "iced coffee" },
      { name: "signature / flavored coffee" },
      { name: "decaf" },
      { name: "specialty / single origin" },
      { name: "seasonal menu" },
      { name: "non-coffee" },
    ]
  })

  // insert product
  await prisma.product.createMany({
    data : ProductData
  })

  await prisma.bokking.createMany({
    data : [
      {
        name : "Ucups", 
        email : "ucup@maill.com",
        phone : "0873245346343",
        number : 1,
        message : "saya mau pesan 1 meja untuk 2 orang",
      },
      {
        name : "kasep", 
        email : "kasep@maill.com",
        phone : "082346345217",
        number : 2,
        message : "saya mau pesan 1 meja untuk 2 orang",
      },
      {
        name : "rine", 
        email : "rine@maill.com",
        phone : "08346523423332",
        number : 3,
        message : "saya mau pesan 1 meja untuk 2 orang",
      },
      {
        name : "juki", 
        email : "juki@maill.com",
        phone : "082347654578",
        number : 4,
        message : "saya mau pesan 1 meja untuk 2 orang",
      }
    ]
  })

  await prisma.review.createMany({
    data: ReviewData
  });

  console.log('semua table berhasil di buat ! ⬅️')
}

main()
  .catch((e) => console.error('==>', e))
  .finally(() => prisma.$disconnect());
