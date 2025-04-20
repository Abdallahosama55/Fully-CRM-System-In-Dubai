import { Draggable, Droppable } from "react-beautiful-dnd";
import React, { useMemo, useRef } from "react";
import DayColumn from "./DayColumn";
import "./styles.css";
import { Col, Form, Input, message, Modal, Row, Select, Skeleton } from "antd";
import DestinationCard from "./DestinationCard";
import { useToggle } from "hooks/useToggle";
import { useForm } from "antd/es/form/Form";
import useAddDayToPackage from "services/travel/packages/itinerary/Mutations/useAddDayToPackage";
const CHANGE_COLUMNS_ORDERE_ID = "CHANGE_COLUMNS_ORDERE_ID";

const DaysSection = ({
  days,
  isLoading,
  tripId,
  setDays,
  updateDays,
  refetch,
  destinations = [],
}) => {
  const [isAddNewDayOpen, toggleAddNewDay] = useToggle();
  const [form] = useForm();
  const daysContainerRef = useRef(null);

  const handelDeleteDay = (id) => {
    setDays((prev) => prev.filter((day) => day.id !== id));
  };

  const handelDeleteItemInDay = ({ dayIndex, itemIndex }) => {
    const newDays = days?.map((el, index) => {
      if (index === dayIndex) {
        return {
          ...el,
          items: el?.items?.filter((item, index) => index !== itemIndex),
        };
      }

      return el;
    });

    setDays(newDays);
    updateDays(newDays);
  };

  const addDayToPackage = useAddDayToPackage(tripId, {
    onSuccess: (res, payload) => {
      // setDays((prev) => [...prev, day])
      message.success("New day added successfully");
      form.resetFields();
      toggleAddNewDay(false);
      refetch();
      close();
    },
    onError: (error) => {
      message?.error(error);
    },
  });

  const handelFinish = (values) => {
    addDayToPackage.mutate({
      ...values,
      destinations: [values?.destination],
      destination: undefined,
    });
  };

  const updateDayDescription = ({ description, id }) => {
    console.log(days, description, id);
    setDays((prev) =>
      prev?.map((el) => {
        if (el?.id === id) {
          return {
            ...el,
            description,
          };
        }

        return el;
      }),
    );
  };

  return (
    <div className="days-section">
      <Modal
        destroyOnClose={true}
        title={"New day"}
        open={isAddNewDayOpen}
        onOk={form.submit}
        okText="Add"
        onCancel={() => {
          toggleAddNewDay(false);
        }}>
        <Form form={form} layout="vertical" onFinish={handelFinish}>
          <Form.Item
            label={"Day location"}
            name={"destination"}
            rules={[{ required: true, message: "select day location" }]}>
            <Select options={destinations?.map((el) => ({ label: el?.name, value: el?.name }))} />
          </Form.Item>
          <Form.Item
            label={"Day title"}
            name={"description"}
            rules={[{ required: true, message: "Enter day title" }]}>
            <Input placeholder="Enter day title" />
          </Form.Item>
        </Form>
      </Modal>
      {isLoading && (
        <Row gutter={[12, 12]}>
          <Col>
            <Skeleton.Node style={{ height: "200px", width: "250px" }} active />
          </Col>
          <Col>
            <Skeleton.Node style={{ height: "300px", width: "250px" }} active />
          </Col>
        </Row>
      )}
      <div className="days-section-days-container">
        <div className="destinations_container">
          {destinations?.map((el, index) => (
            <DestinationCard
              onAddClick={() => {
                toggleAddNewDay();
                form.setFieldValue("destination", el?.name);
              }}
              key={el?.name}
              {...el}
              index={index}
              isLast={index === destinations?.length - 1}
              width={
                (el?.daysCount || 1) * 263 +
                ((el?.daysCount || 1) - 1) * 16 +
                (index === 0 || index === destinations?.length - 1 ? 8 : 16)
              }
            />
          ))}
        </div>
        <Droppable droppableId={CHANGE_COLUMNS_ORDERE_ID} type="day" direction="horizontal">
          {(provided) => (
            <div ref={provided.innerRef} {...provided.droppableProps}>
              <div className="days-container" ref={daysContainerRef}>
                {days.map((day, index) => (
                  <Draggable key={day?.id} draggableId={"" + day?.id} index={index}>
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className="day-item">
                        <DayColumn
                          key={day.id}
                          day={day}
                          handelDeleteItemInDay={handelDeleteItemInDay}
                          handelDeleteDay={handelDeleteDay}
                          updateDayDescription={updateDayDescription}
                          index={index}
                        />
                      </div>
                    )}
                  </Draggable>
                ))}
                {/* {isNewDayOpen && (
                  <div>
                    <NewDay
                      close={closeNewDay}
                      index={days.length}
                      handelAddDay={handelAddNewDay}
                      tripId={tripId}
                    />
                  </div>
                )} */}
              </div>
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </div>
    </div>
  );
};

export default DaysSection;
