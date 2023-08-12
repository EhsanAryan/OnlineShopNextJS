import Order from "@/models/order";
import db from "@/utils/db";

const handler = async (req, res) => {
    await db.connect();
    const newOrder = new Order({
        ...req.body
    });
    const insertedOrder = await newOrder.save();
    res.status(201).send({ message: "Order has been inserted successfully.", order: insertedOrder });
}

export default handler;
