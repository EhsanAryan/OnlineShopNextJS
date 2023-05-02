import CartContextContainer from '@/context/CartContext';
import '@/styles/globals.css';
import '../styles/fontawesome.css';
import { SessionProvider } from 'next-auth/react';

export default function App({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <div className="bg-gray-300">
      <SessionProvider session={session}>
        <CartContextContainer>
          <Component {...pageProps} />
        </CartContextContainer>
      </SessionProvider>
    </div>
  )
}
