import fs from "fs";
import path from "path";

const handler = (req, res) => {
    const pId = req.query.productId;

    const filePath = path.join(process.cwd(), "data", "products.json");
    const jsonData = fs.readFileSync(filePath);
    const allProducts = JSON.parse(jsonData);
    const product = allProducts.find(p => p.id === pId);

    res.json({
        product
    });
}

export default handler;