import { makeSlideContainer } from "./traitsHelper";

const Commands = (editor) => {
  editor.Commands.add("add-item", (editor) => {
    const swiperContainer = editor.getWrapper();

    swiperContainer.find(".swiper-wrapper")[0].append({
      type: "swiper-slide",
      content: "<p>New Slide</p>",
    });

    editor.select(editor.DomComponents.getWrapper().find(".swiper-container"));
    const selcted = editor.getSelected();

    window["1"].swiperInstance.update();

    const swiperSlide = editor.DomComponents.getWrapper().find(".swiper-slide");
    const slideSection = selcted.getTrait("slide").view.$el["0"].querySelector("section");

    makeSlideContainer(editor, slideSection, swiperSlide);
  });
};

export default Commands;
