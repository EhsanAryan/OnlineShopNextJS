import Layout from "../components/Layout";
import ProductItem from "@/components/ProductItem";
import db from "@/utils/db";
import Product from "@/models/product";
import { useContext } from "react";
import { CartContext } from "@/context/CartContext";
import { toast } from "react-toastify";
import { Alert } from "@/utils/Alert";

function Home({ products }) {
  const { globalData, dispatch } = useContext(CartContext);
  const { cart } = globalData;

  const handleAddToCart = (product) => {
    const existingItem = cart.cartItems.find(item => item.slug === product.slug);
    // qty is a new property for product objects to specify quantity of a product in the cart.
    const qty = existingItem ? existingItem.qty + 1 : 1;

    if (qty > product.count) {
      Alert("Product is out", "Try again if the product stock increases.");
      return;
    }

    dispatch({
      type: "ADD_ITEM",
      payload: {
        ...product,
        qty
      }
    });

    toast.success(`Product "${product.title}" has been added to the cart.`);
  }

  return (
    <Layout title="Home Page">
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-8">
        {products.map(pItem => (
          <ProductItem key={pItem.slug} item={pItem} handleAddToCart={handleAddToCart} />
        ))}
      </div>
    </Layout>
  )
}

export default Home;

export const getServerSideProps = async () => {
  await db.connect();

  const products = await Product.find().lean();

  return {
    props: {
      products: products.map(db.convertToObject)
    }
  }
}
