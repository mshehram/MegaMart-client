const SlideCard = ({ title, desc, cover }) => {
  return (
    <div className="mt-20 px-10 pb-14">
      <div className="grid md:grid-cols-2 items-center gap-8">
        <div>
          <h1 className="text-[45px] leading-[55px] mt-[50px] mb-[20px]">
            {title}
          </h1>
          <p className="my-5">{desc}</p>
          <button className="bg-[#0f3460] text-white px-5 py-2 rounded-md">
            Visit Collections
          </button>
        </div>
        <div>
          <img
            src={cover}
            alt="#"
            className="w-full max-h-[300px] object-contain"
          />
        </div>
      </div>
    </div>
  );
};

export default SlideCard;


