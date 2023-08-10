import CheckoutWizard from '@/components/CheckoutWizard';
import Layout from '@/components/Layout';
import React, { useState, useContext, useEffect } from 'react';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import { CartContext } from '@/context/CartContext';
import Cookies from 'js-cookie';

const paymentMethods = [
    "Gateway",
    "Offline"
]

const Payment = () => {
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("");

    const router = useRouter();

    const { globalData, dispatch } = useContext(CartContext);
    const { cart } = globalData;

    const submitHandler = (event) => {
        event.preventDefault();
        if (!selectedPaymentMethod) {
            toast.error("Select a payment method!");
            return;
        }
        dispatch({
            type: "ADD_PAYMENT_METHOD",
            payload: selectedPaymentMethod
        });

        Cookies.set("cart", JSON.stringify({
            ...cart,
            paymentMethod: selectedPaymentMethod
        }));

        router.push("/placeorder");
    }

    useEffect(() => {
        setSelectedPaymentMethod(cart.paymentMethod || "");
    }, []);

    return (
        <Layout title="Payment">
            <CheckoutWizard activeStep={2} className="mb-10" />
            <form className="max-w-screen-md mx-auto" onSubmit={submitHandler}>
                <h2 className="text-lg mb-3">Payment Method:</h2>
                {paymentMethods.map((method, index) => (
                    <div className="mb-2" key={`${method}_${index}`}>
                        <input type="radio" name="paymentMethod" id={method}
                            checked={selectedPaymentMethod === method}
                            onChange={() => setSelectedPaymentMethod(method)}
                        />
                        <label className="mx-2" htmlFor={method} >
                            {method}
                        </label>
                    </div>
                ))}
                <div className="mt-7 flex justify-evenly">
                    <button type="button"
                        className="bg-white text-black px-6 py-2 rounded-xl"
                        onClick={() => router.push("/checkout")}
                    >
                        Back
                    </button>
                    <button type="submit" className="bg-gray-700 text-white px-7 py-2 rounded-xl">
                        Next
                    </button>
                </div>
            </form>
        </Layout>
    );
}

Payment.auth = true;

export default Payment;
