import React from "react";
import ReactDOM from "react-dom/client";
import ReactDOMServer from "react-dom/server";
import WEB_BUILDER_ICONS from "assets/jsx-svg/WebBuilder";
import Media from "../../../../../../../components/WebBuilderComponents/Gallery/Media";
import PostFeed from "../../../../../../../components/WebBuilderComponents/post/PostFeed";
import Contact from "../../../../../../../components/WebBuilderComponents/contact";
import EventsComponent from "../../../../../../../components/WebBuilderComponents/events/EventsComponent";
import Typography from "../../../../../../../components/WebBuilderComponents/typography/Typography";

const commonTraits = [
  {
    type: "number",
    label: "Width",
    name: "width",
    placeholder: "300px",
  },
  {
    type: "number",
    label: "Height",
    name: "height",
  },
  {
    type: "text",
    label: "Margin",
    name: "margin",
  },
  {
    type: "text",
    label: "Padding",
    name: "padding",
  },
];

const componentsConfig = [
  {
    name: "gallery",
    blockName: "gallery-block",
    blockLabel: "Gallery",
    media: WEB_BUILDER_ICONS.gallery,
    model: {
      defaults: {
        tagName: "div",
        draggable: true,
        droppable: true,
        attributes: { class: "gallery" },
        traits: [
          {
            type: "custom-dnd",
            label: "Upload Images",
            name: "images",
            value: [],
          },
          {
            type: "text",
            label: "Title",
            name: "title",
            value: "Gallery",
          },
          {
            type: "select",
            label: "Columns",
            name: "columns",
            options: [1, 2, 3, 4, 5].map((value) => ({ value, name: value })),
            value: 4,
          },
          {
            type: "number",
            label: "Gallery height",
            name: "height",
          },
          {
            type: "number",
            label: "Image Border Radius",
            name: "borderRadius",
          },
          {
            type: "select",
            label: "Image Height",
            name: "imgHeight",
            options: [
              { value: "auto", name: "Auto" },
              { value: "fit", name: "Fit" },
              { value: "fill", name: "Fill" },
              { value: "contain", name: "Contain" },
              { value: "cover", name: "Cover" },
            ],
            default: "auto",
          },
          ...commonTraits,
        ],
      },
      toHTML() {
        return this.view.el.innerHTML || "";
      },
    },
    view: {
      init() {
        const el = this.el;
        const root = ReactDOM.createRoot(el);
        const updateComponent = () => {
          const model = this.model;
          const settings = {
            width: model?.getTrait("width")?.get("value"),
            margin: model?.getTrait("margin")?.get("value"),
            padding: model?.getTrait("padding")?.get("value"),
            images: model?.getTrait("images")?.get("value"),
            title: model?.getTrait("title")?.get("value"),
            columns: model?.getTrait("columns")?.get("value"),
            height: model?.getTrait("height")?.get("value"),
            imgHeight: model?.getTrait("imgHeight")?.get("value"),
            borderRadius: model?.getTrait("borderRadius")?.get("value"),
          };
          const staticHTML = ReactDOMServer.renderToStaticMarkup(<Media settings={settings} />);

          if (model.get("staticHTML") !== staticHTML) {
            model.set("staticHTML", staticHTML);
          }

          root.render(<Media settings={settings} />);
        };
        updateComponent();
        this.listenTo(this.model, "change:traits", updateComponent);
        this.listenTo(this.model, "change:attributes", updateComponent);
      },
    },
  },
  {
    name: "post-block",
    blockName: "post-block",
    media: WEB_BUILDER_ICONS.post,
    blockLabel: "Post Block",
    model: {
      defaults: {
        tagName: "div",
        draggable: true,
        droppable: true,
        attributes: { class: "post-block" },
        traits: [
          {
            type: "checkbox",
            label: "Show Comments",
            name: "showComments",
          },
          {
            type: "number",
            label: "Max Posts",
            name: "maxPosts",
            placeholder: "5",
            value: 1,
            min: 1,
            max: 5,
          },
          ...commonTraits,
        ],
      },
      toHTML() {
        return this.view.el.innerHTML || "";
      },
    },
    view: {
      init() {
        const el = this.el;
        const root = ReactDOM.createRoot(el);
        const updateComponent = () => {
          const model = this.model;
          const settings = {
            showComments: model.getTrait("showComments")?.get("value"),
            maxPosts: model.getTrait("maxPosts")?.get("value"),
            width: model.getTrait("width")?.get("value"),
            height: model.getTrait("height")?.get("value"),
            margin: model.getTrait("margin")?.get("value"),
            padding: model.getTrait("padding")?.get("value"),
          };
          root.render(<PostFeed settings={settings} />);
        };

        updateComponent();
        this.listenTo(this.model, "change:attributes", updateComponent);
        this.listenTo(this.model, "change:content", updateComponent);
        this.listenTo(this.model, "change:traits", updateComponent);
      },
    },
  },
  {
    name: "contact-form",
    blockName: "contact-block",
    blockLabel: "Contact Block",
    media: WEB_BUILDER_ICONS.contact,
    model: {
      defaults: {
        tagName: "div",
        draggable: true,
        droppable: true,
        attributes: { class: "contact-form" },
        traits: commonTraits,
      },
      toHTML() {
        return this.view.el.innerHTML || "";
      },
    },
    view: {
      init() {
        const el = this.el;
        const root = ReactDOM.createRoot(el);
        const updateComponent = () => {
          const model = this.model;
          const settings = {
            width: model.getTrait("width")?.get("value"),
            height: model.getTrait("height")?.get("value"),
          };
          // Update staticHTML for the block
          const staticHTML = ReactDOMServer.renderToStaticMarkup(<Contact settings={settings} />);
          if (model.get("staticHTML") !== staticHTML) {
            model.set("staticHTML", staticHTML);
          }
          root.render(<Contact settings={settings} />);
        };
        updateComponent();
        this.listenTo(this.model, "change:traits", updateComponent);
      },
    },
  },
  {
    name: "react-events",
    blockName: "events-block",
    blockLabel: "Events",
    media: WEB_BUILDER_ICONS.events,
    model: {
      defaults: {
        tagName: "div",
        traits: [
          {
            type: "string",
            label: "List Title",
            name: "listTitle",
            default: null,
          },
          {
            type: "string",
            label: "Data API",
            name: "DataAPI",
            default: "https://api.escuelajs.co/api/v1/products?offset=0&limit=10",
          },
          {
            type: "select",
            label: "View Style",
            name: "viewStyle",
            options: [
              { value: "card", name: "Card" },
              { value: "list", name: "List" },
            ],
            default: "list",
          },
          {
            type: "number",
            label: "Items Limit",
            name: "itemsLimit",
            default: 4,
          },
        ],
      },
      toHTML() {
        return this.view.el.innerHTML || "";
      },
    },
    view: {
      onRender({ el }) {
        const model = this.model;
        // Render the React Component
        const renderReactComponent = () => {
          const root = el._reactRoot || ReactDOM.createRoot(el);
          el._reactRoot = root;

          root.render(
            React.createElement(EventsComponent, {
              title: model.get("attributes")?.listTitle,
              viewStyle: model.get("attributes")?.viewStyle,
              itemsLimit: model.get("attributes")?.itemsLimit,
              api: model.get("attributes")?.DataAPI,
            }),
          );
        };

        // Initial Render
        renderReactComponent();

        // Update component when props change
        model.on("change:attributes", renderReactComponent);
      },
    },
  },
  {
    name: "typograph",
    blockName: "typograph",
    blockLabel: "Typograph",
    media: WEB_BUILDER_ICONS.text,
    model: {
      defaults: {
        tagName: "div",
        traits: [
          {
            type: "textarea",
            label: "Content",
            name: "content",
            placeholder: "Insert your text here",
            default: "Insert your text here",
            content: true,
          },
          {
            type: "select",
            label: "Variant",
            name: "variant",
            options: [
              { name: "Heading 1", value: "h1" },
              { name: "Heading 2", value: "h2" },
              { name: "Heading 3", value: "h3" },
              { name: "Heading 4", value: "h4" },
              { name: "Heading 5", value: "h5" },
              { name: "Heading 6", value: "h6" },
              { name: "Phragraph", value: "p" },
            ],
            default: "p",
          },
          {
            type: "color",
            label: "Color",
            name: "color",
            default: "",
          },
          {
            type: "checkbox",
            label: "Bold",
            name: "bold",
            valueTrue: "700",
            valueFalse: "500",
            default: "500",
          },
          {
            type: "string",
            label: "Font Family",
            name: "fontFamily",
            default: "",
          },
        ],
      },
      toHTML() {
        return this.view.el.innerHTML || "";
      },
    },
    view: {
      onRender({ el }) {
        const model = this.model;

        // Render the React Component
        const renderReactComponent = () => {
          const root = el._reactRoot || ReactDOM.createRoot(el);
          el._reactRoot = root;

          root.render(
            React.createElement(Typography, {
              content: model.getAttributes()?.content,
              variant: model.getAttributes()?.variant,
              color: model.getAttributes()?.color,
              bold: model.getAttributes()?.bold,
              fontFamily: model.getAttributes()?.fontFamily,
            }),
          );
        };

        // Initial Render
        renderReactComponent();

        // Update component when props change
        model.on("change:attributes", renderReactComponent);
      },
    },
  },
];

export default componentsConfig;
