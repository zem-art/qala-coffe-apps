import bcrypt from "bcrypt";
import { PrismaClient } from "@prisma/client";
import { ReviewData }  from "./json/review.js";
import { ProductData } from "./json/product.js";

const prisma = new PrismaClient();

async function main() {
  // Bersihkan data lama terlebih dahulu (urutan penting untuk menghindari constraint error)
  console.log("Menghapus data lama...");
  await prisma.review.deleteMany({});
  await prisma.booking.deleteMany({});
  await prisma.product.deleteMany({});
  await prisma.category.deleteMany({});
  await prisma.session.deleteMany({});
  await prisma.account.deleteMany({});
  await prisma.user.deleteMany({});
  console.log("Data lama berhasil dihapus.");
  
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
      { id: 1, name: "espresso based" },
      { id: 2, name: "manual brew" },
      { id: 3, name: "kopi susu & lokal" },
      { id: 4, name: "iced coffee" },
      { id: 5, name: "signature / flavored coffee" },
      { id: 6, name: "decaf" },
      { id: 7, name: "specialty / single origin" },
      { id: 8, name: "seasonal menu" },
      { id: 9, name: "non-coffee" },
    ]
  })

  // insert product
  await prisma.product.createMany({
    data : ProductData
  })

  
  const dummyBookings = [];
  const names = ["Andi", "Budi", "Cici", "Dedi", "Eka", "Fani", "Gita", "Hadi", "Intan", "Joko"];
  for(let i=0; i<200; i++) {
    const n = names[Math.floor(Math.random()*names.length)] + " " + Math.floor(Math.random()*1000);
    dummyBookings.push({
      name: n,
      email: n.replace(/ /g, "").toLowerCase() + "@mail.com",
      phone: "08" + Math.floor(Math.random()*10000000000),
      number: Math.floor(Math.random()*5) + 1,
      message: "Booking untuk " + (Math.floor(Math.random()*5) + 1) + " orang",
      createdAt: new Date(Date.now() - Math.random()*10000000000).toISOString()
    });
  }
  await prisma.booking.createMany({
    data: dummyBookings
  });


  await prisma.review.createMany({
    data: ReviewData
  });

  console.log('semua table berhasil di buat ! ⬅️')
}

main()
  .catch((e) => console.error('==>', e))
  .finally(() => prisma.$disconnect());
