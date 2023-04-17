import React, { useContext, useEffect, useState } from 'react';
import Layout from '@/components/Layout';
import productItems from "../../data/products.json";
import { useRouter } from 'next/router';
import Image from 'next/image';
import { CartContext } from '@/context/CartContext';
import { Alert } from '@/utils/Alert';

const Products = () => {
    const [product, setProduct] = useState(null);

    const { globalData, dispatch } = useContext(CartContext);

    const router = useRouter();
    const { slug } = router.query;

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

    useEffect(() => {
        const selectedProduct = productItems.find(p => p.slug === slug);
        setProduct(selectedProduct);
    }, []);

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
                <div role="status" className="flex justify-center items-center py-10">
                    <svg aria-hidden="true" className="w-12 h-12 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                    </svg>
                    <span className="sr-only">Loading...</span>
                </div>
            )}
        </Layout>
    );
}

export default Products;
