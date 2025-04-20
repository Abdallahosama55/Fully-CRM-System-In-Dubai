import { Button, Carousel, Flex, Tooltip } from "antd";
import {
  ChevronLeftSVG,
  ChevronRightSVG,
  HomeSVG,
  LocationSVG2,
  RateStarSVG,
} from "assets/jsx-svg";
import SvgImage from "components/common/SvgImage";
import React, { useRef } from "react";
import isValidSVG from "utils/isValidSVG";
// style
import "./styles.css";
const mock = [
  {
    title: "Disneyland Hong Kong",
    location: "Hong Kong",
    features: [
      { icon: "Leaf", label: "Nature" },
      { icon: "Tent", label: "Camping" },
      { icon: "Users", label: "Group Friendly" },
      { icon: "Gem", label: "Attraction" },
    ],
    price: 56,
    image: "https://picsum.photos/800/1000",
  },
  {
    title: "Eiffel Tower",
    location: "Paris, France",
    rate: 3,
    features: [
      { icon: "Camera", label: "Photography" },
      { icon: "Wine", label: "Wine Tasting" },
      { icon: "Users", label: "Social" },
      { icon: "Heart", label: "Romantic" },
    ],
    price: 72,
    image: "https://picsum.photos/900/1000",
  },
  {
    title: "Santorini Escape",
    location: "Greece",
    features: [
      { icon: "Sun", label: "Sunny" },
      { icon: "Waves", label: "Swimming" },
      { icon: "Sailboat", label: "Boat Ride" },
      { icon: "Martini", label: "Cocktails" },
    ],
    price: 89,
    image: "https://picsum.photos/1000/1000",
  },
  {
    title: "Safari Adventure",
    location: "Kenya",
    features: [
      { icon: "Binoculars", label: "Wildlife" },
      { icon: "PawPrint", label: "Animals" },
      { icon: "TreePalm", label: "Nature" },
      { icon: "Sunset", label: "Scenic" },
    ],
    price: 120,
    image: "https://picsum.photos/1000/1100",
  },
  {
    title: "Tokyo City Lights",
    location: "Japan",
    features: [
      { icon: "Flashlight", label: "Nightlife" },
      { icon: "Ramen", label: "Cuisine" },
      { icon: "Train", label: "Transport" },
      { icon: "ShoppingBag", label: "Shopping" },
    ],
    price: 95,
    image: "https://picsum.photos/1200/1000",
  },
];
const LatestOffers = () => {
  const carouselRef = useRef(null);

  return (
    <div className="latest_offers">
      <Flex align="center" justify="space-between" style={{ marginBottom: 16 }}>
        <p>Latest offers</p>
        <Flex gap={16} align="center">
          <Button
            icon={<ChevronLeftSVG />}
            type="default"
            shape="circle"
            size="small"
            onClick={() => carouselRef.current?.prev()}
          />
          <Button
            icon={<ChevronRightSVG />}
            type="default"
            shape="circle"
            size="small"
            onClick={() => carouselRef.current?.next()}
          />
        </Flex>
      </Flex>
      <Carousel
        dots={false}
        slidesToShow={4}
        draggable
        ref={carouselRef}
        autoplay={true}
        responsive={[
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 3,
              infinite: true,
              dots: true,
            },
          },
          {
            breakpoint: 600,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 2,
              initialSlide: 2,
            },
          },
          {
            breakpoint: 480,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
            },
          },
        ]}>
        {mock.map((item, index) => (
          <div className="latest_offers_card_wrapper" key={index}>
            <div className="latest_offers_card">
              <img src={item.image} alt={item.title} className="latest_offers_card_img" />
              <div className="latest_offers_card_body">
                <div>
                  <h3 className="latest_offers_card_title">{item.title}</h3>
                  <Flex align="center" justify="space-between" gap={4}>
                    <p className="location">{item.location}</p>
                    {item.rate && (
                      <Flex align="center" gap={4}>
                        {[...new Array(item.rate)]?.map((el, index) => (
                          <RateStarSVG key={index} />
                        ))}
                      </Flex>
                    )}
                  </Flex>
                  <div className="features">
                    {item?.features?.map((featur, i) => (
                      <Tooltip key={i} title={featur.label}>
                        {isValidSVG(featur.icon) ? (
                          <SvgImage svgContent={featur.icon} />
                        ) : (
                          <HomeSVG />
                        )}
                      </Tooltip>
                    ))}
                  </div>
                </div>

                <div className="latest_offers_card_footer">
                  <span className="price">${item.price}</span>
                  <Button type="primary" shape="round">
                    Book Now
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default LatestOffers;
