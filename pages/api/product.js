import fs from "fs";
import path from "path";

const productHandler = (req, res) => {
    if (req.method === "POST") {
        const title = req.body.title;
        const price = req.body.price;
        const newProduct = { title, price };

        const filePath = path.join(process.cwd(), "data", "products.json");
        const jsonProducts = fs.readFileSync(filePath);
        const allProducts = JSON.parse(jsonProducts);
        allProducts.push(newProduct);
        fs.writeFileSync(filePath, JSON.stringify(allProducts));

        res.status(201).json({
            message: "New Product has been added."
        });
    } else if(req.method === "GET") {
        const filePath = path.join(process.cwd(), "data", "products.json");
        const jsonProducts = fs.readFileSync(filePath);
        const allProducts = JSON.parse(jsonProducts);

        res.json({
            products: allProducts
        });
    }
}

export default productHandler;