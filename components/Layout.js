import Head from 'next/head';
import React from 'react';
import Header from './Layout/Header';
import Main from './Layout/Main';
import Footer from './Layout/Footer';
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

const Layout = ({ title, children }) => {
    return (
        <>
            <Head>
                <meta charSet="UTF-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <title>{`Shopping | ${title || "Page"}`}</title>
            </Head>
            <ToastContainer position="top-right" limit={5} autoClose={1500} />
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
