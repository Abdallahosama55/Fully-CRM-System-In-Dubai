import { useState, useEffect } from "react"
import { Button, Col, ConfigProvider, DatePicker, Empty, Form, message, Row, Skeleton } from "antd";
import { useForm, useWatch } from "antd/es/form/Form";
import { CalenderSVG3, LocationSVG2, SearchSVG } from "assets/jsx-svg";
import TravelersInput from "components/common/TravelaresInput";
import dayjs from "dayjs";
import ExperienceCard from "./components/ExperienceCard";
// style
import "./styles.css"
// API CALLS
import Filters from "./components/Filters";
import AddressInput from "components/common/AddressInput";
import LoadingPage from "components/common/LoadingPage";
import EVENTS_MESSAGE_TYPES from "constants/EVENTS_MESSAGE_TYPES";
import CLIENT_ROUTER_URLS from "constants/CLIENT_ROUTER_URLS";
import { ONLINE_BOOKING_TABS_KEYS } from "..";
import useGetBookingPricingCategories from "services/travel/client_side/booking/Experience/Queries/useGetBookingPricingCategories";
import useGetExperianceSearchResults from "services/travel/client_side/booking/Experience/Queries/useGetExperianceSearchResults";

const ExperiencesTab = ({ setTabContent, isInIframe, dataFromBookingWidget }) => {
    const [form] = useForm();
    const [results, setResults] = useState([]);
    const [filterdResults, setFilterdResults] = useState([]);
    const pricingCategoriesQuery = useGetBookingPricingCategories();
    // watch inputs 
    const location = useWatch("location", form)
    const date = useWatch("date", form)
    const categories = useWatch("categories", form);

    // RECIVE THE DATA FROM THE BOOKING WIDGATE
    useEffect(() => {
        console.log(dataFromBookingWidget, "dataFromBookingWidget")
        if (dataFromBookingWidget && !isInIframe && dataFromBookingWidget.activeTab === ONLINE_BOOKING_TABS_KEYS?.EXPERIENCES && (!results || results.length === 0)) {
            form.setFieldsValue({
                ...dataFromBookingWidget,
                date: dataFromBookingWidget?.date ? dayjs(dataFromBookingWidget?.date) : dayjs(),
            })

            handelFinish()
        }
    }, [dataFromBookingWidget, isInIframe])

    const getExperianceSearchResults = useGetExperianceSearchResults(
        {
            location: location,
            date: dayjs(date).format("YYYY-MM-DD"),
            categories: JSON.stringify({
                adults: categories?.adults || 1,
                children: categories?.childsAges?.length > 0 ? categories?.childsAges.join("-") : undefined
            })
        },
        { enabled: false }
    )

    useEffect(() => {
        if (getExperianceSearchResults.data) {
            setResults(getExperianceSearchResults.data)
            setFilterdResults(getExperianceSearchResults.data)
        }

        if (getExperianceSearchResults?.data && getExperianceSearchResults?.data.length === 0) {
            message.warning("No available experiences for your search, try different location")
        }
    }, [getExperianceSearchResults.data, getExperianceSearchResults.isSuccess])

    useEffect(() => {
        if (isInIframe) {
            return;
        }

        if (getExperianceSearchResults.isLoading || getExperianceSearchResults.isFetching) {
            setTabContent(<LoadingPage />)
        } else if (results.length === 0) {
            setTabContent(<div className="mt-1 center-items" style={{ minHeight: "450px" }}>
                <Empty description={<p>We don't have available <br />experiences for your search</p>} />
            </div>)
        } else if (results.length > 0) {
            setTabContent(<Row gutter={[24, 16]}>
                <Col lg={6} md={8} sm={24}>
                    <Filters
                        setFilterdResults={setFilterdResults}
                        results={results}
                    />
                </Col>
                <Col lg={18} md={16} sm={24}>
                    <Row gutter={[12, 12]}>
                        {filterdResults?.map((el, index) => <ExperienceCard
                            query={`adults=${categories?.adults}&childs=${categories?.childs}&childsAges=${categories?.childsAges?.length > 0 ? categories?.childsAges.join("-") : undefined}&date=${dayjs(date).format("YYYY-MM-DD")}`}
                            key={el.id}
                            experience={el}
                            index={index}
                            resultsCount={filterdResults.length}
                            searchInfo={{
                                location,
                                date
                            }}
                        />)}
                    </Row>
                </Col>
            </Row>)
        }
    }, [getExperianceSearchResults.isLoading, results, filterdResults, isInIframe])

    const handelFinish = (values) => {
        if (isInIframe) {
            window.parent.postMessage({
                type: EVENTS_MESSAGE_TYPES.CHANGE_PAGE_EVENT,
                url: CLIENT_ROUTER_URLS.BOOKING.ONLINE_BOOKING,
                data: {
                    ...values,
                    date: dayjs(date).format("YYYY-MM-DD"),
                    activeTab: ONLINE_BOOKING_TABS_KEYS.EXPERIENCES,
                }
            }, '*');
            return;
        }
        getExperianceSearchResults.refetch();
    }

    return (
        <ConfigProvider theme={{
            "components": {
                "DatePicker": {
                    "cellHeight": 20,
                    "cellWidth": 30,
                    "textHeight": 40
                }
            }
        }}>
            <Form form={form} layout="vertical" onFinish={handelFinish}>
                <div className="serach_block">
                    <Row gutter={[12, 12]}>
                        <Col xs={24} lg={22}>
                            <Row gutter={[12, 12]}>
                                <Col xs={24} lg={8}>
                                    <Form.Item
                                        name={"location"}
                                        rules={[{
                                            validator: (_, value) => {
                                                if (!value) {
                                                    return Promise.reject("Enter a location")
                                                }

                                                return Promise.resolve();
                                            }
                                        }]}
                                        validateStatus={form.getFieldError('location').length ? 'error' : ''}
                                    >
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
                                        <TravelersInput form={form} categories={pricingCategoriesQuery.data} />
                                    </Form.Item>
                                </Col>
                            </Row>
                        </Col>
                        <Col xs={24} lg={2}>
                            <Button
                                type="primary"
                                icon={<SearchSVG color={"#fff"} />}
                                htmlType="submit"
                                className="w-100 search_btn" color="dark">
                                Search
                            </Button>
                        </Col>
                    </Row>
                </div>
            </Form>
        </ConfigProvider>
    );
}

export default ExperiencesTab