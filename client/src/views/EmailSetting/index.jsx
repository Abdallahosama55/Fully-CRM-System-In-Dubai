import { Button, Col, Input, Row, Table, Typography, Form, InputNumber } from "antd";
import { useState } from "react";
import { useNotification } from "context/notificationContext";

import "./styles.css";
import { DeleteSVG, EditSVG } from "assets/jsx-svg";
import WarningModal from "./Components/WarningModal";
import AddEditDrawer from "./Components/AddEditDrawer";
import useGetEmailConfig from "services/EmailConfig/Querys/useGetEmailConfig";
import useSaveEmailConfig from "services/EmailConfig/Mutations/useSaveEmailConfig";
import useDeleteEmailGroupConfig from "services/EmailConfig/Mutations/useDeleteEmailGroupConfig";
import useGetMainGroups from "services/EmailConfig/Querys/useGetMainGroups";
import { useDrawer } from "hooks/useDrawer";
function EmailSetting() {
  const DrawerAPI = useDrawer();

  const { openNotificationWithIcon } = useNotification();
  const [page, setPage] = useState(0);
  const [emailConfigToDelete, setEmailConfigToDelete] = useState({});
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [form] = Form.useForm();
  const [generalEmailSettingsform] = Form.useForm();

  const columns = [
    {
      hidden: false,
      title: "NO.",
      dataIndex: "index",
      width: "5%",
    },
    {
      hidden: false,
      title: "Group",
      dataIndex: "group",
      width: "40%",
      sorter: (a, b) => b.name.localeCompare(a.name),
    },
    {
      hidden: false,
      title: "Email",
      dataIndex: "groupEmail",
      width: "40%",
      sorter: (a, b) => b.name.localeCompare(a.name),
    },
    {
      hidden: false,
      title: "Username",
      dataIndex: "groupUserName",
      width: "40%",
      sorter: (a, b) => b.name.localeCompare(a.name),
    },
    {
      hidden: false,
      title: "Password",
      dataIndex: "groupPassword",
      width: "40%",
      sorter: (a, b) => b.name.localeCompare(a.name),
    },
    {
      hidden: false,
      title: "Actions",
      key: "actions",
      dataIndex: "actions",
      align: "center",
      width: "20%",
      render: (_, record) => {
        return (
          <div style={{ display: "flex", justifyContent: "space-around" }}>
            {
              <span
                title={"Edit"}
                style={{ cursor: "pointer" }}
                onClick={() => onRowEditView(record)}>
                <EditSVG />
              </span>
            }
            <span title="Delete" style={{ cursor: "pointer" }} onClick={() => onRowDelete(record)}>
              <DeleteSVG />
            </span>
          </div>
        );
      },
    },
  ];

  const onRowEditView = (emailConfigRow) => {
    form.setFieldsValue({
      groupId: emailConfigRow.emailGroup.id,
      email: emailConfigRow.groupEmail,
      emailUsername: emailConfigRow.groupUserName,
      emailPassword: emailConfigRow.groupPassword,
    });

    DrawerAPI.open("40%");
    DrawerAPI.setDrawerContent(
      <AddEditDrawer
        refetchEmailConfig={refetchEmailConfig}
        isEditAction={emailConfigRow}
        DrawerAPI={DrawerAPI}
        form={form}
        groupList={MainGroupsList}
      />,
    );
  };
  const { saveEmailConfig, isPending: isSaveEmailPending } = useSaveEmailConfig({
    onError: (error) => {
      generalEmailSettingsform.setFieldsValue({
        service: emailConfigData?.data.data?.service,
        smtpHost: emailConfigData?.data.data?.host,
        port: emailConfigData?.data.data?.port,
        defaultUserName: emailConfigData?.data.data?.defaultUserName,
        emailPassword: emailConfigData?.data.data?.defaultPassword,
        defaultEmail: emailConfigData?.data.data?.defaultEmail,
      });
      var { errors } = error?.response.data;

      openNotificationWithIcon("error", errors[0]);
    },
    onSuccess: (data, payload) => {
      console.log("payload=>", payload);
      generalEmailSettingsform.setFieldsValue({
        service: payload.service,
        smtpHost: payload.host,
        port: payload.port,
        defaultUserName: payload.userName,
        emailPassword: payload.password,
        defaultEmail: payload.email,
      });
      openNotificationWithIcon("success", "Saved successfully");
    },
  });
  const { deleteGroupConfig, isPending: isDeleteEmailPending } = useDeleteEmailGroupConfig({
    onError: (error) => {
      var { errors } = error?.response.data;

      openNotificationWithIcon("error", errors[0]);
    },
    onSuccess: (data, payload) => {
      refetchEmailConfig();
      openNotificationWithIcon("success", "Deleted successfully");
    },
  });

  const { data: emailConfigData, isPending, refetch: refetchEmailConfig } = useGetEmailConfig({});
  const { data: MainGroupsList, isGetMainGroupPending } = useGetMainGroups(
    {},
    {
      select: (data) => data.data.data,
    },
  );

  // Delete modal

  const onRowDelete = (emailConfigObj) => {
    showDeleteModal();
    setEmailConfigToDelete(emailConfigObj);
  };

  const showDeleteModal = () => {
    setIsDeleteModalOpen(true);
  };
  const handleDeleteModalOk = () => {
    deleteGroupConfig(emailConfigToDelete.id);
    setIsDeleteModalOpen(false);
  };
  const handleDeleteModalCancel = () => {
    setIsDeleteModalOpen(false);
    setEmailConfigToDelete(null);
  };

  const showAddNewEmailConfig = () => {
    form.resetFields();
    DrawerAPI.open("40%");
    DrawerAPI.setDrawerContent(
      <AddEditDrawer
        refetchEmailConfig={refetchEmailConfig}
        isEditAction={null}
        DrawerAPI={DrawerAPI}
        form={form}
        groupList={MainGroupsList}
      />,
    );
  };

  const onSaveGeneralEmailSettings = (values) => {
    const objectToSave = {
      port: values?.port,
      service: values?.service,
      host: values?.smtpHost,
      userName: values?.defaultUserName,
      password: values?.emailPassword,
      email: values?.defaultEmail,
    };
    saveEmailConfig(objectToSave);
  };

  var emailConfigList = emailConfigData?.data.data?.groupEmailSettings.map((item, index) => ({
    index: index + 1,
    ...item,
    group: item.emailGroup?.name,
  }));

  return (
    <>
      {DrawerAPI.Render}
      {
        <WarningModal
          isWarningModalOpen={isDeleteModalOpen}
          handleCancel={handleDeleteModalCancel}
          handleOk={handleDeleteModalOk}
          warningBody={`Are you sure you want to delete this "${emailConfigToDelete?.emailGroup?.name}" config?`}
        />
      }

      <section className="body-content products">
        <Form
          initialValues={{
            service: emailConfigData?.data.data?.service,
            smtpHost: emailConfigData?.data.data?.host,
            port: emailConfigData?.data.data?.port,
            defaultUserName: emailConfigData?.data.data?.defaultUserName,
            emailPassword: emailConfigData?.data.data?.defaultPassword,
            defaultEmail: emailConfigData?.data.data?.defaultEmail,
          }}
          requiredMark="optional"
          onFinish={onSaveGeneralEmailSettings}
          form={generalEmailSettingsform}
          colon={false}
          labelCol={{
            span: 6,
          }}
          wrapperCol={{
            span: 18,
          }}
          layout="horizontal"
          labelAlign="left"
          size={"small"}
          style={{
            maxWidth: 500,
          }}>
          <Form.Item
            label={
              <span>
                Service
                <span style={{ color: "red", marginLeft: 4 }}>*</span>
              </span>
            }
            name="service"
            rules={[
              {
                required: true,
                message: "Service is required",
              },
            ]}>
            <Input placeholder="Write here" />
          </Form.Item>
          <Form.Item
            label={
              <span>
                Smtp Host
                <span style={{ color: "red", marginLeft: 4 }}>*</span>
              </span>
            }
            name="smtpHost"
            rules={[
              {
                required: true,
                message: "Smtp Host is required",
              },
            ]}>
            <Input placeholder="Write here" />
          </Form.Item>
          <Form.Item
            // label="Port"

            label={
              <span>
                Port
                <span style={{ color: "red", marginLeft: 4 }}>*</span>
              </span>
            }
            name="port"
            rules={[
              {
                required: true,
                message: "Port is required",
              },
            ]}>
            <InputNumber style={{ width: "100%" }} placeholder="Write here" />
          </Form.Item>
          <Form.Item
            label={
              <span>
                Username
                <span style={{ color: "red", marginLeft: 4 }}>*</span>
              </span>
            }
            name="defaultUserName"
            autoComplete="off"
            rules={[
              {
                required: true,
                message: "Username is required",
              },
            ]}>
            <Input placeholder="Write here" />
          </Form.Item>
          <Form.Item
            label={
              <span>
                Password
                <span style={{ color: "red", marginLeft: 4 }}>*</span>
              </span>
            }
            name="emailPassword"
            autoComplete="off"
            rules={[
              {
                required: true,
                message: "Password is required",
              },
            ]}>
            <Input.Password placeholder="Write here" />
          </Form.Item>

          <Form.Item
            label={
              <span>
                Email
                <span style={{ color: "red", marginLeft: 4 }}>*</span>
              </span>
            }
            name="defaultEmail"
            rules={[
              {
                required: true,
                type: "email",
                message: "Email is required",
              },
            ]}>
            <Input placeholder="Write here" />
          </Form.Item>
          <Form.Item
            wrapperCol={{
              span: 24,
            }}>
            <Button loading={isSaveEmailPending} style={{ float: "right" }} htmlType="submit">
              Save
            </Button>
          </Form.Item>
        </Form>
        <Row align="middle" justify="space-between" className="search-row" gutter={[12, 12]}>
          <Col className="tilte" xs={24} sm={24} md={10} lg={10}>
            <Typography.Text className="fz-16 fw-600">Group Email Settings</Typography.Text>
          </Col>
          <Col className="search-bar" xs={24} sm={24} md={12} lg={12}>
            <Row
              justify="end"
              className="search-bar-row"
              align="middle"
              gutter={[16, 16]}
              style={{ height: 10 }}>
              <Col className="search-input-col" span={13}></Col>
              <Col span={11}>
                <Button
                  style={{ background: "#272942", color: "#fff", width: "100%" }}
                  size="small"
                  onClick={showAddNewEmailConfig}>
                  + Add New
                </Button>
              </Col>
            </Row>
          </Col>
        </Row>

        <div style={{ position: "relative" }}>
          <Table
            rowKey={"id"}
            loading={isPending}
            scroll={{ x: 700 }}
            style={{ marginTop: "32px" }}
            columns={columns.filter((val) => !val.hidden)}
            dataSource={emailConfigList}
            pagination={{
              pageSize: 10,
              total: emailConfigList?.length,
              onChange: (page) => {
                setPage((page - 1) * 10);
              },
              defaultCurrent: page / 10 + 1,
            }}
            locale={{ emptyText: "No email config yet" }}
          />
          <Typography.Text className="table-bottom-info hide-sm">
            Total : {emailConfigList?.length}
          </Typography.Text>
        </div>
      </section>
    </>
  );
}

export default EmailSetting;
