import React from "react";
import { Col, Divider, Flex, Row, Tag, Typography } from "antd";
import VerseCard from "components/common/VerseCard";
import NoDataToShowComponent from "views/Customers/ViewCustomer/Components/NewStyleComponents/NavigationPages/Components/NoDataToShowComponent";
import Box from "components/Box";
const diskTypeLabel = {
  CUSTOMER_SERVICE_DESK: "Customer service",
  MEETING_DESK: "Meeting desk",
};

const tagStyle = {
  background: "#3a5ee31a",
  borderRadius: "8px",
  fontSize: "12px",
  padding: "6px",
  color: "#3a5ee3",
};
function BasicInformation({
  deskData,
  deskFullData,
  image,
  allowCustomerToChangeCallType,
  department,
}) {
  return (
    <div className="info-form-card info-from-desk">
      {
        <Flex gap={8}>
          <img
            style={{
              width: "112px",
              height: "112px",
              borderRadius: "8px",
            }}
            src={image}
            alt={image}
          />
          <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            <Typography.Text className="fz-14 fw-700">
              {deskFullData?.name && String(deskFullData?.name).toLowerCase()}
            </Typography.Text>
            {department && (
              <div>
                <Typography.Text>
                  <span style={{ color: "#8E8E93" }}>Department:</span> {department}
                </Typography.Text>
              </div>
            )}
            <div>
              <Typography.Text>
                <span style={{ color: "#8E8E93" }}>Allow Customer To Change Call Type:</span>
                {allowCustomerToChangeCallType ? "Yes" : "No"}
              </Typography.Text>
            </div>
            <div>
              <Tag style={tagStyle} bordered={false}>
                {deskFullData?.callType && String(deskFullData?.callType).toLocaleLowerCase()}
              </Tag>

              <Tag style={tagStyle} bordered={false}>
                {diskTypeLabel?.[deskFullData?.deskType] ?? "Meeting"}
              </Tag>
            </div>
          </div>
        </Flex>
      }
      <Divider />

      {(deskFullData?.meetingVerse || []).length === 0 ? (
        <NoDataToShowComponent />
      ) : (
        <Row justify="space-between" align="middle">
          <Row style={{ padding: "0", paddingLeft: 0 }} gutter={[10, 0]}>
            <Col xs={12} style={{ opacity: "1", width: "268px" }} className="add-employees">
              {deskFullData?.meetingVerse && (
                <>
                  <div className="mb-1 fw-500 fz-12">Meeting Verse</div>
                  <Box sx={overwriteStyleCard}>
                    <VerseCard className={"desk-card-verses"} data={deskFullData?.meetingVerse} />{" "}
                  </Box>
                </>
              )}
            </Col>

            <Col xs={12} style={{ opacity: "1", width: "268px" }} className="add-employees">
              {deskFullData?.waitingVerse && (
                <>
                  <div className="mb-1 fw-500 fz-12">Waiting Room Verse</div>
                  <Box sx={overwriteStyleCard}>
                    <VerseCard className={"desk-card-verses"} data={deskFullData?.waitingVerse} />
                  </Box>
                </>
              )}
            </Col>
          </Row>
        </Row>
      )}
    </div>
  );
}
const overwriteStyleCard = {
  "& .image-holder": {
    border: "1px solid #E5E5EA !important",
    boxShadow: "0px 1px 3px 0px #0000000D !important",
  },
  "& .image-text-holder": {
    height: "35px",
    padding: "6px 16px !important",
    "& >div:first-child": {
      position: "relative",
      bottom: "6px",
    },
  },
  "& .explore-card-subtitle": {
    fontSize: "12px",
  },
  "& .desk-card-verses": {
    width: "251px",
    height: "174px",
  },
};
export default BasicInformation;
