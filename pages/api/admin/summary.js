import Order from "@/models/order";
import Product from "@/models/product";
import User from "@/models/user";
import db from "@/utils/db";
import { getSession } from "next-auth/react";

const handler = async (req, res) => {
    const session = await getSession({ req });

    if (!session || (session && !session.user.isAdmin)) {
        return res.status(403).send({ message: "Sign in required." });
    }

    await db.connect();

    const ordersCount = await Order.countDocuments();
    const productsCount = await Product.countDocuments();
    const usersCount = await User.countDocuments();

    res.status(200).send({ ordersCount, productsCount, usersCount });
}

export default handler;