import React from 'react';
import fs from "fs/promises";
import path from "path";

const AdminId = (props) => {
    const { currentAdmin } = props;

    return (
        <div className="full-page">
            <span>
                Username:&nbsp;
                <span className="text-primary">{currentAdmin.username}</span>
            </span>
            <span>
                Email:&nbsp;
                <span className="text-primary">{currentAdmin.email}</span>
            </span>
        </div>
    );
}

export default AdminId;

export const getServerSideProps = async (context) => {
    const { adminId } = context.params;
    const filePath = path.join(process.cwd(), "data", "data.json");
    const jsonData = await fs.readFile(filePath);
    const data = JSON.parse(jsonData);
    const currentAdmin = data.admins.find(a => a.id == adminId);

    return {
        props: {
            currentAdmin
        }
    }
}
