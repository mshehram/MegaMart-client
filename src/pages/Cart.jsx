import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  decreaseQty,
  deleteProduct,
} from "../app/features/cart/cartSlice";

const API_BASE =
  import.meta.env.MODE === "development"
    ? "http://localhost:5000"
    : import.meta.env.VITE_API_URL.replace("/api", "");

const Cart = () => {
  const { cartList } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const totalPrice = cartList.reduce(
    (price, item) => price + item.qty * item.price,
    0
  );

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <section className="py-10 bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-8">

          <div className="w-full lg:w-2/3">
            {cartList.length === 0 && (
              <h1 className="text-center text-2xl font-semibold text-gray-700">
                No items added to cart
              </h1>
            )}

            {cartList.map((item) => {
              const productQty = item.price * item.qty;

              const imageUrl = item.imgUrl
                ? `${API_BASE}${item.imgUrl}`
                : "/placeholder.png";

              return (
                <div
                  key={item.id}
                  className="relative bg-white shadow-md rounded-2xl p-4 mb-6 flex flex-col md:flex-row items-center gap-4"
                >
                  <div className="w-32 h-32 flex-shrink-0">
                    <img
                      src={imageUrl}
                      alt={item.productName}
                      className="w-full h-full object-contain rounded-xl"
                    />
                  </div>

                  <div className="flex flex-col md:flex-row justify-between w-full items-center">
                    <div className="text-center md:text-left">
                      <h3 className="text-lg font-semibold text-gray-800">
                        {item.productName}
                      </h3>
                      <h4 className="text-gray-600 mt-2">
                        ${item.price}.00 × {item.qty}{" "}
                        <span className="font-semibold text-gray-900 ml-2">
                          = ${productQty}.00
                        </span>
                      </h4>
                    </div>

                    <div className="flex gap-3 mt-3 md:mt-0">
                      <button
                        onClick={() =>
                          dispatch(addToCart({ product: item, num: 1 }))
                        }
                        className="bg-green-500 hover:bg-green-600 text-white px-3 py-2 rounded-lg shadow transition"
                      >
                        <i className="fa-solid fa-plus"></i>
                      </button>
                      <button
                        onClick={() => dispatch(decreaseQty(item))}
                        className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-2 rounded-lg shadow transition"
                      >
                        <i className="fa-solid fa-minus"></i>
                      </button>
                    </div>
                  </div>

                  <button
                    onClick={() => dispatch(deleteProduct(item))}
                    className="absolute top-3 right-3 text-red-500 hover:text-red-700 text-xl"
                  >
                    <ion-icon name="close"></ion-icon>
                  </button>
                </div>
              );
            })}
          </div>

          <div className="w-full lg:w-1/3 bg-white shadow-lg rounded-2xl p-6 h-fit">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Cart Summary
            </h2>

            <div className="flex justify-between items-center border-t pt-3">
              <h4 className="text-lg font-medium text-gray-700">
                Total Price:
              </h4>
              <h3 className="text-2xl font-bold text-indigo-600">
                ${totalPrice}.00
              </h3>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Cart;
