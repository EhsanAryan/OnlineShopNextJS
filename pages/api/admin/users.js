import User from "@/models/user";
import db from "@/utils/db";
import { getSession } from "next-auth/react";

const handler = async (req, res) => {
       const session = await getSession({ req });

    if (!session || (session && !session.user.isAdmin)) {
        return res.status(403).send({ message: "Sign in required." });
    }

    await db.connect();

    const users = await User.find().lean();

    res.send(users);
}

export default handler;