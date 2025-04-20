import { Button, Col, Input, Row, Table, Typography, Switch, Form } from "antd";
import { useEffect, useState } from "react";
import CountriesService from "services/newSettings/countries.service";
import { useNotification } from "context/notificationContext";

import IsActive from "components/StatusComponent/IsActive";
import "./styles.css";
import { DeleteSVG, EditSVG } from "assets/jsx-svg";
import WarningModal from "./Components/WarningModal";
import AddEditModal from "./Components/AddEditModal";

function Countries() {
  const [textSearch, setTextSearch] = useState("");
  const { openNotificationWithIcon } = useNotification();
  const [tableData, setTableData] = useState([]);
  const [orignaltableData, setOrignalData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(0);

  const [isDeactivateModalOpen, setIsDeactivateModalOpen] = useState(false);
  const [CountryToDeactivate, setCountryToDeactivate] = useState({});
  const [countryToDelete, setCountryToDelete] = useState({});
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [form] = Form.useForm();
  const [isAddEditCountryModalOpen, setIsAddEditCountryModalOpen] = useState(false);
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
      title: "Country",
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
                title={record.status ? "Edit" : "Can't edit when country Inactive"}
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
    toggleActivationRequest(CountryToDeactivate.id, false);
    setIsDeactivateModalOpen(false);
    setCountryToDeactivate(null);
  };
  const handleDeactivateModalCancel = () => {
    setIsDeactivateModalOpen(false);
    setCountryToDeactivate(null);
  };

  const onRowSwitchChanged = (countryObject, checked) => {
    if (!checked) {
      showDeactivateModal();
      setCountryToDeactivate(countryObject);
    } else {
      toggleActivationRequest(countryObject.id, true);
    }
  };

  const onRowEditView = (countryRow) => {
    form.setFieldsValue({
      name: countryRow.name,
      status: countryRow.status,
    });
    setIsAddEditCountryModalOpen(true);

    setEditObj(countryRow);
  };

  const getAllRequest = () => {
    CountriesService.getAll()
      .then(({ data }) => {
        setIsLoading(false);
        var countries = data?.data.map((item, index) => ({
          index: index + 1,
          ...item,
          statusLabel: item.status ? "Activate" : "Deactivate",
        }));

        setTableData(countries);
        setOrignalData(countries);

        filterTable(textSearch, countries, ["name"]);
      })
      .catch((error) => {
        setIsLoading(false);
        var { errors } = error?.response.data;
        openNotificationWithIcon("error", errors[0]);
      });
  };
  const deleteRequest = (id) => {
    CountriesService.deleteCountry(id)
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
    CountriesService.toggleActivationCountry(id)
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

  const onRowDelete = (countryObj) => {
    showDeleteModal();
    setCountryToDelete(countryObj);
  };

  const showDeleteModal = () => {
    setIsDeleteModalOpen(true);
  };
  const handleDeleteModalOk = () => {
    deleteRequest(countryToDelete.id);
    setIsDeleteModalOpen(false);
  };
  const handleDeleteModalCancel = () => {
    setIsDeleteModalOpen(false);
    setCountryToDelete(null);
  };
  //End delete modal
  // Add New country modal
  // -->form
  const onFinish = (values) => {
    handleAddEditCountryModalOk(values);
  };
  // -->end form
  const addNewCountryRequest = (objectToAdd) => {
    setIsLoading(true);
    CountriesService.addCountry(objectToAdd)
      .then(({ data }) => {
        getAllRequest();
        setIsAddEditCountryModalOpen(false);
        openNotificationWithIcon("success", "Added successfully");
      })
      .catch((error) => {
        setIsLoading(false);
        var { errors } = error?.response.data;
        openNotificationWithIcon("error", errors[0]);
      });
  };
  const editCountryRequest = (id, objectToEdit) => {
    setIsLoading(true);
    CountriesService.editCountry(id, objectToEdit)
      .then(({ data }) => {
        getAllRequest();
        setIsAddEditCountryModalOpen(false);
        openNotificationWithIcon("success", "Edited successfully");
      })
      .catch((error) => {
        setIsLoading(false);
        var { errors } = error?.response.data;
        openNotificationWithIcon("error", errors[0]);
      });
  };
  const showAddNewCountry = () => {
    setEditObj(null);
    form.resetFields();
    setIsAddEditCountryModalOpen(true);
  };
  const handleAddEditCountryModalOk = (values) => {
    var objectToAddOrEdit = {
      ...values,
    };
    EditObj
      ? editCountryRequest(EditObj.id, objectToAddOrEdit)
      : addNewCountryRequest(objectToAddOrEdit);
  };
  const handleAddNewCountryModalCancel = () => {
    setIsAddEditCountryModalOpen(false);
    form.resetFields();
  };
  //End New country modal

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
        handleAddNewCountryModalCancel={handleAddNewCountryModalCancel}
        isAddEditCountryModalOpen={isAddEditCountryModalOpen}
      />
      {
        <WarningModal
          isWarningModalOpen={isDeleteModalOpen}
          handleCancel={handleDeleteModalCancel}
          handleOk={handleDeleteModalOk}
          warningBody={`Are you sure you want to delete this "${countryToDelete?.name}" country?`}
          warningTitle={"Delete country will delete all corresponding states and cities."}
        />
      }
      {
        <WarningModal
          isWarningModalOpen={isDeactivateModalOpen}
          handleCancel={handleDeactivateModalCancel}
          handleOk={handleDeactivateModalOk}
          warningBody={`Are you sure you want to deactivate the "${CountryToDeactivate?.name}" and all corresponding states and cities and prevent any changes?`}
        />
      }

      <section className="body-content products">
        <Row align="middle" justify="space-between" className="search-row" gutter={[12, 12]}>
          <Col className="tilte" xs={24} sm={24} md={4} lg={4}>
            <Typography.Text className="fz-16 fw-600">Countries</Typography.Text>
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
                  onClick={showAddNewCountry}>
                  + New country
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
            locale={{ emptyText: "No countries yet" }}
          />
          <Typography.Text className="table-bottom-info hide-sm">
            Total : {tableData.length}
          </Typography.Text>
        </div>
      </section>
    </>
  );
}

export default Countries;
