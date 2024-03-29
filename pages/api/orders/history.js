import Order from "@/models/order";
import db from "@/utils/db";
import { getSession } from "next-auth/react";

const handler = async (req, res) => {
    const session = await getSession({ req });
    const { user } = session;
    
    await db.connect();
    const orders = await Order.find({
        user: user._id
    }).lean();

    res.send({ message: "orders history received successfully.", orders });
}

export default handler;