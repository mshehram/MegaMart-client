import { useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { addToCart } from "../../app/features/cart/cartSlice";

const API_BASE =
  import.meta.env.MODE === "development"
    ? "http://localhost:5000"
    : import.meta.env.VITE_API_URL.replace("/api", "");

const ProductDetails = ({ selectedProduct }) => {
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(1);

  const handleQuantityChange = (e) => {
    const value = Number(e.target.value);
    if (value >= 1) setQuantity(value);
  };

  const handleAdd = () => {
    if (!selectedProduct) return;
    dispatch(addToCart({ product: selectedProduct, num: quantity }));
    toast.success("Product has been added to cart!");
  };

  const imageUrl = selectedProduct?.imgUrl
    ? `${API_BASE}${selectedProduct.imgUrl}`
    : "/placeholder.png";

  return (
    <section className="w-full py-10">
      <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center md:gap-12">

        <div className="w-full md:w-1/2">
          <img
            loading="lazy"
            src={imageUrl}
            alt={selectedProduct?.productName || "Product Image"}
            className="w-full h-full object-contain"
          />
        </div>

        <div className="w-full md:w-1/2 mt-8 md:mt-0">
          <h2 className="text-3xl font-semibold mb-3">
            {selectedProduct?.productName}
          </h2>

          <div className="flex items-center gap-10 my-4">
            <div className="flex">
              <i className="fa fa-star text-[#ffcd4e] text-sm mr-1"></i>
              <i className="fa fa-star text-[#ffcd4e] text-sm mr-1"></i>
              <i className="fa fa-star text-[#ffcd4e] text-sm mr-1"></i>
              <i className="fa fa-star text-[#ffcd4e] text-sm mr-1"></i>
              <i className="fa fa-star text-[#ffcd4e] text-sm mr-1"></i>
            </div>
            <span className="text-gray-600">{selectedProduct?.avgRating} ratings</span>
          </div>

          <div className="flex gap-10 items-center text-lg font-medium mb-4">
            <span className="text-2xl font-bold">${selectedProduct?.price}</span>
            <span className="capitalize text-gray-700">
              Category: {selectedProduct?.category}
            </span>
          </div>

          <p className="text-[15px] text-gray-700 mb-6 leading-relaxed">
            {selectedProduct?.description || selectedProduct?.shortDesc}
          </p>

          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <input
              type="number"
              value={quantity}
              min="1"
              onChange={handleQuantityChange}
              className="w-[80px] h-[40px] border border-gray-700 rounded-md p-2 text-black"
            />

            <button
              type="button"
              onClick={handleAdd}
              className="h-[45px] px-6 bg-[#0f3460] text-white text-lg rounded-md"
            >
              Add To Cart
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};

export default ProductDetails;
