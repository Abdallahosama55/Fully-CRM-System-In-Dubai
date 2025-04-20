import { useContext, useEffect, useState } from "react";
import {
  AutoComplete,
  Avatar,
  Button,
  Col,
  Form,
  Image,
  Input,
  Row,
  Select,
  Tooltip,
  Typography,
  Upload,
} from "antd";
import { useForm } from "antd/es/form/Form";

import googleDriveImg from "assets/images/GoogleDrive.png";
import { filesExtentionsImg } from "utils/filesExtentionsImg";
import { axiosCatch } from "utils/axiosUtils";
import { ArrowDownSVG, DeleteSVG, EyeSVG, TicketSVG } from "assets/jsx-svg";
import EmployeeService from "services/Employee/employee.service";
import CommonService from "services/common.service";

import "./styles.css";
import TicketService from "services/ticket.service";
import { updateFirebaseTicketDate } from "utils/firebase.utils";
import userContext from "context/userContext";
import { useNotification } from "context/notificationContext";

export default function AddTicket() {
  const { openNotificationWithIcon } = useNotification();
  const [form] = useForm();
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [employeesList, setEmployeesList] = useState([]);
  const [searchLoading, setSearchLoading] = useState(false);
  const [employeeSearch, setEmployeeSearch] = useState("");
  const [customersList, setCustomersList] = useState([]);
  const [customerSearch, setCustomerSearch] = useState("");
  const [addingLoading, setAddingLoading] = useState(false);

  const { user } = useContext(userContext);
  const onFinish = async (values) => {
    try {
      setAddingLoading(true);
      const formData = new FormData();
      uploadedFiles.forEach((file, index) => {
        formData.append(index, file);
      });
      formData.append("email", values.customer);
      formData.append("fullName", values.customer.split("@")[0]);
      formData.append("title", values.title);
      formData.append("content", values.description);
      values.type && formData.append("type", values.type);
      values.priority && formData.append("priority", values.priority);
      values.assignTo && formData.append("employeeId", values.assignTo);

      const res = await TicketService.add(formData);
      await updateFirebaseTicketDate(res.data.data.id, user.companyId, `company-${Date.now()}`);
      openNotificationWithIcon("success", "Ticket Added Successfully");
      window.open(res.data.data.link, "_blank");
    } catch (err) {
      axiosCatch(err);
    } finally {
      setAddingLoading(false);
    }
    console.log(values);
  };

  const draggerProps = {
    name: "file",
    multiple: true,
    action: false,
    beforeUpload: () => false,
    onChange: (info) => {
      const foundIndex = uploadedFiles.findIndex((file) => file.name === info.file.name);
      if (foundIndex < 0) {
        setUploadedFiles((prev) => [...prev, info.file]);
      }
    },
    showUploadList: false,
  };

  const onFileDelete = (id) => {
    const filteredFiles = uploadedFiles.filter((file) => file.uid !== id);

    setUploadedFiles(filteredFiles);
    form.setFieldValue("uploadedFiles", { fileList: filteredFiles });
  };

  useEffect(() => {
    const delayDebounceFn = setTimeout(
      () => {
        (async () => {
          try {
            setSearchLoading(true);
            const res = await EmployeeService.search({
              limit: 100,
              searchKey: employeeSearch,
            });

            setEmployeesList(res.data.data.rows);
          } catch (err) {
            axiosCatch(err);
          } finally {
            setSearchLoading(false);
          }
        })();
      },
      employeeSearch.length > 0 ? 500 : 0,
    );

    return () => clearTimeout(delayDebounceFn);
  }, [employeeSearch]);

  useEffect(() => {
    const delayDebounceFn = setTimeout(
      () => {
        (async () => {
          try {
            const res = await CommonService.customerSearch({
              limit: 100,
              searchKey: customerSearch,
            });

            setCustomersList(res.data.data);
          } catch (err) {
            axiosCatch(err);
          }
        })();
      },
      customerSearch.length > 0 ? 500 : 0,
    );

    return () => clearTimeout(delayDebounceFn);
  }, [customerSearch]);

  return (
    <section className="body-content" style={{ background: "#fff", paddingBlock: "0px" }}>
      <div
        className="form-layout"
        style={{ background: "#27294205", border: "1px solid #2729420F" }}>
        <Form form={form} onFinish={onFinish} layout="vertical">
          <Form.Item
            name="title"
            label="Title"
            rules={[{ required: true, message: "Please Enter Title" }]}>
            <Input placeholder="Write A Title" />
          </Form.Item>

          <Form.Item
            name="description"
            label="Description"
            rules={[{ required: true, message: "Please Enter Description" }]}>
            <Input.TextArea rows={5} style={{ resize: "none" }} placeholder="Write A Description" />
          </Form.Item>

          <Form.Item>
            <Row align="middle" gutter={[16, 16]}>
              <Col xs={24} lg={12}>
                <Form.Item
                  name="customer"
                  label="Customer Email"
                  rules={[{ required: true, message: "Please Enter Customer Email" }]}>
                  <AutoComplete
                    options={customersList.map((customer) => ({
                      label: customer.email,
                      value: customer.email,
                    }))}
                    className="w-100"
                    style={{ width: 200 }}
                    onSearch={(text) => setCustomerSearch(text)}
                    placeholder="Select or Add"
                    suffixIcon={<ArrowDownSVG />}
                  />
                </Form.Item>
              </Col>
              <Col xs={24} lg={12}>
                <Form.Item name="assignTo" label="Assign To">
                  <Select
                    allowClear
                    className="employee-select"
                    showSearch
                    placeholder="Select"
                    loading={searchLoading}
                    defaultActiveFirstOption={false}
                    filterOption={false}
                    searchValue={employeeSearch}
                    onSearch={(e) => setEmployeeSearch(e)}
                    options={employeesList.map((employee) => ({
                      label: (
                        <Row align="middle" gutter={[12, 0]} wrap={false} key={employee.id}>
                          <Col>
                            <Avatar src={employee.profileImage} size={30} />
                          </Col>
                          <Col>
                            <Typography.Text
                              style={{ maxWidth: "120px", lineHeight: "38px" }}
                              ellipsis>
                              {employee.fullName}
                            </Typography.Text>
                          </Col>
                        </Row>
                      ),
                      value: employee.id,
                    }))}
                  />
                </Form.Item>
              </Col>
            </Row>
          </Form.Item>

          <Form.Item>
            <Row align="middle" gutter={[16, 16]}>
              <Col xs={24} md={12} lg={8}>
                <Form.Item name="priority" label="Priority">
                  <Select
                    placeholder="Select"
                    options={[
                      {
                        label: (
                          <div className="ticket_priority_option">
                            <TicketSVG color="#F40055" />
                            High
                          </div>
                        ),
                        value: "HIGH",
                      },
                      {
                        label: (
                          <div className="ticket_priority_option">
                            <TicketSVG color="#F8B51D" />
                            MEDIUM
                          </div>
                        ),
                        value: "MEDIUM",
                      },
                      {
                        label: (
                          <div className="ticket_priority_option">
                            <TicketSVG color="#5EAF2F" />
                            LOW
                          </div>
                        ),
                        value: "LOW",
                      },
                    ]}
                  />
                </Form.Item>
              </Col>
              <Col xs={24} md={12} lg={8}>
                <Form.Item name="type" label="TICKET Type">
                  <Select
                    placeholder="Select"
                    options={[
                      {
                        label: "Service Request",
                        value: "SERVICE_REQUEST",
                      },
                      {
                        label: "Complaint",
                        value: "COMPLAINT",
                      },
                      {
                        label: "Inquiry",
                        value: "INQUIRY",
                      },
                    ]}
                  />
                </Form.Item>
              </Col>
              <Col xs={24} md={12} lg={8}>
                <Form.Item name="project" label="Project">
                  <Select placeholder="Select" />
                </Form.Item>
              </Col>
            </Row>
          </Form.Item>

          <Form.Item label="Attachments">
            <Row gutter={[16, 16]}>
              <Col xs={24} lg={12}>
                <Form.Item name="uploadedFiles" noStyle>
                  <Upload.Dragger
                    {...draggerProps}
                    customRequest={(e) => e.onSuccess("ok")}
                    style={{
                      background: "#fff",
                      borderRadius: "14px",
                      maxHeight: "160px",
                    }}
                    fileList={[]}>
                    <Typography.Text className="fz-16 fw-500">Upload Files</Typography.Text>
                    <br />
                    <Typography.Text className="gc">or drag and drop</Typography.Text>
                  </Upload.Dragger>
                </Form.Item>

                <Row
                  gutter={[0, 8]}
                  className="mt-1"
                  style={{ maxHeight: "390px", overflowY: "auto" }}>
                  {uploadedFiles.map((file) => (
                    <Col key={file.uid} xs={24}>
                      <Row
                        justify="space-between"
                        align="middle"
                        wrap={false}
                        className="file-uploaded">
                        <Col>
                          <Row align="middle" wrap={false} gutter={[16, 0]}>
                            <Col>
                              <Image
                                width={32}
                                height={32}
                                alt={file.name}
                                src={filesExtentionsImg(file.type)}
                                preview={false}
                              />
                            </Col>
                            <Col style={{ maxWidth: "100px" }}>
                              <Row>
                                <Col xs={24}>
                                  <Tooltip title={file.name}>
                                    <Typography.Text ellipsis>{file.name}</Typography.Text>
                                  </Tooltip>
                                </Col>
                                <Col xs={24}>
                                  <Typography.Text>{formatBytes(file.size)}</Typography.Text>
                                </Col>
                              </Row>
                            </Col>
                          </Row>
                        </Col>
                        <Col>
                          <div className="add_ticket_attachments_actions">
                            <EyeSVG className="clickable" />
                            <DeleteSVG
                              color="#000"
                              className="clickable"
                              onClick={() => onFileDelete(file.uid)}
                            />
                          </div>
                        </Col>
                      </Row>
                    </Col>
                  ))}
                </Row>
              </Col>
              <Col xs={24} lg={12}>
                <div className="center-items from-google-drive" style={{ cursor: "not-allowed" }}>
                  <Row gutter={[0, 8]}>
                    <Col xs={24}>
                      <Row justify="center">
                        <Image
                          src={googleDriveImg}
                          alt="Google Drive"
                          height={30}
                          width={30}
                          preview={false}
                        />
                      </Row>
                    </Col>
                    <Col xs={24}>
                      <Row justify="center">
                        <Typography.Text className="fz-16 fw-500">
                          From Google Drive
                        </Typography.Text>
                      </Row>
                    </Col>
                  </Row>
                </div>
              </Col>
            </Row>
          </Form.Item>

          <Form.Item noStyle>
            <Row justify="end">
              <Button
                loading={addingLoading}
                htmlType="submit"
                style={{ background: "#272942", color: "#fff", width: "100px" }}>
                Add
              </Button>
            </Row>
          </Form.Item>
        </Form>
      </div>
    </section>
  );
}

function formatBytes(bytes, decimals = 1) {
  if (!+bytes) return "0 Bytes";

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
}
