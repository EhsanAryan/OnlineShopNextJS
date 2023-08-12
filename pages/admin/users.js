import Layout from '@/components/Layout';
import Menu from '@/components/admin/Menu';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

const Users = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [users, setUsers] = useState([]);
    const [shownUsers, setShownUsers] = useState([]);
    const [isAdminMode, setIsAdminMode] = useState(false);
    const router = useRouter();

    const handleGetUsers = async () => {
        setIsLoading(true);
        try {
            const response = await fetch("/api/admin/users");
            if (response.status === 200) {
                const data = await response.json();
                setUsers(data);
                setShownUsers(data.filter(d => !d.isAdmin));
            }
        } catch (error) {
            await Alert("خطا!", "در دریافت داده‌ها مشکلی رخ داده است!", "error");
            return router.push("/");
        } finally {
            setIsLoading(false);
        }
    }
    console.log(users);

    useEffect(() => {
        handleGetUsers();
    }, []);

    useEffect(() => {
        let allowedUsers;
        if(isAdminMode) {
            allowedUsers = users.filter(u => u.isAdmin);
        } else {
            allowedUsers = users.filter(u => !u.isAdmin);
        }
        setShownUsers(allowedUsers);
    }, [isAdminMode]);

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
                        <h4 className="text-lg mb-4">Users:</h4>
                        <div className="w-full md:w-2/3 text-start mx-auto mb-3">
                            <button 
                            className="bg-gray-700 text-white rounded-lg px-3 py-2"
                            type="button"
                            onClick={() => setIsAdminMode(prevValue => !prevValue)}
                            >
                                {isAdminMode ? "Show Customers" : "Show Admins"}
                            </button>
                        </div>
                        <div className="flex flex-col items-center px-2 md:px-0">
                            <div
                                className="flex px-2 py-3 w-full md:w-2/3"
                            >
                                <div className="flex-1">Name</div>
                                <div className="flex-1">Email</div>
                            </div>
                            {shownUsers.map((item, index) => (
                                <div
                                    key={`user_${index}`}
                                    className="flex bg-white rounded-lg w-full md:w-2/3
                                    shadow-md shadow-gray-600 px-2 py-3 my-2"
                                >
                                    <div className="flex-1">{item.name}</div>
                                    <div className="flex-1">{item.email}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}

        </Layout>
    );
}

Users.auth = { adminOnly: true };


export default Users;
