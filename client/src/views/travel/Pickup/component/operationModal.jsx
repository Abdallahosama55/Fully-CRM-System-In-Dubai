import { Descriptions, Modal, Tag } from "antd";
import React from "react";
import { quotationTagColor } from "../helper";
import dayjs from "dayjs";

const OperationModal = ({ openModal, selected, setOpenModal }) => {
  return (
    <Modal
      title="Booking & Quotation Details"
      open={openModal}
      onCancel={() => setOpenModal(false)}
      footer={null}
      width={700}>
      {selected && (
        <>
          <Descriptions style={{ marginTop: "20px" }} title="Booking Details" bordered column={1}>
            {selected.bookingDetilsData.map(([key, val], i) => (
              <Descriptions.Item key={i} label={key}>
                {val}
              </Descriptions.Item>
            ))}
          </Descriptions>
          {selected.withQuotation && (
            <Descriptions style={{ marginTop: "20px" }} title="Quotation Data" bordered column={1}>
              {selected.quotation.map((item, idx) => (
                <Descriptions.Item
                  key={idx}
                  label={
                    <Tag color={quotationTagColor[`${item.type}`.toLowerCase()]}>
                      {item.type.toUpperCase()}
                    </Tag>
                  }>
                  <strong>{item.name}</strong>
                  <strong>{item.desc}</strong>
                  <br />
                  {item.departureDate && (
                    <div>
                      departureDate:{""}
                      {item.departureDate && dayjs(item.departureDate).format("YYYY-MM-DD")}
                    </div>
                  )}
                  {item.arrivalDate && (
                    <div>
                      arrivalDate: {""}
                      {dayjs(item.arrivalDate).format("YYYY-MM-DD")}
                    </div>
                  )}
                </Descriptions.Item>
              ))}
            </Descriptions>
          )}
        </>
      )}
    </Modal>
  );
};

export default OperationModal;
