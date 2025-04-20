/* eslint-disable no-undef */

const script = function () {
  const stopAutoplay = "{[ stopAutoplay ]}";
  const progressType = "{[ progressType ]}" || "bullets";

  const initLib = function () {
    const swiper = new Swiper(".mySwiper", {
      spaceBetween: 30,
      centeredSlides: true,
      loop: true,
      autoplay: !!stopAutoplay,
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
        type: progressType,
      },
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
    });
    window.swiperInstance = swiper;

    if (!!stopAutoplay) {
      swiper.autoplay.start();
    } else {
      swiper.autoplay.stop();
    }
  };

  if (typeof Swiper === "undefined") {
    const script = document.createElement("script");
    script.onload = initLib;
    script.src = "https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js";
    document.body.appendChild(script);
  } else {
    initLib();
  }
};

function convertToRGB(color) {
  const r = parseInt(color.substr(1, 2), 16);
  const g = parseInt(color.substr(3, 2), 16);
  const b = parseInt(color.substr(5, 2), 16);
  return { r, g, b };
}

const getRandomString = (length = 5) => {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
};

export { script, getRandomString, convertToRGB };
