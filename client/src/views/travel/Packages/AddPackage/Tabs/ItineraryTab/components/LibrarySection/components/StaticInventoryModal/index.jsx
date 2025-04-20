import { Button, Col, Divider, Flex, Form, Input, message, Row, Typography } from "antd";
import { useForm } from "antd/es/form/Form";
import LocationInput from "components/common/LocationInput";
import TextEditor from "components/common/TextEditor";
import UploadInput from "components/common/UploadInput";
import { PACKAGE_LIBRARY_ITEMS_STATIC_TYPES } from "constants/PACKAGE_TYPES";
import React, { useState } from "react";
import { API_BASE } from "services/config";
import useAddStaticItemToPackage from "services/travel/packages/static/Mutations/useAddStaticItemToPackage";
import SelectType from "./components/SelectType";
import { SearchSVG } from "assets/jsx-svg";
import SelectItemCard from "./components/SelectItemCard";
import useGroupPackageStaticItems from "services/travel/packages/static/Mutations/useGroupPackageStaticItems";
import useGetPackageLibraryItems from "services/travel/packages/itinerary/Queries/useGetPackageLibraryItems";
import { INVENTORY_TYPE_TABS_KEYS } from "../..";

const StaticInventoryModal = ({ type, tripId, onCancel = () => {}, onUpdate = () => {} }) => {
  const [form] = useForm();
  // queries
  const libraryItemsQuery = useGetPackageLibraryItems({
    tripId,
    type: type,
    source: INVENTORY_TYPE_TABS_KEYS.STATIC,
  });
  const [itemType, setItemType] = useState(PACKAGE_LIBRARY_ITEMS_STATIC_TYPES.SINGLE);
  const [activeStep, setActiveStep] = useState(1);
  const [selectedItems, setSelectedItems] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [isCommingFromSearch, setIsCommingFromSearch] = useState(false);

  const addStaticItemToPackage = useAddStaticItemToPackage({
    onSuccess: () => {
      message.success("Item added successfully");
      if (isCommingFromSearch) {
        setIsCommingFromSearch(false);
        setItemType(PACKAGE_LIBRARY_ITEMS_STATIC_TYPES.SELECT_ONE_FROM_LIST);
        libraryItemsQuery.refetch();
      } else {
        onUpdate();
        form.resetFields();
      }
    },
    onError: (error) => message.error(error?.message || "something went wrong"),
  });

  const groupPackageStaticItems = useGroupPackageStaticItems({
    onSuccess: () => {
      message.success("Item group created successfully");
      onUpdate();
    },
    onError: (error) => message.error(error?.message || "something went wrong"),
  });

  const handelFinish = (values) => {
    addStaticItemToPackage.mutate({
      ...values,
      ...values?.location,
      image: values?.image?.link,
      type,
      destination: values?.location?.city || values?.location?.location,
      tripId,
    });
  };

  return (
    <>
      {activeStep === 1 ? (
        <>
          <div></div>
          <div className="select_item_type">
            <SelectType itemType={itemType} setItemType={setItemType} />
          </div>
        </>
      ) : itemType === PACKAGE_LIBRARY_ITEMS_STATIC_TYPES.SINGLE ? (
        <>
          <Typography.Title
            level={5}
            className="lg_text_semibold modal_title"
            style={{ marginBottom: "4px" }}>
            Add new item
          </Typography.Title>
          <div className="static_inventory_modal_body">
            <Form
              form={form}
              layout="vertical"
              id={"ADD_NEW_ITEM_FORM"}
              onFinish={handelFinish}
              scrollToFirstError={{ behavior: "smooth" }}>
              <Form.Item hidden name={"type"} initialValue={type} />
              <Form.Item hidden name={"tripId"} initialValue={tripId} />
              <Row gutter={[12, 12]}>
                <Col span={12}>
                  <Form.Item
                    name={"name"}
                    label={<p>Name</p>}
                    rules={[{ required: true, message: "Enter item name" }]}>
                    <Input placeholder="item name" />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    name={"location"}
                    label={<p>Location</p>}
                    rules={[{ required: true, message: "Enter item name" }]}>
                    <LocationInput />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    name={"adultPrice"}
                    label={<p>Price for one adult</p>}
                    rules={[
                      { required: true, message: "Enter item price for adult" },
                      {
                        validator: (_, value) => {
                          if (value && value < 0) {
                            return Promise.reject("Price can't be negative");
                          }

                          return Promise.resolve();
                        },
                      },
                    ]}>
                    <Input
                      type={"number"}
                      min={0}
                      placeholder="0"
                      prefix={<span style={{ color: "#AAA" }}>$</span>}
                    />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    name={"childPrice"}
                    label={<p>Price for one child</p>}
                    rules={[
                      { required: true, message: "Enter item price for child" },
                      {
                        validator: (_, value) => {
                          if (value && value < 0) {
                            return Promise.reject("Price can't be negative");
                          }

                          return Promise.resolve();
                        },
                      },
                    ]}>
                    <Input
                      type={"number"}
                      min={0}
                      placeholder="0"
                      prefix={<span style={{ color: "#AAA" }}>$</span>}
                    />
                  </Form.Item>
                </Col>

                <Col span={24}>
                  <Form.Item
                    name={"description"}
                    label={<p>Description</p>}
                    validateTrigger={"submit"}
                    rules={[{ required: true, message: "Enter item name" }]}>
                    <TextEditor />
                  </Form.Item>
                </Col>
                <Col span={24}>
                  <Form.Item
                    name={"image"}
                    label={<p>Image</p>}
                    rules={[{ required: true, message: "Enter item name" }]}>
                    <UploadInput action={`${API_BASE}common/upload-file`} name="image" />
                  </Form.Item>
                </Col>
              </Row>
            </Form>
          </div>
        </>
      ) : (
        <>
          <Typography.Title
            level={5}
            className="lg_text_semibold modal_title"
            style={{ marginBottom: "4px" }}>
            Search
          </Typography.Title>
          <div className="static_inventory_modal_body">
            <Flex gap={16} align="center" style={{ marginBottom: "1rem" }}>
              <Input
                placeholder="Search in items"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                prefix={<SearchSVG />}
              />
              <Button
                type="primary"
                onClick={() => {
                  setIsCommingFromSearch(true);
                  setItemType(PACKAGE_LIBRARY_ITEMS_STATIC_TYPES.SINGLE);
                }}>
                Add new
              </Button>
            </Flex>
            <div className={"selected_items"}>
              {libraryItemsQuery?.data?.ungroupedItems
                ?.filter((item) => selectedItems?.map((el) => el?.id)?.includes(item?.itemId))
                ?.map((item, index) => (
                  <SelectItemCard
                    isDefault={selectedItems?.find((el) => el?.id === item?.itemId)?.isDefault}
                    makeDefault={() => {
                      setSelectedItems(
                        selectedItems?.map((el) => {
                          if (el?.id === item?.itemId) {
                            el.isDefault = true;
                          } else {
                            el.isDefault = false;
                          }
                          return el;
                        }),
                      );
                    }}
                    item={item}
                    key={index}
                    isSelected={true}
                    onSelect={() => {}}
                    onUnSelect={() => {
                      if (selectedItems?.find((el) => el?.id === item?.itemId)?.isDefault) {
                        const temp = selectedItems?.filter((el) => el?.id !== item?.itemId);
                        if (temp?.length > 0) {
                          temp[0].isDefault = true;
                        }
                        setSelectedItems(temp);
                      } else {
                        setSelectedItems(selectedItems?.filter((el) => el?.id !== item?.itemId));
                      }
                    }}
                  />
                ))}
            </div>
            {selectedItems?.length > 0 && <Divider />}
            <div className={"un_selected_items"}>
              {libraryItemsQuery?.data?.ungroupedItems
                ?.filter((item) => !selectedItems?.map((el) => el?.id)?.includes(item?.itemId))
                ?.filter(
                  (el) =>
                    el?.name?.toLowerCase().includes(searchValue?.toLowerCase()) ||
                    el?.title?.toLowerCase().includes(searchValue?.toLowerCase()),
                )
                ?.map((item, index) => (
                  <SelectItemCard
                    item={item}
                    key={index}
                    isSelected={selectedItems?.includes(item?.itemId)}
                    onSelect={() => {
                      if (selectedItems?.length === 0) {
                        setSelectedItems([{ id: item?.itemId, isDefault: true }]);
                      } else {
                        setSelectedItems([{ id: item?.itemId, isDefault: false }, ...selectedItems]);
                      }
                    }}
                    onUnSelect={() => {}}
                  />
                ))}
            </div>
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
            <Button
              size="small"
              onClick={() => {
                if (isCommingFromSearch) {
                  setItemType(PACKAGE_LIBRARY_ITEMS_STATIC_TYPES.SELECT_ONE_FROM_LIST);
                  setIsCommingFromSearch(false);
                } else {
                  setActiveStep(1);
                }
              }}>
              Previous
            </Button>
            <Button
              size="small"
              type="primary"
              loading={addStaticItemToPackage.isPending || groupPackageStaticItems.isPending}
              disabled={
                selectedItems?.length === 0 &&
                itemType === PACKAGE_LIBRARY_ITEMS_STATIC_TYPES.SELECT_ONE_FROM_LIST
              }
              onClick={() => {
                if (itemType === PACKAGE_LIBRARY_ITEMS_STATIC_TYPES.SELECT_ONE_FROM_LIST) {
                  groupPackageStaticItems.mutate({
                    itemIds: selectedItems,
                    type,
                    tripId,
                  });
                } else {
                  form.submit();
                }
              }}>
              {isCommingFromSearch ? "Add" : "Finish"}
            </Button>
          </>
        )}
      </Flex>
    </>
  );
};

export default StaticInventoryModal;
