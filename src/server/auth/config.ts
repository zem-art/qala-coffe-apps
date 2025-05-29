import { PrismaAdapter } from "@auth/prisma-adapter";
import { type DefaultSession, type NextAuthConfig } from "next-auth";
import DiscordProvider from "next-auth/providers/discord";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt"

import { db } from "~/server/db";

/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
      // ...other properties
      // role: UserRole;
      role : string;
    } & DefaultSession["user"];
  }

  // interface User {
  //   // ...other properties
  //   // role: UserRole;
  // }
}

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */
export const authConfig = {
  providers: [
    /**
     * ...add more providers here.
     *
     * Most other providers require a bit more work than the Discord provider. For example, the
     * GitHub provider requires you to add the `refresh_token_expires_in` field to the Account
     * model. Refer to the NextAuth.js docs for the provider you want to use. Example:
     *
     * @see https://next-auth.js.org/providers/github
     */
    DiscordProvider,
    GoogleProvider,
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "" },
        password: { label: "Password", type: "password", placeholder: "" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) {
          throw new Error("Email and password are required");
        }

        const user = await db.user.findUnique({
          where: { email: credentials.email as string },
        });

        if (!user) return null;

        const isValid = await bcrypt.compare(
          String(credentials.password),
          String(user.password)
        );
        // If you want to return the user object, you can do so here.
        if (!isValid) return null;

        return {
          id: user.id,
          name: user.name,
          email: user.email,
          role : user.role,
        };
      }
    }),
  ],
  session : {
    strategy: 'jwt',
    // By default, the session duration in NextAuth.js is 30 days. You can change it to a shorter duration if needed.
    // maxAge: 7 * 24 * 60 * 60, // 7 hari
    // updateAge: 1 * 24 * 60 * 60, // refresh setiap hari
    maxAge: 24 * 60 * 60,      // 1 hari dalam detik (86400 detik)
    updateAge: 60 * 60,        // token akan di-refresh setiap 1 jam (3600 detik)

    
  },
  pages: {
    // You can customize the sign-in page, error page, etc. by providing custom paths.
    signIn: '/auth/sign-in',
  },
  adapter: PrismaAdapter(db),
  callbacks: {
    // THIS IS CODE OLD SESSION CALLBACK
    // session: ({ session, user }) => ({
    //   ...session,
    //   user: {
    //     ...session.user,
    //     id: user.id,
    //   },
    // }),

    async session({ session, token }) {
      if (token?.user && session.user) {
        // console.log('==>', token)
        session.user = {
          ...session.user,
          id: (token.user as { id: string }).id,
          role: (token.user as any).role,
        };
      }
      return session;
    },
    // This callback is called whenever a JWT is created or updated.
    async jwt({ token, user }) {
      // console.log('==>> ', user)
      if (user) {
        token.user = {
          id: user.id,
          name: user.name,
          email: user.email,
          role: (user as any).role,
        };
      }
    return token;
    },
  },
} satisfies NextAuthConfig;
