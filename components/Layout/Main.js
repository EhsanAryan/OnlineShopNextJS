import React from 'react';

const Main = ({ children }) => {
    return (
        <main className="main-container fixed left-0 top-16 w-full overflow-auto">
            <div className="container mx-auto py-6 px-3 sm:px-0">
                {children}
            </div>
        </main>
    );
}

export default Main;
