import Layout from '@/components/Layout';
import Link from 'next/link';
import React from 'react';

const Dashboard = () => {
    return (
        <Layout title="Admin Dashboard">
            <h2 className="text-lg mb-6 font-bold">Admin Dashboard</h2>
            <div className="ps-2">
                <ul>
                    <li className="my-1">
                        <Link href="/admin/dashboard">
                            Dashboard
                        </Link>
                    </li>
                    <li className="my-1">
                        <Link href="/admin/orders">
                            Orders
                        </Link>
                    </li>
                    <li className="my-1">
                        <Link href="/admin/products">
                            Products
                        </Link>
                    </li>
                    <li className="my-1">
                        <Link href="/admin/Users">
                            users
                        </Link>
                    </li>
                </ul>
            </div>
        </Layout>
    );
}

Dashboard.auth = { adminOnly: true };

export default Dashboard;
