import { addCustomTraits } from "./config/traitConfig";

export const addCustomComponents = (editor, components) => {
  components?.forEach((component) => {
    editor?.DomComponents.addType(component.name, {
      model: component.model,
      view: component.view,
    });

    editor.BlockManager.add(component.blockName, {
      label: component.blockLabel,
      content: { type: component.name },
      category: "Custom",
      media: component.media,
    });
  });

  // Add custom traits
  addCustomTraits(editor);
};
