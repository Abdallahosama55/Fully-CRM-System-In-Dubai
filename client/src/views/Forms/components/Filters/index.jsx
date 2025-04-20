import { CalendarTwoTone, SearchOutlined } from "@ant-design/icons";
import { DatePicker, Flex, Form, Input, Select } from "antd";
import { AirLineDownSVG, ArrowDownSVG, CalendarSVG, CharterSourceSVG, DateSVG, ExchangeSVG } from "assets/jsx-svg";
import StatusFormSvg from "assets/jsx-svg/StatusFormSvg";
import Box from "components/Box";
import AirportInput from "components/common/AirportInput";
import FormAutoSave from "components/FormAutoSave";

import dayjs from "dayjs";

const Filters = ({ setFilter }) => {
  const onFinish = (item) => {
    setFilter({ ...item, fromDate: item?.fromDate && dayjs(item?.fromDate).format("YYYY-MM-DD") });
  };

  return (
<>

    <FormAutoSave
      onFinish={onFinish}
      layout="horizontal"
      labelAlign="left"
    >
      <Flex gap={16}>
        <Form.Item style={{ marginBottom: "0px" }} name="fromDate">
        <div style={{ position: 'relative' }}>
  <CalendarSVG style={{ 
    position: 'absolute', 
    left: '8px', 
    top: '50%', 
    transform: 'translateY(-50%)', 
    zIndex: 1 ,
    
    
  
  }} 
  color="#3F65E4"
  />
  <DatePicker
    allowClear
    style={{ minWidth: "180px", paddingLeft: '30px' }} // Add padding to make space for icon
    placeholder="Select Date"
    suffixIcon={<ArrowDownSVG color={"#2d5feb"} />}
  />
</div>
        </Form.Item>
      </Flex>
    </FormAutoSave>

    <div className="select-with-prefix" style={{ position: "relative", background: "white" ,minWidth:"180px"}}>
  <Form.Item noStyle className="w-100">
    <Select
      allowClear
      showSearch
      className="custom-select w-100 pl-8" // add padding-left to make space for prefix
      placeholder="Status"
      suffixIcon={<ArrowDownSVG color="#3F65E4" />}
      options={[
        { label: "Active", value: "Active" },
        { label: "InActive", value: "InActive" },
        { label: "All", value: null },
      ]}
    />
  </Form.Item>

  {/* Prefix Icon Positioned Absolutely */}
  <div style={{
    position: 'absolute',
    top: '50%',
    left: '10px',
    transform: 'translateY(-50%)',
    pointerEvents: 'none', // make it non-clickable
  }}>
    <StatusFormSvg fill="#3F65E4" width={16} height={16} />
  </div>
</div>
</>

  );
};

export default Filters;
