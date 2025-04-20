import { Button, Col, Input, Row, Table, Typography, Switch, Form } from "antd";
import { useEffect, useState } from "react";
import StatesService from "services/newSettings/states.service";
import CountriesService from "services/newSettings/countries.service";
import { useNotification } from "context/notificationContext";

import IsActive from "components/StatusComponent/IsActive";
import "./styles.css";
import { DeleteSVG, EditSVG } from "assets/jsx-svg";
import WarningModal from "./Components/WarningModal";
import AddEditModal from "./Components/AddEditModal";

function States() {
  const [textSearch, setTextSearch] = useState("");

  const [isDeactivateModalOpen, setIsDeactivateModalOpen] = useState(false);
  const [StateToDeactivate, setStateToDeactivate] = useState({});
  const [isAddEditStateModalOpen, setIsAddEditStateModalOpen] = useState(false);
  const [form] = Form.useForm();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [stateToDelete, setStateToDelete] = useState({});

  const [countryList, setCountryList] = useState([]);
  const { openNotificationWithIcon } = useNotification();
  const [tableData, setTableData] = useState([]);
  const [orignaltableData, setOrignalData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [EditObj, setEditObj] = useState(null);
  useEffect(() => {
    setIsLoading(true);
    getAllRequest();
    getCountriesRequest();
  }, []);
  const showDeactivateModal = () => {
    setIsDeactivateModalOpen(true);
  };
  const handleDeactivateModalOk = () => {
    toggleActivationRequest(StateToDeactivate.id, false);
    setIsDeactivateModalOpen(false);
    setStateToDeactivate(null);
  };
  const handleDeactivateModalCancel = () => {
    setIsDeactivateModalOpen(false);
    setStateToDeactivate(null);
  };

  const onRowSwitchChanged = (stateObject, checked) => {
    if (!checked) {
      showDeactivateModal();
      setStateToDeactivate(stateObject);
    } else {
      toggleActivationRequest(stateObject.id, true);
    }
  };

  const onRowEditView = (StateRow) => {
    form.setFieldsValue({
      country_id: StateRow.country_id,
      state_name: StateRow.state_name,
      status: StateRow.status,
    });
    setIsAddEditStateModalOpen(true);

    setEditObj(StateRow);
  };

  const columns = [
    {
      hidden: false,
      title: "NO.",
      dataIndex: "index",
      width: "5%",
    },
    {
      hidden: false,
      title: "State Name",
      dataIndex: "state_name",
      width: "30%",
      sorter: (a, b) => b.state_name.localeCompare(a.state_name),
    },
    {
      hidden: false,
      title: "Country Name",
      dataIndex: "country_name",
      width: "30%",
      sorter: (a, b) => b.country_name.localeCompare(a.country_name),
    },
    {
      hidden: false,
      title: "Status",
      dataIndex: "status",
      render: (status) => {
        return <IsActive isActive={status} />;
      },
      sorter: (a, b) => b.statusLabel.localeCompare(a.statusLabel),
      width: "15%",
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
                title={record.status ? "Edit" : "Can't edit when State Inactive"}
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

  const getCountriesRequest = () => {
    CountriesService.getActiveAll()
      .then(({ data }) => {
        var countries = data?.data.map((item) => ({
          id: item.id,
          country_name: item.name,
        }));

        setCountryList(countries);
      })
      .catch((error) => {
        var { errors } = error?.response.data;
        openNotificationWithIcon("error", errors[0]);
      });
  };
  const getAllRequest = () => {
    StatesService.getAll()
      .then(({ data }) => {
        setIsLoading(false);
        var states = data.data?.map((item, index) => ({
          index: index + 1,
          id: item.id,
          state_name: item.name,
          country_id: item.country.id,
          country_name: item.country.name,
          status: item.status,
          statusLabel: item.status ? "Activate" : "Deactivate",
        }));

        setTableData(states);
        setOrignalData(states);

        filterTable(textSearch, states, ["state_name", "country_name"]);
        //get count
      })
      .catch((error) => {
        setIsLoading(false);
        var { errors } = error?.response.data;
        openNotificationWithIcon("error", errors[0]);
      });
  };
  const deleteRequest = (id) => {
    StatesService.deleteState(id)
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
    StatesService.toggleActivationState(id)
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

  const onRowDelete = (stateObj) => {
    showDeleteModal();
    setStateToDelete(stateObj);
  };

  const showDeleteModal = () => {
    setIsDeleteModalOpen(true);
  };
  const handleDeleteModalOk = () => {
    deleteRequest(stateToDelete.id);
    setIsDeleteModalOpen(false);
  };
  const handleDeleteModalCancel = () => {
    setIsDeleteModalOpen(false);
    setStateToDelete(null);
  };
  //End delete modal
  // Add New state modal
  // -->form
  const onFinish = (values) => {
    handleAddEditStateModalOk(values);
  };
  // -->end form
  const addNewStateRequest = (objectToAdd) => {
    setIsLoading(true);
    StatesService.addState(objectToAdd)
      .then(({ data }) => {
        getAllRequest();
        setIsAddEditStateModalOpen(false);
        openNotificationWithIcon("success", "Added successfully");
      })
      .catch((error) => {
        setIsLoading(false);
        var { errors } = error?.response.data;
        openNotificationWithIcon("error", errors[0]);
      });
  };
  const editStateRequest = (id, objectToEdit) => {
    setIsLoading(true);
    StatesService.editState(id, objectToEdit)
      .then(({ data }) => {
        getAllRequest();
        setIsAddEditStateModalOpen(false);
        openNotificationWithIcon("success", "Edited successfully");
      })
      .catch((error) => {
        setIsLoading(false);
        var { errors } = error?.response.data;
        openNotificationWithIcon("error", errors[0]);
      });
  };
  const showAddNewState = () => {
    setEditObj(null);
    form.resetFields();
    setIsAddEditStateModalOpen(true);
  };
  const handleAddEditStateModalOk = (values) => {
    var objectToAddOrEdit = {
      ...values,
      name: values.state_name,
      countryId: values.country_id,
    };
    EditObj
      ? editStateRequest(EditObj.id, objectToAddOrEdit)
      : addNewStateRequest(objectToAddOrEdit);
  };
  const handleAddNewStateModalCancel = () => {
    setIsAddEditStateModalOpen(false);
    form.resetFields();
  };
  //End New State modal

  const onChagneSearchText = (text) => {
    setTextSearch(text);
    filterTable(text, orignaltableData, ["state_name", "country_name"]);
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
        handleAddNewStateModalCancel={handleAddNewStateModalCancel}
        isAddEditStateModalOpen={isAddEditStateModalOpen}
        CountryList={countryList}
      />
      {
        <WarningModal
          isWarningModalOpen={isDeleteModalOpen}
          handleCancel={handleDeleteModalCancel}
          handleOk={handleDeleteModalOk}
          warningBody={`Are you sure you want to delete this "${stateToDelete?.state_name}" state?`}
          warningTitle={"Delete state will delete all corresponding cities."}
        />
      }
      {
        <WarningModal
          isWarningModalOpen={isDeactivateModalOpen}
          handleCancel={handleDeactivateModalCancel}
          handleOk={handleDeactivateModalOk}
          warningBody={`Are you sure you want to deactivate the "${StateToDeactivate?.state_name}" and all corresponding cities and prevent any changes?`}
        />
      }

      <section className="body-content products">
        <Row align="middle" justify="space-between" className="search-row" gutter={[12, 12]}>
          <Col className="tilte" xs={24} sm={24} md={4} lg={4}>
            <Typography.Text className="fz-16 fw-600">States</Typography.Text>
          </Col>
          <Col className="search-bar" xs={24} sm={24} md={12} lg={12}>
            <Row
              justify="end"
              className="search-bar-row"
              align="middle"
              gutter={[16, 16]}
              style={{ height: 10 }}>
              <Col className="search-input-col" span={13}>
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
              <Col span={11}>
                <Button
                  style={{ background: "#272942", color: "#fff", width: "100%" }}
                  size="small"
                  onClick={showAddNewState}>
                  + New state
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
            locale={{ emptyText: "No states yet" }}
          />
          <Typography.Text className="table-bottom-info hide-sm">
            Total : {tableData.length}
          </Typography.Text>
        </div>
      </section>
    </>
  );
}

export default States;
