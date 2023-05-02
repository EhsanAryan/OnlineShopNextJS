import React, { useContext, useEffect, useState } from 'react';
import Layout from '@/components/Layout';
import productItems from "../../data/products.js";
import { useRouter } from 'next/router';
import Image from 'next/image';
import { CartContext } from '@/context/CartContext';
import { Alert } from '@/utils/Alert';
import db from '@/utils/db.js';
import Product from '@/models/product.js';
import Loading from '@/components/Loading.js';

const Products = ({ product }) => {

    const { globalData, dispatch } = useContext(CartContext);

    const router = useRouter();

    const handleAddToCart = () => {
        const existingItem = globalData.cart.cartItems.find(item => item.slug === product.slug);
        // qty is a new property for product objects to specify quantity of a product in the cart.
        const qty = existingItem ? existingItem.qty + 1 : 1;

        if (qty > product.count) {
            Alert("Product is out", "Try again if the product stock increases.");
            return;
        }

        dispatch({
            type: "ADD_ITEM",
            payload: {
                ...product,
                qty
            }
        });
        router.push("/cart");
    }

    return (
        <Layout title={product?.title}>
            {product ? (
                <div className="rounded-xl bg-white md:h-96 grid grid-cols-1 md:grid-cols-2
                shadow-lg shadow-gray-400">
                    <div className="relative h-60 md:h-auto">
                        <Image
                            src={product.image}
                            fill
                            className="object-cover rounded-t-xl md:rounded-l-xl md:rounded-tr-none"
                            alt={product.title}
                        />
                    </div>
                    <div className="flex flex-col justify-around items-center text-center text-lg
                    h-64 md:h-auto md:py-5">
                        <div>
                            <div className="text-2xl mb-1">
                                {product.title}
                            </div>
                            <div className="text-gray-700">
                                {product.price.toLocaleString()} toman
                            </div>
                        </div>
                        <div>
                            <div className="mb-3">
                                {product.description}
                            </div>
                            {product.count > 0 ? (
                                <button className="bg-gray-800 text-white rounded-2xl px-6 py-2 mb-1"
                                    onClick={handleAddToCart}>
                                    Add to cart
                                </button>
                            ) : (
                                <div className="text-2xl text-red-500">
                                    Unavailable
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            ) : (
                <div className="flex justify-center items-center text-red-500 text-2xl py-10">
                    No product found!
                </div>
            )}
        </Layout>
    );
}

export default Products;

export const getServerSideProps = async (context) => {
    const { slug } = context.params;

    await db.connect();

    const product = await Product.findOne({
        slug
    }).lean();

    return {
        props: {
            product: product ? db.convertToObject(product) : null
        }
    }
}