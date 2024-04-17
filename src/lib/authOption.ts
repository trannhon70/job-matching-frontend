import {
  employerLoginApi,
  loginApi,
  loginWithGoogle,
  registerEmployeeApi,
  registerEmployerApi,
} from "@/services/apis";
import { Auth, LoginGoogleType, RegisterEmployeeType } from "@/types";
import { errorResponse } from "@/utils/helper";
import { AxiosError } from "axios";
import { NextAuthOptions, getServerSession } from "next-auth";
import AppleProvider from "next-auth/providers/apple";
import Credentials from "next-auth/providers/credentials";
import FacebookProvider from "next-auth/providers/facebook";
import GoogleProvider from "next-auth/providers/google";

export const authOptions: NextAuthOptions = {
  providers: [
    Credentials({
      id: "sign-up",
      name: "Employee SignUp",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
        code: { label: "Code", type: "text" },
      },
      async authorize(credentials) {
        const { email, password, code } = credentials as RegisterEmployeeType;
        try {
          const { data } = await registerEmployeeApi({ email, password, code });
          return data;
        } catch (error) {
          const err = error as Error | AxiosError;
          errorResponse(err);
        }
      },
    }),
    Credentials({
      id: "sign-up-employer",
      name: "Employer SignUp",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
        code: { label: "Code", type: "text" },
      },
      async authorize(credentials) {
        const { email, password, code } = credentials as RegisterEmployeeType;
        try {
          const { data } = await registerEmployerApi({ email, password, code });
          return data;
        } catch (error) {
          const err = error as Error | AxiosError;
          errorResponse(err);
        }
      },
    }),
    Credentials({
      id: "sign-in",
      name: "Employee Login",
      credentials: {
        email: { label: "Username", type: "text", placeholder: "username" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        const { email, password } = credentials as {
          email: string;
          password: string;
        };
        try {
          const { data } = await loginApi({ email, password });
          return data;
        } catch (error) {
          const err = error as Error | AxiosError;
          errorResponse(err);
        }
      },
    }),
    Credentials({
      id: "employer-sign-in",
      name: "Employer Login",
      credentials: {
        email: { label: "Username", type: "text", placeholder: "username" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        const { email, password } = credentials as {
          email: string;
          password: string;
        };
        try {
          const { data } = await employerLoginApi({ email, password });
          return data;
        } catch (error) {
          const err = error as Error | AxiosError;
          errorResponse(err);
        }
      },
    }),
    FacebookProvider({
      name: "facebook",
      clientId: process.env.NEXT_PUBLIC_FACEBOOK_CLIENT_ID ?? "",
      clientSecret: process.env.NEXT_PUBLIC_FACEBOOK_CLIENT_SECRET ?? "",
    }),
    GoogleProvider({
      name: "google",
      clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET ?? "",
    }),
    AppleProvider({
      name: "apple",
      clientId: process.env.NEXT_PUBLIC_APPLE_ID ?? "",
      clientSecret: process.env.NEXT_PUBLIC_APPLE_SECRET ?? "",
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async signIn({ account, profile, user }) {
      if (account?.provider === "google") {
        const googleProfile = profile as any;
        const body = {
          avatarUrl: googleProfile?.picture,
          email: googleProfile?.email,
          firstName: googleProfile?.name,
          googleId: googleProfile?.sub,
        } as LoginGoogleType;
        try {
          const { data } = await loginWithGoogle(body);
          user.data = data.data;
          return true;
        } catch (error) {
          const err = error as Error | AxiosError;
          errorResponse(err);
          return false;
        }
      }
      return true; // Do different verification for other providers that don't have `email_verified`
    },
    async jwt({ token, user, trigger, session }) {
      if (trigger === "update") {
        const newToken = token as any;
        if (session?.newLogoEmployer)
          newToken.data.infoUser.company.fileLogo = session.newLogoEmployer;
        if (session?.newLogoEmployee)
          newToken.data.infoUser.avatarUrl = session.newLogoEmployee;
        if (session?.isActive)
          newToken.data.infoUser.isActive = session.isActive;
        return { ...token, ...user };
      }
      return { ...token, ...user };
    },
    async session({ session, token }) {
      session.user.data = token.data as Auth;
      return session;
    },
    async redirect({ url, baseUrl }) {
      if (url.startsWith("/")) return `${baseUrl}${url}`;
      else if (new URL(url).origin === baseUrl) return url;
      return baseUrl;
    },
  },
  pages: {
    signIn: "/login",
  },
};

export const getServerAuthSession = () => getServerSession(authOptions);
