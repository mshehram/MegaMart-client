import { serviceData } from "../../utils/products";

const Wrapper = () => {
  return (
    <section className="text-center bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-wrap justify-center">
          {serviceData.map((val, index) => (
            <div
              key={index}
              className="p-2 border-[4px] border-white text-center sm:w-[45%] xs:w-[90%] md:w-1/4"
              style={{ backgroundColor: val.bg }}
            >
              <div className="w-10 h-10 flex justify-center items-center rounded-full text-[25px] bg-[#f3f5f9] mx-auto my-5">
                {val.icon}
              </div>
              <h3 className="text-[18px] font-medium w-fit mx-auto">
                {val.title}
              </h3>
              <p className="text-[15px] mt-5">{val.subtitle}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Wrapper;
