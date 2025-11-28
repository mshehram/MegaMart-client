import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { addToCart } from "../../app/features/cart/cartSlice";

const API_URL =
  import.meta.env.MODE === "development"
    ? "http://localhost:5000"
    : import.meta.env.VITE_API_URL.replace("/api", "");

const ProductCard = ({ title, productItem }) => {
  const dispatch = useDispatch();
  const router = useNavigate();

  const handleClick = () => {
    router(`/shop/${productItem._id}`);
  };

  const handleAdd = () => {
    dispatch(addToCart({ product: productItem, num: 1 }));
    toast.success("Product added to cart!");
  };

  return (
    <div className="relative bg-white p-5 rounded-lg shadow-[0_1px_3px_rgba(3,0,71,0.09)] m-2">
      {title === "Big Discount" && productItem.discount && (
        <span className="absolute top-0 left-0 bg-[#0f3460] text-white text-[12px] rounded-full px-3 py-[3px] m-2">
          {productItem.discount}% Off
        </span>
      )}

      <img
        loading="lazy"
        onClick={handleClick}
        src={`${API_URL}${productItem.imgUrl}`}
        alt={productItem.productName}
        className="w-full h-[200px] object-contain cursor-pointer"
      />

      <div className="mt-2">
        <h3
          onClick={handleClick}
          className="my-2 font-medium text-[17px] cursor-pointer"
        >
          {productItem.productName}
        </h3>

        <div className="flex mb-2">
          {Array(5)
            .fill()
            .map((_, i) => (
              <i
                key={i}
                className="fa fa-star text-[#ffcd4e] text-[15px] mr-[5px]"
              ></i>
            ))}
        </div>

        <div className="flex justify-between items-center text-black">
          <h4 className="my-[10px]">${productItem.price}</h4>

          <button
            aria-label="Add"
            type="button"
            onClick={handleAdd}
            className="flex justify-center items-center w-[35px] h-[35px] border border-[rgba(3,0,71,0.09)] rounded-full text-[#0f3460] text-[20px] hover:bg-[#0f3460] hover:text-white transition duration-500"
          >
            <ion-icon name="add"></ion-icon>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
