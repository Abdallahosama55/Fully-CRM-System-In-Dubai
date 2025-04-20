import { BankOutlined, DropboxOutlined, FormOutlined } from "@ant-design/icons";
import { Avatar, Col, Collapse, Divider, Row, Tooltip, Typography } from "antd";
import { LeadSVG, TelephoneSVG } from "assets/jsx-svg";
import PriorityTagSVG from "assets/jsx-svg/PriorityTagSVG";
import EditCustomerSVG from "assets/jsx-svg/EditCustomerSVG";
import Box from "components/Box";
import { useMemo } from "react";
import useGetSourcesOfEventPipeline from "services/PipelineSources/Querys/useGetSourcesOfEventPipeline";
import useGetPriorityItems from "services/Pipelines/Querys/useGetPriorityItems";
import { stringAvatar } from "utils/string";
import "./styles.css";

function LeadSideInfo({
  leadStoredData,
  selectedPipelineId,
  onEditClicked,
  handleOpenCustomerModal,
  id,
}) {
  const { data: SourceList } = useGetSourcesOfEventPipeline(
    selectedPipelineId,
    {},
    { enabled: !!selectedPipelineId, select: (data) => data?.data?.data },
  );

  const { data: priorityItems } = useGetPriorityItems({
    select: (data) => data?.data?.data?.rows,
  });

  const personalCardDetailsItems = useMemo(() => {
    const priority = priorityItems?.find((p) => p.id === leadStoredData?.priorityId)?.label;
    const source = SourceList?.find((s) => s.id === leadStoredData?.sourceId)?.name;
    return [
      {
        key: "1",
        label: "Details",
        style: {
          marginBottom: 24,
          background: "transparent",
          borderRadius: 4,
          border: "none",
        },
        children: (
          <div className="d-flex flex-column" style={{ gap: 16 }}>
            <Row gutter={16}>
              <Col>
                <LeadSVG />
              </Col>
              <Col xs style={{ maxWidth: "calc(100% - 30px)" }}>
                <Tooltip title={leadStoredData?.title}>
                  <Typography.Text ellipsis>{leadStoredData?.title || "-"}</Typography.Text>
                </Tooltip>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col>
                <FormOutlined style={{ fontSize: 12 }} />
              </Col>
              <Col xs style={{ maxWidth: "calc(100% - 30px)" }}>
                <Tooltip title={leadStoredData?.description}>
                  <Typography.Text ellipsis>{leadStoredData?.description || "-"}</Typography.Text>
                </Tooltip>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col>
                <LeadSVG />
              </Col>
              <Col xs style={{ maxWidth: "calc(100% - 30px)" }}>
                <Tooltip title={leadStoredData?.assignee?.account?.fullName}>
                  <Typography.Text ellipsis>
                    {leadStoredData?.assignee?.account?.fullName || "-"}
                  </Typography.Text>
                </Tooltip>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col>
                <PriorityTagSVG width={12} height={12} />
              </Col>
              <Col xs style={{ maxWidth: "calc(100% - 30px)" }}>
                <Tooltip title={priority}>
                  <Typography.Text ellipsis>{priority || "-"}</Typography.Text>
                </Tooltip>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col>
                <DropboxOutlined style={{ fontSize: 12 }} />
              </Col>
              <Col xs style={{ maxWidth: "calc(100% - 30px)" }}>
                <Tooltip title={source}>
                  <Typography.Text ellipsis>{source || "-"}</Typography.Text>
                </Tooltip>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col>
                <BankOutlined style={{ fontSize: 12 }} />
              </Col>
              <Col xs style={{ maxWidth: "calc(100% - 30px)" }}>
                <Tooltip title={"Budget: " + leadStoredData?.budget}>
                  <Typography.Text ellipsis>{leadStoredData?.budget || "-"}</Typography.Text>
                </Tooltip>
              </Col>
            </Row>
          </div>
        ),
      },
      {
        key: "2",
        label: "Contact",
        style: {
          marginBottom: 24,
          background: "transparent",
          borderRadius: 4,
          border: "none",
        },
        children: (
          <div className="d-flex flex-column" style={{ gap: 16 }}>
            <Row gutter={16} style={{ gap: 8 }}>
              <Col style={{ padding: 0 }}>
                <Avatar
                  size={20}
                  {...stringAvatar(
                    leadStoredData?.customer?.account?.fullName ||
                      leadStoredData?.account?.fullName ||
                      "-",
                  )}
                  src={
                    leadStoredData?.customer?.account?.profileImage ??
                    leadStoredData?.account?.profileImage
                  }
                  style={{
                    borderRadius: "50%",
                    ...(stringAvatar(
                      leadStoredData?.customer?.account?.fullName ||
                        leadStoredData?.account?.fullName ||
                        "-",
                    )?.style ?? {}),
                    fontSize: 12,
                  }}
                />
              </Col>
              <Col xs style={{ maxWidth: "calc(100% - 30px)" }}>
                <Tooltip
                  title={
                    leadStoredData?.customer?.account?.fullName ?? leadStoredData?.account?.fullName
                  }>
                  <Typography.Link ellipsis onClick={() => handleOpenCustomerModal(id)}>
                    {leadStoredData?.customer?.account?.fullName ??
                      leadStoredData?.account?.fullName ??
                      "-"}
                  </Typography.Link>
                </Tooltip>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col>
                <TelephoneSVG width={12} height={12} />
              </Col>
              <Col xs style={{ maxWidth: "calc(100% - 30px)" }}>
                <Tooltip
                  title={
                    leadStoredData?.customer?.account?.mobile ||
                    leadStoredData?.account?.mobile ||
                    "-"
                  }>
                  <Typography.Text ellipsis>
                    {leadStoredData?.customer?.account?.mobile ||
                      leadStoredData?.account?.mobile ||
                      "-"}
                  </Typography.Text>
                </Tooltip>
              </Col>
            </Row>
          </div>
        ),
      },
    ];
  }, [leadStoredData, priorityItems, SourceList]);

  return (
    <div className="lead-side-info">
      <div className="personal-details d-flex justify-between align-center">
        <div className="personal-name">
          <Tooltip title={leadStoredData?.title}>
            <Typography.Text ellipsis>{leadStoredData?.title || "-"}</Typography.Text>
          </Tooltip>
        </div>
        {onEditClicked && (
          <span
            onClick={onEditClicked}
            style={{
              cursor: "pointer",
              color: "white",
              background: "#0E7B43",
              borderRadius: "8px",
              padding: "4px 6px",
            }}>
            <span style={{ marginRight: 4 }}>
              <EditCustomerSVG color="white" />
            </span>
            Edit
          </span>
        )}
      </div>
      <Divider
        style={{
          marginTop: 8,
          marginBottom: 8,
        }}
      />
      <Box
        sx={{
          marginTop: "16px",
          maxHeight: "calc(100vh - 168px)",
          overflowY: "auto",
          overflowX: "hidden",
          " &::-webkit-scrollbar": {
            display: "none",
          },
        }}>
        <Collapse
          className="leads-add-edit-lead-form-lead-side-info"
          expandIconPosition="end"
          defaultActiveKey={["1", "2", "3"]}
          style={{
            fontSize: "12px",
            color: "#020714",
            border: "none",
            background: "transparent",
          }}
          items={personalCardDetailsItems}
        />
      </Box>
    </div>
  );
}

export default LeadSideInfo;
