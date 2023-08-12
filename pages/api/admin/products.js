import Product from "@/models/product";
import db from "@/utils/db";
import { getSession } from "next-auth/react";

const handler = async (req, res) => {
       const session = await getSession({ req });

    if (!session || (session && !session.user.isAdmin)) {
        return res.status(403).send({ message: "Sign in required." });
    }

    await db.connect();

    const products = await Product.find().lean();

    res.send(products);
}

export default handler;