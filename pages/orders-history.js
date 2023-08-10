import Layout from '@/components/Layout';
import React, { useEffect, useState } from 'react';

const OrdersHistory = () => {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await fetch("/api/orders/history");
                if (response.status === 200) {
                    const result = await response.json();
                    setOrders(result.orders);
                }
            } catch (error) {
                console.log(error);
                console.log("sadasd");
            }
        }

        fetchOrders();
    }, []);

    return (
        <Layout title="Orders History">
            <h2 className="text-lg mb-8">Orders History:</h2>
            {orders.length > 0 ? (
                orders.map((order, index) => (
                    <div className="mb-5">
                        <div>Order {index + 1}:</div>
                        <div key={order._id} className="flex flex-col px-2">
                            <div>
                                <span className="text-blue-800">Order ID: </span>
                                {order._id}
                            </div>
                            <div>
                                <span className="text-blue-800">Order Total Price: </span>
                                {order.totalPrice.toLocaleString()} toman
                            </div>
                        </div>
                    </div>
                ))
            ) : (
                <h3 className="text-lg text-red-500">No orders found!</h3>
            )}
        </Layout>
    );
}

export default OrdersHistory;
