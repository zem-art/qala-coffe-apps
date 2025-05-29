import { z } from "zod";
import { TRPCError } from "@trpc/server";
import bcrypt from "bcrypt";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const authRouter = createTRPCRouter({
  register: publicProcedure
    .input(
      z.object({
        name: z.string().min(1, "Name is required"),
        email: z.string().email("Must be a valid email"),
        password: z.string().min(6, "Password must be at least 6 characters"),
        role : z.string().optional().default("2")
      }
    ))
    .mutation(async ({ input, ctx }) => {
      const { name, email, password, role } = input;
      // console.log(" Request Dari Body : ", input);

      // Cek apakah email sudah digunakan
      const existingUser = await ctx.db.user.findUnique({
        where: { email },
      });

      if (existingUser) {
        throw new TRPCError({
          code: "CONFLICT",
          message: "Email sudah terdaftar.",
        });
      }

      // // Hash password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Simpan user ke database
      const newUser = await ctx.db.user.create({
        data: {
          name,
          email,
          password: hashedPassword,
          passwordHash : password, // Simpan password asli untuk keperluan verifikasi
          role : role,
        },
      });

      return {
        message: "Registrasi berhasil",
        user: {
          id: newUser.id,
          name: newUser.name,
          email: newUser.email,
        },
      };
    }),

  getUsers: publicProcedure.query(async ({ ctx }) => {
    return await ctx.db.user.findMany();
  }),
});
