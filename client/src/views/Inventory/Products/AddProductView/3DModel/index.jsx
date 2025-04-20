import { Button, Form, Row, Typography, Select, Col, Image } from "antd";
import { useForm } from "antd/es/form/Form";
import { useState, useEffect } from "react";
import checkFileds from "utils/checkFields";
import Add3dModel from "components/Add3dModel";
import { axiosCatch } from "utils/axiosUtils";
import ModelService from "services/model.service";
import AddProductButton from "components/common/AddProductButton";
import { useDrawer } from "hooks/useDrawer";

export default function Tab3DModel({ setFormActiveTabs, setTabActiveKey, onClose, setData }) {
  const [form] = useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [ownModels, setOwnModels] = useState([]);
  const DrawerAPI = useDrawer();

  useEffect(() => {
    if (isModalOpen === false) {
      setLoading(true);
      ModelService.getOwnModel()
        .then(({ data }) => setOwnModels(data.data))
        .catch(axiosCatch)
        .finally(() => setLoading(false));
    }
  }, [isModalOpen]);

  const onFinish = (values) => {
    setFormActiveTabs((prev) => [...prev, "AREffect"]);
    setTabActiveKey("6");
    window.scrollTo({
      top: 10,
      left: 10,
      behavior: "smooth",
    });
    setData((prev) => ({ ...prev, ...values }));
  };
  const toggleModal = () => setIsModalOpen((prev) => !prev);
  const closeModl = () => {
    DrawerAPI.open("70%");

    toggleModal();
  };
  const openToggleModal = () => {
    DrawerAPI.open("85%");
    toggleModal();
    DrawerAPI.setDrawerContent(<Add3dModel toggleModal={closeModl} />);
  };

  return (
    <>
      {DrawerAPI.Render}
      <Form form={form} layout="vertical" onFinish={onFinish}>
        <div>
          <Typography.Title>3D Model</Typography.Title>
          <Form.Item name="ownModel">
            <Select placeholder="Select Model">
              {ownModels?.map((model) => (
                <Select.Option key={model.id} value={model.id}>
                  <Row align="middle" gutter={[16, 0]}>
                    <Col>
                      <Image
                        preview={false}
                        alt={model.name}
                        src={model.image}
                        width={30}
                        height={30}
                      />
                    </Col>
                    <Col>
                      <Typography.Text>{model.name}</Typography.Text>
                    </Col>
                  </Row>
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Button
            style={{ background: "#272942" }}
            loading={loading}
            type="primary"
            onClick={() => openToggleModal()}>
            + Add New 3D Model
          </Button>
        </div>
        <div>
          <Form.Item>
            <Row justify="end">
              <AddProductButton
                htmlType="submit"
                onClick={() => checkFileds(form)}
                cancel={onClose}
                addName="Next"
              />
            </Row>
          </Form.Item>
        </div>
      </Form>
    </>
  );
}
