import { Button, Col, Input, Row, Table, Typography, Switch, Form } from "antd";
import { useEffect, useState } from "react";
import JobTitlesService from "services/newSettings/jobTitles.service";
import { useNotification } from "context/notificationContext";

import IsActive from "components/StatusComponent/IsActive";
import "./styles.css";
import { DeleteSVG, EditSVG } from "assets/jsx-svg";
import WarningModal from "./Components/WarningModal";
import AddEditModal from "./Components/AddEditModal";

function JobTitles() {
  const [textSearch, setTextSearch] = useState("");

  const [isDeactivateModalOpen, setIsDeactivateModalOpen] = useState(false);
  const [JobToDeactivate, setJobToDeactivate] = useState({});
  const showDeactivateModal = () => {
    setIsDeactivateModalOpen(true);
  };
  const handleDeactivateModalOk = () => {
    toggleActivationRequest(JobToDeactivate.id, false);
    setIsDeactivateModalOpen(false);
    setJobToDeactivate(null);
  };
  const handleDeactivateModalCancel = () => {
    setIsDeactivateModalOpen(false);
    setJobToDeactivate(null);
  };

  const onRowSwitchChanged = (jobTitleObject, checked) => {
    if (!checked) {
      showDeactivateModal();
      setJobToDeactivate(jobTitleObject);
    } else {
      toggleActivationRequest(jobTitleObject.id, true);
    }
  };

  const [EditObj, setEditObj] = useState(null);
  const onRowEditView = (jobTitleRow) => {
    form.setFieldsValue({
      title: jobTitleRow.title,
      status: jobTitleRow.status,
    });
    setIsAddEditJobTitleModalOpen(true);

    setEditObj(jobTitleRow);
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
      title: "Job title",
      dataIndex: "title",
      width: "40%",
      sorter: (a, b) => b.title.localeCompare(a.title),
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
                title={record.status ? "Edit" : "Can't edit when job title Inactive"}
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
  const { openNotificationWithIcon } = useNotification();
  const [tableData, setTableData] = useState([]);
  const [orignaltableData, setOrignalData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(0);

  const getAllRequest = () => {
    JobTitlesService.getAll()
      .then(({ data }) => {
        setIsLoading(false);
        var jobTitls = data?.data.map((item, index) => ({
          index: index + 1,
          ...item,
          statusLabel: item.status ? "Activate" : "Deactivate",
        }));

        setTableData(jobTitls);
        setOrignalData(jobTitls);

        filterTable(textSearch, jobTitls, ["title"]);
      })
      .catch((error) => {
        setIsLoading(false);
        var { errors } = error?.response.data;
        openNotificationWithIcon("error", errors[0]);
      });
  };
  const deleteRequest = (id) => {
    JobTitlesService.DeleteJobTitle(id)
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
    JobTitlesService.toggleActivationJobTitle(id)
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
  useEffect(() => {
    setIsLoading(true);
    getAllRequest();
  }, []);

  // Delete modal

  const [jobTitleToDelete, setjobTitleToDelete] = useState({});
  const onRowDelete = (jobTitleObj) => {
    showDeleteModal();
    setjobTitleToDelete(jobTitleObj);
  };

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const showDeleteModal = () => {
    setIsDeleteModalOpen(true);
  };
  const handleDeleteModalOk = () => {
    deleteRequest(jobTitleToDelete.id);
    setIsDeleteModalOpen(false);
  };
  const handleDeleteModalCancel = () => {
    setIsDeleteModalOpen(false);
    setjobTitleToDelete(null);
  };
  //End delete modal
  // Add New jobTitle modal
  // -->form
  const [form] = Form.useForm();
  const onFinish = (values) => {
    handleAddEditJobTitleModalOk(values);
  };
  // -->end form
  const addNewJobTitleRequest = (objectToAdd) => {
    setIsLoading(true);
    JobTitlesService.addJobTitle(objectToAdd)
      .then(({ data }) => {
        getAllRequest();
        setIsAddEditJobTitleModalOpen(false);
        openNotificationWithIcon("success", "Added successfully");
      })
      .catch((error) => {
        setIsLoading(false);
        var { errors } = error?.response.data;
        openNotificationWithIcon("error", errors[0]);
      });
  };
  const editJobTitleRequest = (id, objectToEdit) => {
    setIsLoading(true);
    JobTitlesService.editJobTitle(id, objectToEdit)
      .then(({ data }) => {
        getAllRequest();
        setIsAddEditJobTitleModalOpen(false);
        openNotificationWithIcon("success", "Edited successfully");
      })
      .catch((error) => {
        setIsLoading(false);
        var { errors } = error?.response.data;
        openNotificationWithIcon("error", errors[0]);
      });
  };
  const [isAddEditJobTitleModalOpen, setIsAddEditJobTitleModalOpen] = useState(false);
  const showAddNewJobTitle = () => {
    setEditObj(null);
    form.resetFields();
    setIsAddEditJobTitleModalOpen(true);
  };
  const handleAddEditJobTitleModalOk = (values) => {
    var objectToAddOrEdit = {
      ...values,
    };
    EditObj
      ? editJobTitleRequest(EditObj.id, objectToAddOrEdit)
      : addNewJobTitleRequest(objectToAddOrEdit);
  };
  const handleAddNewJobTitleModalCancel = () => {
    setIsAddEditJobTitleModalOpen(false);
    form.resetFields();
  };
  //End New jobTitle modal

  const onChagneSearchText = (text) => {
    setTextSearch(text);
    filterTable(text, orignaltableData, ["title"]);
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
        handleAddNewJobTitleModalCancel={handleAddNewJobTitleModalCancel}
        isAddEditJobTitleModalOpen={isAddEditJobTitleModalOpen}
      />
      {
        <WarningModal
          isWarningModalOpen={isDeleteModalOpen}
          handleCancel={handleDeleteModalCancel}
          handleOk={handleDeleteModalOk}
          warningBody={`Are you sure you want to delete this "${jobTitleToDelete?.title}" job title?`}
        />
      }
      {
        <WarningModal
          isWarningModalOpen={isDeactivateModalOpen}
          handleCancel={handleDeactivateModalCancel}
          handleOk={handleDeactivateModalOk}
          warningBody={`Are you sure you want to deactivate the "${JobToDeactivate?.title}" and prevent any changes?`}
        />
      }

      <section className="body-content products">
        <Row align="middle" justify="space-between" className="search-row" gutter={[12, 12]}>
          <Col className="tilte" xs={24} sm={24} md={4} lg={4}>
            <Typography.Text className="fz-16 fw-600">Job Titles</Typography.Text>
          </Col>
          <Col className="search-bar" xs={24} sm={24} md={12} lg={12}>
            <Row
              justify="end"
              className="search-bar-row"
              align="middle"
              gutter={[16, 16]}
              style={{ height: 10 }}>
              <Col className="search-input-col" span={14}>
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
              <Col span={10}>
                <Button
                  style={{ background: "#272942", color: "#fff", width: "100%" }}
                  size="small"
                  onClick={showAddNewJobTitle}>
                  + New job title
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
            locale={{ emptyText: "No job titles yet" }}
          />
          <Typography.Text className="table-bottom-info hide-sm">
            Total : {tableData.length}
          </Typography.Text>
        </div>
      </section>
    </>
  );
}

export default JobTitles;
