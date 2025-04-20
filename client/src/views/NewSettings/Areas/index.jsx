import { Button, Col, Input, Row, Form, Flex, Space, Tooltip } from "antd";
import { useState } from "react";
import { DeleteSVG, EditSVG, PlusSVG, SearchSVG } from "assets/jsx-svg";
import WarningModal from "./components/WarningModal";
import AddArea from "../../../components/AddArea";
import { useDebounce } from "hooks/useDebounce";
import CustomTable from "components/CustomTable";
import useListAreas from "services/travel/Settings/areas/Query/useListAreas";

function Areas() {
  const [textSearch, setTextSearch] = useState(undefined);
  const debounceedSearchText = useDebounce(textSearch, 500);
  const [page, setPage] = useState(1);
  const areasList = useListAreas({ page, size: 10, name: debounceedSearchText });

  const [isAddEditCityModalOpen, setIsAddEditCityModalOpen] = useState(false);
  const [form] = Form.useForm();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [cityToDelete, setCityToDelete] = useState({});
  const [EditObj, setEditObj] = useState(null);

  const deleteRequest = (id) => {
    // TODO:
  };

  // Delete modal
  const onDelete = (cityObj) => {
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

  const showAddNewCity = () => {
    setEditObj(null);
    form.resetFields();
    setIsAddEditCityModalOpen(true);
  };

  return (
    <>
      <AddArea
        editObject={EditObj}
        close={() => setIsAddEditCityModalOpen(false)}
        isOpen={isAddEditCityModalOpen}
      />

      <WarningModal
        isWarningModalOpen={isDeleteModalOpen}
        handleCancel={handleDeleteModalCancel}
        handleOk={handleDeleteModalOk}
        warningBody={`Are you sure you want to delete this "${cityToDelete?.name}" area?`}
      />

      <section className="body-content products">
        <Flex align="center" justify="space-between">
          <p className="fz-24 fw-600">Areas</p>
          <Space>
            <Input
              value={textSearch}
              className="general-table-search"
              placeholder="Search"
              prefix={<SearchSVG />}
              onChange={(e) => setTextSearch(e.target.value)}
            />
            <Button
              type="primary"
              icon={<PlusSVG color={"currentColor"} />}
              onClick={showAddNewCity}>
              New
            </Button>
          </Space>
        </Flex>
        <Row align="middle" justify="space-between" className="search-row" gutter={[12, 12]}>
          <Col className="tilte" xs={24} sm={24} md={4} lg={4}></Col>
          <Col className="search-bar" xs={24} sm={24} md={12} lg={12}></Col>
        </Row>

        <CustomTable
          rowKey={"id"}
          style={{ marginTop: "32px" }}
          page={page}
          setPage={setPage}
          total={areasList?.data?.count}
          loading={areasList?.isLoading}
          columns={[
            {
              title: "NO.",
              dataIndex: "id",
              render: (id) => `#${id}`,
            },
            {
              title: "City Name",
              dataIndex: "worldcity",
              render: (worldcity) => worldcity?.city,
            },
            {
              title: "Area name",
              dataIndex: "name",
            },
            {
              title: "Actions",
              key: "actions",
              dataIndex: "actions",
              width: "110px",
              render: (_, record) => {
                return (
                  <Flex gap={8} align="center" justify="center">
                    <Tooltip title={"Edit"}>
                      <Button
                        type={"primary"}
                        className="table_action_button"
                        icon={<EditSVG color={"#fff"} />}
                        onClick={() => {
                          setEditObj(record);
                          setIsAddEditCityModalOpen(true);
                        }}
                      />
                    </Tooltip>
                    <Tooltip title={"Delete"}>
                      <Button
                        type={"primary"}
                        className="table_action_button"
                        danger
                        icon={<DeleteSVG color={"#fff"} />}
                        onClick={() => onDelete(record)}
                      />
                    </Tooltip>
                  </Flex>
                );
              },
            },
          ]}
          dataSource={areasList?.data?.rows}
          locale={{ emptyText: "No Areas yet" }}
        />
      </section>
    </>
  );
}

export default Areas;
