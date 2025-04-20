import layoutBlocks from "./layout";
import WEB_BUILDER_ICONS from "assets/jsx-svg/WebBuilder";
import typographyBlocks from "./typography";
import { Button } from "antd";
import travelBlocks from "./travel";
import reactDom from "react-dom";
import { addCustomComponents } from "./custom";
import componentsConfig from "./custom/config/componentsConfig";
import codeEditorBlock from "./codeEditor/codeEditorBlock";
import advancedBlocks from "./advanced";

const congigEditor = ({ editor, navigate }) => {
  // Register a custom block for the SearchComponent
  layoutBlocks(editor);
  typographyBlocks(editor);
  travelBlocks(editor);
  addCustomComponents(editor, componentsConfig);
  codeEditorBlock(editor);
  advancedBlocks(editor);

  editor.DomComponents.addType("ant-button", {
    model: {
      defaults: {
        tagName: "div", // Wrapper div for rendering the React component
        traits: [
          {
            type: "select",
            label: "Action",
            name: "data-action",
            options: [
              { value: "none", name: "None" },
              { value: "to-login", name: "Login" },
              // Add more predefined actions here
            ],
            changeProp: 1,
          },
        ],
        attributes: {
          "data-action": "none", // Default action
        },
        // Renders the Ant Design button using React and handles actions
        script: function () {
          const applyAction = () => {
            const action = this.getAttribute("data-action");
            switch (action) {
              case "to-login":
                navigate("/login");
                break;
              // Handle other actions here
              default:
                break;
            }
          };

          // Render the React Ant Design Button
          reactDom.render(
            <Button type="primary" onClick={applyAction}>
              Click Me
            </Button>,
            this,
          );

          // Reapply the action when traits change
          this.on("change:data-action", applyAction);
        },
      },
    },
    view: {
      // Additional view settings if needed
    },
  });

  // Add the custom button to the Block Manager
  editor.BlockManager.add("ant-button", {
    label: "Button",
    content: { type: "ant-button" }, // Reference the new component type
    category: "Basic",
    media: WEB_BUILDER_ICONS.button, // Replace with your icon
  });
};

export default congigEditor;

/*
    // Adjusted BlockManager.add code
    editor.BlockManager.add('ant-button', {
        label: 'Button',
        content: {
            type: 'ant-button',
            content: 'Click Me',
            attributes: {
                'data-gjs-editable': 'true',
                'data-gjs-removable': 'false',
            },
        },
        category: 'Basic',
        media: WEB_BUILDER_ICONS.button, // Replace with your icon
    });

    // Adjusted DomComponents.addType code
    editor.DomComponents.addType('ant-button', {
        model: {
            defaults: {
                tagName: 'button',
                draggable: true,
                droppable: false,
                classes: ['ant-btn', 'ant-btn-default'], // default classes
                traits: [
                    {
                        type: 'select',
                        label: 'Button Type',
                        name: 'type',
                        options: [
                            { value: 'default', name: 'Default' },
                            { value: 'primary', name: 'Primary' },
                            { value: 'dashed', name: 'Dashed' },
                            { value: 'text', name: 'Text' },
                            { value: 'link', name: 'Link' },
                        ],
                    },
                ],
            },
            init() {
                this.on('change:type', this.handleTypeChange);
            },
            handleTypeChange() {
                const type = this.get('type') || 'default';
                // Remove existing 'ant-btn-...' class
                const classList = this.get('classes');
                classList.remove(cls => /^ant-btn-\w+/.test(cls.get('name')));
                // Add new class
                this.addClass(`ant-btn-${type}`);
            },
        },
        isComponent(el) {
            if (el.tagName === 'BUTTON' && el.classList.contains('ant-btn')) {
                return { type: 'ant-button' };
            }
        },
    });
*/
