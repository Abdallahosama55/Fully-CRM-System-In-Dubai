import CustomButton from "components/common/Button";
import React, { useEffect } from "react";
// style
import "./styles.css";
import { AmenitiesSVG, BedSVG, MediaSVG } from "assets/jsx-svg";
import { Checkbox, Col, Form, Input, InputNumber, message, Radio, Row, Select } from "antd";
// API CALLS
import useGetRoomsTypesList from "services/travel/accommodations/Rooms/Queries/useGetRoomsTypesList";
import useGetRoomAccessoriesList from "services/travel/accommodations/Rooms/Queries/useGetRoomAccessoriesList";
import useAddAccommodationRoom from "services/travel/accommodations/Rooms/Mutations/useAddAccommodationRoom";
import useGetRoomByID from "services/travel/accommodations/Rooms/Queries/useGetRoomByID";
import useEditAccommodationRoom from "services/travel/accommodations/Rooms/Mutations/useEditAccommodationRoom";
import { queryClient } from "services/queryClient";
import { TRAVEL_API_URL } from "services/travel/config";
import LoadingPage from "components/common/LoadingPage";
import isValidJson from "utils/isValidJson";
import UploadImagesListInput from "components/common/UploadImagesListInput";

const AddRooms = ({ accommodationID, back, editId, onCancel }) => {
  const [form] = Form.useForm();
  // QUERIES
  const roomsTypesListQuery = useGetRoomsTypesList({
    onSuccess: () => {
      form.setFieldValue(
        "roomTypeId",
        Array.isArray(roomsTypesListQuery?.data) ? roomsTypesListQuery?.data[0]?.id : undefined,
      );
      form.setFieldValue(
        "name",
        Array.isArray(roomsTypesListQuery?.data)
          ? `${roomsTypesListQuery?.data[0]?.name} Room`
          : undefined,
      );
    },
  });

  const accessoriesList = useGetRoomAccessoriesList();
  const roomByIdQuery = useGetRoomByID(editId, {
    enabled: Boolean(editId),
  });

  // SET FORM DATA
  useEffect(() => {
    if (editId && roomByIdQuery.isSuccess) {
      form.setFieldsValue({
        ...roomByIdQuery.data.room,
        accessoriesIds: roomByIdQuery.data?.room?.accessories?.map((el) => el.id),
        images: isValidJson(roomByIdQuery.data.room?.images)
          ? JSON.parse(roomByIdQuery.data.room?.images)
          : [],
      });
    }
  }, [roomByIdQuery.isSuccess, editId]);

  // Mutations
  const addAccommodationMutation = useAddAccommodationRoom(accommodationID, {
    enabled: Boolean(accommodationID),
    onSuccess: (_, payload) => {
      back(payload);
    },
    onError: (error) => {
      message.error(error.message);
    },
  });

  const editAccommodationMutation = useEditAccommodationRoom(editId, {
    onSuccess: (_, payload) => {
      queryClient.invalidateQueries({ queryKey: roomByIdQuery.key });

      back(payload);
    },
    onError: (error) => {
      message.error(error.message);
    },
  });

  const handelFinish = (values) => {
    const temp = {
      ...values,
      images: JSON.stringify(values.images),
    };

    if (editId) {
      editAccommodationMutation.mutate(temp);
    } else {
      addAccommodationMutation.mutate(temp);
    }
  };

  if (
    accessoriesList.isLoading ||
    addAccommodationMutation.isLoading ||
    addAccommodationMutation.isPending ||
    editAccommodationMutation.isPending ||
    editAccommodationMutation.isLoading
  ) {
    return <LoadingPage />;
  }

  return (
    <div className="add_room">
      <Form form={form} layout="vertical" id={"form_inside_tab"} onFinish={handelFinish}>
        <div className="add_room_header space-between">
          <p className="fz-18 fw-600 add_room_header-title">New Room</p>
          <div>
            <CustomButton size="small" type="default" className="mr-1" onClick={onCancel}>
              Cancel
            </CustomButton>
            <CustomButton size="small" className="add_btn" htmlType="submit">
              {editId ? "Save" : "Add"}
            </CustomButton>
          </div>
        </div>
        <div className="section">
          <div className="section_title">
            <BedSVG />
            <span className="fw-500">Room Details</span>
          </div>
          <Row gutter={[16, 12]}>
            <Col md={8} xs={24}>
              <Form.Item
                label="What type of room is this? *"
                name="roomTypeId"
                rules={[{ required: true, message: "You have to select room type" }]}>
                <Select
                  placeholder={"room type"}
                  disabled={roomsTypesListQuery.isLoading}
                  onSelect={(room) =>
                    form.setFieldValue(
                      "name",
                      `${roomsTypesListQuery.data.find((el) => el.id === room).name} Room`,
                    )
                  }
                  options={roomsTypesListQuery.data?.map((el) => ({
                    label: el.name,
                    value: el.id,
                  }))}
                />
              </Form.Item>
            </Col>
            <Col md={16} xs={24}>
              <Form.Item
                label="Room name"
                name="name"
                rules={[{ required: true, message: "Room name is required" }]}>
                <Input placeholder="Room name" />
              </Form.Item>
            </Col>
            <Col md={8} xs={24}>
              <Form.Item
                label="Number of rooms"
                name="numberOfRooms"
                rules={[
                  {
                    validator: (_, value) => {
                      if (!value) {
                        return Promise.reject("Number of rooms is required");
                      }

                      if (value <= 0) {
                        return Promise.reject("Number of rooms must be greater than 0");
                      }

                      return Promise.resolve();
                    },
                  },
                ]}>
                <InputNumber
                  className="w-100"
                  placeholder="Number of rooms"
                  type={"number"}
                  min="0"
                />
              </Form.Item>
            </Col>
            <Col md={8} xs={24}>
              <Form.Item
                label="Number of guests"
                name="numberOfGuest"
                rules={[
                  {
                    validator: (_, value) => {
                      if (!value) {
                        return Promise.reject("Number of guests is required");
                      }
                      if (value <= 0) {
                        return Promise.reject("Number of guests must be greater than 0");
                      }

                      return Promise.resolve();
                    },
                  },
                ]}>
                <InputNumber
                  className="w-100"
                  placeholder="Number of guests"
                  type={"number"}
                  min="0"
                />
              </Form.Item>
            </Col>
            <Col md={8} xs={24}>
              <Form.Item
                label="Room size"
                name="roomSize"
                rules={[
                  {
                    validator: (_, value) => {
                      if (value <= 0) {
                        return Promise.reject("Room size must be greater than 0");
                      }

                      return Promise.resolve();
                    },
                  },
                ]}>
                <Input placeholder="Room size" type={"number"} min="0" addonAfter={`sq. meters`} />
              </Form.Item>
            </Col>
            <Col span={24}>
              <div className="smoking_question">
                <p className="fz-14">Smoking Allowed?</p>
                <div className="smoking_question_options">
                  <Form.Item name="smokingAllowed" initialValue={true}>
                    <Radio.Group>
                      <Radio value={true}>Yes</Radio>
                      <Radio value={false}>No</Radio>
                    </Radio.Group>
                  </Form.Item>
                </div>
              </div>
            </Col>
          </Row>
        </div>
        <div className="section">
          <div className="section_title">
            <BedSVG />
            <span className="fw-500">Beds Details</span>
          </div>
          <Row gutter={[16, 12]}>
            <Col md={6} xs={12}>
              <Form.Item
                label="Single Bed"
                name="singleBed"
                initialValue={0}
                rules={[
                  {
                    validator: (_, value) => {
                      if (value && value < 0) {
                        return Promise.reject("Can't be less than 0");
                      }

                      return Promise.resolve();
                    },
                  },
                ]}>
                <Input placeholder="Single bed" type={"number"} min="0" />
              </Form.Item>
            </Col>
            <Col md={6} xs={12}>
              <Form.Item
                label="Double Bed"
                name="doubelBed"
                initialValue={0}
                rules={[
                  {
                    validator: (_, value) => {
                      if (value && value < 0) {
                        return Promise.reject("Can't be less than 0");
                      }

                      return Promise.resolve();
                    },
                  },
                ]}>
                <Input placeholder="Double bed" type={"number"} min="0" />
              </Form.Item>
            </Col>
            <Col md={6} xs={12}>
              <Form.Item
                label="Large Bed"
                name="largeBed"
                initialValue={0}
                rules={[
                  {
                    validator: (_, value) => {
                      if (value && value < 0) {
                        return Promise.reject("Can't be less than 0");
                      }

                      return Promise.resolve();
                    },
                  },
                ]}>
                <Input placeholder="Large bed" type={"number"} min="0" />
              </Form.Item>
            </Col>
            <Col md={6} xs={12}>
              <Form.Item
                label="Extra-large Bed"
                name="extraLargeBed"
                initialValue={0}
                rules={[
                  {
                    validator: (_, value) => {
                      if (value && value < 0) {
                        return Promise.reject("Can't be less than 0");
                      }

                      return Promise.resolve();
                    },
                  },
                ]}>
                <Input placeholder="Extra-large bed" type={"number"} min="0" />
              </Form.Item>
            </Col>
          </Row>
        </div>
        <div className="section">
          <div className="section_title">
            <MediaSVG />
            <span className="fw-500">Room media</span>
          </div>
          <Form.Item name={"images"}>
            <UploadImagesListInput
              fullWidth={true}
              formatsText={"PNG, JPG"}
              uploadText={"Click to upload"}
              action={TRAVEL_API_URL + "common/add-image"}
              name={"image"}
              maxText={"100 x 75px"}
            />
          </Form.Item>
        </div>
        <div className="section">
          <div className="section_title">
            <AmenitiesSVG />
            <span className="fw-500">Room Amenities</span>
          </div>
          <Form.Item name={"accessoriesIds"}>
            <Checkbox.Group>
              <div style={{ marginBottom: "30px" }}>
                <p className="fz-14 fw-700" style={{ marginBottom: "8px" }}>
                  Bathroom
                </p>
                {accessoriesList?.data["BathroomDetails"]?.map((el) => (
                  <Checkbox
                    key={el.id}
                    value={el.id}
                    className="mr-1"
                    style={{ marginBottom: "8px" }}>
                    {el.name}
                  </Checkbox>
                ))}
              </div>
              <div style={{ marginBottom: "30px" }}>
                <p className="fz-14 fw-700" style={{ marginBottom: "8px" }}>
                  General amenities
                </p>
                {accessoriesList?.data["GeneralAmenities"]?.map((el) => (
                  <Checkbox
                    style={{ marginBottom: "8px" }}
                    key={el.id}
                    value={el.id}
                    className="mr-1">
                    {el.name}
                  </Checkbox>
                ))}
              </div>
              <div style={{ marginBottom: "30px" }}>
                <p className="fz-14 fw-700" style={{ marginBottom: "8px" }}>
                  Outdoors and views
                </p>
                {accessoriesList?.data["OutdoorsAndViews"]?.map((el) => (
                  <Checkbox
                    style={{ marginBottom: "8px" }}
                    key={el.id}
                    value={el.id}
                    className="mr-1">
                    {el.name}
                  </Checkbox>
                ))}
              </div>
              <div style={{ marginBottom: "30px" }}>
                <p className="fz-14 fw-700" style={{ marginBottom: "8px" }}>
                  Food and drinks
                </p>
                {accessoriesList?.data["FoodAndDrinks"]?.map((el) => (
                  <Checkbox
                    style={{ marginBottom: "8px" }}
                    key={el.id}
                    value={el.id}
                    className="mr-1">
                    {el.name}
                  </Checkbox>
                ))}
              </div>
            </Checkbox.Group>
          </Form.Item>
        </div>
      </Form>
    </div>
  );
};

export default AddRooms;
