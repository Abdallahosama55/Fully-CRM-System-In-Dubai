import { Button, Col, DatePicker, Form, Input, message, Row, Select, Tag } from "antd";
import { useForm, useWatch } from "antd/es/form/Form";
import { ArrowDownSVG, DateSVG } from "assets/jsx-svg";
import CounterInput from "components/common/CounterInput";
import Section from "components/common/Section";
import UploadImagesListInput from "components/common/UploadImagesListInput";
import { PACKAGE_OFFERED_TYPES } from "constants/PACKAGE_TYPES";
import dayjs from "dayjs";
import { useDebounce } from "hooks/useDebounce";
import React, { useEffect, useState } from "react";
import { TRAVEL_API_URL } from "services/travel/config";
import useListDestinations from "services/travel/packages/common/Queries/useListDestinations";
import useListPackagesWhoCanJoin from "services/travel/packages/common/Queries/useListPackagesWhoCanJoin";
import useListPackagesThemes from "services/travel/packages/common/Queries/useListPackagesThemes";
import useGetTripById from "services/travel/packages/trip/Queries/useGetTripById";
import useAddPackageTrip from "services/travel/packages/trip/Mutations/useAddPackageTrip";
import { ADD_PACKAGES_TABS_KEYS } from "../..";
import LoadingPage from "components/common/LoadingPage";
import useEditPackageTrip from "services/travel/packages/trip/Mutations/useEditPackageTrip";
import CitiesInput from "components/common/CitiesInput";

const BasicTab = ({ id, setId, setPackageType, setActiveTab }) => {
  const [form] = useForm();
  const type = useWatch("type", form);
  const startDate = useWatch("startDate", form);
  useEffect(() => {
    if (type) {
      setPackageType(type);
    }
  }, [type]);

  // queries
  const packagesThemes = useListPackagesThemes();
  const whoCanJoinList = useListPackagesWhoCanJoin();
  const basicTabGetByIdQuery = useGetTripById(id, { enabled: !!id });
  useEffect(() => {
    console.log(
      basicTabGetByIdQuery?.data?.tripData?.destinations?.map((el, index) => {
        return {
          city: el,
          id: basicTabGetByIdQuery?.tripData?.destinationIds[index],
        };
      }),
    );
    if (basicTabGetByIdQuery?.data?.tripData && basicTabGetByIdQuery?.isSuccess) {
      form.setFieldsValue({
        ...basicTabGetByIdQuery?.data?.tripData,
        startDate: basicTabGetByIdQuery?.data?.tripData?.startDate
          ? dayjs(basicTabGetByIdQuery?.data?.tripData?.startDate)
          : dayjs(),
        endDate: basicTabGetByIdQuery?.data?.tripData?.endDate
          ? dayjs(basicTabGetByIdQuery?.data?.tripData?.endDate)
          : dayjs(),
        themes: Array?.isArray(basicTabGetByIdQuery?.data?.themes)
          ? basicTabGetByIdQuery?.data?.themes?.map((el) => el?.id)
          : [],
        whoCanJoin: Array?.isArray(basicTabGetByIdQuery?.data?.whoCanJoin)
          ? basicTabGetByIdQuery?.data?.whoCanJoin?.map((el) => el?.id)
          : [],
        destinations: basicTabGetByIdQuery?.data?.tripData?.destinations?.map((el, index) => {
          return {
            city: el,
            id: basicTabGetByIdQuery?.tripData?.destinationIds[index],
          };
        }),
      });
    }
  }, [basicTabGetByIdQuery?.data]);

  // mutations
  const addPackageMutation = useAddPackageTrip({
    onSuccess: (res) => {
      setId(res);
      setActiveTab(ADD_PACKAGES_TABS_KEYS?.ITINERARY);
      message.success("Trip intalized successfully");
    },
    onError: (error) => {
      message.error(error?.message);
    },
  });

  const editPackageMutation = useEditPackageTrip(id, {
    onSuccess: () => {
      setActiveTab(ADD_PACKAGES_TABS_KEYS?.ITINERARY);
    },
    onError: (error) => {
      message.error(error?.message);
    },
  });

  const handelFinish = (values) => {
    console.log("values", values);
    const temp = {
      ...values,
      startDate:
        values?.type === PACKAGE_OFFERED_TYPES?.ONE_TIME
          ? dayjs(values?.startDate)?.format("DD-MM-YYYY")
          : undefined,
      endDate:
        values?.type === PACKAGE_OFFERED_TYPES?.ONE_TIME
          ? dayjs(values?.endDate)?.format("DD-MM-YYYY")
          : undefined,
      destinations: values?.destinations?.map((el) => el?.city),
      destinationIds: values?.destinations?.map((el) => el?.id),
    };

    if (id) {
      editPackageMutation.mutate(temp);
    } else {
      addPackageMutation.mutate(temp);
    }
  };

  if (basicTabGetByIdQuery?.isLoading) {
    return <LoadingPage />;
  }

  return (
    <Section
      title={"Trip Basic Info"}
      headerEnd={
        <Button
          type="primary"
          onClick={() => form?.submit()}
          loading={editPackageMutation?.isPending || addPackageMutation.isPending}>
          Save & Next
        </Button>
      }>
      <Form form={form} layout="vertical" onFinish={handelFinish}>
        <Row gutter={[16, 16]}>
          <Col md={12} xs={24}>
            <Form.Item
              required
              name={"name"}
              label={<p className="sm_text_medium">Trip Name</p>}
              rules={[{ required: true, message: "Enter trip name" }]}>
              <Input placeholder="Istanbul and Antalya Trip" />
            </Form.Item>
          </Col>
          <Col md={12} xs={24}>
            <Form.Item
              name={"destinations"}
              label={<p className="sm_text_medium">Destinations</p>}
              rules={[{ required: true, message: "Enter destinations" }]}
              className="w-100">
              <CitiesInput />
            </Form.Item>
          </Col>
          <Col md={12} xs={24}>
            <Form.Item
              name={"type"}
              label={<p className="sm_text_medium">Trip Offered</p>}
              rules={[{ required: true, message: "Select offered" }]}
              initialValue={PACKAGE_OFFERED_TYPES.RECURRING_TRIP}>
              <Select
                placeholder="Select offered type"
                suffixIcon={<ArrowDownSVG />}
                options={[
                  { label: "Recurring Trip", value: PACKAGE_OFFERED_TYPES.RECURRING_TRIP },
                  { label: "One Time", value: PACKAGE_OFFERED_TYPES.ONE_TIME },
                ]}
              />
            </Form.Item>
          </Col>
          {!type ? (
            <Col md={12} xs={24}></Col>
          ) : type === PACKAGE_OFFERED_TYPES.RECURRING_TRIP ? (
            <Col md={12} xs={24}>
              <div style={{ width: "170px" }}>
                <Form.Item
                  name={"length"}
                  label={<p className="sm_text_medium">Trip Length</p>}
                  rules={[{ required: true, message: "Enter trip length" }]}
                  initialValue={1}>
                  <CounterInput min={1} counterText="days" />
                </Form.Item>
              </div>
            </Col>
          ) : (
            <>
              <Col md={6} xs={12}>
                <Form.Item
                  name={"startDate"}
                  label={<p className="sm_text_medium">Start Date</p>}
                  initialValue={dayjs()}
                  rules={[{ required: true, message: "Select start date" }]}>
                  <DatePicker suffixIcon={<DateSVG />} className="w-100" />
                </Form.Item>
              </Col>
              <Col md={6} xs={12}>
                <Form.Item
                  name="endDate"
                  label={<p className="sm_text_medium">End Date</p>}
                  initialValue={dayjs().add(1, "day")}
                  rules={[
                    { required: true, message: "Select end date" },
                    {
                      validator: (_, value) => {
                        if (!value) {
                          return Promise.reject("Select end date");
                        }

                        if (dayjs(value)?.isBefore(startDate, "day")) {
                          return Promise.reject(new Error("Cannot be before the start date"));
                        }

                        return Promise.resolve();
                      },
                    },
                  ]}>
                  <DatePicker
                    suffixIcon={<DateSVG />}
                    className="w-100"
                    disabledDate={(current) => current && current.isBefore(startDate, "day")}
                  />
                </Form.Item>
              </Col>
            </>
          )}
          <Col span={24}>
            <Form.Item
              name={"images"}
              label={<p className="sm_text_medium">Upload images</p>}
              required
              rules={[
                {
                  validator: (_, value) => {
                    if (!value || value?.length === 0) {
                      return Promise.reject("Upload at least one image");
                    }

                    return Promise.resolve();
                  },
                },
              ]}>
              <UploadImagesListInput
                withCoverSelect={true}
                formatsText={"PNG, JPG"}
                uploadText={"Click to upload"}
                action={TRAVEL_API_URL + "common/add-image"}
                name={"image"}
                maxText={"100 x 75px"}
              />
            </Form.Item>
          </Col>
          <Col md={8} xs={24}>
            <Form.Item
              name={"whoCanJoin"}
              label={<p className="sm_text_medium">Who can join the trip</p>}
              rules={[{ required: true, message: "Select who can join" }]}
              className="w-100">
              <Select
                showSearch
                filterOption={(input, option) =>
                  option?.label?.toLowerCase()?.indexOf(input?.toLowerCase()) >= 0
                }
                allowClear
                placeholder="Select passengers types"
                suffixIcon={<></>}
                mode="multiple"
                tagRender={(props) => <Tag {...props}>{props?.label}</Tag>}
                options={whoCanJoinList?.data?.map((el) => {
                  return { label: el?.name, value: el?.id };
                })}
              />
            </Form.Item>
          </Col>
          <Col md={8} xs={24}>
            <Form.Item
              name={"themes"}
              label={<p className="sm_text_medium">Trip Theme</p>}
              rules={[{ required: true, message: "Select theme" }]}
              className="w-100">
              <Select
                showSearch
                filterOption={(input, option) =>
                  option?.label?.toLowerCase()?.indexOf(input?.toLowerCase()) >= 0
                }
                allowClear
                placeholder="Select package themes"
                suffixIcon={<></>}
                mode="multiple"
                tagRender={(props) => <Tag {...props}>{props?.label}</Tag>}
                options={packagesThemes?.data?.map((el) => {
                  return { label: el?.name, value: el?.id };
                })}
              />
            </Form.Item>
          </Col>
          <Col md={8} xs={24}>
            <Form.Item
              name={"tags"}
              label={<p className="sm_text_medium">Tags</p>}
              rules={[{ required: true, message: "Enter tags" }]}
              className="w-100">
              <Select
                allowClear
                placeholder="Enter package tags"
                suffixIcon={<></>}
                mode="tags"
                tagRender={(props) => <Tag {...props}>{props?.label}</Tag>}
              />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Section>
  );
};

export default BasicTab;
