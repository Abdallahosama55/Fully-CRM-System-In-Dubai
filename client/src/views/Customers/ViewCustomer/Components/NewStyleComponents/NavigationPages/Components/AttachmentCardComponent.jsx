import { useState } from "react";
import "../../../../style.css";
import useDeleteCustomerAttachment from "services/Customers/Mutations/useDeleteCustomerAttachment";
import { useNotification } from "context/notificationContext";
import {
  DownloadSVG,
  TimerSVG,
  MoreDimentionSVG,
  DeleteSVG,
  CustomerAttachmentSVG,
} from "assets/jsx-svg";
import { Dropdown, Menu, Row, Col, Typography } from "antd";
import WarningModal from "components/common/WarningModal";
import { QUERY_KEY } from "services/constants";
import { useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

export default function AttachmentCardComponent({ id, img, title, date }) {
  const myStyle = {
    alignItems: "center",
    display: "flex",
    justifyContent: "center",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundColor: "#889EEE",
    height: "37px",
    width: "37px",
    borderRadius: 10,
    marginRight: 8,
  };
  const { id: CustomerId } = useParams();
  const { openNotificationWithIcon } = useNotification();
  const queryClient = useQueryClient();

  const { deleteCustomerAttachment, isPending } = useDeleteCustomerAttachment({
    onSuccess: (data, payload) => {
      openNotificationWithIcon("success", `Deleted successfully`);
      queryClient.setQueryData([QUERY_KEY.GET_CUSTOMER_BY_ID, CustomerId], (prev) => {
        return {
          ...prev,
          data: {
            ...prev.data,
            data: {
              ...prev.data.data,
              attachments: prev.data.data.attachments.filter(
                (item) => item.id !== payload?.attachmentId,
              ),
            },
          },
        };
      });
    },
    onError: (data) => {
      openNotificationWithIcon(
        "error",
        data?.response?.data?.errors ?? data?.response?.data?.message,
      );
    },
  });
  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = img;
    link.download = "downloaded_image.jpeg";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const showDeleteModal = () => {
    setIsDeleteModalOpen(true);
  };
  const handleDeleteModalOk = () => {
    deleteRequest(id);
    setIsDeleteModalOpen(false);
  };
  const handleDeleteModalCancel = () => {
    setIsDeleteModalOpen(false);
  };
  const deleteRequest = async (id) => {
    console.log(id);
    await deleteCustomerAttachment({ customerId: CustomerId, attachmentId: id });
  };
  return (
    <div className="customer-attachment-card">
      {
        <WarningModal
          isloading={isPending}
          width={450}
          isWarningModalOpen={isDeleteModalOpen}
          handleCancel={handleDeleteModalCancel}
          handleOk={handleDeleteModalOk}
          warningBody={`Are you sure you want to delete this "${title}" file?`}
        />
      }
      <div className="image-and-title">
        <div className="image" style={myStyle}>
          <CustomerAttachmentSVG />
        </div>
        <div className="title-and-date">
          <div className="title">{title}</div>
          <div className="date">
            <TimerSVG />

            <div style={{ marginLeft: 6 }}> {date}</div>
          </div>
        </div>
      </div>
      <div className="actions">
        {/* <div className="icon" title="View" onClick={handleDownload} style={{ marginRight: 7 }}>
          <EyeSVG />
        </div>
        <div className="icon" title="Download" onClick={handleDownload}>
          <DownloadSVG />
        </div> */}
        <Dropdown
          dropdownRender={() => (
            <DimMenu onDownloadClicked={handleDownload} onDeleteClicked={showDeleteModal} />
          )}
          trigger={["click"]}
          placement="bottomRight"
          arrow>
          <div style={{ cursor: "pointer" }}>
            <MoreDimentionSVG color="#030713" style={{ rotate: "90deg" }} />
          </div>
        </Dropdown>
      </div>
    </div>
  );
}
const DimMenu = ({ onDeleteClicked, onDownloadClicked }) => {
  // const { openMessage } = useNotification();
  return (
    <Menu
      className="profile-menu"
      style={{ width: "200px" }}
      items={[
        {
          label: (
            <Row align="middle" gutter={[14, 0]} wrap={false}>
              <Col>
                <Row align="middle">
                  <DownloadSVG />
                </Row>
              </Col>
              <Col>
                <Typography>Download</Typography>
              </Col>
            </Row>
          ),
          key: "0",
          onClick: () => onDownloadClicked(),
        },
        {
          label: (
            <Row align="middle" gutter={[14, 0]} wrap={false}>
              <Col>
                <Row align="middle">
                  <DeleteSVG />
                </Row>
              </Col>
              <Col>
                <Typography style={{ color: "#f93e3e" }}>Delete</Typography>
              </Col>
            </Row>
          ),
          key: "1",
          onClick: () => onDeleteClicked(),
        },
      ]}
    />
  );
};
