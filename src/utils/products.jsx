import { useEffect, useState } from "react";
import phone08 from "../Images/phone-08.png";
import sofaSlide from "../Images/hero-img.png";
import wireless01 from "../Images/wireless-01.png";
import watchSlide from "../Images/watch-07.png";

export const useProducts = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/products")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.log("Error loading products:", err));
  }, []);

  const shopProducts = products.filter((item) => item.section === "shop");
  const discountProducts = products.filter((item) => item.section === "big discount");
  const newArrivals = products.filter((item) => item.section === "new arrivals");
  const bestSales = products.filter((item) => item.section === "best sales");

  return { products, shopProducts, discountProducts, newArrivals, bestSales };
};

export const serviceData = [
  { icon: <ion-icon name="car"></ion-icon>, title: "Free Shipping", subtitle: "Lorem ipsum dolor sit amet.", bg: "#fdefe6" },
  { icon: <ion-icon name="card"></ion-icon>, title: "Safe Payment", subtitle: "Lorem ipsum dolor sit amet.", bg: "#ceebe9" },
  { icon: <ion-icon name="shield-half-outline"></ion-icon>, title: "Secure Payment", subtitle: "Lorem ipsum dolor sit amet.", bg: "#e2f2b2" },
  { icon: <ion-icon name="headset"></ion-icon>, title: "Back Guarantee", subtitle: "Lorem ipsum dolor sit amet.", bg: "#d6e5fb" }
];

export const SliderData = [
  { id: 1, title: "50% Off For Your First Shopping", desc: "Lorem ipsum dolor sit amet.", cover: sofaSlide },
  { id: 2, title: "50% Off For Your First Shopping", desc: "Lorem ipsum dolor sit amet.", cover: phone08 },
  { id: 3, title: "50% Off For Your First Shopping", desc: "Lorem ipsum dolor sit amet.", cover: wireless01 },
  { id: 4, title: "50% Off For Your First Shopping", desc: "Lorem ipsum dolor sit amet.", cover: watchSlide }
];
