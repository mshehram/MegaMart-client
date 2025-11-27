import { useState } from "react";

const ProductReviews = ({ selectedProduct }) => {
  const [listSelected, setListSelected] = useState("desc");
  const reviews = selectedProduct?.reviews || [];

  return (
    <section className="my-5">
      <div className="max-w-6xl mx-auto">
        <ul className="flex items-center gap-2 my-5 p-0">
          <li
            className="cursor-pointer font-medium"
            style={{ color: listSelected === "desc" ? "black" : "#9c9b9b" }}
            onClick={() => setListSelected("desc")}
          >
            Description
          </li>
          <li
            className="cursor-pointer font-medium"
            style={{ color: listSelected === "rev" ? "black" : "#9c9b9b" }}
            onClick={() => setListSelected("rev")}
          >
            Reviews ({reviews.length})
          </li>
        </ul>
        {listSelected === "desc" ? (
          <p className="text-[14px]">{selectedProduct?.description || "No description available."}</p>
        ) : (
          <div className="flex flex-col gap-1.5">
            {reviews.length > 0 ? (
              reviews.map((rate, index) => (
                <div className="flex flex-col gap-1" key={index}>
                  <span>{rate.name || "Anonymous"}</span>
                  <span className="text-[#ffcd4e] font-medium">
                    {rate.rating} (rating)
                  </span>
                  <p>{rate.text}</p>
                </div>
              ))
            ) : (
              <p>No reviews yet.</p>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default ProductReviews;
