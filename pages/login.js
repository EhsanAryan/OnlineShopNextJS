import Layout from '@/components/Layout';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { signIn, useSession } from "next-auth/react";
import { useRouter } from 'next/router';
import { Alert } from '@/utils/Alert';

const Login = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { data: session } = useSession();
    const router = useRouter();

    useEffect(() => {
        if(session?.user) {
            router.push("/");
        }
    }, [session, router]);

    const submitFormHandler = async ({ email, password }) => {
        try {
            const result = await signIn("credentials", {
                redirect: false,
                email,
                password
            });
            if(result.error) {
                Alert("خطا!", "ایمیل یا رمز عبور نامعتبر می‌باشد.", "error");
            }
        } catch (error) {
            console.log(typeof error === "string" ? error : error.message);
        }
    }

    return (
        <Layout>
            <form className="max-w-screen-md mx-auto" onSubmit={handleSubmit(submitFormHandler)}>
                <h2 className="text-xl mb-4">Login</h2>
                <div className="mb-4">
                    <div className="relative h-12">
                        <input type="email" name="email" placeholder="Email"
                            className="iconed-input w-full h-full bg-white px-9 rounded-xl outline-0" autoFocus
                            {...register("email", {
                                required: true,
                            })} />
                        <i className="fa-solid fa-user absolute left-2 top-4 text-lg"></i>
                    </div>
                    {errors.email && (
                        <div className="text-red-500 mt-1">Please enter your email.</div>
                    )}
                </div>
                <div className="mb-4">
                    <div className="relative h-12">
                        <input type="password" name="password" placeholder="Password"
                            className="iconed-input w-full h-full bg-white px-9 rounded-xl outline-0" autoFocus
                            {...register("password", {
                                required: true,
                                minLength: {
                                    value: 5,
                                    message: "Password must contain at least 5 characters."
                                }
                            })}
                        />
                        <i className="fa-solid fa-fingerprint absolute left-2 top-4 text-lg"></i>
                    </div>
                    {errors.password && (
                        <div className="text-red-500 mt-1">
                            {errors.password.type === "required" ?
                            "Please enter your password." :
                            errors.password.message}
                        </div>
                    )}
                </div>
                <div className="mt-5 mb-4">
                    <button type="submit" className="bg-gray-800 text-white px-6 py-2 rounded-xl">
                        Login
                    </button>
                </div>
            </form>
        </Layout>
    );
}

export default Login;
