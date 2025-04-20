import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import Slider from "react-slick";

import "./styles.css";

export default function CustomSlider({
  children,
  responsive,
  slidesToShow,
  slidesToScroll,
}) {
  function SampleNextArrow(props) {
    const { onClick } = props;
    if (
      children[0].length &&
      children[0].length - props.currentSlide <= slidesToShow
    ) {
      return;
    }
    if (
      !children[0].length &&
      children.length - props.currentSlide <= slidesToShow
    ) {
      return;
    }
    return (
      <div onClick={onClick} className="slider-next-arrow">
        <RightOutlined />
      </div>
    );
  }

  function SamplePrevArrow(props) {
    const { onClick } = props;
    if (props.currentSlide === 0) {
      return;
    }
    return (
      <div onClick={onClick} className="slider-prev-arrow">
        <LeftOutlined />
      </div>
    );
  }

  var sliderSettings = {
    dots: false,
    infinite: false,
    speed: 500,
    swipe: true,
    draggable: true,
    slidesToShow: slidesToShow || 3,
    slidesToScroll: slidesToScroll || 3,
    initialSlide: 0,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: responsive,
  };
  return (
    <div className="custom-slider">
      <Slider {...sliderSettings}>{children}</Slider>
    </div>
  );
}
