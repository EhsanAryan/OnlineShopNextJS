import Link from 'next/link';
import React from 'react';
import fs from "fs/promises";
import path from "path";

const Product = (props) => {
    const { products } = props;

    return (
        <div className='full-page'>
            Products
            <ul className='unstyled-list p-0 my-5'>
                {products.map(p => (
                    <li key={p.id}>
                        <Link href={`/products/${p.id}`} className='no-link'>
                            {p.productTitle}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export const getStaticProps = async () => {
    const filePath = path.join(process.cwd(), "data", "data.json");
    const jsonData = await fs.readFile(filePath);
    const data = JSON.parse(jsonData);
    const products = data.products;
    return {
        props: {
            products
        }
    }
}

export default Product;
