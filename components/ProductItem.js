import Link from 'next/link';
import React from 'react';
import Image from 'next/image';

const ProductItem = ({ item, handleAddToCart }) => {
    return (
        <div className="bg-white rounded-xl mb-4 overflow-hidden shadow-lg shadow-gray-500">
            <Link href={`product/${item.slug}`}>
                <div className="w-full h-52 relative">
                    <Image
                        src={item.image}
                        fill
                        className="object-cover rounded-t-xl"
                        alt={item.title}
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
                        onClick={() => handleAddToCart(item)}>
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

export default ProductItem;
