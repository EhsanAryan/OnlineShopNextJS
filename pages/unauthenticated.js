import Layout from '@/components/Layout';
import React from 'react';

const Unauthenticated = () => {
    return (
        <Layout title="Access Denied">
            <div className="text-3xl text-center my-5 text-red-600">Access Denied</div>
        </Layout>
    );
}

export default Unauthenticated;
