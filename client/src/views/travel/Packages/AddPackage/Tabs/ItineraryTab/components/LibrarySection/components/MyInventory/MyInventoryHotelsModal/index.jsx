import React, { useState } from "react";
import {
  Button,
  Col,
  Divider,
  Empty,
  Flex,
  Form,
  Input,
  message,
  Radio,
  Row,
  Space,
  Tooltip,
  Typography,
} from "antd";
import { useForm, useWatch } from "antd/es/form/Form";
import { LocationSVG2, SearchSVG } from "assets/jsx-svg";
import useGetMyInventoryAccommodations from "services/travel/packages/myInventory/Queries/useGetMyInventoryAccommodations";
import HotelCard from "../../Cards/HotelCard";
import empty_booking_screen from "assets/images/empty_booking_screen.png";
import useAddAccommodationToLibrary from "services/travel/packages/myInventory/Mutations/useAddAccommodationToLibrary";
import isValidJson from "utils/isValidJson";
import { DeleteOutlined, StarOutlined } from "@ant-design/icons";
import { PACKAGE_LIBRARY_ITEMS_TYPES } from "constants/PACKAGE_TYPES";
import SelectItemType from "../../SelectItemType";
import SystemLocationsInput from "components/common/SystemLocationsInput";

const MyInventoryHotelsModal = ({ tripId, onCancel, onUpdate }) => {
  const [form] = useForm();
  const search = useWatch(["search"], form);
  const [itemType, setItemType] = useState(PACKAGE_LIBRARY_ITEMS_TYPES.SINGLE);
  const [activeStep, setActiveStep] = useState(1);
  const [selectedItems, setSelectedItems] = useState([]);

  const myInventoryAccommodations = useGetMyInventoryAccommodations(
    {
      name: search?.name,
      type: undefined,
      cityId: search?.location?.cityId,
      areaId: search?.location?.areaId,
    },
    { enabled: false },
  );
  const addToLibraryMutation = useAddAccommodationToLibrary({
    onSuccess: () => {
      message.success("Hotel added to library");
      onUpdate();
    },
    onError: (error) => {
      message.error(error?.response?.data?.message || "Failed to add hotel to library");
    },
  });
  const handelAddSingle = (item) => {
    addToLibraryMutation.mutate({
      tripId,
      isByLocation: itemType === PACKAGE_LIBRARY_ITEMS_TYPES.CHANGEABLE_BY_LOCATION,
      destination: search?.location?.city || search?.location?.location || item?.location,
      selectedRooms: [
        {
          isDefault: true,
          name: item?.accommodationName,
          location: item?.location,
          images:
            isValidJson(item?.images) &&
            Array.isArray(JSON.parse(item?.images)) &&
            JSON.parse(item?.images)?.length > 0
              ? JSON.parse(item?.images)[0]?.link
              : null,
          description:
            isValidJson(item?.description) && Array.isArray(JSON.parse(item?.description))
              ? JSON.parse(item?.description)[0]?.value
              : "",
          rates: item?.rates?.map((rate, index) => ({
            bookingKey: rate?.bookingKey,
            amountWithPromotion: rate?.amountWithPromotion,
            isDefaultPension: index === 0,
          })),
        },
      ],
    });
  };

  const handelAddSelectedItems = () => {
    addToLibraryMutation.mutate({
      tripId,
      destination: search?.location?.city || search?.location?.location,
      selectedRooms: selectedItems?.map((el) => ({
        isDefault: el?.isDefault,
        name: el?.accommodationName,
        location: el?.location,
        images:
          isValidJson(el?.images) &&
          Array.isArray(JSON.parse(el?.images)) &&
          JSON.parse(el?.images)?.length > 0
            ? JSON.parse(el?.images)[0]?.link
            : null,
        description:
          isValidJson(el?.description) && Array.isArray(JSON.parse(el?.description))
            ? JSON.parse(el?.description)[0]?.value
            : "",
        rates: el?.rates?.map((rate) => ({
          bookingKey: rate?.bookingKey,
          amountWithPromotion: rate?.amountWithPromotion,
          isDefaultPension: rate?.isDefaultPension,
        })),
      })),
    });
  };
  return (
    <>
      {activeStep === 1 ? (
        <>
          <div></div>
          <div className="select_item_type">
            <SelectItemType itemType={itemType} setItemType={setItemType} />
          </div>
        </>
      ) : (
        <>
          <Typography.Title level={5} className="lg_text_semibold modal_title">
            Hotels
          </Typography.Title>
          <div className="search_engine_block">
            <Form form={form} onSubmitCapture={() => myInventoryAccommodations.refetch()}>
              <div className="mb-1">
                <div className="mb-1">
                  <Form.Item name={["search", "type"]} initialValue={1}>
                    <Radio.Group>
                      <Radio value={1}>
                        <span className="sm_text_regular">Location</span>
                      </Radio>
                      <Radio value={2}>
                        <span className="sm_text_regular">Hotel Name</span>
                      </Radio>
                    </Radio.Group>
                  </Form.Item>
                </div>
              </div>
              <Row gutter={[12, 12]}>
                <Col span={21}>
                  {search?.type === 1 && (
                    <Form.Item
                      name={["search", "location"]}
                      rules={[{ required: true, message: "Enter location" }]}>
                      <SystemLocationsInput
                        placeholder={"Location"}
                        className="w-100"
                        prefix={<LocationSVG2 width={"20px"} height={"20px"} />}
                      />
                    </Form.Item>
                  )}
                  {search?.type === 2 && (
                    <Form.Item
                      name={["search", "name"]}
                      rules={[{ required: true, message: "Enter hotel name" }]}>
                      <Input placeholder={"Hotel name"} className="w-100" />
                    </Form.Item>
                  )}
                </Col>
                <Col span={3}>
                  <Button
                    icon={<SearchSVG color={"#FFF"} />}
                    htmlType="submit"
                    type="primary"
                    className="w-100">
                    Search
                  </Button>
                </Col>
              </Row>
            </Form>
          </div>
          <div className="search_engine_results">
            <Flex className="selected_items_container" gap={8} style={{ marginBottom: "1rem" }}>
              {itemType === PACKAGE_LIBRARY_ITEMS_TYPES.SELECT_ONE_FROM_LIST &&
                selectedItems.map((room) => (
                  <div
                    key={room?.roomId}
                    style={{
                      background: "#fff",
                      padding: "6px",
                      borderRadius: "10px",
                      border: "1px solid #ccc",
                    }}>
                    <Flex align="center" justify="space-between" gap={8}>
                      <div>
                        <Typography.Paragraph
                          className="fz-14 fw-500"
                          style={{ marginBottom: "4px", textTransform: "capitalize" }}>
                          {room?.name}
                        </Typography.Paragraph>
                        {room?.accommodationName && (
                          <Typography.Paragraph
                            style={{ marginBottom: "0", maxWidth: "150px" }}
                            ellipsis={{ tooltip: room?.accommodationName }}
                            className="fz-12 fw-400 gc">
                            {room?.accommodationName}
                          </Typography.Paragraph>
                        )}
                      </div>
                      <Space>
                        <Tooltip title="Delete room">
                          <Button
                            icon={<DeleteOutlined />}
                            className="table_action_button"
                            danger
                            type="primary"
                            onClick={() => {
                              setSelectedItems((prev) => {
                                const isDeletedItemTheDefult = prev.find(
                                  (el) => el?.roomId === room?.roomId,
                                )?.isDefault;
                                let temp = prev.filter((item) => item?.roomId !== room?.roomId);

                                if (isDeletedItemTheDefult && temp?.length > 0) {
                                  temp = [{ ...temp[0], isDefault: true }, ...temp.slice(1)];
                                }

                                return temp;
                              });
                            }}
                          />
                        </Tooltip>
                        <Tooltip title={room?.isDefault ? "Default" : "Set as default"}>
                          <Button
                            icon={<StarOutlined />}
                            className="table_action_button"
                            type={room?.isDefault ? "primary" : "default"}
                            onClick={() => {
                              setSelectedItems((prev) => {
                                return prev.map((item) => {
                                  if (item?.roomId === room?.roomId) {
                                    return { ...item, isDefault: true };
                                  } else {
                                    return { ...item, isDefault: false };
                                  }
                                });
                              });
                            }}
                          />
                        </Tooltip>
                      </Space>
                    </Flex>
                  </div>
                ))}
            </Flex>
            {!myInventoryAccommodations?.data ||
            !Array.isArray(myInventoryAccommodations?.data) ||
            myInventoryAccommodations?.data?.length === 0 ? (
              <Empty
                style={{
                  height: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexDirection: "column",
                }}
                image={empty_booking_screen}
                description={
                  search?.name || search?.location?.location
                    ? "No results mutch your search"
                    : "Enter search query"
                }
              />
            ) : (
              <>
                {myInventoryAccommodations?.data?.map((hotel, index) =>
                  hotel?.inLibrary ? (
                    <></>
                  ) : (
                    <HotelCard
                      key={index}
                      isMultiple={itemType === PACKAGE_LIBRARY_ITEMS_TYPES.SELECT_ONE_FROM_LIST}
                      isSelected={selectedItems?.find((room) => room?.roomId === hotel?.roomId)}
                      data={hotel}
                      onSelect={(item) => {
                        setSelectedItems((prev) => {
                          if (prev.length === 0) {
                            return [{ ...item, isDefault: true }];
                          } else {
                            return [...prev, { ...item, isDefault: false }];
                          }
                        });
                      }}
                      onAdd={(item) => handelAddSingle(item)}
                    />
                  ),
                )}
              </>
            )}
          </div>
        </>
      )}
      <Divider />
      <Flex align="center" justify="space-between" gap={8} style={{ marginTop: "8px" }}>
        {activeStep === 1 ? (
          <>
            <Button size="small" onClick={onCancel}>
              Cancel
            </Button>
            <Button size="small" type="primary" onClick={() => setActiveStep(2)}>
              Next
            </Button>
          </>
        ) : (
          <>
            <Button size="small" onClick={() => setActiveStep(1)}>
              Previous
            </Button>
            <Button
              size="small"
              type="primary"
              onClick={
                itemType === PACKAGE_LIBRARY_ITEMS_TYPES.SELECT_ONE_FROM_LIST
                  ? handelAddSelectedItems
                  : onCancel
              }>
              Finish
            </Button>
          </>
        )}
      </Flex>
    </>
  );
};

export default MyInventoryHotelsModal;
