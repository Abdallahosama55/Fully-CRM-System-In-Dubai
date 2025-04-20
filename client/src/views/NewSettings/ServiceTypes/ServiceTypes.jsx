import { Button, Col, Input, Row, Table, Typography, Switch, Form } from "antd";
import { useEffect, useState } from "react";
import ServiceTypeService from "services/newSettings/ServiceTypes.service";
import { useNotification } from "context/notificationContext";

import IsActive from "components/StatusComponent/IsActive";
import "./styles.css";
import { DeleteSVG, EditSVG } from "assets/jsx-svg";
import WarningModal from "./Components/WarningModal";
import AddEditModal from "./Components/AddEditModal";

function ServiceTypes() {
  const [textSearch, setTextSearch] = useState("");

  const [isDeactivateModalOpen, setIsDeactivateModalOpen] = useState(false);
  const [ServiceTypeToDeactivate, setServiceTypeToDeactivate] = useState({});
  const [isAddEditServiceTypeModalOpen, setIsAddEditServiceTypeModalOpen] = useState(false);
  const [form] = Form.useForm();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [ServiceTypeToDelete, setServiceTypeToDelete] = useState({});
  const { openNotificationWithIcon } = useNotification();
  const [tableData, setTableData] = useState([]);
  const [orignaltableData, setOrignalData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [EditObj, setEditObj] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    getAllRequest();
  }, []);

  const columns = [
    {
      hidden: false,
      title: "NO.",
      dataIndex: "index",
      width: "5%",
    },
    {
      hidden: false,
      title: "Service Type",
      dataIndex: "name",
      width: "40%",
      sorter: (a, b) => b.name.localeCompare(a.name),
    },

    {
      hidden: false,
      title: "Status",
      dataIndex: "status",
      render: (status) => {
        return <IsActive isActive={status} />;
      },
      sorter: (a, b) => b.statusLabel.localeCompare(a.statusLabel),
      width: "30%",
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
            <Switch
              checked={record.status}
              title={record.status ? "Deactivate" : "Activate"}
              size="small"
              onChange={(e) => onRowSwitchChanged(record, e)}
            />
            {
              <span
                title={record.status ? "Edit" : "Can't edit when service type inactive"}
                style={{ cursor: "pointer" }}
                onClick={() => record.status && onRowEditView(record)}>
                <EditSVG color={!record.status && "#bfbfbf"} />
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

  const showDeactivateModal = () => {
    setIsDeactivateModalOpen(true);
  };
  const handleDeactivateModalOk = () => {
    toggleActivationRequest(ServiceTypeToDeactivate.id, false);
    setIsDeactivateModalOpen(false);
    setServiceTypeToDeactivate(null);
  };
  const handleDeactivateModalCancel = () => {
    setIsDeactivateModalOpen(false);
    setServiceTypeToDeactivate(null);
  };

  const onRowSwitchChanged = (ServiceTypeObject, checked) => {
    if (!checked) {
      showDeactivateModal();
      setServiceTypeToDeactivate(ServiceTypeObject);
    } else {
      toggleActivationRequest(ServiceTypeObject.id, true);
    }
  };

  const onRowEditView = (ServiceTypeRow) => {
    form.setFieldsValue({
      name: ServiceTypeRow.name,
      status: ServiceTypeRow.status,
    });
    setIsAddEditServiceTypeModalOpen(true);

    setEditObj(ServiceTypeRow);
  };

  const getAllRequest = () => {
    ServiceTypeService.getAll()
      .then(({ data }) => {
        setIsLoading(false);
        var ServiceTypes = data?.data.map((item, index) => ({
          index: index + 1,
          ...item,
          statusLabel: item.status ? "Activate" : "Deactivate",
        }));

        setTableData(ServiceTypes);
        setOrignalData(ServiceTypes);

        filterTable(textSearch, ServiceTypes, ["name"]);
      })
      .catch((error) => {
        setIsLoading(false);
        console.log("aaaaaaa" + error);
        var { message } = error?.response.data;
        openNotificationWithIcon("error", message);
      });
  };
  const deleteRequest = (id) => {
    ServiceTypeService.deleteServiceType(id)
      .then(({ data }) => {
        getAllRequest();
        openNotificationWithIcon("success", "Deleted successfully");
      })
      .catch((error) => {
        setIsLoading(false);
        var { message } = error?.response.data;
        openNotificationWithIcon("error", message);
      });
  };
  const toggleActivationRequest = (id, isActivateAction) => {
    ServiceTypeService.toggleActivationServiceType(id)
      .then(({ data }) => {
        getAllRequest();

        openNotificationWithIcon(
          "success",
          `${isActivateAction ? "Activated" : "Deactivated"}  successfully`,
        );
      })
      .catch((error) => {
        setIsLoading(false);
        var { message } = error?.response.data;
        openNotificationWithIcon("error", message);
      });
  };

  // Delete modal

  const onRowDelete = (serviceTypeObj) => {
    showDeleteModal();
    setServiceTypeToDelete(serviceTypeObj);
  };

  const showDeleteModal = () => {
    setIsDeleteModalOpen(true);
  };
  const handleDeleteModalOk = () => {
    deleteRequest(ServiceTypeToDelete.id);
    setIsDeleteModalOpen(false);
  };
  const handleDeleteModalCancel = () => {
    setIsDeleteModalOpen(false);
    setServiceTypeToDelete(null);
  };
  //End delete modal
  // Add New Service Type modal
  // -->form
  const onFinish = (values) => {
    handleAddEditServiceTypeModalOk(values);
  };
  // -->end form
  const addNewServiceTypeRequest = (objectToAdd) => {
    setIsLoading(true);
    ServiceTypeService.addServiceType(objectToAdd)
      .then(({ data }) => {
        getAllRequest();
        setIsAddEditServiceTypeModalOpen(false);
        openNotificationWithIcon("success", "Added successfully");
      })
      .catch((error) => {
        setIsLoading(false);
        var { errors } = error?.response.data;
        openNotificationWithIcon("error", errors[0]);
      });
  };
  const editServiceTypeRequest = (id, objectToEdit) => {
    setIsLoading(true);
    ServiceTypeService.editServiceType(id, objectToEdit)
      .then(({ data }) => {
        getAllRequest();
        setIsAddEditServiceTypeModalOpen(false);
        openNotificationWithIcon("success", "Edited successfully");
      })
      .catch((error) => {
        setIsLoading(false);
        var { message } = error?.response.data;
        openNotificationWithIcon("error", message);
      });
  };
  const showAddNewServiceType = () => {
    setEditObj(null);
    form.resetFields();
    setIsAddEditServiceTypeModalOpen(true);
  };
  const handleAddEditServiceTypeModalOk = (values) => {
    var objectToAddOrEdit = {
      ...values,
    };
    EditObj
      ? editServiceTypeRequest(EditObj.id, objectToAddOrEdit)
      : addNewServiceTypeRequest(objectToAddOrEdit);
  };
  const handleAddNewServiceTypeModalCancel = () => {
    setIsAddEditServiceTypeModalOpen(false);
    form.resetFields();
  };
  //End New ServiceType modal

  const onChagneSearchText = (text) => {
    setTextSearch(text);
    filterTable(text, orignaltableData, ["name"]);
  };

  const filterTable = (text, orignaltableData, searchFields) => {
    setTableData(
      orignaltableData.filter((item) =>
        searchFields.some((field) =>
          String(item[field]).toLowerCase().includes(text.toLowerCase()),
        ),
      ),
    );
  };

  return (
    <>
      <AddEditModal
        form={form}
        onFinish={onFinish}
        isEditAction={EditObj}
        handleAddNewServiceTypeModalCancel={handleAddNewServiceTypeModalCancel}
        isAddEditServiceTypeModalOpen={isAddEditServiceTypeModalOpen}
      />
      {
        <WarningModal
          isWarningModalOpen={isDeleteModalOpen}
          handleCancel={handleDeleteModalCancel}
          handleOk={handleDeleteModalOk}
          warningBody={`Are you sure you want to delete this "${ServiceTypeToDelete?.name}" service type?`}
        />
      }
      {
        <WarningModal
          isWarningModalOpen={isDeactivateModalOpen}
          handleCancel={handleDeactivateModalCancel}
          handleOk={handleDeactivateModalOk}
          warningBody={`Are you sure you want to deactivate the "${ServiceTypeToDeactivate?.name}" and prevent any changes?`}
        />
      }

      <section className="body-content products">
        <Row align="middle" justify="space-between" className="search-row" gutter={[12, 12]}>
          <Col className="tilte" xs={24} sm={24} md={4} lg={4}>
            <Typography.Text className="fz-16 fw-600">Service Types</Typography.Text>
          </Col>
          <Col className="search-bar" xs={24} sm={24} md={12} lg={12}>
            <Row
              justify="end"
              className="search-bar-row"
              align="middle"
              gutter={[16, 16]}
              style={{ height: 10 }}>
              <Col className="search-input-col" span={11}>
                <Row
                  style={{ borderRadius: "10px" }}
                  align="middle"
                  justify="end"
                  // gutter={[10, 10]}
                  wrap={false}>
                  {/* <Col style={{ paddingLeft: 0 }} flex={1}> */}
                  <Input
                    value={textSearch}
                    size="small"
                    className="general-table-search"
                    placeholder="Search"
                    onChange={(e) => onChagneSearchText(e.target.value)}
                    onBlur={(e) => onChagneSearchText(e.target.value)}
                  />
                  {/* </Col> */}
                </Row>
              </Col>
              <Col span={13}>
                <Button
                  style={{ background: "#272942", color: "#fff", width: "100%" }}
                  size="small"
                  onClick={showAddNewServiceType}>
                  + New service type
                </Button>
              </Col>
            </Row>
          </Col>
        </Row>

        <div style={{ position: "relative" }}>
          <Table
            rowKey={"id"}
            loading={isLoading}
            scroll={{ x: 700 }}
            style={{ marginTop: "32px" }}
            columns={columns.filter((val) => !val.hidden)}
            dataSource={tableData}
            pagination={{
              pageSize: 10,
              total: tableData.length,
              onChange: (page) => {
                setPage((page - 1) * 10);
              },
              defaultCurrent: page / 10 + 1,
            }}
            locale={{ emptyText: "No service types yet" }}
          />
          <Typography.Text className="table-bottom-info hide-sm">
            Total : {tableData.length}
          </Typography.Text>
        </div>
      </section>
    </>
  );
}

export default ServiceTypes;
