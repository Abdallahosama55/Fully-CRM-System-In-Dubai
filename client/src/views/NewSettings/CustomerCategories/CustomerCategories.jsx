import { Button, Col, Form, Input, Row, Table, Typography } from "antd";
import { DeleteSVG, EditSVG } from "assets/jsx-svg";
import { useNotification } from "context/notificationContext";
import { useEffect, useState } from "react";
import constantService from "services/newSettings/constant.server";
import categoriesService from "services/newSettings/categories.service";
import AddEditModal from "./Components/AddEditModal";
import WarningModal from "./Components/WarningModal";

function CustomerCategories() {
  const [textSearch, setTextSearch] = useState("");
  const { openNotificationWithIcon } = useNotification();
  const [filteredCategories, setFilteredCategories] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [isAddEditModalOpen, setIsAddEditModalOpen] = useState(false);
  const [categoryToEdit, setCategoryToEdit] = useState(null);
  const [categoryToDelete, setCategoryToDelete] = useState({});
  const [form] = Form.useForm();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const onRowEditView = (categoryRow) => {
    form.setFieldsValue({
      name: categoryRow.name,
    });

    setIsAddEditModalOpen(true);

    setCategoryToEdit(categoryRow);
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
      title: "Name",
      dataIndex: "name",
      width: "40%",
      sorter: (a, b) => b.name.localeCompare(a.name),
    },
    {
      hidden: false,
      title: "Actions",
      key: "actions",
      dataIndex: "actions",
      align: "center",
      width: "10%",
      render: (_, record) => {
        return (
          <div style={{ display: "flex", justifyContent: "space-around" }}>
            <span title="Edit" style={{ cursor: "pointer" }} onClick={() => onRowEditView(record)}>
              <EditSVG />
            </span>
            <span title="Delete" style={{ cursor: "pointer" }} onClick={() => onRowDelete(record)}>
              <DeleteSVG />
            </span>
          </div>
        );
      },
    },
  ];

  const getAllRequest = () => {
    categoriesService
      .getCategory()
      .then(({ data }) => {
        setIsLoading(false);
        const categories = data?.data.map((item, index) => ({
          index: index + 1,
          ...item,
        }));

        setFilteredCategories(categories);
        setCategories(categories);

        filterTable(textSearch, categories, ["name"]);
      })
      .catch((error) => {
        setIsLoading(false);
        const { errors } = error?.response.data;
        openNotificationWithIcon("error", errors[0]);
      });
  };

  const deleteRequest = (id) => {
    categoriesService
      .deleteCategory(id)
      .then(({ data }) => {
        getAllRequest();
        openNotificationWithIcon("success", "Deleted successfully");
      })
      .catch((error) => {
        setIsLoading(false);
        const { errors } = error?.response.data;
        openNotificationWithIcon("error", errors[0]);
      });
  };

  useEffect(() => {
    setIsLoading(true);
    getAllRequest();
  }, []);

  const onRowDelete = (categoryRow) => {
    showDeleteModal();
    setCategoryToDelete(categoryRow);
  };

  const showDeleteModal = () => {
    setIsDeleteModalOpen(true);
  };

  const handleDeleteModalOk = () => {
    deleteRequest(categoryToDelete.id);
    setIsDeleteModalOpen(false);
  };

  const handleDeleteModalCancel = () => {
    setIsDeleteModalOpen(false);
    setCategoryToDelete(null);
  };

  const onFinish = (values) => {
    handleAddEditModal(values);
  };

  const addNewCategoryRequest = (category) => {
    setIsLoading(true);
    categoriesService
      .addCategory(category)
      .then(({ data }) => {
        getAllRequest();
        setIsAddEditModalOpen(false);
        openNotificationWithIcon("success", "Added successfully");
      })
      .catch((error) => {
        setIsLoading(false);
        const { errors } = error?.response.data;
        openNotificationWithIcon("error", errors[0]);
      });
  };

  const editCategoryRequest = (id, category) => {
    setIsLoading(true);
    categoriesService
      .updateCategory(id, category)
      .then(({ data }) => {
        getAllRequest();
        setIsAddEditModalOpen(false);
        openNotificationWithIcon("success", "Edited successfully");
      })
      .catch((error) => {
        setIsLoading(false);
        const { errors } = error?.response.data;
        openNotificationWithIcon("error", errors[0]);
      });
  };

  const showAddNewCategory = () => {
    setCategoryToEdit(null);
    form.resetFields();
    setIsAddEditModalOpen(true);
  };

  const handleAddEditModal = (values) => {
    const category = {
      ...values,
    };
    categoryToEdit
      ? editCategoryRequest(categoryToEdit.id, category)
      : addNewCategoryRequest(category);
  };

  const handleAddNewModalCancel = () => {
    setIsAddEditModalOpen(false);
    form.resetFields();
  };

  const onChagneSearchText = (text) => {
    setTextSearch(text);
    filterTable(text, categories, ["name"]);
  };

  const filterTable = (text, orignaltableData, searchFields) => {
    setFilteredCategories(
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
        isEditAction={categoryToEdit}
        onCancel={handleAddNewModalCancel}
        isOpen={isAddEditModalOpen}
      />
      <WarningModal
        isWarningModalOpen={isDeleteModalOpen}
        handleCancel={handleDeleteModalCancel}
        handleOk={handleDeleteModalOk}
        warningBody={`Are you sure you want to delete this "${categoryToDelete?.name}" category?`}
      />

      <section className="body-content products">
        <Row align="middle" justify="space-between" className="search-row" gutter={[12, 12]}>
          <Col className="tilte" xs={24} sm={24} md={4} lg={4}>
            <Typography.Text className="fz-16 fw-600">Customer Categories</Typography.Text>
          </Col>
          <Col className="search-bar" xs={24} sm={24} md={12} lg={12}>
            <Row
              justify="end"
              className="search-bar-row"
              align="middle"
              gutter={[16, 16]}
              style={{ height: 10 }}>
              <Col className="search-input-col" span={14}>
                <Row style={{ borderRadius: "10px" }} align="middle" justify="end" wrap={false}>
                  <Input
                    value={textSearch}
                    size="small"
                    className="general-table-search"
                    placeholder="Search"
                    onChange={(e) => onChagneSearchText(e.target.value)}
                    onBlur={(e) => onChagneSearchText(e.target.value)}
                  />
                </Row>
              </Col>
              <Col span={10}>
                <Button
                  style={{ background: "#272942", color: "#fff", width: "100%" }}
                  size="small"
                  onClick={showAddNewCategory}>
                  + New Category
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
            dataSource={filteredCategories}
            pagination={{
              pageSize: 10,
              total: filteredCategories.length,
              onChange: (page) => {
                setPage((page - 1) * 10);
              },
              defaultCurrent: page / 10 + 1,
            }}
            locale={{ emptyText: "No categories yet" }}
          />
          <Typography.Text className="table-bottom-info hide-sm">
            Total : {filteredCategories.length}
          </Typography.Text>
        </div>
      </section>
    </>
  );
}

export default CustomerCategories;
