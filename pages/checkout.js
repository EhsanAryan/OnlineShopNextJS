import React, { useContext, useEffect } from 'react';
import Layout from '@/components/Layout';
import CheckoutWizard from '@/components/CheckoutWizard';
import { useForm } from 'react-hook-form';
import { CartContext } from '@/context/CartContext';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';

const Checkout = () => {
    const { register, handleSubmit, formState: { errors }, setValue } = useForm();

    const { globalData, dispatch } = useContext(CartContext);
    const { cart } = globalData;
    const { checkoutData } = cart;

    const router = useRouter();

    const submitHandler = ({ name, address, postalCode }) => {
        dispatch({
            type: "ADD_CHECKOUT_DATA",
            payload: {
                name,
                address,
                postalCode
            }
        });

        Cookies.set("cart", JSON.stringify({
            ...cart,
            checkoutData: {
                ...checkoutData,
                name,
                address,
                postalCode
            }
        }));

        router.push("/payment");
    }

    useEffect(() => {
        setValue("name", checkoutData.name);
        setValue("address", checkoutData.address);
        setValue("postalCode", checkoutData.postalCode);
    }, [checkoutData.name, checkoutData.address, checkoutData.postalCode]);

    return (
        <Layout title="Checkout">
            <CheckoutWizard activeStep={1} className="mb-10" />
            <form className="max-w-screen-md mx-auto" onSubmit={handleSubmit(submitHandler)}>
                <h2 className="mb-5 text-xl">Checkout</h2>
                <div className="mb-4">
                    <input type="text" className="w-full bg-white p-2 rounded-xl outline-0"
                        name="name" placeholder="Name" autoFocus
                        {...register("name", {
                            required: true,
                        })} />
                    {errors.name && (
                        <div className="text-red-500 mt-1">Please enter your name.</div>
                    )}
                </div>
                <div className="mb-4">
                    <input type="text" className="w-full bg-white p-2 rounded-xl outline-0"
                        name="address" placeholder="Address" autoFocus
                        {...register("address", {
                            required: true,
                        })} />
                    {errors.address && (
                        <div className="text-red-500 mt-1">Please enter your address.</div>
                    )}
                </div>
                <div className="mb-4">
                    <input type="text" className="w-full bg-white p-2 rounded-xl outline-0"
                        name="postalCode" placeholder="Postal Code" autoFocus
                        {...register("postalCode", {
                            required: true,
                        })} />
                    {errors.postalCode && (
                        <div className="text-red-500 mt-1">Please enter your postal code.</div>
                    )}
                </div>
                <div className="mt-5 mb-4">
                    <button type="submit" className="bg-gray-800 text-white px-6 py-2 rounded-xl">
                        Next
                    </button>
                </div>
            </form>
        </Layout>
    );
}

Checkout.auth = true;

export default Checkout;
