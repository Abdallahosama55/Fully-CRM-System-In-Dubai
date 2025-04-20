import { script, getRandomString } from "./utils/helper";
import WEB_BUILDER_ICONS from "assets/jsx-svg/WebBuilder";
import { addCustomTraits } from "./utils/traits";
import Commands from "./utils/Commands";
const advancedBlocks = (editor) => {
  const bm = editor.BlockManager;
  const dc = editor.DomComponents;
  const defaultType = dc.getType("default");
  const defaultView = defaultType.view;

  bm.add("cswiper", {
    label: "Swiper",
    category: "Advanced",
    media: WEB_BUILDER_ICONS.slider,
    content: {
      type: "swiper-container",
    },
  });

  dc.addType("swiper-container", {
    model: {
      defaults: {
        tagName: "div",
        classes: ["swiper-container", "mySwiper"],
        draggable: true,
        droppable: true,
        traits: [
          {
            type: "slide",
            name: "slide",
            content: true,
            value: 0,
          },
          {
            type: "button",
            name: "addSlider",
            text: "+ Add item",
            full: true,
            command: "add-item",
            content: true,
          },
          {
            type: "select",
            name: "progressType",
            label: "Progress Type",
            content: true,
            changeProp: 1,
            options: [
              { value: "bullets", name: "Bullets" },
              { value: "fraction", name: "Fraction" },
              { value: "progressbar", name: "Progressbar" },
            ],
          },
          {
            type: "checkbox",
            name: "stopAutoplay",
            label: "run Auto play",
            content: true,
            changeProp: 1,
          },
          {
            type: "slide-style",
            name: "slide-style",
          },
        ],
        script,

        components: [
          { type: "swiper-wrapper" },
          { type: "swiper-button-next" },
          { type: "swiper-button-prev" },
          { type: "swiper-pagination" },
        ],
      },
    },

    isComponent: (el) => {
      if (
        el.className &&
        typeof el.className === "stirng" &&
        el.className.includes("swiper-container")
      ) {
        return {
          type: "cswiper",
        };
      }
    },

    view: defaultView.extend({
      init({ model }) {
        this.listenTo(model, "change:progressType", this.updateScript);
        this.listenTo(model, "change:stopAutoplay", this.updateScript);
      },
    }),
  });

  dc.addType("swiper-wrapper", {
    model: {
      defaults: {
        tagName: "div",
        classes: ["swiper-wrapper", "pointer-events-none"],
        draggable: ".swiper-container",
        droppable: true,
        selectable: false,
        components: [{ type: "swiper-slide" }, { type: "swiper-slide" }, { type: "swiper-slide" }],
      },
    },
  });

  dc.addType("swiper-slide", {
    model: {
      defaults: {
        tagName: "div",
        name: "swiperSlide",
        classes: ["swiper-slide", "pointer-events-none", "p-28"],
        draggable: ".swiper-wrapper",
        droppable: true,
        layerable: false,
        selectable: false,
        components: `
        <div class="swiper-slide-data flex justify-center items-center">
          <div >
            <h1 class="text-3xl font-bold my-8">Slide Heading</h1>
            <p>Lorem ipsum dolor sit amet consectetur adipiscing elit dolor</p>
          </div>
        </div>
        `,
      },
      init() {
        this.updateDynamicClass();
      },
      updateDynamicClass() {
        const classes = this.get("classes");
        const dynamicClass = getRandomString();

        // Ensure the class is unique
        if (!classes.some((cls) => cls.id === dynamicClass)) {
          classes.add({ name: dynamicClass });
        }
      },
    },
  });

  dc.addType("swiper-button-next", {
    model: {
      defaults: {
        tagName: "div",
        name: "swiper-button-next",
        classes: ["swiper-button-next"],
        draggable: false,
        droppable: false,
        selectable: false,
      },
    },
  });

  dc.addType("swiper-button-prev", {
    model: {
      defaults: {
        tagName: "div",
        name: "swiper-button-prev",
        classes: ["swiper-button-prev"],
        draggable: false,
        droppable: false,
        selectable: false,
      },
    },
  });

  dc.addType("swiper-pagination", {
    model: {
      defaults: {
        tagName: "div",
        name: "swiper-pagination",
        classes: ["swiper-pagination"],
        draggable: false,
        droppable: false,
        selectable: false,
      },
    },
  });

  Commands(editor);
  addCustomTraits(editor);
};

export default advancedBlocks;
