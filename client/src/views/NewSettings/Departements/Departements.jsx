import { Button, Col, Input, Row, Table, Typography, Switch, Form } from "antd";

import { useEffect, useState } from "react";
import DepartementsService from "services/newSettings/departements.service";
import { useNotification } from "context/notificationContext";

import IsActive from "components/StatusComponent/IsActive";
import "./styles.css";
import { DeleteSVG, EditSVG } from "assets/jsx-svg";
import WarningModal from "./Components/WarningModal";
import AddEditModal from "./Components/AddEditModal";

function Departements() {
  const [textSearch, setTextSearch] = useState("");

  const [isDeactivateModalOpen, setIsDeactivateModalOpen] = useState(false);
  const [DepartementToDeactivate, setDepartementToDeactivate] = useState({});
  const [isAddEditDepartementModalOpen, setIsAddEditDepartementModalOpen] = useState(false);
  const [form] = Form.useForm();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [departementToDelete, setDepartementToDelete] = useState({});
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
      title: "Departement",
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
                title={record.status ? "Edit" : "Can't edit when departement Inactive"}
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
    toggleActivationRequest(DepartementToDeactivate.id, false);
    setIsDeactivateModalOpen(false);
    setDepartementToDeactivate(null);
  };
  const handleDeactivateModalCancel = () => {
    setIsDeactivateModalOpen(false);
    setDepartementToDeactivate(null);
  };

  const onRowSwitchChanged = (DepartementObject, checked) => {
    if (!checked) {
      showDeactivateModal();
      setDepartementToDeactivate(DepartementObject);
    } else {
      toggleActivationRequest(DepartementObject.id, true);
    }
  };

  const onRowEditView = (departementRow) => {
    form.setFieldsValue({
      name: departementRow.name,
      status: departementRow.status,
    });
    setIsAddEditDepartementModalOpen(true);

    setEditObj(departementRow);
  };

  const getAllRequest = () => {
    DepartementsService.getAll()
      .then(({ data }) => {
        setIsLoading(false);
        var departements = data?.data.map((item, index) => ({
          index: index + 1,
          ...item,
          statusLabel: item.status ? "Activate" : "Deactivate",
        }));

        setTableData(departements);
        setOrignalData(departements);

        filterTable(textSearch, departements, ["name"]);
      })
      .catch((error) => {
        setIsLoading(false);
        var { errors } = error?.response.data;
        openNotificationWithIcon("error", errors[0]);
      });
  };
  const deleteRequest = (id) => {
    DepartementsService.deleteDepartement(id)
      .then(({ data }) => {
        getAllRequest();
        openNotificationWithIcon("success", "Deleted successfully");
      })
      .catch((error) => {
        setIsLoading(false);
        var { errors } = error?.response.data;
        openNotificationWithIcon("error", errors[0]);
      });
  };
  const toggleActivationRequest = (id, isActivateAction) => {
    DepartementsService.toggleActivationDepartement(id)
      .then(({ data }) => {
        getAllRequest();

        openNotificationWithIcon(
          "success",
          `${isActivateAction ? "Activated" : "Deactivated"}  successfully`,
        );
      })
      .catch((error) => {
        setIsLoading(false);
        var { errors } = error?.response.data;
        openNotificationWithIcon("error", errors[0]);
      });
  };

  // Delete modal

  const onRowDelete = (departementObj) => {
    showDeleteModal();
    setDepartementToDelete(departementObj);
  };

  const showDeleteModal = () => {
    setIsDeleteModalOpen(true);
  };
  const handleDeleteModalOk = () => {
    deleteRequest(departementToDelete.id);
    setIsDeleteModalOpen(false);
  };
  const handleDeleteModalCancel = () => {
    setIsDeleteModalOpen(false);
    setDepartementToDelete(null);
  };
  //End delete modal
  // Add New Departement modal
  // -->form
  const onFinish = (values) => {
    handleAddEditDepartementModalOk(values);
  };
  // -->end form
  const addNewDepartementRequest = (objectToAdd) => {
    setIsLoading(true);
    DepartementsService.addDepartement(objectToAdd)
      .then(({ data }) => {
        getAllRequest();
        setIsAddEditDepartementModalOpen(false);
        openNotificationWithIcon("success", "Added successfully");
      })
      .catch((error) => {
        setIsLoading(false);
        var { errors } = error?.response.data;
        openNotificationWithIcon("error", errors[0]);
      });
  };
  const editDepartementRequest = (id, objectToEdit) => {
    setIsLoading(true);
    DepartementsService.editDepartement(id, objectToEdit)
      .then(({ data }) => {
        getAllRequest();
        setIsAddEditDepartementModalOpen(false);
        openNotificationWithIcon("success", "Edited successfully");
      })
      .catch((error) => {
        setIsLoading(false);
        var { errors } = error?.response.data;
        openNotificationWithIcon("error", errors[0]);
      });
  };
  const showAddNewDepartement = () => {
    setEditObj(null);
    form.resetFields();
    setIsAddEditDepartementModalOpen(true);
  };
  const handleAddEditDepartementModalOk = (values) => {
    var objectToAddOrEdit = {
      ...values,
    };
    EditObj
      ? editDepartementRequest(EditObj.id, objectToAddOrEdit)
      : addNewDepartementRequest(objectToAddOrEdit);
  };
  const handleAddNewDepartementModalCancel = () => {
    setIsAddEditDepartementModalOpen(false);
    form.resetFields();
  };
  //End New Departement modal

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
        handleAddNewDepartementModalCancel={handleAddNewDepartementModalCancel}
        isAddEditDepartementModalOpen={isAddEditDepartementModalOpen}
      />
      {
        <WarningModal
          isWarningModalOpen={isDeleteModalOpen}
          handleCancel={handleDeleteModalCancel}
          handleOk={handleDeleteModalOk}
          warningBody={`Are you sure you want to delete this "${departementToDelete?.name}" departement?`}
        />
      }
      {
        <WarningModal
          isWarningModalOpen={isDeactivateModalOpen}
          handleCancel={handleDeactivateModalCancel}
          handleOk={handleDeactivateModalOk}
          warningBody={`Are you sure you want to deactivate the "${DepartementToDeactivate?.name}" and prevent any changes?`}
        />
      }

      <section className="body-content products">
        <Row align="middle" justify="space-between" className="search-row" gutter={[12, 12]}>
          <Col className="tilte" xs={24} sm={24} md={4} lg={4}>
            <Typography.Text className="fz-16 fw-600">Departements</Typography.Text>
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
                  onClick={showAddNewDepartement}>
                  + New departement
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
            locale={{ emptyText: "No departements yet" }}
          />
          <Typography.Text className="table-bottom-info hide-sm">
            Total : {tableData.length}
          </Typography.Text>
        </div>
      </section>
    </>
  );
}

export default Departements;
