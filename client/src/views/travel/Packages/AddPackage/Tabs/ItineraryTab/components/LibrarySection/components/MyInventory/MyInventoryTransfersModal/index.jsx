import React, { useState } from "react";
import { useForm } from "antd/es/form/Form";
import {
  Button,
  Col,
  Divider,
  Empty,
  Flex,
  Form,
  message,
  Row,
  Space,
  Tooltip,
  Typography,
} from "antd";
import { LocationSVG2, SearchSVG } from "assets/jsx-svg";
import useGetMyInventoryTransfers from "services/travel/packages/myInventory/Queries/useGetMyInventoryTransfers";
import empty_booking_screen from "assets/images/empty_booking_screen.png";
import TransferCard from "../../Cards/TransferCard";
import useAddTransferToLibrary from "services/travel/packages/myInventory/Mutations/useAddTransferToLibrary";
import { DeleteOutlined, StarOutlined } from "@ant-design/icons";
import { PACKAGE_LIBRARY_ITEMS_TYPES } from "constants/PACKAGE_TYPES";
import SelectItemType from "../../SelectItemType";
import AirportsAccommodationInput from "components/common/AirportsAccommodationInput";

const MyInventoryTransfersModal = ({ tripId, onCancel, onUpdate }) => {
  const [form] = useForm();
  const search = Form.useWatch("search", form);
  const [itemType, setItemType] = useState(PACKAGE_LIBRARY_ITEMS_TYPES.SINGLE);
  const [activeStep, setActiveStep] = useState(1);
  const [selectedItems, setSelectedItems] = useState([]);

  const transfersQuery = useGetMyInventoryTransfers(
    {
      pickupPoint: search?.pickup?.type,
      dropOffPoint: search?.dropOff?.type,
      pickupLocation: search?.pickup?.id,
      dropOffLocation: search?.dropOff?.id,
    },
    { enabled: false },
  );
  // mutations
  const addTransfer = useAddTransferToLibrary({
    onSuccess: () => {
      message.success("Transfer added to library");
      onUpdate();
    },
    onError: (error) => {
      message.error(error?.message || "Failed to add transfer to library");
    },
  });

  const handelAddSingle = (item) => {
    addTransfer.mutate({
      tripId: tripId,
      destination: search?.pickup?.city || search?.dropOff?.city,
      isByLocation: itemType === PACKAGE_LIBRARY_ITEMS_TYPES.CHANGEABLE_BY_LOCATION,
      selecteTransfers: [
        {
          transferId: item?.id,
          vehicleBrand: `${item?.vehicleBrand} / ${item?.vehicleModel}`,
          isDefault: true,
          description: item?.description || "",
          vehicleImage: item?.vehicleImage,
          location: item?.location,
          finalPrice: item?.price,
          pickupPoint: search?.pickup?.type,
          dropOffPoint: search?.dropOff?.type,
          pickupLocation: search?.pickup?.id,
          dropOffLocation: search?.dropOff?.id,
        },
      ],
    });
  };

  const handelAddSelectedItems = () => {
    addTransfer.mutate({
      tripId: tripId,
      destination: search?.pickup?.city || search?.dropOff?.city,
      selecteTransfers: selectedItems?.map((el) => ({
        transferId: el?.id,
        vehicleBrand: `${el?.vehicleBrand} / ${el?.vehicleModel}`,
        isDefault: true,
        description: el?.description || "",
        vehicleImage: el?.vehicleImage,
        location: el?.location,
        finalPrice: el?.price,
        ...search,
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
            Transfer
          </Typography.Title>
          <Form form={form} onFinish={transfersQuery.refetch}>
            <div className="search_engine_block">
              <Row gutter={[12, 12]}>
                <Col span={21}>
                  <Row gutter={[12, 12]}>
                    <Col md={12} xs={24}>
                      <Form.Item
                        name={["search", "pickup"]}
                        rules={[{ required: true, message: "Enter pickup location" }]}>
                        <AirportsAccommodationInput
                          placeholder={"Pickup location"}
                          className="w-100"
                          prefix={<LocationSVG2 width={"20px"} height={"20px"} />}
                        />
                      </Form.Item>
                    </Col>
                    <Col md={12} xs={24}>
                      <Form.Item
                        name={["search", "dropOff"]}
                        rules={[{ required: true, message: "Enter dropOff location" }]}>
                        <AirportsAccommodationInput
                          placeholder={"DropOff location"}
                          className="w-100"
                        />
                      </Form.Item>
                    </Col>
                  </Row>
                </Col>
                <Col span={3}>
                  <Button
                    icon={<SearchSVG color={"#FFF"} />}
                    type="primary"
                    htmlType="submit"
                    className="w-100">
                    Search
                  </Button>
                </Col>
              </Row>
            </div>
          </Form>
          <div className="search_engine_results">
            <Flex className="selected_items_container" gap={8} style={{ marginBottom: "1rem" }}>
              {itemType === PACKAGE_LIBRARY_ITEMS_TYPES.SELECT_ONE_FROM_LIST &&
                selectedItems?.map((transfer) => (
                  <div
                    key={transfer?.id}
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
                          {transfer?.vehicleBrand} / {transfer?.vehicleModel}
                        </Typography.Paragraph>
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
                                  (el) => el?.id === transfer?.id,
                                )?.isDefault;
                                let temp = prev.filter((item) => item?.id !== transfer?.id);

                                if (isDeletedItemTheDefult && temp?.length > 0) {
                                  temp = [{ ...temp[0], isDefault: true }, ...temp.slice(1)];
                                }

                                return temp;
                              });
                            }}
                          />
                        </Tooltip>
                        <Tooltip title={transfer?.isDefault ? "Default" : "Set as default"}>
                          <Button
                            icon={<StarOutlined />}
                            className="table_action_button"
                            type={transfer?.isDefault ? "primary" : "default"}
                            onClick={() => {
                              setSelectedItems((prev) => {
                                return prev.map((item) => {
                                  if (item?.id === transfer?.id) {
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
            {!transfersQuery?.data ||
            !Array.isArray(transfersQuery?.data) ||
            transfersQuery?.data?.length === 0 ? (
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
                  location?.location ? "No results mutch your search" : "Enter search query"
                }
              />
            ) : (
              <>
                {Array.isArray(transfersQuery?.data?.pages) &&
                  transfersQuery?.data?.pages
                    ?.map((item) => item?.rows)
                    .flat()
                    ?.map((transfer, index) => (
                      <TransferCard
                        key={index}
                        data={transfer}
                        isMultiple={itemType === PACKAGE_LIBRARY_ITEMS_TYPES.SELECT_ONE_FROM_LIST}
                        isSelected={selectedItems?.find((item) => item?.id === transfer?.id)}
                        onSelect={() => {
                          setSelectedItems((prev) => {
                            if (prev.length === 0) {
                              return [{ ...transfer, isDefault: true }];
                            } else {
                              return [...prev, { ...transfer, isDefault: false }];
                            }
                          });
                        }}
                        onAdd={() => handelAddSingle(transfer)}
                      />
                    ))}
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

export default MyInventoryTransfersModal;
