import React, { useEffect, useState } from "react";
import Section from "../../components/Section";
import { MediaSVG, ThreeDModelSVG } from "assets/jsx-svg";
import { Avatar, Form, message, Select, Skeleton } from "antd";
import { useForm } from "antd/es/form/Form";
// API CALLS
import useGetMetaversSliders from "services/travel/accommodations/Media/Queries/useGetMetaversSliders";
// style
import "./styles.css";
import { TRAVEL_API_URL } from "services/travel/config";
import useAddMedia from "services/travel/accommodations/Media/Mutations/useAddMedia";
import useGetMediaInfo from "services/travel/accommodations/Media/Queries/useGetMediaInfo";
import UploadImagesListInput from "components/common/UploadImagesListInput";
import isValidJson from "utils/isValidJson";

const Media = ({ id, next, autoCompleateData }) => {
  const [form] = useForm();
  const [isUploading, setIsUploading] = useState(false);
  // QUERIES
  const metaversSlidersQuery = useGetMetaversSliders();
  const metaInfoQuery = useGetMediaInfo(id, { enabled: Boolean(id) });
  // MUTATIONS
  const addOrEditMediaMutation = useAddMedia(id, {
    onSuccess: () => {
      next();
    },
    onError: (error) => message.error(error.message),
  });

  // SET DATA IN THE FORM
  useEffect(() => {
    if (metaInfoQuery.isSuccess) {
      form.setFieldsValue({
        metaverse: metaInfoQuery.data?.metaverse,
        images: autoCompleateData?.images
          ? autoCompleateData?.images
          : isValidJson(metaInfoQuery.data?.images)
          ? JSON.parse(metaInfoQuery.data?.images)
          : [],
      });
    }
  }, [metaInfoQuery.data, metaInfoQuery.isSuccess]);

  const handelFinish = (values) => {
    if (isUploading) {
      message.warning("Wait until upload is done");
      return;
    }

    if (values?.images?.length === 0) {
      message.error("Upload at least one image");
    } else {
      addOrEditMediaMutation.mutate({
        ...values,
        images: JSON.stringify(values?.images),
      });
    }
  };

  if (metaInfoQuery.isLoading || metaversSlidersQuery.isLoading) {
    return <Skeleton active />;
  }

  return (
    <div>
      <Form layout="vertical" id="form_inside_tab" onFinish={handelFinish} form={form}>
        {Array.isArray(metaversSlidersQuery.data) && metaversSlidersQuery.data?.length > 0 && (
          <Section title="Metaverse Experience" icon={<ThreeDModelSVG />}>
            <Form.Item name="metaverse" label="Select metaverse portals">
              <Select
                placeholder="metaverse portals"
                mode="multiple"
                disabled={metaversSlidersQuery.isLoading}
                options={metaversSlidersQuery.data?.map((el) => {
                  return {
                    value: el.id,
                    label: (
                      <div>
                        <Avatar
                          gap={3}
                          shape="square"
                          size="small"
                          src={el.image}
                          alt={el.name}></Avatar>
                        <span className="ml-1">{el.name}</span>
                      </div>
                    ),
                  };
                })}
              />
            </Form.Item>
          </Section>
        )}
        <Section title="Media" icon={<MediaSVG />}>
          <Form.Item
            name={"images"}
            label={<p className="sm_text_medium">Upload images</p>}
            required
            rules={[
              {
                validator: (_, value) => {
                  if (!value || value?.length === 0) {
                    return Promise.reject("Upload at least one image");
                  }

                  return Promise.resolve();
                },
              },
            ]}>
            <UploadImagesListInput
              fullWidth={true}
              formatsText={"PNG, JPG"}
              uploadText={"Click to upload"}
              action={TRAVEL_API_URL + "common/add-image"}
              name={"image"}
              maxText={"100 x 75px"}
            />
          </Form.Item>
        </Section>
      </Form>
    </div>
  );
};

export default Media;
