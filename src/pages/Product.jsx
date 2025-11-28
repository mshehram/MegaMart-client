import { Fragment, useEffect, useState } from "react";
import Banner from "../components/Banner/Banner";
import ShopList from "../components/ShopList";
import { useParams } from "react-router-dom";
import ProductDetails from "../components/ProductDetails/ProductDetails";
import ProductReviews from "../components/ProductReviews/ProductReviews";
import useWindowScrollToTop from "../hooks/useWindowScrollToTop";
import axios from "axios";
import { API_URL } from "../config/api"; // using config

const Product = () => {
  const { id } = useParams();
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);

  useWindowScrollToTop();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(`${API_URL}/products`);
        const products = res.data;

        const product = products.find((item) => String(item._id) === String(id));
        setSelectedProduct(product);

        if (product) {
          const related = products.filter(
            (item) => item.category === product.category && item._id !== product._id
          );
          setRelatedProducts(related);
        } else {
          setRelatedProducts([]);
        }
      } catch (err) {
        console.error("Error fetching products:", err);
        setSelectedProduct(null);
        setRelatedProducts([]);
      }
    };

    fetchProducts();
  }, [id]); // only re-run when id changes

  return (
    <Fragment>
      <Banner title={selectedProduct?.productName || "Product Details"} />

      <div className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <ProductDetails selectedProduct={selectedProduct} />

          <div className="mt-10">
            <ProductReviews selectedProduct={selectedProduct} />
          </div>
        </div>

        <section className="related-products bg-[#f9fafb] py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h3 className="text-2xl font-semibold mb-6 text-gray-800">
              You might also like
            </h3>
            <ShopList productItems={relatedProducts} />
          </div>
        </section>
      </div>
    </Fragment>
  );
};

export default Product;
