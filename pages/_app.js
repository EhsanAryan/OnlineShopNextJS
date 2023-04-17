import CartContextContainer from '@/context/CartContext';
import '@/styles/globals.css';
import '../styles/fontawesome.css';

export default function App({ Component, pageProps }) {
  return (
    <div className="bg-gray-300">
      <CartContextContainer>
        <Component {...pageProps} />
      </CartContextContainer>
    </div>
  )
}
