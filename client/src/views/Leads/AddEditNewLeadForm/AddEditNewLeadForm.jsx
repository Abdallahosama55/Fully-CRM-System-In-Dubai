import { Avatar, Button, Form, Input, Row, Select, Space } from "antd";
import AddCancelButtons from "components/common/AddCancelButtons";
import { useEffect, useState } from "react";
import "./styles.css";

import { AntDesignOutlined } from "@ant-design/icons";
import { useQueryClient } from "@tanstack/react-query";
import TextArea from "antd/es/input/TextArea";
import { TicketSVG } from "assets/jsx-svg";
import WarningModal from "components/common/WarningModal";
import deleteNullProps from "components/common/deleteNullProps";
import { useNotification } from "context/notificationContext";
import useGetCustomers from "services/Customers/Querys/useGetCustomers";
import useAddLead from "services/Leads/Mutations/useAddLead";
import useDeleteLead from "services/Leads/Mutations/useDeleteLead";
import useUpdateLead from "services/Leads/Mutations/useUpdateLead";
import useGetAssignToEmployees from "services/Leads/Querys/useGetAssignToEmployees";
import useGetSourcesOfEventPipeline from "services/PipelineSources/Querys/useGetSourcesOfEventPipeline";
import useGetPriorityItems from "services/Pipelines/Querys/useGetPriorityItems";
import "../../Collaboration/CallsAndMeetingsAdd/styles.css";
function stringToNumber(str) {
  try {
    let num = parseFloat(str);
    return isNaN(num) ? null : num;
  } catch {
    return null;
  }
}

const AddEditNewLeadForm = ({
  leadStoredData,
  onClose,
  selectedPipelineId,
  reloadState,
  setReloadState,
}) => {
  const { openNotificationWithIcon } = useNotification();
  const [searchCustomerName, setSearchCustomerName] = useState("");
  const [form] = Form.useForm();
  const query = useQueryClient();
  const handelChangeCustomerName = (value) => {
    setSearchCustomerName(value);
  };
  const cancel = () => {
    onClose();
  };
  const { addLead, isPending: isAddLeadPending } = useAddLead({
    onError: (error) => {
      var { errors } = error?.response?.data;
      openNotificationWithIcon("error", errors[0]);
    },
    onSuccess: (data, payload) => {
      query.invalidateQueries({ queryKey: ["kanbanLeads"] });

      onClose(data);
      form.resetFields();
      openNotificationWithIcon("success", "Added successfully");
      setReloadState(!reloadState);
    },
  });
  const { updateLead, isPending: isUpdateLeadPending } = useUpdateLead(leadStoredData?.id, {
    onError: (error) => {
      var { errors } = error?.response?.data;
      openNotificationWithIcon("error", errors[0]);
    },
    onSuccess: (data, payload) => {
      query.invalidateQueries({ queryKey: ["kanbanLeads"] });

      onClose();
      form.resetFields();
      openNotificationWithIcon("success", "Updated successfully");
      setReloadState(!reloadState);
    },
  });
  const handelAddLead = (leadData) => {
    addLead(leadData);
  };
  const handelUpdateLead = (leadData) => {
    updateLead(leadData);
  };

  const onFinish = (values) => {
    const commonFields = {
      title: values.title,
      description: values?.description,
      source: values?.source,
      budget: stringToNumber(values?.budget),
      assigneeId: values?.assigneeId,
      priorityId: values?.priorityId,
      pipelineId: selectedPipelineId,
    };

    const specificFields = isShowingAddCustomer
      ? {
          customerName: values?.customerName,
          customerEmail: values?.customerEmail,
        }
      : {
          customerId: values?.customerId,
        };

    let leadData = { ...commonFields, ...specificFields };
    leadData = deleteNullProps(leadData);
    if (leadStoredData) {
      handelUpdateLead(leadData);
    } else {
      handelAddLead(leadData);
    }
  };
  const { data: assignToList, isPending } = useGetAssignToEmployees({
    select: (data) => {
      return data?.data?.data;
    },
  });

  const { data: SourceList } = useGetSourcesOfEventPipeline(
    selectedPipelineId,
    {},
    {
      select: (data) => data?.data?.data,
    },
  );

  const { data: priorityItems } = useGetPriorityItems({
    select: (data) => data?.data?.data?.rows,
  });
  const { data: Customers, isLoading: isLoadingCustomers } = useGetCustomers(
    { page: 1, limit: 10, body: { fullName: searchCustomerName } },
    {
      select: (data) => {
        return data?.data?.data?.data;
      },
    },
  );

  const customerId = Form.useWatch("customerId", form);
  useEffect(() => {
    const title = form.getFieldValue("title");
    const customer = Customers?.find((c) => c.id === +customerId);
    if (!title && customer) {
      form.setFieldValue("title", (customer?.fullName ?? "") + " Lead");
      form.validateFields({
        dirty: true,
      });
    }
  }, [customerId, form, Customers]);

  const [isShowingAddCustomer, setIsShowingAddCustomer] = useState(false);
  const handelAddCustomerBtn = () => {
    setIsShowingAddCustomer((prev) => !prev);
  };

  useEffect(() => {
    leadStoredData && setSearchCustomerName(leadStoredData?.customer?.account?.fullName);

    leadStoredData &&
      form.setFieldsValue({
        title: leadStoredData.title,
        description: leadStoredData.description,
        budget: parseFloat(leadStoredData.budget),
        source: leadStoredData.sourceId,
        priorityId: leadStoredData.priorityId,
        assigneeId: leadStoredData.assigneeId,
        customerId: leadStoredData.customerId,
      });
  }, [leadStoredData]);

  const { deleteLead, isPending: isDeleteLeadPending } = useDeleteLead({
    onError: (error) => {
      var { errors } = error?.response.data;
    },
    onSuccess: (data, payload) => {
      openNotificationWithIcon("success", "Deleted successfully");

      query.invalidateQueries({ queryKey: ["kanbanLeads"] });
      onClose();
      setReloadState(!reloadState);
    },
  });

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const showDeleteModal = () => {
    setIsDeleteModalOpen(true);
  };

  const handleDeleteModalOk = () => {
    deleteLead({ dealId: leadStoredData?.id });
    setIsDeleteModalOpen(false);
  };

  const handleDeleteModalCancel = () => {
    setIsDeleteModalOpen(false);
  };

  return (
    <>
      <WarningModal
        isloading={isDeleteLeadPending}
        width={450}
        isWarningModalOpen={isDeleteModalOpen}
        handleCancel={handleDeleteModalCancel}
        handleOk={handleDeleteModalOk}
        warningBody={`Are you sure you want to delete this "${leadStoredData?.title}" deal?`}
      />
      <div className="new-lead-drawer calls-meetings-add">
        <Row justify={"space-between"}>
          <h2 style={{ marginBottom: "1rem" }}>{leadStoredData ? "Update deal" : "New deal"}</h2>
          {leadStoredData && (
            <Space>
              <Button title="Cancel" onClick={cancel}>
                Cancel
              </Button>
              <Button title="Delete lead" danger onClick={showDeleteModal}>
                Delete
              </Button>
            </Space>
          )}
        </Row>
        <Form
          onFinish={onFinish}
          form={form}
          name="validateOnly"
          layout="vertical"
          autoComplete="off">
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
            <div>{!isShowingAddCustomer && "Customer Name"}</div>
            <div onClick={handelAddCustomerBtn} style={{ cursor: "pointer" }}>
              {" "}
              {!isShowingAddCustomer ? (
                <span style={{ color: "green" }}>Add customer</span>
              ) : (
                <span style={{ color: "red" }}>Cancel</span>
              )}
            </div>
          </div>
          {!isShowingAddCustomer ? (
            <Form.Item
              rules={[{ required: true, message: "Please select customer" }]}
              required
              name="customerId"
              label="">
              <Select
                showSearch
                // mode="tags"
                style={{ width: "100%" }}
                placeholder="Select a customer name or add it"
                optionFilterProp="children"
                onSearch={handelChangeCustomerName}
                notFoundContent={isLoadingCustomers ? "Loading..." : null}
                filterOption={false}
                defaultValue={leadStoredData?.customerId}>
                {Customers && Customers?.length > 0 && Customers?.map((item) => (
                  <Select.Option key={item.id} value={item.id}>
                    <div style={{ display: "flex", gap: 5, alignItems: "center" }}>
                      {!item?.profileImage ? (
                        <Avatar size={32} icon={<AntDesignOutlined />} />
                      ) : (
                        <Avatar size={32} src={item?.profileImage} />
                      )}
                      <div> {item.fullName}</div>
                    </div>
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          ) : (
            <>
              <Form.Item
                name="customerEmail"
                label="Customer Email"
                rules={[{ required: isShowingAddCustomer, type: "email" }]}>
                <Input placeholder="Customer email" />
              </Form.Item>
              <Form.Item
                name="customerName"
                label="Customer Name"
                rules={[{ required: isShowingAddCustomer }]}>
                <Input placeholder="Customer Name" />
              </Form.Item>
            </>
          )}
          <Form.Item name="title" label="Title" rules={[{ required: true }]}>
            <Input placeholder="Write A Title" />
          </Form.Item>
          <Form.Item name="description" label="Description">
            <TextArea placeholder="Write Description Here" rows={4} />
          </Form.Item>
          <Form.Item name="assigneeId" label="Assgined To" className="assgined-to">
            <Select
              showSearch
              style={{ width: "100%" }}
              placeholder="Select"
              optionFilterProp="children"
              filterOption={(input, option) =>
                (option?.children.props.children[1].props.children[1] ?? "")
                  .toLowerCase()
                  .includes(input.toLowerCase())
              }>
              {assignToList && assignToList?.length > 0 && assignToList?.map((item) => (
                <Select.Option key={item.id} value={item.id}>
                  <div style={{ display: "flex", gap: 5, alignItems: "center" }}>
                    {!item?.profileImage ? (
                      <Avatar size={32} icon={<AntDesignOutlined />} />
                    ) : (
                      <Avatar size={32} src={item?.profileImage} />
                    )}
                    <div> {item.fullName}</div>
                  </div>
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item name="priorityId" label="Priority">
            <Select style={{ width: "100%" }} placeholder="Select" optionFilterProp="children">
              {priorityItems && priorityItems.length > 0 && priorityItems?.map((item) => (
                <Select.Option key={item.id} value={item.id}>
                  <div style={{ display: "flex", gap: 5, alignItems: "center" }}>
                    <TicketSVG color={item.color} />
                    <div> {item.label}</div>
                  </div>
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item name="source" label="Source">
            <Select style={{ width: "100%" }} placeholder="Select" optionFilterProp="children">
              {SourceList && SourceList?.lenght > 0 && SourceList?.map((item) => (
                <Select.Option key={item.id} value={item.id}>
                  {item.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item name="budget" label="Budget" rules={[{ required: false }]}>
            <Input placeholder="Estimated Budget" type={"number"} />
          </Form.Item>

          <AddCancelButtons
            addName={leadStoredData ? "Update" : "Add"}
            style={{ justifyContent: "end" }}
            add={form.submit}
            addLoading={isAddLeadPending || isUpdateLeadPending}
            cancel={cancel}
          />
        </Form>
      </div>
    </>
  );
};
export default AddEditNewLeadForm;
