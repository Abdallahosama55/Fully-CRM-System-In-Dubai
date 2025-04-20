import { useEffect, useState } from "react";
import {
  Button,
  Col,
  Form,
  Row,
  Tabs,
  Typography,
  Upload,
  message,
} from "antd";

import { ArrowRightSVG, CloseSVG } from "assets/jsx-svg";
import CommonService from "services/common.service";
import MediaTabsContent from "./MediaTabsContent";

import "./styles.css";
import AddNewsTicker from "./AddNewsTicker";

export default function OverlayModal({
  setOverLayModalOpen,
  overLayModalOpen,
}) {
  const [activeTab, setActiveTab] = useState(1);
  const [selectedMedia, setSelectedMedia] = useState(null);
  const [uploadedData, setUploadedData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const [textColor, setTextColor] = useState("#000");
  const [backgroundColor, setBackgroundColor] = useState("#8455BD");

  const onMediaSelectNext = async () => {
    if (!uploadedData && !selectedMedia) {
      message.info("You should select data or upload one");
      return;
    }
    if (uploadedData) {
      try {
        setLoading(true);
        const res = await CommonService.uploadFile(uploadedData.originFileObj);

        console.log(res);
        const newFile = {
          id: uploadedData.uid,
          name: uploadedData.name,
          type: uploadedData.type,
          url: res.uploadedFiles.file,
        };

        setUploadedData(newFile);

        message.success({
          content: `Successfully Uploaded`,
        });
      } catch (error) {
        console.log("Error uploading file: ", error);
        message.error({
          content: `Failed to upload file: ${uploadedData.name}`,
        });
      } finally {
        setLoading(false);
      }
    }

    setActiveTab(2);
  };

  useEffect(() => {
    if (overLayModalOpen.id) {
      setActiveTab(2);
      setSelectedMedia(overLayModalOpen);
    }
  }, [overLayModalOpen]);

  return (
    <section>
      <Row
        justify="space-between"
        align="middle"
        style={{ marginBottom: "24px" }}
      >
        {activeTab === 3 && (
          <Col>
            <Row
              align="middle"
              gutter={[8, 0]}
              wrap={false}
              className="clickable"
              onClick={() => setActiveTab((prev) => --prev)}
            >
              <Col>
                <Row align="middle">
                  <ArrowRightSVG style={{ rotate: "180deg" }} color="#000" />
                </Row>
              </Col>
              <Col>
                <Typography.Text className="fz-12 gc">Back</Typography.Text>
              </Col>
            </Row>
          </Col>
        )}
        <Col>
          <Typography.Text className="fw-600">Add New Overlay</Typography.Text>
        </Col>
        <Col>
          <div
            className="clickable"
            style={{ padding: "4px" }}
            onClick={() => setOverLayModalOpen(false)}
          >
            <CloseSVG />
          </div>
        </Col>
      </Row>

      {activeTab === 1 && (
        <>
          <Upload.Dragger
            maxCount={1}
            beforeUpload={() => false}
            action={false}
            accept="video/*,image/*"
            showUploadList={!selectedMedia}
            style={{
              background: "#F2F2F7",
              borderRadius: "14px",
              minHeight: "60px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignContent: "center",
            }}
            onChange={(data) => {
              setSelectedMedia(null);
              setUploadedData(data.fileList[0]);
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignContent: "center",
              }}
            >
              <Typography.Text className="gc fz-12">
                <span className="fz-14">+</span> Upload Media
              </Typography.Text>
            </div>
          </Upload.Dragger>

          <Row justify="center" className="mt-1">
            <Typography.Text className="gc fz-12">
              Or From Your Media
            </Typography.Text>
          </Row>

          <Tabs
            className="w-100 mt-1"
            items={[
              {
                key: "image",
                label: "Photos",
                children: (
                  <MediaTabsContent
                    activeTab={"image"}
                    setSelectedMedia={setSelectedMedia}
                    selectedMedia={selectedMedia}
                    setUploadedData={setUploadedData}
                  />
                ),
              },
              {
                key: "video",
                label: "Videos",
                children: (
                  <MediaTabsContent
                    activeTab={"video"}
                    setSelectedMedia={setSelectedMedia}
                    selectedMedia={selectedMedia}
                    setUploadedData={setUploadedData}
                  />
                ),
              },
              {
                key: "newsTicker",
                label: "News Ticker",
                children: (
                  <MediaTabsContent
                    activeTab={"newsTicker"}
                    setSelectedMedia={setSelectedMedia}
                    selectedMedia={selectedMedia}
                    setUploadedData={setUploadedData}
                  />
                ),
              },
            ]}
          />
        </>
      )}

      {activeTab === 2 && (
        <AddNewsTicker
          form={form}
          textColor={textColor}
          backgroundColor={backgroundColor}
          setTextColor={setTextColor}
          setBackgroundColor={setBackgroundColor}
        />
      )}

      {activeTab === 3 && (
        <section>
          <Row justify="center">
            <Typography.Text>
              YOU CAN RESIZE & Locate The Item On The Screen
            </Typography.Text>
          </Row>
          <div
            className="overlay-show"
            style={{
              background: `url(${
                selectedMedia ? selectedMedia.image : uploadedData.url
              })`,
            }}
          >
            <div
              className="overlay-show-text"
              style={{
                backgroundColor:
                  typeof backgroundColor === "string"
                    ? backgroundColor
                    : backgroundColor.toHexString(),
              }}
            >
              <Typography.Text
                style={{
                  color:
                    typeof textColor === "string"
                      ? textColor
                      : textColor.toHexString(),
                }}
              >
                {form.getFieldValue("text")}
              </Typography.Text>
            </div>
          </div>
        </section>
      )}

      <Row gutter={[16, 16]} className="mt-1">
        <Col xs={24} lg={12}>
          <Button
            type="text"
            className="w-100 fz-14 fw-500"
            onClick={() => setOverLayModalOpen(false)}
          >
            Cancel
          </Button>
        </Col>
        <Col xs={24} lg={12}>
          <Button
            loading={loading}
            type="primary"
            className="w-100 fz-14 fw-500"
            onClick={() => {
              if (activeTab === 1) {
                onMediaSelectNext();
              } else if (activeTab === 2) {
                setActiveTab(3);
              }
            }}
          >
            {activeTab === 3 ? "Done" : "Next"}
          </Button>
        </Col>
      </Row>
    </section>
  );
}
