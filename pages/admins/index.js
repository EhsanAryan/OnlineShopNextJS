import fs from "fs/promises";
import Link from "next/link";
import path from "path";

import React from 'react';

const Admin = (props) => {
    const { admins } = props;

    return (
        <div className="full-page">
            <ul className="unstyled-list p-0 text-center">
                {admins.map(a => (
                    <li key={`admin_${a.id}`}>
                        <Link href={`/admins/${a.id}`} className="no-link">
                            {a.username}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Admin;

export const getStaticProps = async () => {
    const filePath = path.join(process.cwd(), "data", "data.json");
    const jsonData = await fs.readFile(filePath);
    const data = JSON.parse(jsonData);
    const admins = data.admins;
    return {
        props: {
            admins
        }
    }
}
