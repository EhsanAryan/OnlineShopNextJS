import User from "@/models/user";
import db from "@/utils/db";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

export default NextAuth({
    session: {
        strategy: "jwt"
    },
    callbacks: {
        async jwt({ token, user }) {
            user?._id && (token._id = user._id);
            user?.isAdmin && (token.isAdmin = user.isAdmin);
            return token;
        },
        async session({ session, token }) {
            token?._id && (session.user._id = token._id);
            token.isAdmin && (session.user.isAdmin = token.isAdmin);
            return session;
        }
    },
    providers: [
        CredentialsProvider({
            async authorize(credentials) {
                await db.connect();
                const user = await User.findOne({
                    email: credentials.email
                });

                if (user && bcrypt.compareSync(credentials.password, user.password)) {
                    return {
                        _id: user.id,
                        name: user.name,
                        email: user.email,
                        image: "alaki",
                        isAdmin: user.isAdmin
                    };
                }
                throw new Error("Invalid email or password");
            }
        })
    ]
});