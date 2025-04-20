import { Button, Col, Form, Row, Select } from "antd";
import { useForm } from "antd/es/form/Form";
import "./styles.css";
import useGetConstants from "services/Constants/Querys/useGetConstants";
import useGetAllLabelsInfo from "services/newSettings/Query/useGetAllLabelsInfo";
import { useTableFilters } from "context/TableFilterContext";

export const creator = ["company", "customer"];

const FilterSection = () => {
  const { setTableFilters } = useTableFilters();

  const [form] = useForm();

  const { schedulesType, meetingStatus } = useGetConstants({
    refetchOnMount: false,
    select: (data) => {
      return data.data.data;
    },
  });

  const { data: labels } = useGetAllLabelsInfo({
    refetchOnMount: false,
    select: (data) => {
      return data.data.data;
    },
  });

  const onFinish = (values) => {
    setTableFilters({ agenda: { filters: values } });
  };

  const handleClearFilter = () => {
    form.resetFields();
    setTableFilters({ agenda: { filters: {} } });
  };

  return (
    <Form form={form} layout="vertical" onFinish={onFinish} className="filter-header-section">
      <Row>
        <Col span={4}>
          <Form.Item name="label" label="Label">
            <Select placeholder="Select">
              {(labels || []).map((label, index) => (
                <Select.Option key={index} value={label.id} style={{ color: label.color }}>
                  {label.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
        <Col span={4} offset={1}>
          <Form.Item name="scheduleType" label="Schedule Type">
            <Select placeholder="Select">
              {(schedulesType.data || []).map((type, index) => (
                <Select.Option key={index} value={type}>
                  {type}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
        <Col span={4} offset={1}>
          <Form.Item name="creator" label="creator">
            <Select placeholder="Select">
              {creator.map((creator, index) => (
                <Select.Option key={index} value={creator}>
                  {creator}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
        <Col span={4} offset={1}>
          <Form.Item name="status" label="Status">
            <Select placeholder="Select">
              {(meetingStatus.data || []).map((status, index) => (
                <Select.Option key={index} value={status.id} style={{ color: status.color }}>
                  {status.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
      </Row>
      <Row justify="end">
        <Col>
          <Button type="link" onClick={handleClearFilter} id="clear-filter-btn">
            Clear Filters
          </Button>
        </Col>
        <Col>
          <Button type="primary" htmlType="submit" id="search-filter-btn">
            Search
          </Button>
        </Col>
      </Row>
    </Form>
  );
};

export default FilterSection;
