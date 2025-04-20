import { Col, Row } from "antd";
import { SettingSVG } from "assets/jsx-svg";
import useIsMobile from "hooks/useIsMobile";
import usePageTitle from "hooks/usePageTitle";
import { useNavigate } from "react-router-dom";
import useGetPipelinesStatistics from "services/pipelineTemplate/Querys/useGetPipelinesStatistics";
import PiplineCard from "views/Piplines/components/PiplineCard";
function Index() {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  usePageTitle("Pipelines")
  const { data: pipelines, isLoading } = useGetPipelinesStatistics({
    select: (data) => data.data.data,
  });
  const groupedData = {};

  pipelines?.forEach((item) => {
    const tag = item.tag;
    if (!groupedData[tag]) {
      groupedData[tag] = [];
    }
    groupedData[tag].push(item);
  });

  for (const tag in groupedData) {
    groupedData[tag].forEach((item) => console.log(item));
  }

  return (
    <>
      <div
        style={{
          position: "relative",
          bottom: -20,
          display: "flex",
          alignItems: "center",
          justifyContent: "end",
          columnGap: 5,
          cursor: "pointer",
          fontWeight: 500,
          fontSize: 14,
        }}
        onClick={() => {
          navigate("/crm/pipline-settings/pipline-template");
        }}>
        <SettingSVG /> Pipeline Settings
      </div>
      {Object.keys(groupedData).map((tage) => {
        return (
          <div style={{ marginBottom: 30 }}>
            <Row>
              <div>
                <div
                  style={{
                    marginBottom: 15,
                    fontSize: 14,
                    fontWeight: 600,
                    textTransform: "capitalize",
                  }}>
                  {tage}:
                </div>
              </div>
            </Row>
            <Row gutter={[10, 10]}>
              {groupedData[tage].map((pipline) => {
                return (
                  <Col span={isMobile ? 24 : 8}>
                    <PiplineCard
                      piplineId={pipline.id}
                      piplineName={pipline?.name || "-"}
                      stages={pipline.pipelineStages}
                    />
                  </Col>
                );
              })}
            </Row>
          </div>
        );
      })}
    </>
  );
}

export default Index;
