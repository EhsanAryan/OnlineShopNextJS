import Link from 'next/link';
import React from 'react';

const linksInfo = [
    {
        text: "Dashboard",
        href: "/admin/dashboard",
        field: null
    },
    {
        text: "Orders",
        href: "/admin/orders",
        field: "ordersCount"
    },
    {
        text: "Products",
        href: "/admin/products",
        field: "productsCount"
    },
    {
        text: "users",
        href: "/admin/users",
        field: "usersCount"
    }
];

const Menu = ({ className }) => {
    return (
        <ul className={className || ""}>
        {linksInfo.map((item, index) => (
            <li
                key={`adminData_${index}`}
                className="bg-white rounded-lg
                shadow-md shadow-gray-600 my-4"
            >
                <Link href={item.href}
                    className="w-full block px-3 py-2 rounded-lg"
                >
                    {item.text}
                </Link>
            </li>
        ))}
    </ul>
    );
}

export default Menu;
