import Layout from '@/components/Layout';
import Menu from '@/components/admin/Menu';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

const Products = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [products, setProducts] = useState([]);
    const router = useRouter();

    const handleGetProducts = async () => {
        setIsLoading(true);
        try {
            const response = await fetch("/api/admin/products");
            if (response.status === 200) {
                const data = await response.json();
                setProducts(data);
            }
        } catch (error) {
            await Alert("خطا!", "در دریافت داده‌ها مشکلی رخ داده است!", "error");
            return router.push("/");
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        handleGetProducts();
    }, []);

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
                        <h4 className="text-lg mb-4">Products:</h4>
                        <div className="flex flex-col items-center px-2 md:px-0">
                            <div
                                className="flex px-2 py-3 w-full md:w-2/3"
                            >
                                <div className="flex-1">Title</div>
                                <div className="flex-1">Price</div>
                                <div className="flex-1">Count</div>
                            </div>
                            {products.map((item, index) => (
                                <div
                                    key={`product_${index}`}
                                    className="flex bg-white rounded-lg w-full md:w-2/3
                                    shadow-md shadow-gray-600 px-2 py-3 my-2"
                                >
                                    <div className="flex-1">{item.title}</div>
                                    <div className="flex-1">{item.price}</div>
                                    <div className="flex-1">{item.count}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}

        </Layout>
    );
}

Products.auth = { adminOnly: true };


export default Products;
