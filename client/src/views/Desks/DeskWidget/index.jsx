import { useEffect, useState } from "react";
import { Button, Checkbox, Col, Row, Typography, message } from "antd";
import hljs from "highlight.js";
import dayjs from "dayjs";

import {
  DiskTicketSVG,
  DiskCustomerServiceSVG,
  CallSVG,
  WhiteChatSVG,
  AppsSVG,
  CheckSVG,
  CopySVG,
} from "assets/jsx-svg";

import Widget from "components/Widget";

import "highlight.js/styles/github.css";
import "./styles.css";
import { axiosCatch } from "utils/axiosUtils";
import WidgetService from "services/widget.service";
import { LoadingOutlined } from "@ant-design/icons";
import { useNotification } from "context/notificationContext";

export default function DesksWidget({}) {
  const { openNotificationWithIcon } = useNotification();
  const [servicesSelected, setServicesSelected] = useState([]);
  const [allowedServices, setAllowedServices] = useState([]);
  const [widgetData, setWidgetData] = useState({});
  const [updateLoading, setUpdateLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const serviceType = [
    { id: "CHAT", label: "Live Chat Desk", icon: WhiteChatSVG },
    { id: "TICKET", label: "Ticketing Desk", icon: DiskTicketSVG },
    {
      id: "MEET",
      label: "Customer Service Desk",
      icon: DiskCustomerServiceSVG,
    },
    { id: "CALL", label: "Meeting Desk", icon: CallSVG },
  ];
  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const res = await WidgetService.getData();
        setWidgetData(res.data.data);
        if (res.data.data.services) {
          setServicesSelected(res.data.data.services.split(","));
        }
        if (res.data.data.allowedServices) {
          setAllowedServices(res.data.data.allowedServices.split(","));
        }
      } catch (err) {
        axiosCatch(err);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  useEffect(() => {
    hljs.highlightAll();
  }, []);

  const submitWidget = async () => {
    try {
      setUpdateLoading(true);
      await WidgetService.update({ services: servicesSelected.join(",") });
      openNotificationWithIcon("success", "Services updated successfully");
    } catch (err) {
      axiosCatch(err);
    } finally {
      setUpdateLoading(false);
    }
  };
  const [isAutoOpenWidget, setIsAutoOpenWidget] = useState(false);
  const iframWidth = isAutoOpenWidget ? "320px" : "80px";
  const iframHeight = isAutoOpenWidget ? "530px" : "80px";

  const markdown = `<iframe   
id="myIframe"
width=${iframWidth} height=${iframHeight}
src="${import.meta.env.VITE_BASE_WIDGET}?hash=${widgetData.hash}&isAutoOpen=${isAutoOpenWidget}"
title="Vindo CRM" frameborder="0" allow="accelerometer;
clipboard-write; encrypted-media; gyroscope; picture-in-picture;
web-share" allowfullscreen style="position:fixed; bottom: 0px; right: 0px; z-index: 1;" ></iframe>
<script>
var iframe = document.getElementById('myIframe');
function openIframeStyle() {
    iframe.style.width = '320px';
    iframe.style.height = '530px';
}
function closeIframeStyle() {
    iframe.style.width = '80px';
    iframe.style.height = '80px';
}
window.addEventListener('message', function(event) {
    if (event.data === 'openIframeStyle') {
        openIframeStyle();
    }
    if (event.data === 'closeIframeStyle') {
      setTimeout(()=>{
          closeIframeStyle();
      }, "1000")
    }
});
</script>`;

  return (
    <section>
      <Row gutter={[16, 16]}>
        <Col className="h-100" xs={24} lg={16}>
          <Row gutter={[0, 12]}>
            <Col xs={24}>
              <div className="service-type-main">
                <div className="service-type-header w-100">
                  <Typography.Text className="fz-18 fw-500">Widget Code</Typography.Text>
                  <div style={{ display: "flex", alignItems: "center", columnGap: 5 }}>
                    <Checkbox
                      onChange={() => setIsAutoOpenWidget((prev) => !prev)}
                      value={isAutoOpenWidget}>
                      Auto open
                    </Checkbox>
                    <div
                      style={{
                        cursor: "pointer",
                        color: "#3A5EE3",
                        display: "flex",
                        alignItems: "center",
                        columnGap: 5,
                      }}
                      onClick={() => {
                        navigator.clipboard.writeText(markdown);
                        message.success("Code Copied Successfully");
                      }}>
                      <CopySVG />
                      Copy Code
                    </div>
                  </div>
                </div>

                <div className="service-type-code-content">
                  <pre>
                    <code className="language-typescript">{markdown}</code>
                  </pre>
                </div>
              </div>
            </Col>
            <Col xs={24}>
              <div className="service-type-main">
                <div className="service-type-header w-100">
                  <Typography.Text className="fz-18 fw-500">
                    The services you select will appear in the right screen
                  </Typography.Text>
                </div>

                <div className="service-type-left-content">
                  {loading ? (
                    <Row justify="center" align="middle" style={{ height: "232px" }}>
                      <LoadingOutlined />
                    </Row>
                  ) : (
                    <Row gutter={[34, 34]}>
                      {serviceType.map((service) => (
                        <Col xs={24} xl={12} xxl={6} key={service.id}>
                          <div
                            className={`service-type-option ${
                              servicesSelected.includes(service.id) && "service-type-option-active"
                            } clickable center-items`}
                            onClick={() => {
                              if (allowedServices.includes(service.id)) {
                                if (servicesSelected.includes(service.id)) {
                                  setServicesSelected((prev) => {
                                    const filteredData = prev.filter((serv) => serv !== service.id);
                                    return filteredData;
                                  });
                                } else {
                                  setServicesSelected((prev) => {
                                    prev.push(service.id);
                                    return [...prev].sort();
                                  });
                                }
                              }
                            }}
                            style={{
                              pointerEvents: !allowedServices.includes(service.id) && "none",
                              cursor: !allowedServices.includes(service.id) && "not-allowed",
                            }}>
                            <Row justify="center" align="middle" gutter={[0, 24]}>
                              <Col span={24} className={`center-items`}>
                                <service.icon />
                              </Col>
                              <Col span={24}>
                                <Typography.Text
                                  className={`center-items ${
                                    servicesSelected.includes(service.id) && "fw-500"
                                  }`}
                                  style={{
                                    color: "#272942",
                                    textAlign: "center",
                                  }}>
                                  {service.label}
                                </Typography.Text>
                              </Col>
                            </Row>
                          </div>
                        </Col>
                      ))}
                    </Row>
                  )}
                </div>
              </div>
            </Col>
          </Row>
        </Col>
        <Col className="h-100" xs={24} lg={8}>
          <div className="service-type-main">
            <div className="service-type-header w-100">
              <Typography.Text className="fz-18 fw-500">
                End result (What the User will see)
              </Typography.Text>
            </div>

            <div
              style={{
                margin: "0 auto",
                maxWidth: "280px",
                paddingBottom: "1rem",
              }}>
              <Row justify="center" gutter={[0, 12]}>
                <Col xs={24}>
                  <div className="service-type-right-content">
                    <Widget selectedServices={servicesSelected} />
                  </div>
                </Col>
                <Col xs={24}>
                  <Row justify="end">
                    <div className="center-items widget-main-icon">
                      <AppsSVG />
                    </div>
                  </Row>
                </Col>
              </Row>
            </div>
          </div>
        </Col>
      </Row>
      <div className="create-desk-next">
        <Row justify="space-between" align="middle" gutter={[16, 16]}>
          <Col>
            {widgetData.updatedAt && (
              <Row align="middle" gutter={[10, 0]}>
                <Col>
                  <Row align="middle" gutter={[8, 0]}>
                    <Col>
                      <Row align="middle">
                        <CheckSVG />
                      </Row>
                    </Col>
                    <Col>
                      <Typography.Text style={{ color: "#AEAEB2" }}>Last Saved</Typography.Text>
                    </Col>
                  </Row>
                </Col>
                <Col>
                  <Typography.Text className="fw-500">
                    {dayjs(widgetData.updatedAt).format("MMM D, YYYY HH:mm A")}
                  </Typography.Text>
                </Col>
              </Row>
            )}
          </Col>
          <Col>
            <Button
              type="primary"
              style={{ background: "#272942" }}
              onClick={submitWidget}
              loading={loading || updateLoading}>
              Save
            </Button>
          </Col>
        </Row>
      </div>
    </section>
  );
}
