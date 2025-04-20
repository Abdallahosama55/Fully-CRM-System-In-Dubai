import { Button, Col, ColorPicker, Flex, Input, Modal, Row, Select, Space, Tooltip } from "antd";
import React, { useCallback, useEffect, useState } from "react";
import EditorIcons from "assets/jsx-svg/Editor";
import "./styles.css";
import UploadInput from "components/common/UploadInput";
import { API_BASE } from "services/config";
const ToolBar = ({ editor, tags }) => {
  // heading
  const [heading, setHeading] = useState(0);
  useEffect(() => {
    if (!editor.isActive("heading") && heading !== 0) {
      setHeading(0);
      editor.chain().focus().toggleHeading({ level: 0 }).run();
    }
  }, [editor.isActive("heading")]);
  // link
  const [openLinkModal, setOpenLinkModal] = useState(false);
  const [linkValue, setLinkValue] = useState(undefined);
  const setLink = useCallback(
    (url) => {
      if (!editor) {
        return;
      }
      // cancelled
      if (url === null) {
        setOpenLinkModal(false);
        return;
      }

      // empty
      if (url === "") {
        editor.chain().focus().extendMarkRange("link").unsetLink().run();
        setOpenLinkModal(false);

        return;
      }

      // update link
      editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
      setOpenLinkModal(false);
    },
    [editor],
  );

  const [openImageModal, setOpenImageModal] = useState(false);
  const [imageValue, setImageValue] = useState(undefined);
  const [imageAltText, setImageAltText] = useState("");

  const setImage = useCallback(
    ({ link, alt }) => {
      if (!editor) return;
      if (link) {
        editor.chain().focus().setImage({ src: link, alt }).run();
      }
      setOpenImageModal(false);
    },
    [editor],
  );

  if (!editor) return null;

  return (
    <div className="text_editor_toolbar">
      {/* Add Link Modal */}
      <Modal
        title="Set Link"
        open={openLinkModal}
        onOk={() => setLink(linkValue)}
        onCancel={() => {
          setLinkValue(undefined);
          setOpenLinkModal(false);
        }}>
        <Input
          value={linkValue}
          onChange={(e) => setLinkValue(e.target.value)}
          placeholder="Enter URL"
        />
      </Modal>

      {/* Image Modal */}
      <Modal
        title="Upload Image"
        open={openImageModal}
        onOk={() => {
          setImage({
            link: imageValue,
            alt: imageAltText,
          });
          setImageValue(undefined);
          setImageAltText("");
        }}
        onCancel={() => {
          setImageValue(undefined);
          setImageAltText("");
          setOpenImageModal(false);
        }}>
        <Row gutter={[12, 12]}>
          <Col span={24}>
            <Input
              value={imageAltText}
              onChange={(e) => setImageAltText(e.target.value)}
              placeholder="Image alt text"
            />
          </Col>
          <Col span={24}>
            <UploadInput
              action={`${API_BASE}common/upload-file`}
              name="image"
              value={{
                id: imageValue,
                name: imageValue,
                link: imageValue,
              }}
              onChange={(value) => {
                setImageValue(value?.link);
              }}
            />
          </Col>
        </Row>
      </Modal>

      <Flex justify="space-between" wrap={"wrap"}>
        {/* Toolbar */}
        <Space size={1} align="center"  wrap={"wrap"}>
          <Tooltip title="Undo">
            <Button
              size="small"
              disabled={!editor.can().chain().focus().undo().run()}
              onClick={() => editor?.chain()?.focus()?.undo()?.run()}
              className={`text_editor_toolbar_icon`}
              type="text"
              icon={<EditorIcons.UndoSVG />}
            />
          </Tooltip>
          <Tooltip title="Redo">
            <Button
              disabled={!editor.can().chain().focus().redo().run()}
              onClick={() => editor?.chain()?.focus()?.redo()?.run()}
              size="small"
              className="text_editor_toolbar_icon"
              type="text"
              icon={<EditorIcons.RedoSVG />}
            />
          </Tooltip>
          <Tooltip title="Text style">
            <Select
              size="small"
              className="ghost-select"
              style={{ width: 80 }}
              defaultValue="normal"
              suffixIcon={<EditorIcons.SelectArrowSVG />}
              value={heading}
              onChange={(level = 0) => {
                setHeading(level);
                editor.chain().focus().toggleHeading({ level }).run();
              }}
              options={[
                { label: <h1>H1</h1>, value: 1 },
                { label: <h2>H2</h2>, value: 2 },
                { label: <h3>H3</h3>, value: 3 },
                { label: <p>Normal</p>, value: 0 },
              ]}
            />
          </Tooltip>
          <Tooltip title="Text alignment">
            <Select
              size="small"
              className="ghost-select text-align-select"
              style={{ width: 70 }}
              defaultValue="left"
              onChange={(align) => {
                console.log(align);
                editor.chain().focus().setTextAlign(align).run();
              }}
              suffixIcon={<EditorIcons.SelectArrowSVG />}
              optionRender={(item) => item.label}
              options={[
                { label: <EditorIcons.TextAlignLeftSVG width={30} height={20} />, value: "left" },
                {
                  label: <EditorIcons.TextAlignCenterSVG width={30} height={20} />,
                  value: "center",
                },
                { label: <EditorIcons.TextAlignRightSVG width={30} height={20} />, value: "right" },
                {
                  label: <EditorIcons.TextAlignJustifySVG width={30} height={20} />,
                  value: "justify",
                },
              ]}
            />
          </Tooltip>
          <Tooltip title="Text color">
            <ColorPicker
              size="small"
              className="color_picker ghost-select"
              value={editor.getAttributes("textStyle").color}
              onChangeComplete={(color) => {
                editor
                  .chain()
                  .focus()
                  .setColor(color.toHex() ? `#${color.toHex()}` : "")
                  .run();
              }}
            />
          </Tooltip>
          <Tooltip title="Bold">
            <Button
              onClick={() => editor.chain().focus().toggleBold().run()}
              disabled={!editor.can().chain().focus().toggleBold().run()}
              className={
                editor.isActive("bold")
                  ? "is-active text_editor_toolbar_icon"
                  : "text_editor_toolbar_icon"
              }
              size="small"
              type="text"
              icon={<EditorIcons.BoldSVG />}
            />
          </Tooltip>
          <Tooltip title="Italic">
            <Button
              onClick={() => editor.chain().focus().toggleItalic().run()}
              disabled={!editor.can().chain().focus().toggleItalic().run()}
              className={
                editor.isActive("italic")
                  ? "is-active text_editor_toolbar_icon"
                  : "text_editor_toolbar_icon"
              }
              size="small"
              type="text"
              icon={<EditorIcons.ItalicSVG />}
            />
          </Tooltip>
          <Tooltip title="Under line">
            <Button
              onClick={() => editor?.chain()?.focus()?.toggleUnderline()?.run()}
              disabled={!editor.can().chain().focus().toggleUnderline().run()}
              className={
                editor.isActive("underline")
                  ? "is-active text_editor_toolbar_icon"
                  : "text_editor_toolbar_icon"
              }
              size="small"
              type="text"
              icon={<EditorIcons.UnderLineSVG />}
            />
          </Tooltip>
          <Tooltip title="Line through">
            <Button
              onClick={() => editor.chain().focus().toggleStrike().run()}
              disabled={!editor.can().chain().focus().toggleStrike().run()}
              className={
                editor.isActive("strike")
                  ? "is-active text_editor_toolbar_icon"
                  : "text_editor_toolbar_icon"
              }
              size="small"
              type="text"
              icon={<EditorIcons.LineThroughSVG />}
            />
          </Tooltip>
          <Tooltip title="Code">
            <Button
              onClick={() => editor.chain().focus().toggleCodeBlock().run()}
              disabled={!editor.can().chain().focus().toggleCodeBlock().run()}
              className={
                editor.isActive("codeBlock")
                  ? "is-active text_editor_toolbar_icon"
                  : "text_editor_toolbar_icon"
              }
              size="small"
              type="text"
              icon={<EditorIcons.CodeSVG />}
            />
          </Tooltip>
          <Tooltip title="Ul List">
            <Button
              onClick={() => editor.chain().focus().toggleBulletList().run()}
              disabled={!editor.can().chain().focus().toggleBulletList().run()}
              className={
                editor.isActive("bulletList")
                  ? "is-active text_editor_toolbar_icon"
                  : "text_editor_toolbar_icon"
              }
              size="small"
              type="text"
              icon={<EditorIcons.ListUlSVG />}
            />
          </Tooltip>
          <Tooltip title="Ol List">
            <Button
              onClick={() => editor.chain().focus().toggleOrderedList().run()}
              disabled={!editor.can().chain().focus().toggleOrderedList().run()}
              className={
                editor.isActive("orderedList")
                  ? "is-active text_editor_toolbar_icon"
                  : "text_editor_toolbar_icon"
              }
              size="small"
              type="text"
              icon={<EditorIcons.ListOlSVG />}
            />
          </Tooltip>
          <Tooltip title="Link">
            <Button
              onClick={() => {
                setLinkValue(editor?.getAttributes("link")?.href);
                setOpenLinkModal(true);
              }}
              size="small"
              className={
                editor.isActive("link")
                  ? "is-active text_editor_toolbar_icon"
                  : "text_editor_toolbar_icon"
              }
              type="text"
              icon={<EditorIcons.LinkSVG />}
            />
          </Tooltip>
          <Tooltip title="Image">
            <Button
              onClick={() => setOpenImageModal(true)}
              size="small"
              className="text_editor_toolbar_icon"
              type="text"
              icon={<EditorIcons.ImageSVG />}
            />
          </Tooltip>
          <Tooltip title="Quotes">
            <Button
              onClick={() => editor.chain().focus().toggleBlockquote().run()}
              disabled={!editor.can().chain().focus().toggleBlockquote().run()}
              className={
                editor.isActive("blockquote")
                  ? "is-active text_editor_toolbar_icon"
                  : "text_editor_toolbar_icon"
              }
              size="small"
              type="text"
              icon={<EditorIcons.QuotesSVG />}
            />
          </Tooltip>
          <Tooltip title="Horizontal line">
            <Button
              onClick={() => editor.chain().focus().setHorizontalRule().run()}
              disabled={!editor.can().chain().focus().setHorizontalRule().run()}
              className={"text_editor_toolbar_icon"}
              size="small"
              type="text"
              icon={<EditorIcons.HorizontalSVG />}
            />
          </Tooltip>
        </Space>
        <Space size={1} align="center">
          {tags && (
            <Select
              placeholder={"Insert tags"}
              size="small"
              style={{ minWidth: "150px" }}
              onSelect={(tag) => {
                editor?.commands?.insertContentAt(editor?.state?.selection?.from, ` ${tag} `);
              }}>
              {tags?.map((tag) => (
                <Select.Option key={tag} />
              ))}
            </Select>
          )}
        </Space>
      </Flex>
    </div>
  );
};

export default ToolBar;
