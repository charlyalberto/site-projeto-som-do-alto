import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Credentials({
      name: "Credenciais",

      credentials: {
        username: {
          label: "Usuário",
          type: "text",
        },

        password: {
          label: "Senha",
          type: "password",
        },
      },

      async authorize(credentials) {
        const username = process.env.ADMIN_USER;
        const password = process.env.ADMIN_PASSWORD;

        if (
          credentials?.username === username &&
          credentials?.password === password
        ) {
          return {
            id: "admin",
            name: "Administrador",
          };
        }

        return null;
      },
    }),
  ],

  pages: {
    signIn: "/admin/login",
  },

  session: {
    strategy: "jwt",
  },
});