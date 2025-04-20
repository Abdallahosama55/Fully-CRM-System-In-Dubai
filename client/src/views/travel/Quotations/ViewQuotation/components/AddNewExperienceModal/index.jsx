import { Button, Col, ConfigProvider, DatePicker, Divider, Form, Row } from "antd";
import { useForm, useWatch } from "antd/es/form/Form";
import { CalenderSVG3, LocationSVG2, SearchSVG } from "assets/jsx-svg";
import TravelersInput from "components/common/TravelaresInput";
import dayjs from "dayjs";
import React, { useState } from "react";
import AddressInput from "components/common/AddressInput";
import useGetExperianceSearchResults from "services/travel/booking/Experience/Queries/useGetExperianceSearchResults";
import ExperienceCard from "../ExperienceCard";
import SelectSessionSection from "./SelectSessionSection";

const AddNewExperienceModal = ({ onClose = () => {} }) => {
  const [form] = useForm();
  const location = useWatch("location", form);
  const date = useWatch("date", form);
  const categories = useWatch("categories", form);
  const [experienceViewBookingKey, setExperienceViewBookingKey] = useState(undefined);

  const { data, refetch, isFetching } = useGetExperianceSearchResults(
    {
      location: location,
      date: dayjs(date).format("YYYY-MM-DD"),
      categories: JSON.stringify({
        adults: categories?.adults || 1,
        children: categories?.childsAges?.length > 0 ? categories?.childsAges.join("-") : undefined,
      }),
    },
    { enabled: false },
  );

  return (
    <ConfigProvider
      theme={{
        components: {
          DatePicker: {
            cellHeight: 20,
            cellWidth: 30,
            textHeight: 40,
          },
        },
      }}>
      <Form
        form={form}
        layout="vertical"
        onFinish={refetch}
        hidden={Boolean(experienceViewBookingKey)}>
        <div className="serach_block">
          <Row gutter={[8, 8]}>
            <Col xs={24} lg={8}>
              <Form.Item
                name={"location"}
                rules={[
                  {
                    validator: (_, value) => {
                      if (!value) {
                        return Promise.reject("Enter a location");
                      }

                      return Promise.resolve();
                    },
                  },
                ]}
                validateStatus={form.getFieldError("location").length ? "error" : ""}>
                <AddressInput
                  className="w-100"
                  placeholder="Enter Location"
                  prefix={<LocationSVG2 />}
                />
              </Form.Item>
            </Col>
            <Col xs={24} lg={8}>
              <Form.Item
                name="date"
                initialValue={dayjs()}
                rules={[{ required: true, message: "Select a date" }]}>
                <DatePicker
                  className="w-100"
                  placeholder="Add Date"
                  suffixIcon={<CalenderSVG3 />}
                />
              </Form.Item>
            </Col>
            <Col xs={24} lg={8}>
              <Form.Item
                name="categories"
                required
                initialValue={{ adults: 1 }}
                rules={[
                  {
                    validator: (_, value) => {
                      if (!value) {
                        return Promise.reject("Add travelers data");
                      }

                      if (value?.adults <= 0) {
                        return Promise.reject("Number of adults can't be 0");
                      }

                      if (value?.childs) {
                        if (value?.childs !== value.childsAges.length) {
                          console.log(value);
                          return Promise.reject("Enter all childs ages");
                        } else if (value.childsAges.find((age) => age > 17 || age < 0)) {
                          return Promise.reject("Childs ages must be between 0 and 17");
                        }
                      }

                      return Promise.resolve();
                    },
                  },
                ]}>
                <TravelersInput form={form} />
              </Form.Item>
            </Col>
            <Col xs={24}>
              <Button
                type="primary"
                icon={<SearchSVG color="currentColor" />}
                htmlType="submit"
                block
                loading={isFetching}>
                Search
              </Button>
            </Col>
          </Row>
        </div>
      </Form>
      {Array.isArray(data) && data?.length > 0 && <Divider />}
      {!experienceViewBookingKey &&
        Array.isArray(data) &&
        data?.length > 0 &&
        data?.map((el) => (
          <ExperienceCard
            data={el}
            key={el?.id}
            onViewSessionsClicked={() => setExperienceViewBookingKey(el?.bookingKey)}
            isAddItemCard={true}
          />
        ))}

      {experienceViewBookingKey && (
        <ExperienceCard
          data={data?.find((el) => el?.bookingKey === experienceViewBookingKey)}
          isAddItemCard={true}
          isBackToSearch={true}
          onBackToSearchClicked={() => setExperienceViewBookingKey(undefined)}
        />
      )}

      {experienceViewBookingKey && (
        <SelectSessionSection
          bookingKey={experienceViewBookingKey}
          data={data?.find((el) => el?.bookingKey === experienceViewBookingKey)}
          date={date}
          categories={categories}
          onAddItem={onClose}
        />
      )}
    </ConfigProvider>
  );
};

export default AddNewExperienceModal;
