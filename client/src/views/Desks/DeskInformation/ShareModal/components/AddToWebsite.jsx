import { LeftOutlined } from "@ant-design/icons";
import { Button, Card, Col, Radio, Row, Space, Typography, message } from "antd";
import { WrapperPageSetting, useContextPageSettings } from "../ProviderPageSettings";
import WidgetOption1Image from "assets/images/widget_option1.png";
import WidgetOption2Image from "assets/images/widget_option2.png";
import WidgetOption3Image from "assets/images/widget_option3.png";
import { CopySVG } from "assets/jsx-svg";
import { useState } from "react";
import BookingPageSettings from "./BookingPageSettings";
import IFrameCode from "./IFrameCode";
import WidgetOption from "./WidgetOption";
import "../styles.css";
import { FLOATING_WIDGET_STYLES } from "constants/WEB_WIDGET_STYLES";

const AddToWebsite = ({ deskId }) => {
  const [step, setStep] = useState(1);
  const { providerSettings, setSettings } = useContextPageSettings();
  const isFloatingWidget = providerSettings.embeddingType === "PopupWidget";
  const isModalEmbedding = providerSettings.embeddingType === "PopupText" || isFloatingWidget;

  const getIframeSrc = (params) =>
    `${window.location.origin}/web-widget/schedule-call?${
      !!deskId ? "desk_id=" + deskId + "&" : ""
    }${params}`;

  const getIframeText = (params = "") => {
    const popupScript = `
    <script>
      var iframe = document.getElementById("callScheduleWidget");
      function openCallScheduleWidget() {
        iframe.style.position = "absolute";
        iframe.style.top = "0";
        iframe.style.left = "0";
        iframe.style.right = "0";
        iframe.style.bottom = "0";
        iframe.style.width = "100vw";
        iframe.style.height = "100vh";
      }
      function closeCallScheduleWidget(positionPayoad) {
        var styles = positionPayoad.split(";");
        iframe.style.position = "";
        iframe.style.top = "";
        iframe.style.left = "";
        iframe.style.right = "";
        iframe.style.bottom = "";
        iframe.style.width = "";
        iframe.style.height = "";

        styles.forEach(function(style) {
            var parts = style.trim().split(":");
            if (parts.length === 2) {
                var property = parts[0].trim();
                var value = parts[1].trim();
                iframe.style[property] = value;
            }
        });
      }
      window.addEventListener("message", function (event) {
        if (event.data === "openCallScheduleWidget") {
          openCallScheduleWidget();
        }
        if (event.data?.includes("closeCallScheduleWidget")) {
          setTimeout(() => {
            closeCallScheduleWidget(event.data?.split("=")?.[1]);
          }, 100);
        }
      });
    </script>`;

    return (
      `
    <iframe
      src="${getIframeSrc(params)}"
      id="callScheduleWidget"
      style="background: transparent; border: 0px #ffffff none;z-index:10000;${
        isModalEmbedding ? (isFloatingWidget ? FLOATING_WIDGET_STYLES : "") : "min-height:670px;"
      }"
      name="callScheduleWidget"
      scrolling="no"
      frameborder="1"
      marginheight="0px"
      marginwidth="0px"
      height="100%"
      width="100%"
      allow="fullscreen;clipboard-write"
    ></iframe>` + (isModalEmbedding ? popupScript : "")
    );
  };

  const handleShowPageSettings = (offset) => {
    setStep(step + offset);
  };

  const handleCopyCode = (values) => {
    navigator.clipboard.writeText(getIframeText(values));
    message.success("Code Copied Successfully");
  };

  const handleChangeEmbedding = (e) => {
    setSettings({ embeddingType: e.target.value });
  };

  return (
    <Row gutter={[20, 20]}>
      {step === 1 && (
        <Col xs={24}>
          <Card>
            <Space size="small" direction="vertical" className="w-100">
              <Typography className="fz-14 fw-500">Add to website</Typography>
              <Typography className="fz-14 description">
                How do you want to add it to your site?
              </Typography>
              <Radio.Group onChange={handleChangeEmbedding}>
                <Space direction="vertical" size="large">
                  <Radio value="InlineEmbed">
                    <WidgetOption
                      text="Inline Embed"
                      description="Add a scheduling page to your site"
                      image={WidgetOption1Image}
                    />
                  </Radio>
                  <Radio value="PopupWidget">
                    <WidgetOption
                      text="Popup Widget"
                      description="Add a floating button that opens a popup"
                      image={WidgetOption3Image}
                    />
                  </Radio>
                  <Radio value="PopupText">
                    <WidgetOption
                      text="Popup Text"
                      description="Add a text link that opens a popup"
                      image={WidgetOption2Image}
                    />
                  </Radio>
                </Space>
              </Radio.Group>
            </Space>
          </Card>
        </Col>
      )}
      {step === 2 && (
        <>
          <Col xs={14}>
            <BookingPageSettings />
          </Col>
          <Col xs={10}>
            <IFrameCode getIframeText={getIframeText} />
          </Col>
        </>
      )}
      {step > 1 && (
        <Col xs={12}>
          <Button
            className="d-flex align-center"
            type="link"
            onClick={() => handleShowPageSettings(-1)}
            icon={<LeftOutlined />}>
            Back
          </Button>
        </Col>
      )}
      {step < 2 && (
        <Col xs={step == 1 ? 24 : 12}>
          <Button
            type="primary"
            className="w-100"
            onClick={() => handleShowPageSettings(1)}
            disabled={!providerSettings?.embeddingType}>
            Continue
          </Button>
        </Col>
      )}
      {step == 2 && (
        <Col xs={12} className="d-flex justify-end">
          <WrapperPageSetting>
            {(values) => {
              return (
                <Button
                  type="primary"
                  onClick={() =>
                    handleCopyCode(
                      Object.entries(values)
                        .filter(([_, value]) => value != undefined)
                        .map(([key, value]) => `${key}=${value}`)
                        .join("&"),
                    )
                  }
                  icon={<CopySVG fill="white" />}>
                  Copy Code
                </Button>
              );
            }}
          </WrapperPageSetting>
        </Col>
      )}
    </Row>
  );
};

export default AddToWebsite;
