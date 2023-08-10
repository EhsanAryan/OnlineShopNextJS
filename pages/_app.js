import CartContextContainer from '@/context/CartContext';
import '@/styles/globals.css';
import '../styles/fontawesome.css';
import { SessionProvider, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import Layout from '@/components/Layout';
import { useEffect } from 'react';

export default function App({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <div className="bg-gray-300">
      <SessionProvider session={session}>
        <CartContextContainer>
          {Component.auth ? (
            <Auth adminOnly={Component.auth.adminOnly}>
              <Component {...pageProps} />
            </Auth>
          ) : (
            <Component {...pageProps} />
          )}
        </CartContextContainer>
      </SessionProvider>
    </div>
  )
}

const Auth = ({ children, adminOnly }) => {
  const router = useRouter();
  const { status, data: session } = useSession({
    required: true,
    onUnauthenticated() {
      router.push("/unauthenticated");
    }
  });

  useEffect(() => {
    if(session?.user) {
      if(adminOnly && !session.user.isAdmin) {
        router.push("/unauthenticated");
      }
    }
  }, [session])
  
  return status === "loading" ? (
    <Layout>
      <div className="text-2xl text-center my-4">Loading...</div>
    </Layout>
  ) : (
    children
  );
}
