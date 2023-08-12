import User from "@/models/user";
import db from "@/utils/db";
import users from "../../data/users.js";

const handler = async (req, res) => {
    await db.connect();

    await User.deleteMany();
    await User.insertMany(users);

    res.send({ message: "Users added successfully." })
}

export default handler;