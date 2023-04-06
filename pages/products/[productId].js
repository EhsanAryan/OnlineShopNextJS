import React from 'react';
import fs from "fs/promises";
import path from "path";

const ProductId = (props) => {
    const { product } = props;

    return (
        <div className='full-page'>
            <span>
                Product Title:&nbsp;
                <span className="text-primary">
                    {product?.productTitle}
                </span>
            </span>
            <span>
                Price:&nbsp;
                <sapn className="text-primary">
                    {product?.price}
                </sapn>
            </span>
        </div>
    );
}

export default ProductId;

const getFileData = async () => {
    const filePath = path.join(process.cwd(), "data", "data.json");
    const jsonData = await fs.readFile(filePath);
    const data = JSON.parse(jsonData);
    return data;
}

export const getStaticProps = async (context) => {
    const { productId } = context.params;
    const data = await getFileData();
    const currentProduct = data.products.find(p => p.id === productId);
    return {
        props: {
            product: currentProduct
        }
    }
}

export const getStaticPaths = async () => {
    const data = await getFileData();
    const allPaths = data.products.map(p => {
        return {
            params: {
                productId: p.id
            }
        };
    })

    return {
        paths: allPaths,
        fallback: true
    };
}
