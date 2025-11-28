import { Fragment, useState, useEffect } from "react";
import Wrapper from "../components/wrapper/Wrapper";
import Section from "../components/Section";
import SliderHome from "../components/Slider";
import useWindowScrollToTop from "../hooks/useWindowScrollToTop";

const API_URL =
  import.meta.env.MODE === "development"
    ? "http://localhost:5000/api/products"
    : `${import.meta.env.VITE_API_URL}/products`;

const Home = ({ productsUpdated }) => {
  useWindowScrollToTop();

  const [bigDiscountProducts, setBigDiscountProducts] = useState([]);
  const [newArrivalProducts, setNewArrivalProducts] = useState([]);
  const [bestSalesProducts, setBestSalesProducts] = useState([]);

  const fetchProducts = async () => {
    try {
      const res = await fetch(API_URL);
      const data = await res.json();

      setBigDiscountProducts(data.filter((p) => p.section?.includes("big discount")));
      setNewArrivalProducts(data.filter((p) => p.section?.includes("new arrivals")));
      setBestSalesProducts(data.filter((p) => p.section?.includes("best sales")));
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [productsUpdated]);

  return (
    <Fragment>
      <div className="bg-white w-full min-h-screen overflow-x-hidden">
        <div className="w-full">
          <SliderHome />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <Wrapper />
        </div>

        <Section title="Big Discount" bgColor="#f6f9fc" productItems={bigDiscountProducts} />
        <Section title="New Arrivals" bgColor="white" productItems={newArrivalProducts} />
        <Section title="Best Sales" bgColor="#f6f9fc" productItems={bestSalesProducts} />
      </div>
    </Fragment>
  );
};

export default Home;
