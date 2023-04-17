import Link from 'next/link';
import React, { useContext } from 'react';
import productItems from "../data/products.json";
import { CartContext } from '@/context/CartContext';
import Image from 'next/image';
import { Alert } from '@/utils/Alert';
import { useRouter } from 'next/router';

const Product = ({ item }) => {
    const { globalData, dispatch } = useContext(CartContext);
    
    const router = useRouter();

    const handleAddToCart = (slug) => {
        const product = productItems.find(p => p.slug === slug);
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
        <div className="bg-white rounded-xl mb-4 overflow-hidden shadow-lg shadow-gray-500">
            <Link href={`product/${item.slug}`}>
                <div className="w-full h-52 relative">
                    <Image
                        src={item.image}
                        fill
                        className="object-cover rounded-t-xl"
                    />
                </div>
            </Link>
            <div className="flex flex-col justify-center items-center pt-4 pb-3">
                <Link href={`product/${item.slug}`}>
                    <h2 className="text-lg">{item.title}</h2>
                </Link>
                <span className="text-gray-700 mb-5">{item.price.toLocaleString()} Toman</span>
                {item.count > 0 ? (
                    <button className="bg-gray-800 text-white rounded-2xl px-8 py-2 mb-1"
                        onClick={() => handleAddToCart(item.slug)}>
                        Add to cart
                    </button>
                ) : (
                    <div className="text-xl text-red-500">
                        Unavailable
                    </div>
                )}
            </div>
        </div>
    );
}

export default Product;
