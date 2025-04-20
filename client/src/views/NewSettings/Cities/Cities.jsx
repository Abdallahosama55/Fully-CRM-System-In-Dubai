import { Button, Col, Input, Row, Table, Typography, Switch, Form } from "antd";
import { useEffect, useState } from "react";
import CountriesService from "services/newSettings/countries.service";
import CitiesService from "services/newSettings/cities.service";
import { useNotification } from "context/notificationContext";

import IsActive from "components/StatusComponent/IsActive";
import "./styles.css";
import { DeleteSVG, EditSVG } from "assets/jsx-svg";
import WarningModal from "./Components/WarningModal";
import AddEditModal from "./Components/AddEditModal";
import statesService from "services/newSettings/states.service";

function Cities() {
  const [textSearch, setTextSearch] = useState("");

  const [isDeactivateModalOpen, setIsDeactivateModalOpen] = useState(false);
  const [CityToDeactivate, setCityToDeactivate] = useState({});
  const [isAddEditCityModalOpen, setIsAddEditCityModalOpen] = useState(false);
  const [form] = Form.useForm();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [cityToDelete, setCityToDelete] = useState({});

  const [countryList, setCountryList] = useState([]);
  const [stateList, setStateList] = useState([]);
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
  const onChangeCountryId = (CountryId) => {
    form.setFieldsValue({
      state_id: undefined, // Set the value to undefined or null to clear the selection
    });
    getStatesByCountryIdRequest(CountryId);
  };
  // useEffect(() => {

  // }, []);
  const showDeactivateModal = () => {
    setIsDeactivateModalOpen(true);
  };
  const handleDeactivateModalOk = () => {
    toggleActivationRequest(CityToDeactivate.id, false);
    setIsDeactivateModalOpen(false);
    setCityToDeactivate(null);
  };
  const handleDeactivateModalCancel = () => {
    setIsDeactivateModalOpen(false);
    setCityToDeactivate(null);
  };

  const onRowSwitchChanged = (cityObject, checked) => {
    if (!checked) {
      showDeactivateModal();
      setCityToDeactivate(cityObject);
    } else {
      toggleActivationRequest(cityObject.id, true);
    }
  };

  const onRowEditView = (CityRow) => {
    getStatesByCountryIdRequest(CityRow.country_id);

    form.setFieldsValue({
      country_id: CityRow.country_id,
      state_id: CityRow.state_id,
      city_name: CityRow.city_name,
      status: CityRow.status,
    });
    setIsAddEditCityModalOpen(true);

    setEditObj(CityRow);
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
      title: "City Name",
      dataIndex: "city_name",
      width: "20%",
      sorter: (a, b) => b.city_name.localeCompare(a.city_name),
    },
    {
      hidden: false,
      title: "State Name",
      dataIndex: "state_name",
      width: "20%",
      sorter: (a, b) => b.state_name.localeCompare(a.state_name),
    },
    {
      hidden: false,
      title: "Country Name",
      dataIndex: "country_name",
      width: "20%",
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
                title={record.status ? "Edit" : "Can't edit when city Inactive"}
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
  const getStatesByCountryIdRequest = (CountryId) => {
    statesService
      .getStatesByCountryId(CountryId)
      .then(({ data }) => {
        var states = data?.data.map((item) => ({
          id: item.id,
          state_name: item.name,
        }));
        setStateList(states);
      })
      .catch((error) => {
        var { errors } = error?.response.data;
        openNotificationWithIcon("error", errors[0]);
      });
  };
  const getAllRequest = () => {
    CitiesService.getAll()
      .then(({ data }) => {
        setIsLoading(false);
        var cities = data.data?.map((item, index) => ({
          index: index + 1,
          id: item.id,
          city_name: item.name,
          state_id: item.state.id,
          state_name: item.state.name,
          country_id: item.state.country.id,
          country_name: item.state.country.name,
          status: item.status,
          statusLabel: item.status ? "Activate" : "Deactivate",
        }));

        setTableData(cities);
        setOrignalData(cities);

        filterTable(textSearch, cities, ["state_name", "country_name", "city_name"]);
        //get count
      })
      .catch((error) => {
        setIsLoading(false);
        var { errors } = error?.response.data;
        openNotificationWithIcon("error", errors[0]);
      });
  };
  const deleteRequest = (id) => {
    CitiesService.deleteCity(id)
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
    CitiesService.toggleActivationCity(id)
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

  const onRowDelete = (cityObj) => {
    showDeleteModal();
    setCityToDelete(cityObj);
  };

  const showDeleteModal = () => {
    setIsDeleteModalOpen(true);
  };
  const handleDeleteModalOk = () => {
    deleteRequest(cityToDelete.id);
    setIsDeleteModalOpen(false);
  };
  const handleDeleteModalCancel = () => {
    setIsDeleteModalOpen(false);
    setCityToDelete(null);
  };
  //End delete modal
  // Add New city modal
  // -->form
  const onFinish = (values) => {
    handleAddEditCityModalOk(values);
  };
  // -->end form
  const addNewCityRequest = (objectToAdd) => {
    setIsLoading(true);
    CitiesService.addCity(objectToAdd)
      .then(({ data }) => {
        getAllRequest();
        setIsAddEditCityModalOpen(false);
        openNotificationWithIcon("success", "Added successfully");
      })
      .catch((error) => {
        setIsLoading(false);
        var { errors } = error?.response.data;
        openNotificationWithIcon("error", errors[0]);
      });
  };
  const editCityRequest = (id, objectToEdit) => {
    setIsLoading(true);
    CitiesService.editCity(id, objectToEdit)
      .then(({ data }) => {
        getAllRequest();
        setIsAddEditCityModalOpen(false);
        openNotificationWithIcon("success", "Edited successfully");
      })
      .catch((error) => {
        setIsLoading(false);
        var { errors } = error?.response.data;
        openNotificationWithIcon("error", errors[0]);
      });
  };
  const showAddNewCity = () => {
    setEditObj(null);
    form.resetFields();
    setIsAddEditCityModalOpen(true);
  };
  const handleAddEditCityModalOk = (values) => {
    var objectToAddOrEdit = {
      name: values.city_name,
      stateId: values.state_id,
      status: values.status,
    };
    EditObj ? editCityRequest(EditObj.id, objectToAddOrEdit) : addNewCityRequest(objectToAddOrEdit);
  };
  const handleAddNewCityModalCancel = () => {
    setIsAddEditCityModalOpen(false);
    form.resetFields();
  };
  //End New City modal

  const onChagneSearchText = (text) => {
    setTextSearch(text);
    filterTable(text, orignaltableData, ["state_name", "country_name", "city_name"]);
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
        handleAddNewCityModalCancel={handleAddNewCityModalCancel}
        isAddEditCityModalOpen={isAddEditCityModalOpen}
        CountryList={countryList}
        StateList={stateList}
        onChangeCountryId={onChangeCountryId}
      />
      {
        <WarningModal
          isWarningModalOpen={isDeleteModalOpen}
          handleCancel={handleDeleteModalCancel}
          handleOk={handleDeleteModalOk}
          warningBody={`Are you sure you want to delete this "${cityToDelete?.city_name}" city?`}
        />
      }
      {
        <WarningModal
          isWarningModalOpen={isDeactivateModalOpen}
          handleCancel={handleDeactivateModalCancel}
          handleOk={handleDeactivateModalOk}
          warningBody={`Are you sure you want to deactivate the "${CityToDeactivate?.city_name}" and prevent any changes?`}
        />
      }

      <section className="body-content products">
        <Row align="middle" justify="space-between" className="search-row" gutter={[12, 12]}>
          <Col className="tilte" xs={24} sm={24} md={4} lg={4}>
            <Typography.Text className="fz-16 fw-600">Cities</Typography.Text>
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
                  onClick={showAddNewCity}>
                  + New city
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
            locale={{ emptyText: "No cities yet" }}
          />
          <Typography.Text className="table-bottom-info hide-sm">
            Total : {tableData.length}
          </Typography.Text>
        </div>
      </section>
    </>
  );
}

export default Cities;
