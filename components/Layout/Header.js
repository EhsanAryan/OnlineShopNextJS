import React, { useContext, useEffect, useState } from 'react';
import Link from 'next/link';
import { CartContext } from '@/context/CartContext';

const Header = () => {
    const { globalData, dispatch } = useContext(CartContext);
    const { cart } = globalData;

    const [cartItemsCount, setCartItemsCount] = useState(0);

    useEffect(() => {
        const totalItems = cart.cartItems.reduce((acc, item) => acc + item.qty, 0);
        setCartItemsCount(totalItems);
    }, [cart.cartItems]);

    return (
        <header className="bg-white fixed left-0 top-0 w-full h-16 border-b-2 border-gray-400">
            <nav className="w-full h-full flex justify-between items-center px-3">
                <Link href="/" className="font-bold text-lg">
                    Shopping
                </Link>
                <div className='flex justify-center items-center'>
                    <Link href="/cart" className="mx-2 nav-items">
                        Cart
                        {cartItemsCount > 0 && (
                            <span className="bg-gray-300 ml-1 rounded-full px-2 py-1
                        text-xs font-bold">
                                {cartItemsCount}
                            </span>
                        )}
                    </Link>
                    <Link href="/login" className="mx-2 nav-items">
                        Login
                    </Link>
                </div>
            </nav>
        </header>
    );
}

export default Header;
