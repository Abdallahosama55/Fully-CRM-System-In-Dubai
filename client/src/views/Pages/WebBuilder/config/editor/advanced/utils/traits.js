import { makeSlideContainer } from "./traitsHelper";

export const addCustomTraits = (editorInstance) => {
  editorInstance.TraitManager.addType("slide", {
    noLabel: true,
    createInput() {
      const swiperSlide = editorInstance.DomComponents.getWrapper().find(".swiper-slide");

      const slideSection = document.createElement("section");

      makeSlideContainer(editorInstance, slideSection, swiperSlide);

      return slideSection;
    },
  });

  editorInstance.TraitManager.addType("slide-style", {
    noLabel: true,
    createInput() {
      const slideSection = document.createElement("section");
      slideSection.innerHTML = `
      <div>
      <div class="pb-2">
          <div class="p-2.5">Sliders Width</div>
          <div class="min-h-full">
           <div class="gjs-field gjs-field-range">
            <input id="slider-width" min="0" max="100" step="1" value="100" type="range" />
          </div>
          </div>
        </div>
        <div class="pb-2">
          <div class="p-2.5">Sliders Padding</div>
          <div class="min-h-full">
           <div class="gjs-field gjs-field-range">
            <input id="sliders-padding" min="0" max="10" step="1" value="7" type="range" />
          </div>
          </div>
        </div>
      </div>
      `;

      const sliderWidth = slideSection.querySelector("#slider-width");
      const slidersPadding = slideSection.querySelector("#sliders-padding");

      sliderWidth.addEventListener("input", (e) => {
        const getSlideData = editorInstance.DomComponents.getWrapper().find(".swiper-slide-data");

        getSlideData.forEach((slide) => {
          slide.set("style", {
            width: `${e.target.value}%`,
          });
        });
      });

      slidersPadding.addEventListener("input", (e) => {
        const swiperSlide = editorInstance.DomComponents.getWrapper().find(".swiper-slide");

        swiperSlide.forEach((slide) => {
          slide.set("style", {
            padding: `${e.target.value}rem`,
          });
        });
      });

      return slideSection;
    },
  });
};
