import React, { useState } from "react";
import { Button, Input, Switch, Select, Typography, Space, Tabs, Divider } from "antd";
import ShareIcon from "assets/EyeFormSVG";
function FormDetails() {
    const { TextArea } = Input;
const { Title } = Typography;
const [formName, setFormName] = useState("");
  const [description, setDescription] = useState("");
  return (
    
    <div>
      {" "}
      <header>
        <Title level={4}>Form Info</Title>
        <Space>
          <Button icon={<ShareIcon />}>Share</Button>
          <Button>
            Active <Switch defaultChecked style={{ backgroundColor: "#12B76A" }} />
          </Button>
        </Space>
      </header>
      <div className="form-section" style={{ paddingBlock: "12px" }}>
        <div className="form-group">
          <label className="form-label">Form Name</label>
          <Input
            placeholder="Travel agent registration"
            value={formName}
            onChange={(e) => setFormName(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label className="form-label">Description</label>
          <TextArea
            rows={3}
            placeholder="Lorem ipsum dolor sit amet, consectetur adipiscing elit..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
}

export default FormDetails;
