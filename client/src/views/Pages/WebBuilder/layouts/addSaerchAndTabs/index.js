const tailwindCategory = [
  "\n        Blog\n      ",
  "\n        Contact\n      ",
  "\n        Content\n      ",
  "\n        CTA\n      ",
  "\n        Commerce\n      ",
  "\n        Features\n      ",
  "\n        Footer\n      ",
  "\n        Gallery\n      ",
  "\n        Header\n      ",
  "\n        Hero\n      ",
  "\n        Pricing\n      ",
  "\n        Statistics\n      ",
  "\n        Steps\n      ",
  "\n        Team\n      ",
  "\n        Testimonials\n      ",
];

const addTabAndSearch = () => {
  //vars for conditions
  let selected = "widgets";
  let makeItOnec = true;
  let allBlocksCategory2;
  let blocksForFliter;

  //get some documents form the dom to make manipulations
  const blockParentContainer = document.querySelector(".gjs-blocks-cs.gjs-one-bg.gjs-two-color");
  const blockContainer = document.querySelector(".gjs-block-categories");
  const allBlocksCategory = document.querySelectorAll(".gjs-block-category");

  //arrayes for separate the blocks
  const tailwindBlockCategory = [];
  const widgetsCategory = [];

  //make the separation
  allBlocksCategory.forEach((category) => {
    if (tailwindCategory.indexOf(category.children[0].childNodes[2].nodeValue) !== -1) {
      tailwindBlockCategory.push(category);
    } else {
      widgetsCategory.push(category);
    }
  });

  //make new tages for buttons and searching
  const containerDiv = document.createElement("div");
  const containerButtons = document.createElement("div");
  const widgets = document.createElement("button");
  const blocks = document.createElement("button");
  const containerSearch = document.createElement("div");
  const search = document.createElement("input");

  //add the classes to add some style in css file
  containerDiv.className = "container-div";
  containerButtons.className = "container-buttons";
  containerSearch.className = "container-search";

  //widgets data
  widgets.innerHTML = "Widgets";
  widgets.className = "widgets";

  //widgets event
  widgets.addEventListener("click", () => {
    widgets.classList.add("active");
    blocks.classList.remove("active");
    selected = "widgets";
    makeItOnec = true;
    search.value = "";
    search.placeholder = "Search Widget...";
    blockContainer.replaceChildren(...widgetsCategory);
  });

  //blocks data
  blocks.innerHTML = "Blocks";
  blocks.className = "blocks";

  //blocks event
  blocks.addEventListener("click", () => {
    blocks.classList.add("active");
    widgets.classList.remove("active");
    selected = "blocks";
    makeItOnec = true;
    search.value = "";
    search.placeholder = "Search blocks...";
    blockContainer.replaceChildren(...tailwindBlockCategory);
  });

  //input-search data
  search.type = "search";

  //input-search event
  search.addEventListener("input", (e) => {
    if (selected === "widgets") {
      if (makeItOnec) {
        blocksForFliter = document.querySelectorAll(".gjs-block.gjs-one-bg.gjs-four-color-h");
        makeItOnec = false;
      }
      if (e.target.value !== "") {
        let widgetsAfterFilter = [];

        blocksForFliter.forEach((block) => {
          if (
            block.lastChild.previousElementSibling.innerHTML.toLowerCase().includes(e.target.value)
          ) {
            //make the clone to avoid moving the item
            const clonedElement = block.cloneNode(true);

            //store the cloned item
            widgetsAfterFilter.push(clonedElement);
          }
        });

        //change the style
        blockContainer.style.cssText = `flex-wrap: wrap; flex-direction: row;`;

        //add the data after filter
        blockContainer.replaceChildren(...widgetsAfterFilter);
      } else {
        //return to the defult data
        blockContainer.replaceChildren(...widgetsCategory);

        //return to the defult style
        blockContainer.style.cssText = `flex-wrap: nowrap; flex-direction: column;`;
      }
    } else {
      if (makeItOnec) {
        allBlocksCategory2 = document.querySelectorAll(".gjs-block-category");
        makeItOnec = false;
      }

      if (e.target.value !== "") {
        const BlocksAfterFilter = [...allBlocksCategory2].filter((category) => {
          if (category.children[0].childNodes[2].nodeValue.toLowerCase().includes(e.target.value)) {
            category.children[1].style.display = "flex";
            return category;
          } else {
            category.children[1].style.display = "node";
          }
        });
        //add the data after filter
        blockContainer.replaceChildren(...BlocksAfterFilter);
      } else {
        //return to the defult data
        blockContainer.replaceChildren(...tailwindBlockCategory);
      }
    }
  });

  //initial data
  blockContainer.replaceChildren(...widgetsCategory);
  widgets.classList.add("active");
  search.placeholder = "Search Widget...";

  //append the tages
  containerButtons.appendChild(widgets);
  containerButtons.appendChild(blocks);
  containerSearch.appendChild(search);
  containerDiv.appendChild(containerButtons);
  containerDiv.appendChild(containerSearch);

  //set the tages the frist thing
  blockParentContainer.insertBefore(containerDiv, blockContainer);
};

export default addTabAndSearch;
