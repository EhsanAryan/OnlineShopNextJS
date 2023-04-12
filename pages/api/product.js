import fs from "fs";
import path from "path";
import { MongoClient } from "mongodb";

const productHandler = async (req, res) => {
    if (req.method === "POST") {
        const title = req.body.title;
        const price = req.body.price;

        const client = await MongoClient.connect("mongodb://127.0.0.1:27017/shop");
        const db = client.db();
        const collection = db.collection("products");
        await collection.insertOne({
            title,
            price
        });

        await client.close();

        res.status(201).json({
            message: "New Product has been added."
        });
    } else if (req.method === "GET") {
        const filePath = path.join(process.cwd(), "data", "products.json");
        const jsonProducts = fs.readFileSync(filePath);
        const allProducts = JSON.parse(jsonProducts);

        res.json({
            products: allProducts
        });
    }
}

export default productHandler;