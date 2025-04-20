import React, { useState, useEffect } from "react";
import { GuestsSVG } from "assets/jsx-svg";
// style
import "./styles.css";
import { Col, Flex, InputNumber, Popover, Row, Typography } from "antd";
import CounterInput from "../CounterInput";

const TravelersInput = ({
  value,
  onChange = () => {},
  hasInfant = false,
  withChildAges = false,
  ...props
}) => {
  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    if (!value) {
      onChange({ adults: 1, childs: 0, infants: 0, childsAges: [], childsAgesString: "" });
    }
  }, []);
  
  useEffect(() => {
    if (props["aria-invalid"]) {
      setIsOpen(true);
    }
  }, [props]);

  const handleOpenChange = (newOpen) => {
    setIsOpen(newOpen);
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
            <Flex align="center" justify="space-between" style={{ marginBottom: "0.5rem" }}>
              <Typography.Text>Adults</Typography.Text>
              <CounterInput
                value={value?.adults}
                onChange={(newAdults) =>
                  onChange({
                    ...value,
                    adults: newAdults,
                  })
                }
                min={1}
                style={{ width: "100px" }}
              />
            </Flex>

            <Flex align="center" justify="space-between" style={{ marginBottom: "0.5rem" }}>
              <Typography.Text>Children</Typography.Text>
              <CounterInput
                value={value?.childs}
                onChange={(newChilds) => {
                  if (withChildAges) {
                    let updatedAges = [...(value?.childsAges || [])];

                    if (newChilds > updatedAges.length) {
                      // Add default age (1) for each new child
                      updatedAges = [
                        ...updatedAges,
                        ...new Array(newChilds - updatedAges.length).fill(1),
                      ];
                    } else if (newChilds < updatedAges.length) {
                      // Trim extra ages
                      updatedAges = updatedAges.slice(0, newChilds);
                    }

                    onChange({
                      ...value,
                      childs: newChilds,
                      childsAges: updatedAges,
                      childsAgesString: updatedAges.join("-"),
                    });
                    return;
                  }

                  onChange({
                    ...value,
                    childs: newChilds,
                  });
                }}
                min={0}
                style={{ width: "100px" }}
              />
            </Flex>

            {hasInfant && (
              <Flex align="center" justify="space-between" style={{ marginBottom: "0.5rem" }}>
                <Typography.Text>Infants</Typography.Text>
                <CounterInput
                  value={value?.infants}
                  onChange={(newInfant) =>
                    onChange({
                      ...value,
                      infants: newInfant,
                    })
                  }
                  min={0}
                  style={{ width: "100px" }}
                />
              </Flex>
            )}
            {withChildAges && value?.childs > 0 && (
              <Row gutter={[12, 12]}>
                {[...new Array(value?.childs)]?.map((_, index) => (
                  <Col span={12} key={index}>
                    <InputNumber
                      style={{ width: "100%" }}
                      min={1}
                      max={12}
                      value={value?.childsAges?.[index] || 1}
                      onChange={(age) => {
                        const updatedAges = [...(value?.childsAges || [])];
                        updatedAges[index] = age;

                        onChange({
                          ...value,
                          childsAges: updatedAges,
                          childsAgesString: updatedAges?.join("-"),
                        });
                      }}
                    />
                  </Col>
                ))}
              </Row>
            )}
          </div>
        }
        placement={"bottom"}>
        <div className="travelres_button" onClick={() => setIsOpen(true)}>
          <div className="icon_container center-items">
            <GuestsSVG />
          </div>
          <Typography.Paragraph className="travelers_counter">
            {value?.adults} adults, {value?.childs} childs
            {hasInfant && `, ${value?.infants} infants`}
          </Typography.Paragraph>
        </div>
      </Popover>
    </div>
  );
};

export default TravelersInput;
