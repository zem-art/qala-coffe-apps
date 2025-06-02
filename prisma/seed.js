import bcrypt from "bcrypt";
import { PrismaClient } from "@prisma/client";

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
    data : [
    {
      "name": "Espresso",
      "description": "Minuman dasar kopi yang diseduh dengan tekanan tinggi. Pahit, pekat, dan menjadi dasar dari banyak minuman kopi lainnya.",
      "price": "21500",
      "categoryId": 1
    },
    {
      "name": "Ristretto",
      "description": "Versi lebih singkat dari espresso, menggunakan lebih sedikit air untuk rasa yang lebih kuat dan pekat.",
      "price": "24000",
      "categoryId": 2
    },
    {
      "name": "Americano",
      "description": "Espresso yang ditambahkan air panas, menghasilkan kopi hitam dengan rasa ringan namun tetap beraroma.",
      "price": "26000",
      "categoryId": 3
    },
    {
      "name": "Long Black",
      "description": "Mirip Americano, tapi air panas dituangkan dulu, lalu espresso — menjaga crema tetap utuh.",
      "price": "26000",
      "categoryId": 4
    },
    {
      "name": "Latte",
      "description": "Perpaduan espresso, steamed milk, dan tipis microfoam. Cocok bagi yang suka kopi lembut dan creamy.",
      "price": "30000",
      "categoryId": 5
    },
    {
      "name": "Cappuccino",
      "description": "Kombinasi espresso, steamed milk, dan foam dalam jumlah yang seimbang. Lebih ringan dari latte.",
      "price": "30000",
      "categoryId": 6
    },
    {
      "name": "Flat White",
      "description": "Espresso dengan microfoam tipis tanpa busa tebal seperti cappuccino. Asal dari Australia & New Zealand.",
      "price": "28500",
      "categoryId": 7
    },
    {
      "name": "Mocha",
      "description": "Kombinasi espresso, cokelat, dan susu. Cocok untuk pecinta kopi dan cokelat.",
      "price": "33000",
      "categoryId": 8
    },
    {
      "name": "Macchiato",
      "description": "Espresso dengan sedikit foam susu di atasnya. Pilihan bagi yang suka rasa kopi dominan dengan sentuhan lembut.",
      "price": "25000",
      "categoryId": 9
    },
    {
      "name": "Affogato",
      "description": "Espresso dituangkan ke atas es krim vanilla. Perpaduan panas dan dingin yang unik dan nikmat.",
      "price": "35000",
      "categoryId": 1
    },
    {
      "name": "Cold Brew",
      "description": "Kopi yang diseduh dingin selama 12–24 jam, menghasilkan rasa ringan, sedikit manis alami, dan rendah asam.",
      "price": "34000",
      "categoryId": 2
    },
    {
      "name": "Japanese Iced Coffee",
      "description": "Kopi diseduh langsung di atas es menggunakan metode pour over. Hasilnya segar dan beraroma tajam.",
      "price": "33000",
      "categoryId": 3
    },
    {
      "name": "Es Kopi Susu Gula Aren",
      "description": "Kopi dingin khas Indonesia dengan campuran susu dan gula aren. Manis, creamy, dan menyegarkan.",
      "price": "25000",
      "categoryId": 4
    },
    {
      "name": "Kopi Tubruk",
      "description": "Kopi khas Indonesia, disajikan tanpa disaring dengan ampas, menghasilkan rasa kuat dan khas.",
      "price": "14000",
      "categoryId": 5
    },
    {
      "name": "V60",
      "description": "Metode manual brew menggunakan dripper berbentuk kerucut. Menghasilkan rasa bersih, kompleks, dan ringan.",
      "price": "30000",
      "categoryId": 6
    },
    {
      "name": "Kalita Wave",
      "description": "Manual brew dengan dasar datar dan tiga lubang. Hasil seduhan lebih stabil dan body medium.",
      "price": "30000",
      "categoryId": 7
    },
    {
      "name": "Chemex",
      "description": "Metode pour over menggunakan kertas saring tebal. Menghasilkan rasa sangat bersih dan ringan.",
      "price": "33000",
      "categoryId": 8
    },
    {
      "name": "Aeropress",
      "description": "Metode seduh menggunakan tekanan manual. Hasilnya kopi yang bold, ringan, atau kompleks tergantung teknik.",
      "price": "30000",
      "categoryId": 9
    },
    {
      "name": "Signature Caramel Latte",
      "description": "Latte klasik dengan tambahan sirup karamel. Rasa manis, creamy, dan cocok untuk pemula.",
      "price": "34000",
      "categoryId": 1
    },
    {
      "name": "Vanilla Cold Foam Brew",
      "description": "Cold brew yang disajikan dengan foam vanila di atasnya. Ringan dan sedikit manis.",
      "price": "37000",
      "categoryId": 2
    },
    {
      "name": "Matcha Latte",
      "description": "Minuman non-kopi berbahan dasar bubuk teh hijau Jepang dan susu. Sehat dan menyegarkan.",
      "price": "31500",
      "categoryId": 3
    }
  ]
  })

  await prisma.review.createMany({
    data: [
      {
        name: "John Deo",
        role: "klien puas",
        image: "/image/pic-1.jpg",
        message:
          "Saya benar-benar terkesan dengan kualitas layanan yang diberikan. Semuanya ditangani secara profesional dan tepat waktu!",
        rating: 5,
      },
      {
        name: "John Deo",
        role: "klien puas",
        image: "/image/pic-2.jpg",
        message:
          "Timnya sangat membantu dari awal sampai akhir. Saya sangat merekomendasikan layanan mereka!",
        rating: 5,
      },
      {
        image: "/image/pic-1.png",
        name: "John Deo",
        role: "klien puas",
        message:
          "Perhatian terhadap detailnya luar biasa, dan komunikasinya sangat baik. Saya sangat puas dengan hasilnya.",
        rating: 5,
      },
      {
        image: "/image/pic-2.png",
        name: "John",
        role: "klien puas",
        message:
          "Mereka benar-benar memberikan lebih dari yang saya harapkan. Sangat menyenangkan bekerja dengan mereka.",
        rating: 5,
      },
      {
        image: "/image/pic-3.png",
        name: "Deo",
        role: "klien puas",
        message:
          "Tim yang sangat profesional dan efisien. Hasilnya jauh melebihi ekspektasi saya!",
        rating: 5,
      },
      {
        image: "/image/pic-4.png",
        name: "Ameli",
        role: "klien puas",
        message:
          "Luar biasa! Responnya cepat dan mereka benar-benar mengerti apa yang saya butuhkan.",
        rating: 5,
      },
      {
        image: "/image/pic-1.png",
        name: "Sophia Brown",
        role: "pelanggan senang",
        message:
          "Bekerja sama dengan mereka sangat menyenangkan. Saya sangat puas dengan hasil akhirnya.",
        rating: 5,
      },
      {
        image: "/image/pic-2.png",
        name: "David Lee",
        role: "pemilik bisnis",
        message:
          "Keahlian mereka terlihat jelas dari hasil akhirnya. Saya pasti akan menggunakan jasa mereka lagi!",
        rating: 5,
      },
      {
        image: "/image/pic-3.png",
        name: "Lina Zhao",
        role: "klien puas",
        message:
          "Pelayanan yang sangat baik! Mereka mendengarkan dengan seksama dan hasilnya benar-benar sesuai harapan.",
        rating: 5,
      },
      {
        image: "/image/pic-4.png",
        name: "Carlos Rivera",
        role: "pelanggan setia",
        message:
          "Prosesnya mudah dan lancar dari awal sampai akhir. Bintang lima pantas diberikan!",
        rating: 5,
      },
    ]
  });

  console.log('semua table berhasil di buat ! ⬅️')
}

main()
  .catch((e) => console.error(e))
  .finally(() => prisma.$disconnect());
