import Order from "@/models/order";
import db from "@/utils/db";
import { getSession } from "next-auth/react";

const handler = async (req, res) => {
       const session = await getSession({ req });

    if (!session || (session && !session.user.isAdmin)) {
        return res.status(403).send({ message: "Sign in required." });
    }

    await db.connect();

    const orders = await Order.find().lean();

    res.send(orders);
}

export default handler;