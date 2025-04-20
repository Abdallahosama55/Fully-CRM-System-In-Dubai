export const addCustomTraits = (editorInstance) => {
  editorInstance.TraitManager.addType("custom-dnd", {
    createInput({ trait, component }) {
      const el = document.createElement("div");
      el.className = "text-center";

      el.innerHTML = `
          <div class='p-4 border border-dashed border-gray-300 rounded-lg'>
            <p class="text-gray-500">Drag and drop images here or click to select</p>
            <input type="file" multiple accept="image/*" class="hidden" />
            <div class="drop-area h-32 bg-gray-200 mt-4 rounded-lg flex justify-center items-center text-gray-500 cursor-pointer">
              <span>Drag images here</span>
            </div>
          </div>
          <div id="image-preview" class=""></div>
        `;

      const input = el.querySelector("input");
      const dropArea = el.querySelector(".drop-area");
      const previewArea = el.querySelector("#image-preview");

      dropArea.addEventListener("click", () => input.click());

      dropArea.addEventListener("dragover", (e) => {
        e.preventDefault();
        dropArea.classList.add("bg-gray-300");
      });

      dropArea.addEventListener("dragleave", () => {
        dropArea.classList.remove("bg-gray-300");
      });

      dropArea.addEventListener("drop", (e) => {
        e.preventDefault();
        dropArea.classList.remove("bg-gray-300");
        const files = Array.from(e.dataTransfer.files);
        handleFiles(files, component, trait);
      });

      input.addEventListener("change", (e) => {
        const files = Array.from(e.target.files);
        handleFiles(files, component, trait);
      });

      function handleFiles(files, component, trait) {
        let existingImages = trait ? trait.get("value") || [] : [];

        const filePromises = files.map((file) => {
          return new Promise((resolve) => {
            const reader = new FileReader();
            reader.onload = (event) => resolve(event.target.result);
            reader.readAsDataURL(file);
          });
        });

        Promise.all(filePromises).then((newImages) => {
          const allImages = [...existingImages, ...newImages];
          trait.set("value", allImages);
          renderImages(allImages);
        });
      }

      function renderImages(images) {
        previewArea.innerHTML = "";

        const selectedImgs = document.createElement("div");
        selectedImgs.className =
          "selected-images text-left font-semibold mt-2 px-2 flex justify-between ";
        selectedImgs.innerHTML = ` <span>${images.length} Selected images</span>
                                    <button  class='remove-all fa fa-trash'></button>`;

        const removeButton = selectedImgs.querySelector(".remove-all");
        removeButton.addEventListener("click", () => removeAllImages(images));

        images?.length > 0 && previewArea.appendChild(selectedImgs);

        const imgsWrapper = document.createElement("div");
        imgsWrapper.className = "flex flex-wrap gap-2 py-3 px-2";
        previewArea.appendChild(imgsWrapper);

        images.forEach((image, index) => {
          const imgContainer = document.createElement("div");
          imgContainer.className = "relative h-auto object-cover rounded";

          const imgEl = document.createElement("img");
          imgEl.src = image;
          imgEl.alt = `Image ${index + 1}`;
          imgContainer.appendChild(imgEl);

          const removeBtn = document.createElement("button");
          removeBtn.className =
            "absolute top-[-15%] right-[-12%] bg-[#585151] text-white rounded-full p-1 fa fa-remove";
          removeBtn.onclick = () => removeImage(index, images);
          imgContainer.appendChild(removeBtn);

          images?.length > 0 && imgsWrapper.appendChild(imgContainer);
        });
      }

      function removeImage(index, images) {
        images.splice(index, 1);
        trait.set("value", images);
        renderImages(images);
        component.setAttributes({ images });
      }

      function removeAllImages(images) {
        images = [];
        trait.set("value", images);
        renderImages(images);
        component.setAttributes({ images });
      }
      return el;
    },
  });

  // Add a custom trait type for textarea
  editorInstance.TraitManager.addType("textarea", {
    //the event handlers will work when the textarea is changed the input
    eventCapture: ["input"],
    // Create the input element for the trait
    createInput({ trait }) {
      const el = document.createElement("textarea");

      el.placeholder = trait.attributes.placeholder || "Type something...";
      el.style.width = "100%";
      el.style.height = "100px";
      el.style.backgroundColor = "#fff";
      el.style.color = "#000";
      el.style.fontWeight = "400";

      return el;
    },

    // Set the value of the input when initializing
    onUpdate({ elInput, component, trait }) {
      elInput.value = component.getTrait(trait.attributes.name).get("default") || "";
    },

    // Handle changes in the textarea
    onEvent({ elInput, component, trait }) {
      const value = elInput.value;
      component.set({ [trait.name]: value });
    },
  });
};
