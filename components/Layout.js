import Head from 'next/head';
import React from 'react';
import Header from './Layout/Header';
import Main from './Layout/Main';
import Footer from './Layout/Footer';

const Layout = ({ title, children }) => {
    return (
        <>
            <Head>
                <meta charSet="UTF-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <title>{`Shopping | ${title || "Page"}`}</title>
            </Head>
            <div className="w-full h-screen">
               <Header />
                <Main>
                    {children}
                </Main>
                <Footer />
            </div>
        </>
    );
}

export default Layout;
