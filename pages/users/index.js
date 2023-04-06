import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';

const Users = () => {
    const router = useRouter();

    const handleNavigateRoute = () => {
        router.push(`/users/hamid/ahmadi/6`);
    }

    return (
        <div className="full-page">
            Users Page
            <br />
            <br />
            <ul className="unstyled-list">
                <li>
                    <Link href="/users/ehsan/aryan/7" className='no-link'>
                        Ehsan
                    </Link>
                </li>
                <li>
                    <span onClick={handleNavigateRoute}>
                        Hamid
                    </span>
                </li>
            </ul>
        </div>
    );
}

export default Users;
