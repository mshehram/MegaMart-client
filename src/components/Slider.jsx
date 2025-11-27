import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import SlideCard from "./SliderCard/SlideCard";
import { SliderData } from "../utils/products";

const SliderHome = () => {
  const settings = {
    nav: false,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
  };

  return (
    <section className="homeSlide mt-20 px-5 pb-14">
      <div className="max-w-7xl mx-auto">
        <Slider {...settings}>
          {SliderData.map((value, index) => (
            <SlideCard
              key={index}
              title={value.title}
              cover={value.cover}
              desc={value.desc}
            />
          ))}
        </Slider>
      </div>
    </section>
  );
};

export default SliderHome;


