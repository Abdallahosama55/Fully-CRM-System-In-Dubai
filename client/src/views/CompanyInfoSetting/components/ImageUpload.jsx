import { Avatar, Col, Row, Spin, Typography, Upload, message } from "antd";
import { EditPinSVG } from "assets/jsx-svg";
import axios from "axios";
import { API_BASE } from "services/config";
import { useState } from "react";
import "../styles.css";
import useCompanyInfoMutation from "services/newSettings/Mutations/useCompanyInfoMutation";
import { useQueryClient } from "@tanstack/react-query";

const ImageUpload = ({ company, queryKey }) => {
  const [isLoading, setIsLoading] = useState(false);
  const { editMainInfo, isPendingEditMainInfo } = useCompanyInfoMutation();
  const queryClient = useQueryClient();

  const handleChangeImageChange = (imageUrl) => {
    editMainInfo({ id: company.id, data: { ...company, image: imageUrl } }).then(() => {
      queryClient.invalidateQueries({ queryKey });
    });
  };

  return (
    <Row gutter={[24, 0]} style={{ margin: "4px 0 16px 0" }}>
      <Col>
        <Spin size="small" spinning={isLoading || isPendingEditMainInfo}>
          <span className="edit-image-icon">
            <Upload
              action={API_BASE + "vindo/file-upload"}
              accept="image/*"
              showUploadList={false}
              headers={{ Authorization: axios.defaults.headers.authorization }}
              onChange={(info) => {
                setIsLoading(true);
                if (info.file.status === "done") {
                  handleChangeImageChange(info?.file?.response?.data);
                  message.success(`image uploaded successfully`);
                } else if (info.file.status === "error") {
                  message.error(`image upload failed.`);
                }
                setIsLoading(false);
              }}>
              <EditPinSVG />
            </Upload>
          </span>
          <Avatar shape="square" size={72} src={company?.image} />
        </Spin>
      </Col>
      <Col className="d-flex justify-center flex-column">
        <Typography className="fw-500 fz-16">{company?.name}</Typography>
        <Typography>{company?.sectorType}</Typography>
      </Col>
    </Row>
  );
};

export default ImageUpload;
