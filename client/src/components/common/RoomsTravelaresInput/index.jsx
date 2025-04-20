import React, { useState, useEffect } from "react";
import { GuestsSVG } from "assets/jsx-svg";
import "./styles.css";
import { Col, Divider, Flex, InputNumber, Popover, Row, Typography } from "antd";
import CounterInput from "components/common/CounterInput";
import { numberToOrdinal } from "utils";

const RoomsTravelaresInput = ({ value = [], onChange = () => {}, ...props }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [rooms, setRooms] = useState(value.length || 1);

  useEffect(() => {
    if (props["aria-invalid"]) {
      setIsOpen(true);
    }
  }, [props]);

  const handleOpenChange = (newOpen) => {
    setIsOpen(newOpen);
  };

  const handleRoomChange = (newRooms) => {
    setRooms(newRooms);
    const updatedValue = Array.from({ length: newRooms }, (_, index) => ({
      adults: value[index]?.adults || 1,
      childs: value[index]?.childs || 0,
      childsAges: value[index]?.childsAges || [],
    }));
    onChange(updatedValue);
  };

  const handleAdultsChange = (roomIndex, newAdults) => {
    const updatedValue = value.map((room, index) =>
      index === roomIndex ? { ...room, adults: newAdults } : room,
    );
    onChange(updatedValue);
  };

  const handleChildsChange = (roomIndex, newChilds) => {
    const updatedValue = value.map((room, index) => {
      if (index === roomIndex) {
        const existingAges = room.childsAges || [];
        const newAges = [
          ...existingAges.slice(0, newChilds),
          ...new Array(Math.max(0, newChilds - existingAges.length)).fill(1),
        ];
        return { ...room, childs: newChilds, childsAges: newAges };
      }
      return room;
    });
    onChange(updatedValue);
  };

  const handleChildAgeChange = (roomIndex, childIndex, newAge) => {
    const updatedValue = value.map((room, index) => {
      if (index === roomIndex) {
        const updatedChildAges = [...room.childsAges];
        updatedChildAges[childIndex] = newAge;
        return { ...room, childsAges: updatedChildAges };
      }
      return room;
    });
    onChange(updatedValue);
  };

  return (
    <div className="travelers_input">
      <Popover
        open={isOpen}
        className={`travelers_input_popover ${props["aria-invalid"] ? "error" : ""}`}
        trigger={"click"}
        onOpenChange={handleOpenChange}
        content={
          <div className={`travelers_inut_popup ${props["aria-invalid"] ? "error" : ""}`}>
            <Flex align="center" justify="space-between">
              <p  className="fw-600 fz-18">Rooms: </p>
              <CounterInput
                value={rooms}
                onChange={handleRoomChange}
                style={{ width: "120px" }}
                min={1}
              />
            </Flex>
            {rooms > 0 && <Divider />}
            {rooms > 0 &&
              [...new Array(rooms)].map((_, index) => (
                <div key={index}>
                  <p className="fw-600 fz-18">Room {index + 1}</p>
                  <Flex align="center" justify="space-between" style={{ marginBottom: "6px" }}>
                    <p>Adults:</p>
                    <CounterInput
                      value={value[index]?.adults || 1}
                      onChange={(newValue) => handleAdultsChange(index, newValue)}
                      style={{ width: "120px" }}
                      min={1}
                    />
                  </Flex>
                  <Flex align="center" justify="space-between" style={{ marginBottom: "6px" }}>
                    <p>Childs:</p>
                    <CounterInput
                      value={value[index]?.childs || 0}
                      onChange={(newValue) => handleChildsChange(index, newValue)}
                      style={{ width: "120px" }}
                      min={0}
                    />
                  </Flex>
                  {value[index]?.childs > 0 && (
                    <div style={{ marginTop: "0.5rem", maxWidth: "428px" }}>
                      <Row gutter={[8, 8]}>
                        {[...new Array(value[index]?.childs)].map((_, childIndex) => (
                          <Col span={12} key={childIndex}>
                            <InputNumber
                              value={value[index]?.childsAges[childIndex] || null}
                              onChange={(newValue) =>
                                handleChildAgeChange(index, childIndex, newValue)
                              }
                              min={1}
                              max={12}
                              style={{ width: "210px" }}
                              placeholder={`${numberToOrdinal(childIndex + 1)} child age`}
                            />
                          </Col>
                        ))}
                      </Row>
                    </div>
                  )}
                  {rooms !== index + 1 && <Divider />}
                </div>
              ))}
          </div>
        }
        placement={"bottom"}>
        <div className="travelres_button" onClick={() => setIsOpen(true)}>
          <div className="icon_container center-items">
            <GuestsSVG />
          </div>
          <Typography.Paragraph className="travelers_counter">
            {value.reduce((acc, el) => acc + (el?.adults || 0), 0)} adults,{" "}
            {value.reduce((acc, el) => acc + (el?.childs || 0), 0)} children
          </Typography.Paragraph>
        </div>
      </Popover>
    </div>
  );
};

export default RoomsTravelaresInput;
