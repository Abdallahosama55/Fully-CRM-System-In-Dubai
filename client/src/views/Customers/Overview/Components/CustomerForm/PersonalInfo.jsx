import { useImperativeHandle, useState } from "react";
import { Form, Input, Col, Row, DatePicker, AutoComplete } from "antd";
import Footer from "./Footer";
import Box from "components/Box";
import AvatarUpload from "views/Management/hr-management/Employees/AddNewEmployee/Components/AvatarUpload";
import SelectLookups from "components/SelectLookups";
import useGetCustomers from "services/Customers/Querys/useGetCustomers";

const PersonalInfo = ({ onClose, onSubmit, isLoading, next, formRef, isCompany }) => {
  const [previewPicData, setPreviewPicData] = useState(null);
  const [form] = Form.useForm();

  useImperativeHandle(
    formRef,
    () => ({
      valid: valid,
    }),
    [formRef],
  );
  const valid = async () => {
    await form.validateFields();
    return { ...form.getFieldValue(), image: previewPicData };
  };
  const onFinish = async (data) => {
    onSubmit({ ...data, image: previewPicData });
  };
  const onNext = async () => {
    await form.validateFields();

    next({ ...form.getFieldValue(), image: previewPicData });
  };

  return (
    <Box
      sx={{
        marginTop: "12px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}>
      <Form
        form={form}
        size={"small"}
        layout="vertical"
        labelAlign="left"
        colon={false}
        onFinish={onFinish}
        labelCol={{
          span: 12,
        }}
        wrapperCol={{
          span: 23,
        }}>
        <PersonalInfoField
          isCompany={isCompany}
          setPreviewPicData={setPreviewPicData}></PersonalInfoField>
      </Form>
      <Footer
        isLoading={isLoading}
        onNext={onNext}
        onSave={() => form.submit()}
        onCancel={onClose}
      />
    </Box>
  );
};
export const PersonalInfoField = ({
  selectedValue,
  setSelectedValue,
  children,
  isCompany,
  columns = 12,
}) => {
  const [value, setValue] = useState("");
  const [page, setPage] = useState(1);

  const { data, isPending, key } = useGetCustomers(
    { page, limit: 10, body: { customerType: "COMPANY", generalSearchValue: value } },
    {
      select: (data) => {
        return data?.data?.data;
      },
    },
  );
  const options = data?.data?.map((item) => {
    return { value: item.fullName, key: item.accountId };
  });

  const onChange = (value, option) => {
    console.log("text", value);
    console.log("option", option);
    setSelectedValue({ value: value, option: option });
  };

  return (
    <>
      <Row>
        <Col span={columns}>
          <Form.Item
            label={isCompany ? "Name" : "Full Name"}
            name="fullName"
            rules={[
              {
                required: true,
              },
            ]}>
            <Input placeholder="Write here" />
          </Form.Item>
        </Col>

        <Col span={columns}>
          <Form.Item label="Id Number" name="customerID">
            <Input placeholder="Write here" />
          </Form.Item>
        </Col>
        {!isCompany && (
          <Col span={columns}>
            <Form.Item label="Birth of Date" name="BOD">
              <DatePicker placeholder="YYYY-MM-DD" style={{ width: "100%" }} />
            </Form.Item>
          </Col>
        )}
        <Col span={columns}>
          <Form.Item label="Contact category" name="categoryId">
            <SelectLookups
              showSearch
              placeholder="Select Category"
              type={"category"}
              addConfig={{
                successMessage: "Category Added",
                addLabel: "Add Category",
                placeholder: "Type category",
                prepareData: (name) => ({
                  name,
                }),
              }}
            />
          </Form.Item>
        </Col>
        {!isCompany && (
          <>
            <Col span={columns}>
              <Form.Item label="Nationality" name="nationalityId">
                <SelectLookups placeholder="Select Nationality" type={"nationality"} showSearch />
              </Form.Item>
            </Col>

            <Col span={columns}>
              <Form.Item label="Job Title" name="jobTitleId">
                <SelectLookups
                  placeholder="Select Job title"
                  type={"job"}
                  showSearch
                  addConfig={{
                    successMessage: "Job title Added",
                    addLabel: "Add Title",
                    placeholder: "Type job title",
                    prepareData: (name) => ({
                      title: name,
                    }),
                  }}
                />
              </Form.Item>
            </Col>
            <Col span={columns}>
              <Form.Item label="Company Name" name="companyName">
                <AutoComplete
                  options={options}
                  // style={{
                  //   width: 200,
                  // }}
                  onChange={onChange}
                  onSearch={(text) => setValue(text)}
                  placeholder="input here"
                  suffixIcon={
                    Object.keys(selectedValue?.option).length === 0 &&
                    selectedValue?.value != "" ? (
                      <span style={{ color: "Blue" }}>New</span>
                    ) : (
                      ""
                    )
                  }
                />
              </Form.Item>
            </Col>
          </>
        )}

        {children && children}
      </Row>
    </>
  );
};

export default PersonalInfo;
