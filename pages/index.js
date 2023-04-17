import Layout from "../components/Layout";
import Product from "@/components/Product";
import productItems from "../data/products.json";

function Home() {
  return (
    <Layout title="Home Page">
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-8">
        {productItems.map(pItem => (
          <Product key={pItem.slug} item={pItem} />
        ))}
      </div>
    </Layout>
  )
}

export default Home;
