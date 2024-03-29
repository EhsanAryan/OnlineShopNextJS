import Layout from '@/components/Layout';
import Menu from '@/components/admin/Menu';
import { Alert } from '@/utils/Alert';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

const Dashboard = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [adminData, setAdminData] = useState(null);
    const router = useRouter();

    const handleGetAdminData = async () => {
        setIsLoading(true);
        try {
            const response = await fetch("/api/admin/summary");
            if (response.status === 200) {
                const data = await response.json();
                setAdminData(data);
            }
        } catch (error) {
            await Alert("خطا!", "در دریافت داده‌ها مشکلی رخ داده است!", "error");
            return router.push("/");
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        handleGetAdminData();
    }, []);


    const cartsInfo = [
        {
            text: "Orders",
            field: "ordersCount"
        },
        {
            text: "Products",
            field: "productsCount"
        },
        {
            text: "users",
            field: "usersCount"
        }
    ];

    return (
        <Layout title="Admin Dashboard">
            <h2 className="text-lg mb-3 font-bold">Admin Dashboard</h2>
            {isLoading ? (
                <div className="text-center py-10">
                    <div className="text-blue-700 mt-1 text-2xl wink">Loading...</div>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-4">
                    <div className="ps-4">
                        <Menu className="w-2/3" />
                    </div>
                    <div className="text-center md:col-span-3 mt-10 md:mt-0">
                        <h4 className="text-lg mb-4">Statistics:</h4>
                        <div className="flex justify-center">
                            {cartsInfo.map((item, index) => (
                                <div
                                    key={`adminData_${index}`}
                                    className="w-28 h-28 bg-white rounded-lg
                                shadow-md shadow-gray-600 mx-3 text-lg font-semibold
                                flex flex-col justify-center items-center"
                                >
                                    <span className="mb-1">
                                        {adminData[item.field]}
                                    </span>
                                    <span>{item.text}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}

        </Layout>
    );
}

Dashboard.auth = { adminOnly: true };

export default Dashboard;
