import { Button, Modal, Form, Input, Switch, Select } from "antd";
import filterOption from "components/common/filterOption";
export default function AddEditModal({
  form,
  onFinish,
  isAddEditCityModalOpen,
  handleAddNewCityModalCancel,
  isEditAction,
  CountryList,
  StateList,
  onChangeCountryId,
}) {
  // Filter `option.label` match the user type `input`

  return (
    <Modal
      centered={true}
      width={400}
      title={null}
      open={isAddEditCityModalOpen}
      onCancel={handleAddNewCityModalCancel}
      footer={null}>
      <h3 style={{ textAlign: "center", marginBottom: "1rem" }}>
        {isEditAction ? <span>Edit </span> : <span>Add New </span>}
        City
      </h3>

      <Form requiredMark="optional" form={form} onFinish={onFinish} autoComplete="off">
        <Form.Item
          labelCol={{ span: 24 }} // Default label column width
          wrapperCol={{ span: 24 }}
          // label="Countries"
          label={
            <span>
              Countries
              <span style={{ color: "red", marginLeft: 4 }}>*</span>
            </span>
          }
          name="country_id"
          rules={[
            {
              required: true,
              message: "Please select a country",
            },
          ]}>
          <Select onChange={onChangeCountryId} showSearch filterOption={filterOption}>
            {CountryList.map((country) => (
              <Select.Option key={country.id} value={country.id}>
                {country.country_name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          labelCol={{ span: 24 }} // Default label column width
          wrapperCol={{ span: 24 }}
          // label="Countries"
          label={
            <span>
              States
              <span style={{ color: "red", marginLeft: 4 }}>*</span>
            </span>
          }
          name="state_id"
          rules={[
            {
              required: true,
              message: "Please select a state",
            },
          ]}>
          <Select showSearch filterOption={filterOption}>
            {StateList.map((state) => (
              <Select.Option key={state.id} value={state.id}>
                {state.state_name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          labelCol={{ span: 24 }} // Default label column width
          wrapperCol={{ span: 24 }} // Default wrapper (input) column width
          name="city_name"
          label={
            <span>
              City
              <span style={{ color: "red", marginLeft: 4 }}>*</span>
            </span>
          }
          rules={[
            {
              required: true,
              message: "Please enter city name",
            },
            {
              type: "string",
              min: 3,
              message: "city name must be at least 3 characters",
            },
          ]}>
          <Input placeholder="City name" />
        </Form.Item>
        {isEditAction && (
          <Form.Item
            label={
              <span>
                Status
                <span style={{ color: "red", marginLeft: 4 }}>*</span>
              </span>
            }
            rules={[{ required: true, message: "This field is required" }]}
            colon={false}
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 20 }}
            name="status"
            valuePropName="checked">
            <Switch style={{ float: "right" }} />
          </Form.Item>
        )}

        <Form.Item>
          <div style={{ display: "flex", justifyContent: "space-around" }}>
            <Button
              size="small"
              style={{ width: "48%" }}
              block
              onClick={handleAddNewCityModalCancel}>
              Cancel
            </Button>
            <span style={{ width: 5 }}></span>
            <Button size="small" htmlType="submit" className="btn-add" style={{ width: "48%" }}>
              {isEditAction ? <span>Edit</span> : <span>Add</span>}
            </Button>
          </div>
        </Form.Item>
      </Form>
    </Modal>
  );
}
