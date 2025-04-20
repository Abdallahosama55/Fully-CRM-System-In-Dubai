import React from "react";
import {
  ExperiencesSVG,
  FlightSVG,
  HotelSVG,
  TransferSVG,
} from "assets/jsx-svg/PackagesItemsTypesIcons";
// style
import "./styles.css";
import { PACKAGE_ITEMS_TYPES } from "constants/PACKAGE_TYPES";
import { Col, Divider, Flex, Form, Row, Tooltip } from "antd";
import Badge from "components/common/Badge";
import RateStarSVG from "assets/jsx-svg/RateStarSVG";
import isValidSVG from "utils/isValidSVG";
import SvgImage from "components/common/SvgImage";
import { BagSVG, User2SVG } from "assets/jsx-svg";
import isValidJson from "utils/isValidJson";
/*
                "services": [
                    {
                        "type": "FLIGHT",
                        "name": "From Cairo International Airport To Borg El Arab International Airport",
                        "id": 502,
                        "sort": 1,
                        "replacments": [
                            {
                                "id": 19,
                                "isDefault": true,
                                "type": "ONE_WAY",
                                "price": "5.75",
                                "outboundFlightId": 895,
                                "returnFlightId": null,
                                "createdAt": "2025-02-17T08:27:22.027Z",
                                "updatedAt": "2025-02-17T08:27:22.027Z",
                                "itemId": 502,
                                "image": null
                            }
                        ]
                    },
*/
const DayItems = ({ items, form, itemsServices }) => {
  return (
    <div>
      {items?.map((item, itemIndex) => (
        <div key={itemIndex} className="package_day_item_card">
          <div className={"package_day_item_card_header"}>
            <p>
              {(() => {
                switch (item.type) {
                  case PACKAGE_ITEMS_TYPES.ACCOMODATION:
                    return (
                      <div
                        style={{ color: "#CA2800", backgroundColor: "#FFF5ED" }}
                        key={item?.name}
                        className="package_item_card_header_icon">
                        <HotelSVG />
                      </div>
                    );
                  case PACKAGE_ITEMS_TYPES.TRANSFER:
                    return (
                      <div
                        style={{ color: "#027A48", backgroundColor: "#E8FEF2" }}
                        key={item?.name}
                        className="package_item_card_header_icon">
                        <TransferSVG />
                      </div>
                    );
                  case PACKAGE_ITEMS_TYPES.FLIGHT:
                    return (
                      <div
                        style={{ color: "#175CD3", backgroundColor: "#EDF8FF" }}
                        key={item?.name}
                        className="package_item_card_header_icon">
                        <FlightSVG />
                      </div>
                    );
                  case PACKAGE_ITEMS_TYPES.EXPERIENCE:
                    return (
                      <div
                        style={{ color: "#5925DC", backgroundColor: "#EDF8FF" }}
                        key={item?.name}
                        className="package_item_card_header_icon">
                        <ExperiencesSVG />
                      </div>
                    );
                  default:
                    return <div></div>;
                }
              })()}
            </p>
            <p>{item.name}</p>
          </div>
          <div className="package_day_item_card_body">
            <Form.Item name={["items", `${item?.id}`, "type"]} hidden initialValue={item?.type} />
            <Form.Item name={["items", `${item?.id}`, "itemId"]} hidden initialValue={item?.id} />
            <Form.Item
              name={["items", `${item?.id}`, "value"]}
              initialValue={item?.replacments?.find((el) => el?.isDefault)?.id}>
              <div className="package_day_item_card_body_replacments">
                {item?.replacments
                  ?.sort((a, b) => a?.price - b?.price)
                  ?.map((replacment) => {
                    return (
                      <div
                        key={replacment?.id}
                        onClick={() => {
                          form.setFieldValue(["items", `${item?.id}`, "value"], replacment?.id);
                        }}
                        className={`package_day_item_card_body_replacment_card ${
                          itemsServices &&
                          itemsServices[item?.id] &&
                          itemsServices[item?.id]?.value === replacment?.id
                            ? "selected"
                            : ""
                        }`}>
                        <div>
                          {replacment?.room?.images &&
                          isValidJson(replacment?.room?.images) &&
                          Array.isArray(JSON.parse(replacment?.room?.images)) &&
                          JSON.parse(replacment?.room?.images)[0] ? (
                            <Row gutter={8}>
                              <Col span={12}>
                                <img
                                  src={replacment?.image}
                                  alt={"replacment image"}
                                  width={"100%"}
                                  height={"200px"}
                                  style={{ objectFit: "cover", borderRadius: "8px" }}
                                />
                              </Col>
                              <Col span={12}>
                                <img
                                  src={JSON.parse(replacment?.room?.images)[0]?.link}
                                  alt={"room image"}
                                  width={"100%"}
                                  height={"200px"}
                                  style={{ objectFit: "cover", borderRadius: "8px" }}
                                />
                              </Col>
                            </Row>
                          ) : (
                            <img
                              src={replacment?.image}
                              alt={"replacment image"}
                              width={"100%"}
                              height={"200px"}
                              style={{ objectFit: "cover", borderRadius: "8px" }}
                            />
                          )}

                          <div style={{ marginTop: "1rem", marginBottom: "1rem" }}>
                            <Flex gap={4} align={"center"}>
                              <div
                                className={`radio_chcek_select_item ${
                                  itemsServices &&
                                  itemsServices[item?.id] &&
                                  itemsServices[item?.id]?.value === replacment?.id
                                    ? "selected"
                                    : ""
                                }`}>
                                <div></div>
                              </div>
                              <Badge
                                largeIcon={true}
                                icon={(() => {
                                  switch (item.type) {
                                    case PACKAGE_ITEMS_TYPES.ACCOMODATION:
                                      return <HotelSVG />;
                                    case PACKAGE_ITEMS_TYPES.TRANSFER:
                                      return <TransferSVG />;
                                    case PACKAGE_ITEMS_TYPES.FLIGHT:
                                      return <FlightSVG />;
                                    case PACKAGE_ITEMS_TYPES.EXPERIENCE:
                                      return <ExperiencesSVG />;
                                    default:
                                      return <div></div>;
                                  }
                                })()}
                                {...(() => {
                                  switch (item.type) {
                                    case PACKAGE_ITEMS_TYPES.ACCOMODATION:
                                      return { color: "#CA2800", backGroundColor: "#FFF5ED" };
                                    case PACKAGE_ITEMS_TYPES.TRANSFER:
                                      return { color: "#027A48", backGroundColor: "#E8FEF2" };
                                    case PACKAGE_ITEMS_TYPES.FLIGHT:
                                      return { color: "#175CD3", backGroundColor: "#EDF8FF" };
                                    case PACKAGE_ITEMS_TYPES.EXPERIENCE:
                                      return { color: "#5925DC", backGroundColor: "#EDF8FF" };
                                    default:
                                      return {};
                                  }
                                })()}>
                                {replacment?.accommodation?.name ||
                                  replacment?.travelProduct?.name ||
                                  item?.name}
                              </Badge>
                            </Flex>
                            {/* HOTEL CARD */}
                            {replacment?.accommodation?.rate && (
                              <Flex gap={0} align={"center"} style={{ margin: "0.75rem 0" }}>
                                {[...Array(replacment?.accommodation?.rate)].map((_, index) => (
                                  <RateStarSVG key={index} />
                                ))}
                              </Flex>
                            )}
                            {replacment?.pension?.name && (
                              <div>
                                <Badge color={"#2D6ADB"} backGroundColor={"#EFF8FF"}>
                                  {replacment?.pension?.name}
                                </Badge>
                              </div>
                            )}
                            {item.type === PACKAGE_ITEMS_TYPES.ACCOMODATION && (
                              <Flex gap={8} style={{ marginTop: "0.5rem" }} align={"center"}>
                                <p
                                  className="fz-12 fw-400"
                                  style={{ color: "var(--font-secondary)" }}>
                                  ${replacment?.price} / Night
                                </p>
                                {replacment?.room?.name && (
                                  <div>
                                    <Badge color={"#2D6ADB"} backGroundColor={"#EFF8FF"}>
                                      {replacment?.room?.name}
                                    </Badge>
                                  </div>
                                )}
                              </Flex>
                            )}

                            {/* EXPERIANCE CARD */}
                            {replacment?.themes && (
                              <Flex gap={8} style={{ marginTop: "0.5rem" }}>
                                {replacment?.themes?.map(
                                  (theme) =>
                                    theme?.image &&
                                    isValidSVG(theme?.image) && (
                                      <Tooltip key={theme?.name} title={theme?.name}>
                                        <SvgImage svgContent={theme?.image} />
                                      </Tooltip>
                                    ),
                                )}
                              </Flex>
                            )}

                            {/* TRANSFER CARD */}
                            {replacment?.vehicle?.vehicleType?.name && (
                              <Flex gap={4} align={"center"} style={{ marginTop: "0.5rem" }}>
                                <TransferSVG color={"#000"} />
                                {replacment?.vehicle?.vehicleType?.name}
                              </Flex>
                            )}
                            {replacment?.vehicle?.maxPax && (
                              <Flex gap={4} align={"center"}>
                                <User2SVG />
                                {replacment?.vehicle?.maxPax} Seats
                              </Flex>
                            )}
                            {replacment?.vehicle?.maxBags && (
                              <Flex gap={4} align={"center"}>
                                <BagSVG />
                                {replacment?.vehicle?.maxBags} Bags
                              </Flex>
                            )}
                          </div>
                        </div>
                        <div style={{ margin: "1rem 0" }}>
                          <Divider />
                        </div>
                        <Flex align="center" justify="flex-end" gap={4}>
                          <p
                            className="xs_text_regular"
                            style={{ color: "var(--font-secondary)" }}>
                            Price
                          </p>
                          <p
                            className="xs_display_semibold"
                            style={{ color: "var(--font-link)" }}>
                            ${replacment?.price}
                          </p>
                        </Flex>
                      </div>
                    );
                  })}
              </div>
            </Form.Item>
            <Flex vertical align={"center"} justify={"center"}>
              <div>
                <Flex align="center" justify="flex-end" gap={4}>
                  <p
                    className="xs_text_regular"
                    style={{ color: "var(--font-secondary)" }}>
                    Price
                  </p>
                  <p
                    className="xs_display_semibold"
                    style={{ color: "var(--font-link)" }}>
                    $
                    {(itemsServices &&
                      itemsServices[item?.id] &&
                      itemsServices[item?.id]?.value &&
                      item?.replacments?.find((el) => el?.id === itemsServices[item?.id]?.value)
                        ?.price) ||
                      "000"}
                  </p>
                </Flex>
              </div>
            </Flex>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DayItems;
