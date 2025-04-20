import { Col, Row, Typography } from "antd";
import RadioInputCard from "components/common/RadioInputCard";
import { PACKAGE_LIBRARY_ITEMS_STATIC_TYPES } from "constants/PACKAGE_TYPES";
import React from "react";

const SelectType = ({ itemType = PACKAGE_LIBRARY_ITEMS_STATIC_TYPES.SINGLE, setItemType }) => {
  const handleChange = (value) => {
    setItemType(value);
  };

  return (
    <div>
      <Typography.Title level={3} className="fz-26 modal_title">
        What type of item is this?
      </Typography.Title>
      <Typography.Paragraph className="fz-18">
        Help us understand how this item should function in the package.
      </Typography.Paragraph>
      <Row gutter={[12, 12]}>
        <Col span={24}>
          <RadioInputCard
            title="Single"
            description="This item cannot be changed during the booking process. Customers will book the exact item as it is."
            value={PACKAGE_LIBRARY_ITEMS_STATIC_TYPES.SINGLE}
            isChecked={itemType === PACKAGE_LIBRARY_ITEMS_STATIC_TYPES.SINGLE}
            onChange={handleChange}
          />
        </Col>
        <Col span={24}>
          <RadioInputCard
            title="Select one from a list of replacements"
            description="Selects multiple items and sets a default. Customers can select the default item or choose a different one from the pre-approved list during booking."
            value={PACKAGE_LIBRARY_ITEMS_STATIC_TYPES.SELECT_ONE_FROM_LIST}
            isChecked={itemType === PACKAGE_LIBRARY_ITEMS_STATIC_TYPES.SELECT_ONE_FROM_LIST}
            onChange={handleChange}
          />
        </Col>
      </Row>
    </div>
  );
};

export default SelectType;
