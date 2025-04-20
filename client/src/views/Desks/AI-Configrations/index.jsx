import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { Col, ConfigProvider, message, Row, Skeleton, Tabs, Typography } from "antd";
import GeneralTab from "./GeneralTab";
import VoiceTab from "./VoiceTab";
import PermissionsTab from "./PermissionsTab";
import {
  AIConfigrationGeneralSVG,
  AIConfigrationKnowledgeSVG,
  AIConfigrationPermissionsSVG,
  AIConfigrationVoiceSVG,
} from "assets/jsx-svg";
import useGetDeskById from "services/Desk/Querys/useGetDeskById";
import KnowledgeTab from "./KnowledgeTab";

import "./styles.css";

export default function AIConfigrations() {
  const { id: deskId } = useParams();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState(() => searchParams.get("activeTab") || "General");

  const deskQuery = useGetDeskById(deskId, {
    select: (res) => res.data.data,
  });

  useEffect(() => {
    if (deskQuery.isSuccess && !deskQuery.data) {
      navigate(-1);
      message.info("There's no desk with this id");
    }
  }, [deskQuery.data, deskQuery.isSuccess, navigate]);

  const items = useMemo(() => {
    if (deskQuery.data) {
      return [
        {
          key: "General",
          label: (
            <Row gutter={[6, 0]} wrap={false} align="middle">
              <Col>
                <Row align="middle">
                  <AIConfigrationGeneralSVG />
                </Row>
              </Col>
              <Col>
                <Typography.Text>General</Typography.Text>
              </Col>
            </Row>
          ),
          children: <GeneralTab deskQuery={deskQuery} />,
        },
        {
          key: "Voice & Appearance",
          label: (
            <Row gutter={[6, 0]} wrap={false} align="middle">
              <Col>
                <Row align="middle">
                  <AIConfigrationVoiceSVG />
                </Row>
              </Col>
              <Col>
                <Typography.Text>Voice & Appearance</Typography.Text>
              </Col>
            </Row>
          ),
          children: <VoiceTab deskQuery={deskQuery} />,
        },
        {
          key: "Knowledge Base",
          label: (
            <Row gutter={[6, 0]} wrap={false} align="middle">
              <Col>
                <Row align="middle">
                  <AIConfigrationKnowledgeSVG />
                </Row>
              </Col>
              <Col>
                <Typography.Text>Knowledge Base</Typography.Text>
              </Col>
            </Row>
          ),
          children: <KnowledgeTab deskQuery={deskQuery} />,
        },

        {
          key: "AI Permissions",
          label: (
            <Row gutter={[6, 0]} wrap={false} align="middle">
              <Col>
                <Row align="middle">
                  <AIConfigrationPermissionsSVG />
                </Row>
              </Col>
              <Col>
                <Typography.Text>AI Permissions</Typography.Text>
              </Col>
            </Row>
          ),
          children: <PermissionsTab deskQuery={deskQuery} />,
        },
      ];
    }
  }, [deskQuery]);

  if (deskQuery.isLoading && !deskQuery.isFetched) {
    return <Skeleton active />;
  }

  return (
    <main className="ai_configrations">
      <ConfigProvider
        theme={{
          components: {
            Tabs: {
              itemSelectedColor: "#030713",
              horizontalItemPadding: "0px 16px 16px",
              margin: 32,
            },
            Input: {
              colorTextPlaceholder: "#667085",
            },
            Slider: {
              handleLineWidth: 4,
              dotSize: 10,
              railSize: 5,
              handleSize: 14,
              handleActiveColor: "#3A5EE3",
              handleColor: "#F6F6F7",
              handleActiveOutlineColor: "#F6F6F7",
              trackBg: "#3A5EE3",
              railBg: "#3A5EE333",
              colorBgElevated: "#0062FF",
            },
          },
        }}>
        <Tabs
          destroyInactiveTabPane
          defaultActiveKey="General"
          items={items}
          activeKey={activeTab}
          onChange={(tabKey) => {
            setActiveTab(tabKey);
            setSearchParams((params) => {
              params.set("activeTab", tabKey);
              return params;
            });
          }}
        />
      </ConfigProvider>
    </main>
  );
}
