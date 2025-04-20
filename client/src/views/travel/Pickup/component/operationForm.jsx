import { Col, DatePicker, Form, Input, Row, Select } from "antd";
import { SearchSVG } from "assets/jsx-svg";
import dayjs from "dayjs";
import useManualBookingListAgents from "services/travel/booking/ManualBooking/Queries/useManualBookingListAgents";

const OperationForm = ({ OperationsSearch, form }) => {
  const agentsList = useManualBookingListAgents();

  const handleCalendarChange = (dates) => {
    if (dates && dates[0] && !dates[1]) {
      form.setFieldValue("rangeDate", [dates[0], dates[0]]); // Set second date same as first if it's empty
    } else {
      form.setFieldValue("rangeDate", dates);
    }
  };

  const handleData = (data) => {
    if (data) {
      OperationsSearch.mutate({
        body: {
          ...OperationsSearch.variables.body,
          fromDate: data[0].format("YYYY-MM-DD"),
          toDate: data[1].format("YYYY-MM-DD"),
        },
        params: { ...OperationsSearch.variables.params },
      });
    }
  };

  const handleDateChange = (dates) => {
    if (!dates || dates.length === 0) {
      OperationsSearch.mutate({
        body: {
          ...OperationsSearch.variables.body,
          fromDate: dayjs().format("YYYY-MM-DD"),
          toDate: dayjs().format("YYYY-MM-DD"),
        },
        params: { ...OperationsSearch.variables.params },
      });
    }
  };

  const onOpenChange = (isOpen) => {
    if (!isOpen) {
      const selectedDates = form.getFieldValue("rangeDate");
      handleData(selectedDates);
    }
  };
  return (
    <Form layout="vertical" form={form} style={{ padding: "0 20px" }}>
      <Row justify="space-between" align="bottom" gutter={[16, 16]}>
        <Col span={8}>
          <Form.Item name={["filters", "clientName"]}>
            <Input prefix={<SearchSVG />} placeholder="Search by clint name" />
          </Form.Item>
        </Col>
        <Col span={8}>
          <div className="select-with-prefix">
            <Form.Item name={["filters", "agentId"]} className="w-100">
              <Select
                allowClear
                showSearch
                className="custom-select w-100"
                placeholder="select angent"
                options={agentsList?.data?.map((el) => ({
                  label: el?.fullName,
                  value: el?.id,
                }))}
              />
            </Form.Item>
          </div>
        </Col>
        <Col span={8}>
          <Form.Item name="rangeDate">
            <DatePicker.RangePicker
              className="w-100"
              format={"YYYY/MM/DD"}
              onCalendarChange={handleCalendarChange}
              onOpenChange={onOpenChange}
              onChange={handleDateChange}
            />
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
};

export default OperationForm;
