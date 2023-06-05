import Layout from '@/components/Layout';
import { CartContext } from '@/context/CartContext';
import Image from 'next/image';
import React, { useContext } from 'react';
import { Alert, Confirm } from '@/utils/Alert';
import Link from 'next/link';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import { useSession } from 'next-auth/react';

const Cart = () => {
    const { globalData, dispatch } = useContext(CartContext);
    const { cartItems } = globalData.cart;

    const { data: session } = useSession();

    const router = useRouter();

    const handleRemoveItem = async (item) => {
        const result = await Confirm("Are you sure?", "do you want to delete this item from your cart?", "warning");
        if (result) {
            dispatch({
                type: "REMOVE_ITEM",
                payload: item
            });
        } else {
            Alert(null, "The operation was canceled");
        }
    }

    return (
        <Layout title="Cart">
            <h1 className="text-xl mb-5">Shopping Cart</h1>
            {cartItems.length === 0 ? (
                <h2 className='text-red-500 text-2xl'>Cart is empty.</h2>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-4 md:gap-10">
                    <div className="md:col-span-3">
                        <table className="w-full overflow-x-auto">
                            <thead className="text-center">
                                <tr className="border-b-2 border-black">
                                    <th className="text-left pl-1">Product</th>
                                    <th>Quantity</th>
                                    <th>Price</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody className="text-center">
                                {cartItems.map(item => (
                                    <tr key={item.slug} className="border-b-2 border-gray-500">
                                        <td className="pl-1 pt-2 pb-1">
                                            <Link href={`/product/${item.slug}`}
                                                className="flex items-center">
                                                <Image src={item.image} width={80} height={80}
                                                    alt={item.title} className="object-cover" />
                                                <span className="ml-2">{item.title}</span>
                                            </Link>
                                        </td>
                                        <td>
                                            {item.qty}
                                        </td>
                                        <td>
                                            {item.price.toLocaleString()}
                                        </td>
                                        <td>
                                            <i className="fa-solid fa-trash text-red-600 cursor-pointer
                                            hover:scale-125 transition-all"
                                                title="Remove product from cart"
                                                onClick={() => handleRemoveItem(item)}>
                                            </i>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className="flex flex-col items-center p-10">
                        <div className="text-xl mb-3">
                            Total Price:
                            <span className="ml-2 text-2blue-500 font-semibold">
                                {cartItems.reduce((acc, item) => {
                                    return acc + (Number(item.price) * Number(item.qty));
                                }, 0).toLocaleString()}
                            </span>
                        </div>
                        <div>
                            <button type="button" className="bg-gray-800 text-white rounded-2xl
                             px-5 py-2" onClick={() => router.push(session?.user ? "/checkout" : "/login")}>
                                Checkout
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </Layout>
    );
}

export default dynamic(() => Promise.resolve(Cart), { ssr: false });
