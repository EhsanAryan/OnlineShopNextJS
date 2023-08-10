import CheckoutWizard from '@/components/CheckoutWizard';
import Layout from '@/components/Layout';
import { CartContext } from '@/context/CartContext';
import { Alert } from '@/utils/Alert';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useContext, useEffect, useState } from 'react';

const Placeorder = () => {
    const [cartInfo, setCartInfo] = useState(null);

    const { globalData, dispatch } = useContext(CartContext);
    const { cart } = globalData;

    const router = useRouter();

    const { data: session } = useSession();

    const placeOrderHandler = async () => {
        const totalPrice = cart.cartItems.reduce((acc, item) => {
            return acc + (item.price * item.qty)
        }, 0);

        const response = await fetch("/api/orders", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                user: session.user._id,
                orderItems: cart.cartItems.map(item => {
                    return {
                        title: item.title,
                        price: item.price,
                        quantity: item.qty,
                    };
                }),
                checkoutData: cart.checkoutData,
                paymentMethod: cart.paymentMethod,
                totalPrice
            })
        });

        if(response.status === 201) {
            const result = await response.json();
            console.log(result);
            await Alert("Ordered Successfully.", 
            `Hey ${result.order.checkoutData.name}! Your order has been inserted.`, 
            "success");
            router.push("/order-completed");
        }
    }

    useEffect(() => {
        setCartInfo(cart);
    }, []);

    return (
        <Layout title="Place Order">
            <CheckoutWizard activeStep={3} className="mb-8" />
            <div className="grid grid-cols-1 md:grid-cols-4">
                <div className="px-6 md:col-span-3">
                    <h2 className="text-lg mb-6">Place Order</h2>
                    <div className="mb-8">
                        <h2 className="text-lg">Checkout Data:</h2>
                        <div className="flex flex-col ps-2">
                            <span>
                                <span className="text-blue-700">name: </span>
                                {cartInfo?.checkoutData?.name}
                            </span>
                            <span>
                                <span className="text-blue-700">address: </span>
                                {cartInfo?.checkoutData?.address}
                            </span>
                            <span>
                                <span className="text-blue-700">postalCode: </span>
                                {cartInfo?.checkoutData?.postalCode}
                            </span>
                            <button type="button"
                                className="mt-2 me-auto bg-gray-600 text-white px-4 py-1 rounded-xl"
                                onClick={() => router.push("/checkout")}>
                                Edit
                            </button>
                        </div>
                    </div>
                    <div className="mb-8">
                        <h2 className="text-lg">Payment Method:</h2>
                        <div className="flex flex-col ps-2">
                            <span>{cartInfo?.paymentMethod}</span>
                            <button type="button"
                                className="mt-2 me-auto bg-gray-600 text-white px-4 py-1 rounded-xl"
                                onClick={() => router.push("/payment")}>
                                Edit
                            </button>
                        </div>
                    </div>
                    {cartInfo && (
                        <div className="overflow-x-auto">
                            <h2 className="text-lg"></h2>
                            <table className="w-full text-center">
                                <thead>
                                    <tr className="border-b-2 border-black">
                                        <th className="text-left pl-1">Item</th>
                                        <th>Quantity</th>
                                        <th>Price</th>
                                        <th>Subtotal</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {cartInfo.cartItems.map(item => (
                                        <tr key={item._id} className="border-b-2 border-gray-500">
                                            <td className="pl-1 pt-2 pb-1">
                                                <div className="flex items-center">
                                                    <Image src={item.image} width={80} height={80}
                                                        alt={item.title} className="object-cover" />
                                                    <span className="ml-2">{item.title}</span>
                                                </div>
                                            </td>
                                            <td>{item.qty}</td>
                                            <td>{item.price.toLocaleString()}</td>
                                            <td>{(item.price * item.qty).toLocaleString()}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            <button type="button"
                                className="mt-3 bg-gray-600 text-white px-4 py-1 rounded-xl"
                                onClick={() => router.push("/cart")}>
                                Edit
                            </button>
                        </div>
                    )}
                </div>
                <div className="text-center">
                    <h2 className="text-lg mb-3">Order Summary:</h2>
                    <ul>
                        <li className="font-semibold">
                            <span>Total Price: </span>
                            <span>
                                {cartInfo?.cartItems.reduce((acc, item) => {
                                    return acc + (item.price * item.qty)
                                }, 0).toLocaleString()}
                            </span>
                        </li>
                        <li className="mt-2">
                            <button type="button"
                                className="bg-gray-800 text-white px-4 py-2 rounded-xl"
                                onClick={placeOrderHandler}
                            >
                                Place Order
                            </button>
                        </li>
                    </ul>
                </div>
            </div>

        </Layout>
    );
}

export default Placeorder;
