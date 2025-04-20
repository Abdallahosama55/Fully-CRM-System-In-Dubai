import { Tabs } from "antd";
import FormStructure from "./formStructure";

import "./styles.css";
import { OFFICER_TYPE } from "constants/BUYER_GROUB";

const RegistrationFrom = () => {
  return (
    <div className="registration_form_container">
      <div className="registration_form_title">
        Registration <span>Form</span>
      </div>

      <Tabs
        destroyInactiveTabPane={true}
        className="registration_form_tabs"
        defaultActiveKey="1"
        items={[
          {
            label: "Travel Agent",
            key: "1",
            children: <FormStructure type={OFFICER_TYPE.AGENT} />,
          },
          {
            label: "Supplier",
            key: "2",
            children: <FormStructure type={OFFICER_TYPE.SUPPLIER} />,
          },
        ]}
      />
    </div>
  );
};

export default RegistrationFrom;
