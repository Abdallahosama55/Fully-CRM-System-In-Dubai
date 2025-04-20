import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Col, Modal, Row, Table, Typography } from "antd";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";

import AddSlide from "./AddSlide";
import EditSlide from "./EditSlide";
import { columns } from "./TableColumns";

import userContext from "context/userContext";
import { useNotification } from "context/notificationContext";
import useGetSliders from "services/Sliders/Queries/useGetSliders";
import useDeleteSlider from "services/Sliders/Mutations/useDeleteSlider";
import { queryClient } from "services/queryClient";

const SliderView = () => {
  const { openNotificationWithIcon } = useNotification();
  const [addSlideModalOpen, setAddSlideModal] = useState(false);
  const { openMessage } = useNotification();
  const [editSlideModal, setEditSlideModal] = useState({
    open: false,
    data: null,
  });
  const [sliderData, setSliderData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const navigate = useNavigate();
  const { user } = useContext(userContext);

  const { data, isLoading, queryKey } = useGetSliders(
    { page },
    {
      select: (data) => {
        return data.data.data;
      },
    },
  );
  const { deleteSlider } = useDeleteSlider({
    onSuccess: (_, id) => {
      queryClient.setQueryData(queryKey, (prev) => {
        if (prev.data.data.rows.filter((item) => item.id !== id).length === 0) {
          setPage((prev) => (prev === 1 ? prev : prev > 1 ? prev - 1 : prev));
        }
        return {
          ...prev,
          data: {
            ...prev.data,
            data: {
              ...prev.data.data,
              rows: prev.data.data.rows.filter((item) => item.id !== id),
              count: prev.data.data.count - 1,
            },
          },
        };
      });
      openNotificationWithIcon("success", "Virtual Portal Deleted Successfully ✅");
    },
  });
  // const iframeCode = `<iframe src="${
  //   window.location.origin + "/slider/" + user.companyId
  // }" style="border:0px #ffffff none;" name="myiFrame" scrolling="no" frameborder="1" marginheight="0px" marginwidth="0px" height="100%" width="100%" allowfullscreen allow="camera; microphone"></iframe>`;
  const iframeCode = (sliderId) =>
    `<iframe id="vindo-youtube-iframe" src="${
      window.location.origin + "/slider/" + sliderId
    }" style="border:0px #ffffff none;" name="myiFrame" scrolling="no" frameborder="1" marginheight="0px" marginwidth="0px" height="100%" width="100%" allowfullscreen allow="camera *; microphone *; display-capture *; autoplay; encrypted-media; gyroscope;"></iframe>`;

  const handleDeleteSlide = async (data) => {
    try {
      await deleteSlider(data.id);
    } catch (axiosCatch) {
      axiosCatch(axiosCatch);
    }
  };
  const handleNavEdit = (data) => {
    navigate("edit/" + data.id);
  };
  const copyIfram = (sliderId) => {
    navigator.clipboard.writeText(iframeCode(sliderId));
    openMessage({ type: "success", message: "Iframe code copied to clipboard" });
  };
  const handleEditSlider = (data) => {
    setEditSlideModal({
      open: true,
      data: data,
    });
  };
  const finalColumns = columns(handleNavEdit, handleDeleteSlide, copyIfram, handleEditSlider);

  return (
    <section>
      <Row align="middle" justify="space-between" gutter={[12, 12]}>
        <Col>
          <Typography.Title level={4}>Virtual Portal</Typography.Title>
        </Col>
      </Row>

      <Row justify="start" gutter={[32, 42]} style={{ marginTop: "47px" }}>
        {loading ? (
          <div className="center-items" style={{ width: "100%" }}>
            <LoadingOutlined />
          </div>
        ) : (
          <Col span={24}>
            <Row>
              <Col xs={12} sm={11} md={9} lg={5} xl={4}>
                <Button
                  onClick={() => setAddSlideModal(true)}
                  className="wc"
                  style={{ background: "#272942", width: "100%" }}>
                  <PlusOutlined className="wc" />
                  New
                </Button>
              </Col>
              {/* <Col xs={12} sm={11} md={9} lg={5} xl={5}>
                <Button
                  onClick={() =>
                    navigate(`${user.companyId}`, {
                      state: { loginUser: true },
                    })
                  }
                  className="wc"
                  style={{ background: "#272942", width: "100%" }}>
                  <PlusOutlined className="wc" />
                  preview Slider
                </Button>
              </Col> */}
              {/* <Col xs={24} sm={11} md={9} lg={7} xl={6}>
                <Button
                  onClick={async () => {
                    await navigator.clipboard.writeText(iframeCode);
                    openMessage({ type: "success", message: "iframe code copied to clipboard" });
                  }}
                  className="wc"
                  style={{ background: "#272942", width: "100%" }}>
                  <CodeOutlined className="wc" />
                  copy embedded code
                </Button>
              </Col> */}
              <Col span={24}>
                <Table
                  pagination={{
                    pageSize: 10,
                    total: data?.count,
                    onChange: (page) => {
                      setPage(page);
                    },
                    defaultCurrent: page / 10 + 1,
                  }}
                  loading={isLoading}
                  style={{ marginTop: "20px" }}
                  dataSource={data?.rows ?? []}
                  rowKey="image"
                  columns={finalColumns}
                />
              </Col>
            </Row>
          </Col>
        )}
      </Row>
      <Modal
        destroyOnClose
        open={addSlideModalOpen}
        onCancel={() => setAddSlideModal(false)}
        centered
        title="Create New Virtual Portal"
        footer={false}>
        <AddSlide setAddSlideModal={setAddSlideModal} setSliderData={setSliderData} />
      </Modal>

      <Modal
        destroyOnClose
        open={editSlideModal.open}
        onCancel={() => setEditSlideModal({ open: false })}
        centered
        footer={false}>
        <EditSlide
          editSlideData={editSlideModal?.data}
          setEditSlideModal={setEditSlideModal}
          setSliderData={setSliderData}
        />
      </Modal>
    </section>
  );
};
export default SliderView;
