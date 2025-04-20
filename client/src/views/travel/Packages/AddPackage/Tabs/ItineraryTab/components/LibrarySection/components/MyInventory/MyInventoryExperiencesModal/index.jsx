import React, { useState } from "react";
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
  Switch,
  Tooltip,
  Typography,
} from "antd";
import { useForm, useWatch } from "antd/es/form/Form";
import LocationInput from "components/common/LocationInput";
import { LocationSVG2, SearchSVG } from "assets/jsx-svg";
import useGetMyInventoryExperiences from "services/travel/packages/myInventory/Queries/useGetMyInventoryExperiences";
import ExperienceCard from "../../Cards/ExperienceCard";
import empty_booking_screen from "assets/images/empty_booking_screen.png";
import useAddExperienceToLibrary from "services/travel/packages/myInventory/Mutations/useAddExperienceToLibrary";
import { DeleteOutlined, StarOutlined } from "@ant-design/icons";
import { PACKAGE_LIBRARY_ITEMS_TYPES } from "constants/PACKAGE_TYPES";
import SelectItemType from "../../SelectItemType";

const MyInventoryExperiencesModal = ({ tripId, onCancel, onUpdate }) => {
  const [form] = useForm();
  const location = useWatch("location", form);
  const [selectedItems, setSelectedItems] = useState([]);
  const [itemType, setItemType] = useState(PACKAGE_LIBRARY_ITEMS_TYPES.SINGLE);
  const [activeStep, setActiveStep] = useState(1);
  const experiencesQuery = useGetMyInventoryExperiences(
    {
      location: location?.location,
      categories: JSON.stringify({
        adults: 1,
      }),
    },
    { enabled: false },
  );
  // mutations
  const addExperiance = useAddExperienceToLibrary({
    onSuccess: () => {
      message.success("Experience added to library");
      onUpdate();
    },
    onError: (error) => {
      message.error(error?.message || "Failed to add experience to library");
    },
  });

  const handelAddSingle = (item) => {
    addExperiance.mutate({
      tripId: tripId,
      destination: location?.city || location?.location,
      isByLocation: itemType === PACKAGE_LIBRARY_ITEMS_TYPES.CHANGEABLE_BY_LOCATION,
      selecteExperinces: [
        {
          location: item?.location,
          isDefault: true,
          title: item?.title,
          description: item?.description,
          bookingKey: item?.bookingKey,
          finalPrice: item?.finalPrice,
          image:
            Array.isArray(item?.images) && item?.images.length > 0 ? item?.images[0]?.url : null,
        },
      ],
    });
  };

  const handelAddSelectedItems = () => {
    addExperiance.mutate({
      tripId: tripId,
      destination: location?.city || location?.location,
      selecteExperinces: selectedItems?.map((el) => ({
        location: el?.location,
        isDefault: el?.isDefault,
        title: el?.title,
        description: el?.description,
        bookingKey: el?.bookingKey,
        finalPrice: el?.finalPrice,
        image: Array.isArray(el?.images) && el?.images.length > 0 ? el?.images[0]?.url : null,
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
            Experiences
          </Typography.Title>
          <div className="search_engine_block">
            <Typography.Paragraph className="sm_text_regular" style={{ marginBottom: "0.5rem" }}>
              Experience location
            </Typography.Paragraph>
            <Form form={form} onFinish={experiencesQuery.refetch}>
              <Row gutter={[12, 12]}>
                <Col span={21}>
                  <Form.Item
                    name={"location"}
                    rules={[{ required: true, message: "Enter location" }]}>
                    <LocationInput
                      placeholder={"Istanbul"}
                      className="w-100"
                      prefix={<LocationSVG2 width={"20px"} height={"20px"} />}
                    />
                  </Form.Item>
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
                selectedItems.map((experience) => (
                  <div
                    key={experience?.id}
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
                          {experience?.title}
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
                                  (el) => el?.id === experience?.id,
                                )?.isDefault;
                                let temp = prev.filter((item) => item?.id !== experience?.id);

                                if (isDeletedItemTheDefult && temp?.length > 0) {
                                  temp = [{ ...temp[0], isDefault: true }, ...temp.slice(1)];
                                }

                                return temp;
                              });
                            }}
                          />
                        </Tooltip>
                        <Tooltip title={experience?.isDefault ? "Default room" : "Set as default"}>
                          <Button
                            icon={<StarOutlined />}
                            className="table_action_button"
                            type={experience?.isDefault ? "primary" : "default"}
                            onClick={() => {
                              setSelectedItems((prev) => {
                                return prev.map((item) => {
                                  if (item?.id === experience?.id) {
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
            {!experiencesQuery?.data ||
            !Array.isArray(experiencesQuery?.data) ||
            experiencesQuery?.data?.length === 0 ? (
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
                {experiencesQuery?.data?.map((experience, index) => (
                  <ExperienceCard
                    key={index}
                    data={experience}
                    isMultiple={itemType === PACKAGE_LIBRARY_ITEMS_TYPES.SELECT_ONE_FROM_LIST}
                    isSelected={selectedItems?.find((item) => item?.id === experience?.id)}
                    onSelect={() => {
                      setSelectedItems((prev) => {
                        if (prev.length === 0) {
                          return [{ ...experience, isDefault: true }];
                        } else {
                          return [...prev, { ...experience, isDefault: false }];
                        }
                      });
                    }}
                    onAdd={() => handelAddSingle(experience)}
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

export default MyInventoryExperiencesModal;
