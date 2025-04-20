import React from "react";
// style
import "./styles.css";
import { OFFICER_TYPE } from "constants/BUYER_GROUB";
import { AgentSVG, CitySVG, CountrySVG2, EmailSVG, PhoneSVG, ZipCodeSVG } from "assets/jsx-svg";
import { Button, Col, Collapse, Divider, message, Row, Space, Typography } from "antd";
import AddSupplier from "views/Suppliers/AddSupplier";
import AddAgencie from "views/Agencies/AddAgencie";
import { queryClient } from "services/queryClient";
import { QUERY_KEY } from "services/constants";
import ArrowDownSVG from "assets/jsx-svg/ArrowDownSVG";
import OfficeType from "./OfficeType";

import default_image from "assets/images/default_image.png";
import useGenerateofficerToken from "services/agencies/Mutations/useGenerateofficerToken";

const OfficeInfo = ({ data, DrawerAPI }) => {
  const tokenMutation = useGenerateofficerToken(data?.id, {
    onSuccess: (res, payload) => {
      if (res?.data) {
        const DMC_TOKEN = localStorage.getItem("vindo-token");
        localStorage.setItem("vindo-token", res?.data);
        localStorage.setItem("DMC_TOKEN", DMC_TOKEN);
        window.location.assign("/")
      }
    },
    onError: (error) => {
      console.log(error);
      message.error(error?.message);
    },
    enabled: !!data?.id,
  });

  return (
    <div className="office_drawer_info" style={{ width: "250px" }}>
      <div className="office_info_head">
        <img
          className="office_info_head-img"
          src={data?.logo || default_image}
          alt="office"
          width={64}
          height={64}
          loading="lazy"
        />
        <div className="office_info_head-content">
          <Typography.Paragraph
            className="fz-14 fw-500 w-100"
            style={{ margin: 0 }}
            ellipsis={{ rows: 2, tooltip: data?.companyName }}>
            {data?.companyName}
          </Typography.Paragraph>
          <p className="office_type_badge">
            {data?.type === OFFICER_TYPE.AGENT ? (
              <>
                <AgentSVG />
                <span className="xs_text_medium">Agent</span>
              </>
            ) : (
              <>
                <span className="xs_text_medium">Supplier</span>
              </>
            )}
          </p>
          <Space>
            <a href={`tel:${data?.companyPhone}`} className="office_info_head-contact_link">
              <PhoneSVG fill={"#030713"} />
            </a>
            <a href={`mailto:${data?.companyEmail}`} className="office_info_head-contact_link">
              <EmailSVG fill={"#030713"} />
            </a>
          </Space>
        </div>
      </div>
      <Row gutter={[8, 8]} style={{ marginTop: "1rem" }}>
        <Col span={12}>
          <Button
            size="small"
            className="w-100"
            type="primary"
            danger
            disabled={!data?.id}
            loading={tokenMutation?.isPending}
            onClick={tokenMutation.mutate}>
            Login as
          </Button>
        </Col>
        <Col span={12}>
          <Button
            size="small"
            className="w-100"
            style={{ color: "#2D5FEB", height: "34px", margin: "1px 0", borderColor: "#2D5FEB" }}
            onClick={() => {
              if (data?.type === OFFICER_TYPE.AGENT) {
                DrawerAPI.setDrawerContent(
                  <AddAgencie
                    DrawerAPI={DrawerAPI}
                    id={data?.id}
                    onEnd={() => {
                      queryClient.invalidateQueries([QUERY_KEY.GET_OFFICES]);
                    }}
                  />,
                );
              } else {
                DrawerAPI.setDrawerContent(
                  <AddSupplier
                    DrawerAPI={DrawerAPI}
                    id={data?.id}
                    onEnd={() => {
                      queryClient.invalidateQueries([QUERY_KEY.GET_OFFICES]);
                    }}
                  />,
                );
              }
              DrawerAPI.open("calc(100% - 110px)");
            }}>
            Edit
          </Button>
        </Col>
        <Col span={24}>
          <OfficeType type={data?.level} id={data?.id} />
        </Col>
      </Row>
      <Divider />
      <div>
        <Collapse
          ghost
          expandIconPosition="right"
          activeKey={["1", "2"]}
          expandIcon={<ArrowDownSVG color="#2D6ADB" />}
          className="office_info_collapse"
          items={[
            {
              key: "1",
              label: <p className="fz-12 fw-500">Contact Info</p>,
              children: (
                <div>
                  {data?.email && (
                    <Typography.Paragraph
                      className="office_info_with_icon fz-12 fw-400"
                      ellipsis={{ tooltip: data?.email }}>
                      <EmailSVG /> <span>{data?.email}</span>
                    </Typography.Paragraph>
                  )}
                  {data?.phone && (
                    <Typography.Paragraph
                      className="office_info_with_icon fz-12 fw-400"
                      ellipsis={{ tooltip: data?.phone }}>
                      <PhoneSVG /> {data?.phone}
                    </Typography.Paragraph>
                  )}
                </div>
              ),
            },
            {
              key: "2",
              label: <p className="fz-12 fw-500">Address</p>,
              children: (
                <div>
                  {data?.country && (
                    <Typography.Paragraph
                      className="office_info_with_icon fz-12 fw-400"
                      ellipsis={{ tooltip: data?.country }}>
                      <CountrySVG2 /> <span>{data?.country}</span>
                    </Typography.Paragraph>
                  )}
                  {data?.city && (
                    <Typography.Paragraph
                      className="office_info_with_icon fz-12 fw-400"
                      ellipsis={{ tooltip: data?.city }}>
                      <CitySVG /> {data?.city}
                    </Typography.Paragraph>
                  )}
                  {data?.zipCode && (
                    <Typography.Paragraph
                      className="office_info_with_icon fz-12 fw-400"
                      ellipsis={{ tooltip: data?.zipCode }}>
                      <ZipCodeSVG /> {data?.zipCode}
                    </Typography.Paragraph>
                  )}
                </div>
              ),
            },
          ]}
        />
      </div>
    </div>
  );
};

export default OfficeInfo;
