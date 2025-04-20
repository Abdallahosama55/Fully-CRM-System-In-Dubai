import { Form, Radio, Button, Row, Col, Input, message, Divider, Image } from "antd";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { MenuDotsSVG, USFlagSVG } from "assets/jsx-svg";
import React, { useEffect, useState } from "react";
import ARflag from "assets/images/ARflag.png";
import Delete from "assets/images/IconlyLightOutlineDelete.png";

export default function Option({
  language,
  name,
  addOptionRef,
  onOptionsDragEnd,
  attKey,
  attOptions,
  setAttOptions,
  attributes,
  setAttributes,
}) {
  const [optionCount, setOptionCount] = useState(1);
  const [optionDefault, setOptionDefault] = useState(0);

  const onAddOption = () => {
    setAttOptions((prev) => {
      let attIndex = prev.findIndex((op) => op.attId === attKey);
      let copy = [...prev];
      const OptionName = {};
      language.forEach((lang) => {
        OptionName[`${lang.code}OptionName`] = "";
      });

      if (attIndex !== -1) {
        copy[attIndex].options = [...copy[attIndex].options, { id: optionCount, ...OptionName }];
        setOptionCount((prev) => prev + 1);
      }
      return [...copy];
    });
  };

  const deleteOption = ({ key_op, remove, name_op }) => {
    let options = attOptions.find((op) => op.attId === attKey);

    if (options.options.length === 1) {
      message.warn("Attribute must have at least one option");
      return;
    }

    setAttOptions((prev) => {
      let attIndex = prev.findIndex((op) => op.attId === attKey);
      let copy = [...prev];

      if (attIndex !== -1) {
        copy[attIndex].options = copy[attIndex].options.filter((op) => op.id !== key_op);
        remove(name_op);
      }

      return [...copy];
    });
  };

  const onInputChange = ({ lang, id, value }) => {
    setAttOptions((prev) => {
      let attIndex = prev.findIndex((att) => att.attId === attKey);
      let copy = [...prev];

      if (attIndex !== -1) {
        let optIndex = copy[attIndex].options.findIndex((op) => op.id === id);
        copy[attIndex].options[optIndex][`${lang}OptionName`] = value;
      }

      return [...copy];
    });
  };

  const onColorChange = ({ id, value }) => {
    setAttOptions((prev) => {
      let attIndex = prev.findIndex((att) => att.attId === attKey);
      let copy = [...prev];

      if (attIndex !== -1) {
        let optIndex = copy[attIndex].options.findIndex((op) => op.id === id);
        copy[attIndex].options[optIndex].color = value;
      }

      return [...copy];
    });
  };

  const onRadioChange = (value) => {
    setAttributes((prev) => {
      let attIndex = prev.findIndex((att) => att.id === attKey);
      let copy = [...prev];

      if (attIndex !== -1) {
        copy[attIndex].defaulttOption = value;
      }

      return [...copy];
    });
  };

  useEffect(() => {
    let currentAtt = attributes.find((att) => att.id === attKey);
    setOptionDefault(currentAtt.defaulttOption || 0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [attOptions, attributes]);

  return (
    <Form.Item noStyle name={[name, "defaulttOption"]}>
      <Form.List name={[name, "options"]}>
        {(fields1, { add, remove, move }) => (
          <>
            <Button
              onClick={onAddOption}
              ref={(el) => (addOptionRef.current[name] = el)}
              style={{ display: "none" }}
            />

            <DragDropContext
              onDragEnd={(result) => onOptionsDragEnd(result, move, attKey)}
              key={name + attKey}>
              <Droppable droppableId="optionsList">
                {(provided) => (
                  <div ref={provided.innerRef} key={name} {...provided.droppableProps}>
                    {fields1.map(({ key: key_op, name: name_op }) => (
                      <Form.Item key={key_op} noStyle>
                        <Draggable draggableId={`${name_op}${key_op}`} index={name_op}>
                          {(provided) => (
                            <Row
                              justify="space-between"
                              wrap={false}
                              align="middle"
                              className="attribute-option"
                              ref={provided.innerRef}
                              {...provided.draggableProps}>
                              <Col style={{ flex: 1 }}>
                                <Row className="w-100" align="middle" gutter={[16, 0]}>
                                  <Col
                                    {...provided.dragHandleProps}
                                    className="attribute-option-dragg">
                                    <MenuDotsSVG fill="#fff" />
                                  </Col>
                                  <Col
                                    className="inner-input"
                                    style={{ paddingLeft: "0px", flex: 1 }}>
                                    <Radio
                                      className="w-100 "
                                      checked={key_op === optionDefault}
                                      value={key_op}
                                      onChange={(e) => onRadioChange(e.target.value)}>
                                      <Row gutter={[0, 28]} justify="space-between" align="middle">
                                        {language.map((lang) => (
                                          <React.Fragment key={lang.code}>
                                            <Col style={{ flex: 1 }} xs={12}>
                                              <Row className="w-100" wrap={false}>
                                                <Col>
                                                  <Row
                                                    align="middle"
                                                    justify="center"
                                                    className="option-lang">
                                                    <Image
                                                      preview={false}
                                                      src={lang.flag}
                                                      width={21}
                                                    />
                                                  </Row>
                                                </Col>
                                                <Col style={{ flex: 1 }}>
                                                  <Form.Item
                                                    name={[name_op, `${lang.code}OptionName`]}
                                                    noStyle>
                                                    <Input
                                                      variant="borderless"
                                                      onChange={(e) =>
                                                        onInputChange({
                                                          value: e.target.value,
                                                          id: key_op,
                                                          lang: `${lang.code}`,
                                                        })
                                                      }
                                                      placeholder="Enter option name"
                                                    />
                                                  </Form.Item>
                                                </Col>
                                              </Row>
                                            </Col>

                                            <Col>
                                              <Divider type="vertical" />
                                            </Col>
                                          </React.Fragment>
                                        ))}
                                      </Row>
                                    </Radio>
                                  </Col>
                                </Row>
                              </Col>
                              <Col>
                                <Row align="middle">
                                  {attributes.find((att) => att.id === attKey)?.colorCheck && (
                                    <Col className="color-input-main">
                                      <Row align="middle" className="color-input-holder clickable">
                                        <Col className="color-input">
                                          <Form.Item name={[name_op, "color"]} noStyle>
                                            <Input
                                              className="color"
                                              type="color"
                                              onChange={(e) =>
                                                onColorChange({
                                                  value: e.target.value,
                                                  id: key_op,
                                                })
                                              }
                                            />
                                          </Form.Item>
                                        </Col>
                                      </Row>
                                    </Col>
                                  )}
                                  <Col>
                                    {fields1.length > 1 && (
                                      <div
                                        className="attribute-option-delete "
                                        onClick={() => {
                                          deleteOption({
                                            key_op,
                                            remove,
                                            name_op,
                                          });
                                        }}>
                                        <Image preview={false} src={Delete} className="clickable" />
                                      </div>
                                    )}
                                  </Col>
                                </Row>
                              </Col>
                            </Row>
                          )}
                        </Draggable>
                      </Form.Item>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </DragDropContext>
          </>
        )}
      </Form.List>
    </Form.Item>
  );
}
