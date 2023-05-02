import React, { useContext, useEffect, useState } from 'react';
import Link from 'next/link';
import { CartContext } from '@/context/CartContext';
import { useSession, signOut } from 'next-auth/react';
import { Menu } from "@headlessui/react";
import Cookies from 'js-cookie';

const Header = () => {
    const { globalData, dispatch } = useContext(CartContext);
    const { cart } = globalData;

    const { status, data: session } = useSession();

    const [cartItemsCount, setCartItemsCount] = useState(0);

    useEffect(() => {
        const totalItems = cart.cartItems.reduce((acc, item) => acc + item.qty, 0);
        setCartItemsCount(totalItems);
    }, [cart.cartItems]);

    const handleSignOut = () => {
        Cookies.remove();

        signOut({
            callbackUrl: "/login"
        });
    }

    return (
        <header className="bg-white fixed left-0 top-0 w-full h-16 border-b-2 border-gray-400 z-10">
            <nav className="w-full h-full flex justify-between items-center px-3">
                <Link href="/" className="font-bold text-lg">
                    Shopping
                </Link>
                <div className='flex justify-center items-center'>
                    <span className="mx-2 flex">
                        <Link href="/cart" className="nav-items">
                            Cart
                            {cartItemsCount > 0 && (
                                <span className="bg-gray-300 ml-1 rounded-full px-2 py-1
                            text-xs font-bold">
                                    {cartItemsCount}
                                </span>
                            )}
                        </Link>
                    </span>
                    <span className="mx-2 flex">
                        {status === "loading" ? (
                            "Loading..."
                        ) : session?.user ? (
                            <Menu as="div" className="relative inline-block">
                                <Menu.Button className="text-blue-600 nav-items after:bg-transparent">
                                    {session.user.name}
                                </Menu.Button>
                                <Menu.Items className="absolute right-0 flex flex-col w-48 bg-white
                                 px-3 py-4 border-2 border-slate-200 rounded-lg origin-top-right">
                                    <Menu.Item className="flex py-1">
                                        <Link href="/profile">
                                            Profile
                                        </Link>
                                    </Menu.Item>
                                    <Menu.Item className="flex py-1 cursor-pointer">
                                        <span onClick={handleSignOut}>
                                            Logout
                                        </span>
                                    </Menu.Item>
                                </Menu.Items>
                            </Menu>
                        ) : (
                            <Link href="/login" className="nav-items">
                                Login
                            </Link>
                        )}
                    </span>
                </div>
            </nav>
        </header >
    );
}

export default Header;
