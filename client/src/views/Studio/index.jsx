import { ConfigProvider, Form, Row, Col, DatePicker, Input, Select, Divider, Button } from "antd";
import EventsTable from "./Components/EventsTable";
import "./styles.css";
import usePageTitle from "hooks/usePageTitle";
import { DateSVG, SearchSVG, ArrowDownSVG, PluseSVG } from "assets/jsx-svg";
import { useDrawer } from "context/drawerContext";
import EVENT_STATUS from "constants/EVENTES_STATUS";
import AddEvent from "components/Studio/GoLive/AddEvent";
import { useState } from "react";
import { useWatch } from "antd/es/form/Form";
import { useDebounce } from "hooks/useDebounce";

const Event = () => {
  usePageTitle("Events");
  const [form] = Form.useForm();
  const filters = useWatch("filters" , form);
  const debounceFilters = useDebounce(filters , 300);

  const DrawerAPI = useDrawer();
  const [refetchCounter, setRefetchCounter] = useState(0);
  return (
    <div>
      <ConfigProvider theme={{
        "components": {
          "DatePicker": {
            "cellHeight": 18,
            "cellWidth": 28
          }
        }
      }}>
        <Form form={form}>
          <Row gutter={[12, 12]}>
            <Col lg={7}>
              <Form.Item name={["filters", "generalSearch"]}>
                <Input type='search' className='w-100' prefix={<SearchSVG color="#3F65E4" />} placeholder='Search name, email, phone' />
              </Form.Item>
            </Col>
            <Col lg={14}>
              <Row gutter={[12, 12]}>
                <Col lg={12}>
                  <Form.Item name={["filters", "loginRange"]}>
                    <DatePicker.RangePicker
                      className='w-100'
                      placeholder='Select Date'
                      suffixIcon={<DateSVG color="#3F65E4" width={16} height={16} />}
                    />
                  </Form.Item>
                </Col>
                <Col lg={12}>
                  <Form.Item noStyle name={["filters", "statusId"]} className='w-100'>
                    <Select
                      allowClear
                      showSearch
                      className="custom-select w-100"
                      placeholder="Status"
                      suffixIcon={<ArrowDownSVG color={"#3F65E4"} />}
                      options={[
                        { label: "All", value: null },
                        { label: "Scheduled", value: EVENT_STATUS.SCHEDULED },
                        { label: "Confirmed", value: EVENT_STATUS.CONFIRMED },
                        { label: "Passed", value: EVENT_STATUS.PASSED },
                        { label: "Live Now", value: EVENT_STATUS.LIVE },
                        { label: "Cancelled", value: EVENT_STATUS.CANCELED }
                      ]}
                    />
                  </Form.Item>
                </Col>
              </Row>
            </Col>
            <Col lg={3}>
              <div className="w-100" style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <Divider type='vertical' />
                <Button
                  onClick={() => {
                    DrawerAPI.setDrawerContent(<AddEvent onEnd={() => setRefetchCounter(prev => prev + 1)} DrawerAPI={DrawerAPI}/>);
                    DrawerAPI.open("55%");
                  }}
                  icon={<PluseSVG color="#fff" />} type='primary'>New</Button>
              </div>
            </Col>
          </Row>
        </Form>
      </ConfigProvider>
      <EventsTable refetchCounter={refetchCounter} filters={debounceFilters} />
    </div>
  );
};

export default Event;
