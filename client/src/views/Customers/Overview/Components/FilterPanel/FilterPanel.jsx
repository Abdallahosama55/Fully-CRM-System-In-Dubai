import { Form, Input, Typography, Button, Row, Col, Radio, Divider } from "antd";
import SelectLookups from "components/SelectLookups";
import Box from "components/Box";
import { RefreshSVG, CloseSVG } from "assets/jsx-svg";

export const FilterPanel = ({ onFilter, isLoading, onCloseFiltersPanel }) => {
  const [form] = Form.useForm();

  const handleFormFinish = (data) => {
    onFilter(data);
    onCloseFiltersPanel();
  };

  const handleResetForm = () => {
    form.resetFields();
    onFilter();
    onCloseFiltersPanel();
  };

  const countryId = Form.useWatch("countryId", form);
  const stateId = Form.useWatch("stateId", form);

  return (
    <Form
      name="filter-form"
      className="cc-w-100 h-100"
      onFinish={handleFormFinish}
      layout="vertical"
      size="middle"
      form={form}>
      <Row align="middle" justify={"space-between"}>
        <Col>
          <Typography.Title level={5} style={{ margin: 0 }}>
            Filter Contacts
          </Typography.Title>
        </Col>
        <Col>
          <CloseSVG className="clickable" onClick={onCloseFiltersPanel} width={10} height={10} />
        </Col>
      </Row>
      <Divider style={{ marginTop: 10 }} />
      <Box className="filter-fields-scroll" style={{ paddingBottom: 10 }}>
        <Form.Item label="Contact Category" name="customerCategoryId">
          <SelectLookups placeholder="Select Category" type={"category"} />
        </Form.Item>
        <Form.Item label="Country" name="countryId">
          <SelectLookups placeholder="Select Country" type={"countries"} showSearch />
        </Form.Item>
        <Form.Item label="State" name="stateId">
          <SelectLookups
            placeholder="Select State"
            type={"states"}
            id={countryId}
            showSearch
            disabled={!countryId}
          />
        </Form.Item>
        <Form.Item label="City" name="city">
          <SelectLookups
            placeholder="Select City"
            type={"cities"}
            id={stateId}
            showSearch
            disabled={!stateId}
          />
        </Form.Item>

        <Form.Item label="Status" name="status" initialValue={undefined}>
          <Radio.Group>
            <Row className="w-100">
              <Col span={24}>
                <Radio value={undefined}>All</Radio>
              </Col>
              <Col span={24}>
                <Radio value="active">Active</Radio>
              </Col>
              <Col span={24}>
                <Radio value="inactive">Inactive</Radio>
              </Col>
            </Row>
          </Radio.Group>
        </Form.Item>
      </Box>
      <Box
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          position: "sticky",
          bottom: -28,
          paddingBlock: 20,
          backgroundColor: "#fafafb",
        }}>
        <Typography.Link onClick={handleResetForm}>Reset</Typography.Link>
        <Button htmlType="submit" type="primary" loading={isLoading}>
          Apply Filters
        </Button>
      </Box>
    </Form>
  );
};

export default FilterPanel;
