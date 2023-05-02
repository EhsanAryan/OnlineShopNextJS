import Layout from "../components/Layout";
import ProductItem from "@/components/ProductItem";
import db from "@/utils/db";
import Product from "@/models/product";

function Home({ products }) {
  return (
    <Layout title="Home Page">
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-8">
        {products.map(pItem => (
          <ProductItem key={pItem.slug} item={pItem} />
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
