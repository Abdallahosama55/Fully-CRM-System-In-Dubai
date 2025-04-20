import { convertToRGB } from "./helper";

const makeSlideContainer = (editorInstance, slideSection, swiperSlide) => {
  slideSection.innerHTML = "";

  swiperSlide.forEach((silde, i) => {
    const container = document.createElement("div");
    container.className = "slide-container";

    const selector = document.createElement("button");
    selector.className = "slide-selector";
    selector.innerHTML = `Slider ${i + 1}`;

    const advancedProperty = document.createElement("div");
    advancedProperty.className = "advanced-property";

    advancedProperty.innerHTML = `
      <div class="holder p-2.5">
    <div class="toggle button-holder">
      <button class="active background">Background</button>
      <button class="content">Content</button>
      <button class="style">Style</button>
    </div>
    <div class="contant">
      <div data-type="Background">
        <div class="flex justify-between pt-2">
          <div>background color</div>
          <div class="min-h-full w-5">
            <input id="background-color" value="#ffffff" class="color-input" type="color" />
          </div>
        </div>
        <div class="pb-2">
          <div>background color opacity</div>
          <div class="min-h-full">
           <div class="gjs-field gjs-field-range">
            <input id="background-color-opacity" min="0" max="100" step="1" value="100" type="range" />
          </div>
          </div>
        </div>
        <div class="pb-2">img</div>
        <div class="flex flex-col items-center space-y-4">
          <label for="imageInput" id="img-holder"
            class="relative w-full flex flex-col items-center px-4 py-6 bg-blue-50 text-blue-500 rounded-lg shadow-md tracking-wide uppercase border border-blue-300 cursor-pointer hover:bg-blue-100 hover:text-blue-600 transition-all duration-200">
            <svg class="w-8 h-8 mb-2" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round"
                d="M4 16v4a2 2 0 002 2h12a2 2 0 002-2v-4m-4-4l-4-4m0 0l-4 4m4-4v12"></path>
            </svg>
            <span class="text-sm leading-normal">Choose an image</span>
            <input type="file" id="imageInput" accept="image/*" class="hidden">
            <button id="delete-iamge" class="hidden absolute cursor-pointer end-2.5 top-2.5"><i class="fa fa-trash"
                aria-hidden="true"></i></button>
          </label>
        </div>
        <div id="overLay-container" class="hidden justify-between pt-2">
          <div>overlay</div>
          <div class="min-h-full w-5">

          <label class="gjs-field gjs-field-checkbox">
            <input id="checkbox-input" type="checkbox">
            <i class="gjs-chk-icon"></i>
          </label>
          </div>
        </div>
        <div id="overLay" class="hidden">
        <div class="flex justify-between pt-2">
          <div>color</div>
          <div class="min-h-full w-5"><input id="color-overlay" value="#000000" class="color-input" type="color" />
          </div>
        </div>
        <div class="pb-2">
          <div>overLay opacity</div>
          <div class="min-h-full">
            <div class="gjs-field gjs-field-range">
              <input id="overLay-opacity" min="0" max="100" step="1" value="53" type="range" />
            </div>
          </div>
        </div>
        </div>
      </div>

      <div class="hidden" >
        <label class="mb-2 mt-2" for="contant-title">Title</label>
        <textarea id="contant-title">Slide Heading</textarea>
        <label class="mb-2 mt-2" for="contant-description">Description</label>
        <textarea rows="5" id="contant-description">Lorem ipsum dolor sit amet consectetur adipiscing elit dolor</textarea>
      </div>
      <div id="style" class="hidden">
      <div class="flex justify-between items-center pt-2.5">
          <div>
            Horizontal Position
          </div>
          <div class="button-holder">
            <button data-style="justify-content: left" ><i class="fa fa-align-left" aria-hidden="true"></i></button>
            <button data-style="justify-content: center"><i class="fa fa-align-center" aria-hidden="true"></i></button>
            <button data-style="justify-content: right"><i class="fa fa-align-right" aria-hidden="true"></i></button>
          </div>
        </div>
        <div class="flex justify-between items-center pt-2.5 ">
          <div>
            Vertical Position
          </div>
          <div class="button-holder">
            <button data-style="align-items: self-start"><svg xmlns="http://www.w3.org/2000/svg" width="16px" height="16px" viewBox="0 0 24 24" fill="none">
<path fill-rule="evenodd" clip-rule="evenodd" d="M18 18.7499L18 17.2499L6 17.2499L6 18.7499L18 18.7499ZM8.81793 8.12119L11.9999 4.93921L15.1819 8.12119L14.1212 9.18185L12.7499 7.81053L12.7499 15.6745L11.2499 15.6745L11.2499 7.81053L9.87859 9.18185L8.81793 8.12119ZM11.9999 7.06053L12 7.06058L11.9999 7.06058L11.9999 7.06053Z" fill="#ffffff"/>
</svg></button>
            <button data-style="align-items: center">
            <svg xmlns="http://www.w3.org/2000/svg" width="16px" height="16px" viewBox="0 0 24 24" fill="none">
<path fill-rule="evenodd" clip-rule="evenodd" d="M18 12.75L18 11.25L6 11.25L6 12.75L18 12.75ZM15.182 7.00742L12 10.1894L8.81802 7.00742L9.87868 5.94676L11.25 7.31808L11.25 2.25L12.75 2.25L12.75 7.31808L14.1213 5.94676L15.182 7.00742ZM12 8.06808L11.9999 8.06801L12.0001 8.06801L12 8.06808ZM8.81802 16.9926L12 13.8106L15.182 16.9926L14.1213 18.0532L12.75 16.6819L12.75 21.75L11.25 21.75L11.25 16.6819L9.87868 18.0532L8.81802 16.9926ZM12 15.9319L12.0001 15.932L11.9999 15.932L12 15.9319Z" fill="#ffffff"/>
</svg></button>
            <button data-style="align-items: self-end"><svg xmlns="http://www.w3.org/2000/svg" width="16px" height="16px" viewBox="0 0 24 24" fill="none">
<path fill-rule="evenodd" clip-rule="evenodd" d="M12 15.9853L15.182 12.8033L14.1213 11.7427L12.75 13.114L12.75 5.25L11.25 5.25L11.25 13.114L9.8787 11.7427L8.81804 12.8033L12 15.9853ZM12 13.864L12 13.864L12.0001 13.864L12 13.864Z" fill="#ffffff"/>
<path d="M18 17.25L18 18.75L6 18.75L6 17.25L18 17.25Z" fill="#ffffff"/>
</svg></button>
          </div>
        </div>
        <div class="flex justify-between items-center pt-2.5 ">
          <div>
            Text Align
          </div>
          <div class="button-holder">
            <button data-style="text-align: left" ><i class="fa fa-align-left" aria-hidden="true"></i></button>
            <button data-style="text-align: center"><i class="fa fa-align-center" aria-hidden="true"></i></button>
            <button data-style="text-align: right"><i class="fa fa-align-right" aria-hidden="true"></i></button>
          </div>
        </div>
        <div class="flex justify-between items-center py-2.5 ">
          <div>
            Content Color
          </div>
          <div class="button-holder">
            <div class="min-h-full w-5"><input id="text-color" value="#000000" class="color-input" type="color" />
          </div>
        </div>
      </div>
    </div>
  </div>
    `;
    //the button holder this is containing background contanet and style
    const toggleButton = advancedProperty.querySelectorAll(".toggle button");
    const contantChildren = advancedProperty.querySelectorAll(".contant > div");

    //background
    const backgroundColor = advancedProperty.querySelector("#background-color");
    const imageInput = advancedProperty.querySelector("#imageInput");
    const imgHolder = advancedProperty.querySelector("#img-holder");
    const deleteIamge = advancedProperty.querySelector("#delete-iamge");
    const checkboxInput = advancedProperty.querySelector("#checkbox-input");
    const overLay = advancedProperty.querySelector("#overLay");
    const overLayContainer = advancedProperty.querySelector("#overLay-container");
    const colorOverlay = advancedProperty.querySelector("#color-overlay");
    const backgroundColorOpacity = advancedProperty.querySelector("#background-color-opacity");
    const overLayOpacity = advancedProperty.querySelector("#overLay-opacity");

    //contanet
    const contantTitle = advancedProperty.querySelector("#contant-title");
    const contantDescription = advancedProperty.querySelector("#contant-description");

    //style
    const styleButtons = advancedProperty.querySelectorAll("#style button");
    const textColor = advancedProperty.querySelector("#text-color");

    //the button holder this is containing background contanet and style
    toggleButton.forEach((button, i) => {
      button.addEventListener("click", function () {
        toggleButton.forEach((button) => {
          button.classList.remove("active");
        });
        this.classList.add("active");
        contantChildren.forEach((child) => {
          child.classList.add("hidden");
        });
        contantChildren[i].classList.remove("hidden");
      });
    });

    //style
    textColor.addEventListener("input", (e) => {
      const component = silde.find(".swiper-slide-data")[0];
      component.set("style", {
        color: e.target.value,
      });
    });

    styleButtons.forEach((button) => {
      button.addEventListener("click", function () {
        const buttonStyle = button.getAttribute("data-style");
        if (buttonStyle) {
          const component = silde.find(".swiper-slide-data")[0];
          const styleData = buttonStyle.split(":");

          component.set("style", {
            [styleData[0]]: [styleData[1]],
          });
        }
      });
    });

    //contant
    contantTitle.addEventListener("input", (e) => {
      const component = silde.find(".swiper-slide-data h1")[0];
      component.components(e.target.value);
    });
    contantDescription.addEventListener("input", (e) => {
      const component = silde.find(".swiper-slide-data p")[0];
      component.components(e.target.value);
    });

    //background
    colorOverlay.addEventListener("input", (e) => {
      const { r, g, b } = convertToRGB(e.target.value);
      const overlayClass = editorInstance.DomComponents.getWrapper().find(".overlay-class")[0];
      overlayClass.set("style", {
        "background-color": `rgba(${r}, ${g} ,${b},${overLayOpacity.value}%)`,
      });
    });

    overLayOpacity.addEventListener("input", (e) => {
      const { r, g, b } = convertToRGB(colorOverlay.value);
      const overlayClass = editorInstance.DomComponents.getWrapper().find(".overlay-class")[0];
      overlayClass.set("style", {
        "background-color": `rgba(${r}, ${g} ,${b},${e.target.value}%)`,
      });
    });

    checkboxInput.addEventListener("change", function () {
      if (this.checked) {
        overLay.classList.remove("hidden");
        const { r, g, b } = convertToRGB(colorOverlay.value);
        //add div overlay to the slider
        silde.append({
          tagName: "div", // The tag of the child element
          attributes: { class: "overlay-class" }, // Add classes or other attributes
          style: {
            "background-color": `rgba(${r}, ${g} ,${b},${overLayOpacity.value}%)`,
            position: "absolute",
            width: "100%",
            height: "100%",
            top: "0",
            left: "0",
            "z-index": "1",
          },
        });
      } else {
        const overlayClass = editorInstance.DomComponents.getWrapper().find(".overlay-class")[0];

        overLay.classList.add("hidden");
        overlayClass.remove();
      }
    });

    backgroundColor.addEventListener("input", (e) => {
      const { r, g, b } = convertToRGB(e.target.value);
      silde.set("style", {
        "background-color": `rgba(${r}, ${g} ,${b},100%)`,
      });
    });

    backgroundColorOpacity.addEventListener("input", (e) => {
      const { r, g, b } = convertToRGB(backgroundColor.value);
      silde.set("style", {
        "background-color": `rgba(${r}, ${g} ,${b},${e.target.value}%)`,
      });
    });

    deleteIamge.addEventListener("click", () => {
      deleteIamge.classList.add("hidden");
      imgHolder.style.backgroundImage = `initial`;
      silde.set("style", {
        "background-image": `initial`,
      });
    });

    imageInput.addEventListener("change", function (event) {
      const file = event.target.files[0]; // Get the first file

      if (file) {
        // Check if the uploaded file is an image
        if (file.type.startsWith("image/")) {
          const reader = new FileReader();

          // On file load, set the Base64 string as the background image
          reader.onload = function (e) {
            const base64String = e.target.result;
            imgHolder.style.backgroundImage = `url(${base64String})`;
            imgHolder.style.backgroundPosition = `center`;
            imgHolder.style.backgroundSize = `cover`;
            imgHolder.style.backgroundRepeat = `no-repeat`;
            silde.set("style", {
              "background-image": `url(${base64String})`,
              "background-position": "center",
              "background-size": "cover",
              "background-repeat": "no-repeat",
            });
          };
          deleteIamge.classList.remove("hidden");
          overLayContainer.classList.remove("hidden");
          overLayContainer.classList.add("flex");

          // Read the file as a Base64 string
          reader.readAsDataURL(file);
        }
      }
    });

    selector.addEventListener("click", () => {
      if (swiperSlide.length === i + 1) {
        window["1"].swiperInstance.slideTo(0);
      } else {
        window["1"].swiperInstance.slideTo(i + 1);
      }

      advancedProperty.classList.toggle("show");
    });

    const copySider = document.createElement("button");
    copySider.className = "copy-slide";
    copySider.innerHTML = `<i class="fa fa-clone" aria-hidden="true"></i>`;

    copySider.addEventListener("click", () => {
      const newSlide = silde.clone();

      editorInstance.getWrapper().find(".swiper-wrapper")[0].append(newSlide);

      window["1"].swiperInstance.update();
      const swiperSlide = editorInstance.DomComponents.getWrapper().find(".swiper-slide");
      makeSlideContainer(editorInstance, slideSection, swiperSlide);
    });

    const deleteSlide = document.createElement("button");
    deleteSlide.className = "delete-slide";
    deleteSlide.innerHTML = `<i class="fa fa-times" aria-hidden="true"></i>`;

    deleteSlide.addEventListener("click", () => {
      editorInstance.DomComponents.getWrapper().find(".swiper-slide")[i].remove();
      window["1"].swiperInstance.update();
      deleteSlide.parentElement.remove();
    });

    container.append(selector, copySider, deleteSlide);

    slideSection.append(container, advancedProperty);
  });
};

export { makeSlideContainer };
