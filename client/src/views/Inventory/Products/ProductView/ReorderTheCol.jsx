import { HolderOutlined } from "@ant-design/icons";
import { Checkbox, Col, Row } from "antd";
import React from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

const ReorderTheCol = ({ setData, data }) => {
  const handleChange = (value) => {
    setData((prev) => {
      const newData = prev.map((data) => {
        if (value.includes(data.title)) {
          return { ...data, hidden: true };
        }
        return { ...data, hidden: false };
      });
      localStorage.setItem("product", JSON.stringify(newData));
      return newData;
    });
  };
  const onDragEnd = (result) => {
    if (!result.destination) {
      return;
    }

    setData((prev) => {
      const [reorderedItem] = prev.splice(result.source.index, 1);
      prev.splice(result.destination.index, 0, reorderedItem);
      localStorage.setItem("product", JSON.stringify(prev));
      return [...prev];
    });
  };
  return (
    <div className="body-content" style={{ width: "300px", borderRadius: "14px", padding: "20px" }}>
      <Row className="mb-1">
        <Col>Make Dragging to Rearrange Columns Show/Hide</Col>
      </Row>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="columns">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              <Checkbox.Group
                defaultValue={data.filter((datax) => datax.hidden).map((dataz) => dataz.title)}
                onChange={handleChange}>
                <Row gutter={[10, 10]}>
                  {data.map((item, index) => (
                    <Col key={index} span={24}>
                      <Draggable key={item.dataIndex} draggableId={item.dataIndex} index={index}>
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}>
                            <Row className="w-100" align="middle" justify="space-between">
                              <Col>
                                <Row align="middle" gutter={[10, 0]}>
                                  <Col>
                                    <HolderOutlined />
                                  </Col>
                                  <Col>
                                    <p>{item.title}</p>
                                  </Col>
                                </Row>
                              </Col>
                              <Col>
                                <Checkbox value={item.title} />
                              </Col>
                            </Row>
                          </div>
                        )}
                      </Draggable>
                    </Col>
                  ))}
                </Row>
              </Checkbox.Group>
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};

export default ReorderTheCol;
