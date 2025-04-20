import { Col, Row } from "antd";
import WEB_BUILDER_ICONS from "assets/jsx-svg/WebBuilder";
import { renderToString } from "react-dom/server";

const layoutBlocks = (editor) => {
  editor.BlockManager.add('ant-container', {
    label: 'Container',
    content: renderToString(
      <div
        style={{
          maxWidth: '1024px',
          margin: '0 auto',
          padding: '16px', // Add padding if needed
        }}
        data-gjs-droppable="true"
      >

      </div>
    ),
    category: 'Layout',
    media: WEB_BUILDER_ICONS.container
  });

  editor.BlockManager.add('ant-section', {
    label: 'Section',
    content: renderToString(
      <section style={{ marginTop: "1rem", marginBottom: "1rem", padding: "8px 0" }} data-gjs-droppable="true">
        Section
      </section>
    ),
    category: 'Layout',
    media: WEB_BUILDER_ICONS.sectionBox
  });

  editor.BlockManager.add('ant-row-two-columns', {
    label: '2 Cols',
    content: renderToString(<Row gutter={[12, 12]} style={{ width: "100%", marginTop: "1rem", marginBottom: "1rem" }}>
      <Col md={12} xs={24} style={{ padding: '16px' }} data-gjs-droppable="true">Col 1</Col>
      <Col md={12} xs={24} style={{ padding: '16px' }} data-gjs-droppable="true">Col 2</Col>
    </Row>),
    category: 'Layout',
    media: WEB_BUILDER_ICONS.column2
  });


  editor.BlockManager.add('ant-row-two-columns-left-smaller-right', {
    label: '2 Cols [1:2]',
    content: renderToString(<Row gutter={[12, 12]} style={{ width: "100%", marginTop: "1rem", marginBottom: "1rem" }}>
      <Col md={8} xs={24} style={{ padding: '16px' }} data-gjs-droppable="true">Col 1</Col>
      <Col md={16} xs={24} style={{ padding: '16px' }} data-gjs-droppable="true">Col 2</Col>
    </Row>),
    category: 'Layout',
    media: WEB_BUILDER_ICONS.column2leftSmaller
  });


  editor.BlockManager.add('ant-row-three-columns', {
    label: '3 Cols',
    content: renderToString(<Row gutter={[12, 12]} style={{ width: "100%", marginTop: "1rem", marginBottom: "1rem" }}>
      <Col md={8} xs={24} style={{ padding: '16px' }} data-gjs-droppable="true">Col 1</Col>
      <Col md={8} xs={24} style={{ padding: '16px' }} data-gjs-droppable="true">Col 2</Col>
      <Col md={8} xs={24} style={{ padding: '16px' }} data-gjs-droppable="true">Col 3</Col>
    </Row>),
    category: 'Layout',
    media: WEB_BUILDER_ICONS.column3
  });


  editor.BlockManager.add('ant-row-four-columns', {
    label: '4 Cols',
    content: renderToString(<Row gutter={[12, 12]} style={{ width: "100%", marginTop: "1rem", marginBottom: "1rem" }}>
      <Col md={6} xs={24} style={{ padding: '16px' }} data-gjs-droppable="true">Col 1</Col>
      <Col md={6} xs={24} style={{ padding: '16px' }} data-gjs-droppable="true">Col 2</Col>
      <Col md={6} xs={24} style={{ padding: '16px' }} data-gjs-droppable="true">Col 3</Col>
      <Col md={6} xs={24} style={{ padding: '16px' }} data-gjs-droppable="true">Col 4</Col>
    </Row>),
    category: 'Layout',
    media: WEB_BUILDER_ICONS.column4
  });
}

export default layoutBlocks