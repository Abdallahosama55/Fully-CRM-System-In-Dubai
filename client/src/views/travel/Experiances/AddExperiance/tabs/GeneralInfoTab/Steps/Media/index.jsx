import { Col, Form, message, Modal, Row, Skeleton, Spin, Typography, Upload } from "antd";
import { useEffect, useMemo, useState } from "react";
import MediaPNG from "assets/images/MediaPNG.png";
import { v4 as uuidv4 } from "uuid";
import CommonService from "services/common.service";
import { CloseSquareSVG } from "assets/jsx-svg";
import LinksInput from "components/common/LinksInput";
// custom hooks
import useGetExperianceMedia from "services/travel/experiance/ExperianceTab/Querys/useGetExperianceMedia";
import useAddOrEditMedia from "services/travel/experiance/ExperianceTab/Mutations/useAddOrEditMedia";
import { queryClient } from "services/queryClient";
import MediaImageModal from "./components/MediaImageModal";

const Media = ({ id, next }) => {
  // DATA
  const [images, setImages] = useState([]);
  const [videoLinks, setVideoLinks] = useState([]);
  const [metaverseLinks, setMetaverseLinks] = useState([]);

  const [isUploading, setIsUploading] = useState(false);
  const [editId, setEditId] = useState(null);

  const experianceQuery = useGetExperianceMedia(id);

  const draggerProps = useMemo(
    () => ({
      name: "file",
      multiple: true,
      action: false,
      beforeUpload: () => false,
      onChange: async (info) => {
        try {
          setIsUploading(true);
          const res = await CommonService.uploadFile(info.file);

          setImages((prev) => {
            const newFile = {
              id: info.file.uid,
              url: res.data.uploadedFiles.file,
              caption: "",
              alternateText: "",
              isCover: prev?.length > 0 ? false : true,
              flags: [],
            };

            return [...prev, newFile];
          });
        } catch (error) {
          message.error({
            content: `Failed to upload file: ${info.file.name}`,
          });
        } finally {
          setIsUploading(false);
        }
      },
      showUploadList: false,
    }),
    [setImages],
  );

  const addOrEditMediaMutation = useAddOrEditMedia(id, {
    onSuccess: () => {
      next();
    },
    onError: (error) => message.error(error.message),
  });

  const handelAddMedia = () => {
    if (videoLinks.find((el) => el?.error) || metaverseLinks.find((el) => el?.error)) {
      message.error("One of the links is not valid replace it");
    } else if (images.length < 1) {
      message.error("You have to upload at least 1 images");
    } else {
      addOrEditMediaMutation.mutate({
        images,
        videos: videoLinks,
        metaverse: metaverseLinks,
      });
    }
    queryClient.invalidateQueries({ queryKey: [experianceQuery.key] });
  };

  useEffect(() => {
    if (experianceQuery.isSuccess) {
      setImages(experianceQuery.data.images?.map((el) => ({ ...el, id: uuidv4() })));
      setVideoLinks(experianceQuery.data.video?.map((el) => ({ value: el, error: false })));
      setMetaverseLinks(experianceQuery.data.metaverse?.map((el) => ({ value: el, error: false })));
    }

    if (experianceQuery.isError) {
      message.error(experianceQuery?.error.message);
    }
  }, [
    experianceQuery.isSuccess,
    experianceQuery.isError,
    experianceQuery.data,
    experianceQuery.error,
  ]);

  if (experianceQuery.isLoading) {
    return <Skeleton active />;
  }

  return (
    <div>
      <Form hidden={true} id="form_inside_tab" onFinish={handelAddMedia} />
      <Modal
        open={Boolean(editId)}
        footer={null}
        closeIcon={<CloseSquareSVG />}
        onCancel={() => {
          setEditId(null);
        }}
        destroyOnClose>
        <MediaImageModal
          data={images.find((el) => el?.id === editId)}
          onDelete={(id) => {
            setImages((prev) => prev.filter((el) => el?.id !== id));
            setEditId(null);
          }}
          onSave={(data) => {
            if (data.isCover) {
              setImages((prev) =>
                prev.map((el) => {
                  if (el?.id === data.id) {
                    return data;
                  }

                  return { ...el, isCover: false };
                }),
              );
            } else {
              setImages((prev) =>
                prev.map((el) => {
                  if (el?.id === data.id) {
                    return data;
                  }

                  return el;
                }),
              );
            }
            setEditId(null);
          }}
        />
      </Modal>
      <div className="media_step">
        <img src={MediaPNG} alt="Media" />
        <Typography.Title level={3} className="fz-18 title">
          Capture Your Journey
        </Typography.Title>
        <Typography.Paragraph className="fz-14 sub_title">
          Add at least 1 high-quality photos from different angles to showcase your travel
          experience. Highlight the beauty and uniqueness of your destination
        </Typography.Paragraph>
        <Row gutter={12}>
          <Col md={24} lg={16}>
            <Upload.Dragger
              {...draggerProps}
              customRequest={(e) => e.onSuccess("ok")}
              className="image_uploader"
              fileList={[]}
              disabled={isUploading}>
              <Spin spinning={isUploading}>
                <Typography.Text className="fz-16 fw-500">Upload Files</Typography.Text>
                <br />
                <Typography.Text className="gc">or drag and drop</Typography.Text>
              </Spin>
            </Upload.Dragger>
          </Col>
          <Col md={24} lg={8}>
            <Row gutter={[8, 8]} className="image_list">
              {images.map((el, index) => {
                return (
                  <Col
                    lg={12}
                    md={24}
                    key={index}
                    className="image_card"
                    onClick={() => {
                      setEditId(el?.id);
                    }}>
                    {el?.isCover && <span className="cover_tag">Cover</span>}
                    <img className="uploaded_image" src={el?.url} alt="" />
                  </Col>
                );
              })}
            </Row>
          </Col>
        </Row>
        <Form layout="vertical" style={{ marginTop: "1rem" }} id="form_inside_tab">
          <Row gutter={[16, 0]}>
            <Col lg={12} md={24}>
              <Form.Item label="Video Links">
                <LinksInput
                  value={videoLinks}
                  onChange={(value) => {
                    setVideoLinks(value);
                  }}
                  placeholder={"Paste in a YouTube / Vimeo link here"}
                />
              </Form.Item>
            </Col>
            <Col lg={12} md={24}>
              <Form.Item label="Metaverse Links">
                <LinksInput
                  value={metaverseLinks}
                  onChange={(value) => {
                    setMetaverseLinks(value);
                  }}
                  placeholder={"Add Metaverse link"}
                />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </div>
    </div>
  );
};

export default Media;
