import NextAuth, { Account, AuthOptions, CallbacksOptions, CookiesOptions, EventCallbacks, LoggerInstance, PagesOptions, Profile, SessionOptions, Theme } from "next-auth";
import { Adapter } from "next-auth/adapters";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
// import client from "@/lib/prismadb";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import { JWTOptions } from "next-auth/jwt";
import { Provider } from "next-auth/providers/index";
import { PrismaClient } from "@prisma/client";

const client = new PrismaClient()
interface CustomAuthOptions extends AuthOptions {
    adapter?: Adapter;
    callbacks?: Partial<CallbacksOptions<Profile, Account>>;
    cookies?: Partial<CookiesOptions>;
    debug?: boolean;
    events?: Partial<EventCallbacks>;
    jwt?: Partial<JWTOptions>;
    logger?: Partial<LoggerInstance>;
    pages?: Partial<PagesOptions>;
    providers: Provider[];
    secret?: string;
    session?: Partial<SessionOptions>;
    theme?: Theme;
    useSecureCookies?: boolean;
    // Add other properties as needed
}

const authOptions: CustomAuthOptions = {
    adapter: PrismaAdapter(client),
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        }),
        CredentialsProvider({
            name: "credentials",
            credentials: {
                email: { label: "email", type: "text" },
                password: { label: "password", type: "password" },
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials.password) {
                    throw new Error("Invalid Credentials");
                }

                const user = await client.user.findUnique({
                    where: {
                        email: credentials.email as string,
                    },
                });

                if (!user || !user.password) {
                    throw new Error("Invalid Credentials");
                }

                const correctPassword = await bcrypt.compare(
                    credentials.password,
                    user.password
                );

                if (!correctPassword) {
                    throw new Error("Invalid password");
                }
                return user;
            },
        }),
    ],
    pages: {
        signIn: "/",
    },
    debug: process.env.NODE_ENV !== "development",
    session: {
        strategy: "jwt",
    },
    secret: process.env.NEXT_SECRET || "",
};

const handler = NextAuth(authOptions);

export { handler as POST, handler as GET };
