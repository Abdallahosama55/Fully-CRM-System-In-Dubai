// add controller tabs inside style manager
export const controllerTabs = (editor) => {
  const sideContainer = document.querySelector(".gjs-clm-tags");

  const styleHeader = document.getElementById("gjs-clm-up");
  const styleField = document.getElementById("gjs-clm-tags-field");
  const styleInfo = document.getElementsByClassName("gjs-clm-sels-info")[0];
  const stylegSectors = document.getElementsByClassName("gjs-sm-sectors")[0];

  const contentBtn = document.createElement("button");
  contentBtn.classList.add("tabBtn");
  contentBtn.setAttribute("data-item", 0);
  contentBtn.title = "Content";
  contentBtn.innerHTML = `<i class="fa fa-pencil" aria-hidden="true"></i><br/> Contnet`;

  const StyleBtn = document.createElement("button");
  StyleBtn.classList.add("tabBtn");
  StyleBtn.setAttribute("data-item", 1);
  StyleBtn.title = "Style";
  StyleBtn.innerHTML = `<i class="fa fa-adjust" aria-hidden="true"></i><br/> Style`;

  const advancedBtn = document.createElement("button");
  advancedBtn.classList.add("tabBtn");
  advancedBtn.setAttribute("data-item", 2);
  advancedBtn.title = "Advanced";
  advancedBtn.innerHTML = `<i class="fa fa-cog" aria-hidden="true"></i><br/> Advanced`;

  const tabsContainer = document.createElement("div");
  tabsContainer.classList.add("tabsContainer");
  tabsContainer.appendChild(contentBtn);
  tabsContainer.appendChild(StyleBtn);
  tabsContainer.appendChild(advancedBtn);
  sideContainer.insertBefore(tabsContainer, sideContainer.firstChild);

  // advanced structure
  const toggleAdvancedDisplay = (val, traitsPanelVal) => {
    const traitsPanel = document.querySelector(".gjs-trt-traits.gjs-one-bg.gjs-two-color");
    const traitsLabel = document.querySelector(".gjs-traits-label");

    if (traitsPanel) {
      traitsPanel.style.display = traitsPanelVal || val;
      traitsLabel.style.display = val;
    }
  };

  const toggleStyleDisplay = (val) => {
    styleHeader.style.display = val;
    styleField.style.display = val;
    styleInfo.style.display = val;
    stylegSectors.style.display = val;
  };

  const separateTraits = (component) => {
    let traits;
    const defaultTraits = component.get("defaultTraits");
    if (defaultTraits) {
      traits = defaultTraits;
    } else {
      const StringTraits = component.get("traits");
      traits = StringTraits;
      component.set("defaultTraits", traits);
    }

    const content = traits.filter((trait) => trait?.attributes?.content);
    const style = traits.filter((trait) => trait?.attributes?.content === undefined);

    return { content, style };
  };

  editor.on("component:selected", (component) => {
    let open;

    const layer = document.querySelector(".gjs-layer.gjs-layer__t-wrapper.no-select.gjs-two-color");

    if (layer) {
      const hidden = layer.parentElement.style.getPropertyValue("display") === "none";
      open = hidden;
    } else {
      open = true;
    }

    if (component && open) {
      // separate the traits to content and style
      const { content, style } = separateTraits(component);

      if (content.length !== 0) {
        styleContainer(contentBtn, content);
      } else if (style.length !== 0) {
        styleContainer(StyleBtn, style);
      } else {
        advancedContainer(advancedBtn);
      }
    }
  });

  const addActiveClass = (element) => {
    const tabsBtns = document.querySelectorAll(".tabBtn");
    tabsBtns.forEach((item) => {
      item.classList.remove("active");
    });
    element.classList.add("active");
  };

  const advancedContainer = (element) => {
    addActiveClass(element);
    editor.stopCommand("core:open-traits");
    toggleStyleDisplay("");
  };

  const styleContainer = (element, style) => {
    addActiveClass(element);
    styleHeader.style.display = "none";
    styleField.style.display = "none";
    styleInfo.style.display = "none";
    stylegSectors.style.display = "none";
    const selected = editor.getSelected();

    if (selected) {
      selected.setTraits(style);

      editor.runCommand("core:open-traits");
      toggleAdvancedDisplay("none", "block");
    }
  };

  editor.on("run:open-blocks", () => {
    editor.stopCommand("core:open-traits");
    toggleAdvancedDisplay("none");
  });

  editor.on("run:open-layers", () => {
    editor.stopCommand("core:open-traits");
    toggleAdvancedDisplay("none");
  });

  editor.on("stop:open-sm", () => {
    editor.stopCommand("core:open-traits");
    toggleAdvancedDisplay("none");
  });

  editor.on("run:open-sm", () => {
    const component = editor.getSelected();

    // separate the traits to content and style
    const { content, style } = separateTraits(component);

    if (content.length !== 0) {
      styleContainer(contentBtn, content);
    } else if (style.length !== 0) {
      styleContainer(StyleBtn, style);
    } else {
      advancedContainer(advancedBtn);
    }
  });

  contentBtn.addEventListener("click", () => {
    const select = editor.getSelected();
    const { content } = separateTraits(select);

    styleContainer(contentBtn, content);
  });

  StyleBtn.addEventListener("click", () => {
    const select = editor.getSelected();
    const { style } = separateTraits(select);

    styleContainer(StyleBtn, style);
  });
  advancedBtn.addEventListener("click", () => advancedContainer(advancedBtn));
};
