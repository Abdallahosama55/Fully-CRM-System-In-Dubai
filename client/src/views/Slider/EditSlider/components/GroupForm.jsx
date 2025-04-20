import { Button, Col, Flex, Form, Row, Typography } from "antd";
import { useForm } from "antd/es/form/Form";
import ItemInformation from "./ItemInformation";
import { PlusSVG } from "assets/jsx-svg";
import { useSliderStore } from "../sliderStore";
import useLazyEffect from "hooks/useLazyEffect";
import ItemCard from "./ItemCard";
import CustomColorPicker from "./CustomColorPicker";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const GroupForm = ({ ...rest }) => {
  const [form] = useForm();
  const { updateItem, addItemToGroup, setItems, state } = useSliderStore();
  const customValue = Form.useWatch((value) => value, form);

  const onSubmit = (data) => {
    updateItem({ ...data, id: rest.id });
  };
  const handleAddItem = (type) => {
    addItemToGroup({ id: rest.id, type });
  };

  useLazyEffect(() => {
    form.submit();
  }, [customValue]);
  const onDragEnd = (result) => {
    try {
      const destIndex = result?.destination?.index;
      const srcIndex = result?.source?.index;
      if (isNaN(destIndex) || isNaN(srcIndex) || destIndex === srcIndex) return;

      const newList = Array.from(state);
      const [removed] = newList.splice(srcIndex, 1); // Remove the dragged item from its original position
      newList.splice(destIndex, 0, removed); // Insert the dragged item at the destination index

      setItems(newList);
    } catch (e) {
      console.log(e);
    }
    // Update the state with the new list
    // setItems(newList);
    //setData(newList);
  };
  return (
    <Form
      onFinish={onSubmit}
      initialValues={{
        ...rest,
      }}
      form={form}
      layout="vertical">
      <ItemInformation />
      <Row gutter={[8, 0]}>
        <Col xs={12}>
          <div className="item-picker">
            <Form.Item className="color-picker-form" style={{ margin: 0 }} name="FGColor">
              <CustomColorPicker
                format="hex"
                defaultFormat="hex"
                disabledAlpha
                defaultValue="#fff"
                showText={() => <span>Font Color</span>}
              />
            </Form.Item>{" "}
          </div>{" "}
        </Col>
        <Col xs={12}>
          <div className="item-picker">
            <Form.Item className="color-picker-form" style={{ margin: 0 }} name="BGColor">
              <CustomColorPicker
                format="hex"
                defaultFormat="hex"
                disabledAlpha
                defaultValue="#1677ff"
                showText={() => <span>background Color</span>}
              />
            </Form.Item>
          </div>
        </Col>
      </Row>
      <Flex
        justify="space-between"
        align="center"
        style={{ marginBottom: "8px", marginTop: "16px" }}>
        <Typography.Text
          style={{ fontSize: "14px", fontWeight: 600, color: "#3A5EE3", lineHeight: "16.8px" }}>
          Items
        </Typography.Text>
        <Flex gap={4}>
          <Button
            size="small"
            onClick={() => handleAddItem("item")}
            style={{
              background: "#3a5ee3",
            }}
            icon={<PlusSVG height={10} width={10}></PlusSVG>}
            type="primary">
            Add Item
          </Button>
          {!rest?.noGroup && (
            <Button
              onClick={() => handleAddItem("group")}
              size="small"
              icon={<PlusSVG fill="black" height={10} width={10}></PlusSVG>}>
              Add group
            </Button>
          )}
        </Flex>
      </Flex>
      <DragDropContext onDragEnd={(result) => onDragEnd(result)}>
        <Droppable droppableId={"children_" + rest?.id}>
          {(provided) => (
            <div
              style={{
                gap: 8,
                marginTop: "16px",
                display: "flex",
                flexDirection: "column",
              }}
              {...provided.droppableProps}
              ref={provided.innerRef}>
              {rest?.childs?.map((item, index) => {
                return (
                  <Draggable
                    key={item.id}
                    draggableId={item.id + ""}
                    index={(state || []).findIndex((list) => list.id === item.id) ?? index}>
                    {(provided) => (
                      <ItemCard
                        provided={provided}
                        background={"white"}
                        noGroup={true}
                        key={item.id}
                        {...item}></ItemCard>
                    )}
                  </Draggable>
                );
              })}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </Form>
  );
};
export default GroupForm;
