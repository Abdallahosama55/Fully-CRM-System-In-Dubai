import { Col, ConfigProvider, Image, Row, Typography } from "antd";

import logo from "assets/images/logo.png";

import {
  CallSVG,
  DiskCustomerServiceSVG,
  DiskTicketSVG,
  WhiteChatSVG,
} from "assets/jsx-svg";
import { useEffect, useState } from "react";
import ChatSection from "./ChatSection";

import "./styles.css";
import TicketSection from "./TicketSection";
import SchedualeCall from "./SchedualeCall";

const servicesType = [
  {
    id: "CHAT",
    icon: WhiteChatSVG,
    color: "#A620F5",
    title: "Start Live Chat",
    desc: "Your Conversations",
  },
  {
    id: "CALL",
    icon: CallSVG,
    color: "#3F65E4",
    title: "Schedule a call",
    desc: "Call on Demand: Easy Scheduling",
  },
  {
    id: "MEET",
    icon: DiskCustomerServiceSVG,
    color: "#F82E8E",
    title: "Customer service center",
    desc: "Exceptional support for your needs",
  },
  {
    id: "TICKET",
    icon: DiskTicketSVG,
    color: "#9CDBF6",
    title: "Submit ticket",
    desc: "Efficiently Report and Track issues.",
  },
];

export default function Widget({
  selectedServices,
  setWidgetOpen,
  selectedService,
  setSelectedService,
}) {
  const [services, setServices] = useState(servicesType);
  const [userData, setUserData] = useState({});

  useEffect(() => {
    if (selectedServices.length === 0) {
      setServices(servicesType);
    } else {
      const selected = servicesType.filter((service) =>
        selectedServices.includes(service.id),
      );
      setServices(selected);
    }
  }, [selectedServices]);

  return (
    <ConfigProvider
      theme={{
        token: {
          controlHeight: 32,
          fontSize: 12,
        },
      }}
    >
      <section className="widget-container">
        {selectedService == null && (
          <Row className="widget-container-list">
            <Col flex={1} className="center-items">
              <Row justify="center" align="middle" gutter={[0, 8]}>
                <Col xs={24}>
                  <Row justify="center">
                    <div className="widget-logo">
                      <Image
                        preview={false}
                        src={logo}
                        width={35}
                        height={35}
                      />
                    </div>
                  </Row>
                </Col>
                <Col xs={24}>
                  <Row justify="center">
                    <Typography.Text className="wc fz-16 fw-600">
                      Welcome to Vindo
                    </Typography.Text>
                  </Row>
                  <Row ustify="center">
                    <Typography.Text
                      className="wc fz-10"
                      style={{ textAlign: "center" }}
                    >
                      Quia hic repellendus neque consequatur et non. Reiciendis
                      quia.
                    </Typography.Text>
                  </Row>
                </Col>
              </Row>
            </Col>
            <Col className="widget-services-list">
              {selectedServices.length === 0 && (
                <div className="widget-overlay" />
              )}
              <Row gutter={[0, 24]}>
                {services.map((service) => (
                  <Col xs={24} key={service.id}>
                    <Row
                      wrap={false}
                      gutter={[8, 0]}
                      className="clickable"
                      onClick={() => setSelectedService(service.id)}
                    >
                      <Col>
                        <div
                          className="widget-icon-wraper"
                          style={{ background: service.color }}
                        >
                          <service.icon
                            style={{ width: "18px", height: "18px" }}
                            color="#fff"
                          />
                        </div>
                      </Col>
                      <Col flex={1}>
                        <Row>
                          <Col xs={24}>
                            <Row justify="space-between" align="middle">
                              <Col>
                                <Typography.Text className="fz-12 fw-500">
                                  {service.title}
                                </Typography.Text>
                              </Col>
                              {service.id === 1 && (
                                <Col>
                                  <Typography.Text
                                    style={{
                                      color: service.color,
                                      fontSize: "8px",
                                    }}
                                  >
                                    New message
                                  </Typography.Text>
                                </Col>
                              )}
                            </Row>
                          </Col>
                          <Col xs={24}>
                            <Typography.Text className="fz-10">
                              {service.desc}
                            </Typography.Text>
                          </Col>
                        </Row>
                      </Col>
                    </Row>
                  </Col>
                ))}
              </Row>
            </Col>
          </Row>
        )}

        {selectedService === "CHAT" && (
          <ChatSection
            setSelectedService={setSelectedService}
            setWidgetOpen={setWidgetOpen}
            userData={userData}
            setUserData={setUserData}
          />
        )}

        {selectedService === "TICKET" && (
          <TicketSection setSelectedService={setSelectedService} />
        )}

        {selectedService === "CALL" && (
          <SchedualeCall setSelectedService={setSelectedService} />
        )}
      </section>
    </ConfigProvider>
  );
}
