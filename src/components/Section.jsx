import ProductCard from "./ProductCard/ProductCard";

const Section = ({ title, bgColor, productItems }) => {
  return (
    <section style={{ background: bgColor }} className="py-10">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-semibold">{title}</h1>
        </div>

        <div className="flex flex-wrap justify-center gap-6">
          {productItems.length > 0 ? (
            productItems.map((productItem) => (
              <ProductCard
                key={productItem.id}
                title={title}
                productItem={productItem}
              />
            ))
          ) : (
            <p className="text-gray-500 text-center w-full">
              No products available in this section.
            </p>
          )}
        </div>
      </div>
    </section>
  );
};

export default Section;
