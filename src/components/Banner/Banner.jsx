import productBg from "../../Images/table.jpg";

const Banner = ({ title }) => {
  return (
    <div className="relative w-full h-[300px]"> 
      <img
        src={productBg}
        alt="Product-bg"
        className="w-full h-full object-cover"
      />
      <div className="absolute top-0 left-0 w-full h-full bg-black/60 flex justify-center items-center">
        <h2 className="text-white text-[30px] text-center">{title}</h2>
      </div>
    </div>
  );
};

export default Banner;


