import { useRouter } from 'next/router';
import React from 'react';

const UserId = () => {
    const router = useRouter();

    return (
        <div className="full-page">
            {router.query.userData.map((ud, index) => (
                <span key={`user_${index}`}>
                    {ud}
                </span>
            ))}
        </div>
    );
}

export default UserId;
