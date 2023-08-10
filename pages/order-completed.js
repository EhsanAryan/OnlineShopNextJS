import Layout from '@/components/Layout';
import Link from 'next/link';
import React from 'react';

const OrderCompleted = () => {
    return (
        <Layout title="Order Completed">
            <h2 className="text-lg mb-4">Thank you for your order.</h2>
            <Link href="/orders-history" className="bg-gray-700 text-white px-4 py-2 rounded-xl">
                View orders history
            </Link>
        </Layout>
    );
}

export default OrderCompleted;
