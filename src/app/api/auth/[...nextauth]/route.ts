import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

export const authOptions = {
  pages: {
    signIn: "/auth",
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      async profile(profile) {
        // Even if we use oAuth we still store user info into our database.
        const res = await fetch(`${process.env.NEXTAUTH_URL}/api/auth/oAuth/`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: profile.email,
          }),
        });
        const user = await res.json();
        if (res.status === 200) {
          return { id: profile.sub, ...user };
        } else {
          throw new Error(JSON.stringify({ message: user, status: res.status }));
        }
      },
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        const res = await fetch(`${process.env.NEXTAUTH_URL}/api/auth/login/`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: credentials?.email,
            password: credentials?.password,
          }),
        });
        const user = await res.json();

        if (res.status === 200) {
          return user;
        } else {
          throw new Error(JSON.stringify({ message: user, status: res.status }));
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }: { token: any, user: any }) {
      return { ...token, ...user };
    },

    async session({ session, token }: { session: any, token: any }) {
      session.user = token
      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };