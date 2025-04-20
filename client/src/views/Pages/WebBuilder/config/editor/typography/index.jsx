// TypographyBlocks.js
import React from "react";
import { Typography } from "antd";
import WEB_BUILDER_ICONS from "assets/jsx-svg/WebBuilder";
import { renderToString } from "react-dom/server";

const { Title, Paragraph, Text, Link } = Typography;

const typographyBlocks = (editor) => {
  // Editable Title Block with Levels
  [1, 2, 3, 4, 5].forEach((level) => {
    editor.BlockManager.add(`ant-title-level-${level}`, {
      label: `Title H${level}`,
      content: renderToString(
        <Title level={level} data-gjs-editable="true">
          {`Heading Level ${level}`}
        </Title>,
      ),
      category: "Typography",
      media: WEB_BUILDER_ICONS[`titleH${level}`], // Replace with your icons
    });
  });
  // Paragraph Block
  editor.BlockManager.add("ant-paragraph", {
    label: "Paragraph",
    content: renderToString(
      <Paragraph data-gjs-editable="true">
        This is a sample paragraph. You can edit this text to include your own content.
      </Paragraph>,
    ),
    category: "Typography",
    media: WEB_BUILDER_ICONS.paragraph, // Replace with your icon
  });

  // Text Block
  editor.BlockManager.add("ant-text", {
    label: "Text",
    content: renderToString(<Text data-gjs-editable="true">This is a text element.</Text>),
    category: "Typography",
    media: WEB_BUILDER_ICONS.text, // Replace with your icon
  });

  // Link Block
  editor.BlockManager.add("ant-link", {
    label: "Link",
    content: renderToString(
      <Link href="#" data-gjs-editable="true">
        This is a link
      </Link>,
    ),
    category: "Typography",
    media: WEB_BUILDER_ICONS.link, // Replace with your icon
  });
};

export default typographyBlocks;
