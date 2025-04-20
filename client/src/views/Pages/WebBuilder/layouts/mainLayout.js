import addTabAndSearch from "./addSaerchAndTabs";
import { controllerTabs } from "./controllerTabs";

function mainLayout(editor) {
  // add controller tabs inside style manager
  controllerTabs(editor);
  // remove panel
  editor.Panels.removeButton("views", "open-tm");
  // add tabs and search inside blocks
  addTabAndSearch();

  //make select for every component well added
  editor.on("block:drag:stop", (block) => {
    editor.select(block);
  });
}

export default mainLayout;
