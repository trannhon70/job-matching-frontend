import { DefaultSession, DefaultUser } from "next-auth";
import "next-auth/jwt";
import { Auth } from ".";

declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      data: Auth;
    } & DefaultSession["user"];
  }
  interface User extends DefaultUser {
    data: Auth;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    userId: string;
  }
}
