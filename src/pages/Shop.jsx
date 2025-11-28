import { Fragment, useState, useEffect } from "react";
import FilterSelect from "../components/FilterSelect";
import SearchBar from "../components/SeachBar/SearchBar";
import ShopList from "../components/ShopList";
import Banner from "../components/Banner/Banner";
import useWindowScrollToTop from "../hooks/useWindowScrollToTop";
import axios from "axios";
import { API_URL } from "../config/api"; // centralized API_URL

const Shop = ({ productsUpdated }) => {
  const [products, setProducts] = useState([]);
  const [filterList, setFilterList] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");

  useWindowScrollToTop();

  const fetchProducts = async () => {
    try {
      const res = await axios.get(`${API_URL}/products`);
      setProducts(res.data);
      setFilterList(res.data);
    } catch (err) {
      console.error("Error fetching products:", err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [productsUpdated]);

  const filtered = selectedCategory
    ? products.filter((item) => item.category === selectedCategory)
    : products;

  return (
    <Fragment>
      <Banner title="Products" />
      <section className="filter-bar bg-white py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-10">
            <div className="w-full md:w-1/3">
              <FilterSelect
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
                products={products}
              />
            </div>
            <div className="w-full md:w-2/3">
              <SearchBar setFilterList={setFilterList} products={products} />
            </div>
          </div>
          <ShopList productItems={filterList.length ? filterList : filtered} />
        </div>
      </section>
    </Fragment>
  );
};

export default Shop;
