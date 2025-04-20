import { useState, useEffect, useCallback } from "react";
import { useForm, useWatch } from "antd/es/form/Form";
// components
import { Button, Col, ConfigProvider, DatePicker, Empty, Flex, Form, Row } from "antd";
import TravelersInput from "components/common/TravelaresInput";
import TurboLoadingPage from "components/common/TurboLoadingPage";
import AddressInput from "components/common/AddressInput";

import ExperienceCard from "./components/ExperienceCard";
import Filters from "./components/Filters";
// utils
import dayjs from "dayjs";
import { getSearchParamsAsURIComponent } from "utils/uri-params";
// api calls
import useGetExperianceSearchResults from "services/travel/booking/Experience/Queries/useGetExperianceSearchResults";
// assets
import { CalenderSVG3, LocationSVG2, SearchSVG } from "assets/jsx-svg";
import empty_booking_screen from "assets/images/empty_booking_screen.png";
// style
import "./styles.css";

const ExperiencesTab = ({ setTabContent, isLocalBook = false, participants }) => {
  const [form] = useForm();
  const [filters, setFilters] = useState({});
  const filterFunction = useCallback(
    (data) => {
      if (!filters || JSON.stringify(filters) === "{}") return data;
      try {
        return data?.filter((el) => {
          if (
            filters?.debounceTitle &&
            !el?.title.toLowerCase().includes(filters?.debounceTitle.toLowerCase())
          ) {
            return false;
          }

          if (
            filters?.priceRange &&
            (el.finalPrice < filters?.priceRange?.[0] || el.finalPrice > filters?.priceRange[1])
          ) {
            return false;
          }

          if (el?.rate && filters?.rates?.length > 0 && !filters?.rates?.includes(el?.rate)) {
            return false;
          }

          if (el?.productCategories && filters?.categories?.length > 0) {
            const categoriesMatch = el?.productCategories?.some((productCategory) =>
              filters?.categories?.includes(productCategory?.productCategoryId),
            );

            if (!categoriesMatch) {
              return false;
            }
          }

          console.log("");
          if (el?.productThemes && filters?.themes?.length > 0) {
            const themesMatch = el?.productThemes?.some((productTheme) =>
              filters?.themes.includes(productTheme?.productThemeId),
            );
            if (!themesMatch) {
              return false;
            }
          }

          return true;
        });
      } catch (error) {
        console.log("error >> ", error);
        return data;
      }
    },
    [filters],
  );

  const location = useWatch("location", form);
  const date = useWatch("date", form);
  const categories = useWatch("categories", form);

  const getExperianceSearchResults = useGetExperianceSearchResults(
    {
      location: location,
      date: dayjs(date).format("YYYY-MM-DD"),
      categories: JSON.stringify({
        adults: categories?.adults || 1,
        children: categories?.childsAges?.length > 0 ? categories?.childsAges.join("-") : undefined,
      }),
    },
    {
      enabled: false,
    },
  );

  useEffect(() => {
    if (getExperianceSearchResults?.isFetching || getExperianceSearchResults.isFetching) {
      setTabContent(<TurboLoadingPage height="calc(100dvh - 200px)" />);
    } else if (
      getExperianceSearchResults?.isSuccess &&
      getExperianceSearchResults?.data?.length === 0
    ) {
      setTabContent(
        <div className="mt-1 center-items" style={{ minHeight: "450px" }}>
          <Empty
            description={
              <p>
                We don't have available <br />
                experiences for your search
              </p>
            }
          />
        </div>,
      );
    } else if (getExperianceSearchResults?.data?.length > 0) {
      setTabContent(
        <Row gutter={[24, 16]}>
          <Col lg={6} md={8} sm={24}>
            <Filters setFilters={setFilters} results={getExperianceSearchResults?.data} />
          </Col>
          <Col lg={18} md={16} sm={24}>
            {filterFunction(getExperianceSearchResults?.data)?.length > 0 ? (
              <Row gutter={[12, 12]}>
                {filterFunction(getExperianceSearchResults?.data)?.map((el, index) => (
                  <ExperienceCard
                    query={`${getSearchParamsAsURIComponent({
                      ...categories,
                      date: dayjs(date).format("YYYY-MM-DD"),
                      location,
                      isLocalBook,
                      participants,
                    })}`}
                    key={el.id}
                    experience={el}
                    index={index}
                    resultsCount={filterFunction(getExperianceSearchResults?.data)}
                    searchInfo={{
                      location,
                      date,
                    }}
                  />
                ))}
              </Row>
            ) : (
              <Flex
                justify="center"
                align="center"
                className="mt-1"
                style={{ minHeight: "450px", border: "1px solid #E5E5EA", borderRadius: "8px" }}>
                <Empty description={"No results match your filters"} image={empty_booking_screen} />
              </Flex>
            )}
          </Col>
        </Row>,
      );
    }
  }, [getExperianceSearchResults?.isFetching, getExperianceSearchResults?.data && filterFunction]);

  const handelFinish = () => {
    getExperianceSearchResults.refetch();
  };

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
      <Form form={form} layout="vertical" onFinish={handelFinish}>
        <div className="serach_block">
          <Row gutter={[12, 12]}>
            <Col xs={24} lg={22}>
              <Row gutter={[12, 12]}>
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
                              return Promise.reject("Enter all childs ages");
                            } else if (value.childsAges.find((age) => age > 12 || age < 0)) {
                              return Promise.reject("Childs ages must be between 0 and 12");
                            }
                          }

                          return Promise.resolve();
                        },
                      },
                    ]}>
                    <TravelersInput withChildAges={true} />
                  </Form.Item>
                </Col>
              </Row>
            </Col>
            <Col xs={24} lg={2}>
              <Button
                type="primary"
                icon={<SearchSVG color="currentColor" />}
                htmlType="submit"
                className="w-100 search_btn">
                Search
              </Button>
            </Col>
          </Row>
        </div>
      </Form>
    </ConfigProvider>
  );
};

export default ExperiencesTab;
