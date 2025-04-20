import React from "react";
import { Col, Row, Typography } from "antd";
import RadioInputCard from "components/common/RadioInputCard";
import { PACKAGE_LIBRARY_ITEMS_TYPES } from "constants/PACKAGE_TYPES";
const SelectItemType = ({
  itemType = PACKAGE_LIBRARY_ITEMS_TYPES.SINGLE,
  setItemType,
  canChangeByLocation = true,
}) => {
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
            value={PACKAGE_LIBRARY_ITEMS_TYPES.SINGLE}
            isChecked={itemType === PACKAGE_LIBRARY_ITEMS_TYPES.SINGLE}
            onChange={handleChange}
          />
        </Col>
        {canChangeByLocation && (
          <Col span={24}>
            <RadioInputCard
              title="Changeable by location"
              description="This item can be replaced during the booking process. Customers can choose another item of the same type and within the same city from our system as a replacement."
              value={PACKAGE_LIBRARY_ITEMS_TYPES.CHANGEABLE_BY_LOCATION}
              isChecked={itemType === PACKAGE_LIBRARY_ITEMS_TYPES.CHANGEABLE_BY_LOCATION}
              onChange={handleChange}
            />
          </Col>
        )}
        <Col span={24}>
          <RadioInputCard
            title="Select one from a list of replacements"
            description="The supplier selects multiple items and sets a default. Customers can select the default item or choose a different one from the pre-approved list during booking."
            value={PACKAGE_LIBRARY_ITEMS_TYPES.SELECT_ONE_FROM_LIST}
            isChecked={itemType === PACKAGE_LIBRARY_ITEMS_TYPES.SELECT_ONE_FROM_LIST}
            onChange={handleChange}
          />
        </Col>
      </Row>
    </div>
  );
};

export default SelectItemType;
