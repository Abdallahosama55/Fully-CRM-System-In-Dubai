import { Card, Checkbox, Flex, Form, Image, Typography } from "antd";
import React from "react";
import house from "assets/images/house.png";

const VerseCard = ({ image, title, id, isCheckboxShow }) => {
  return (
    <Card
      classNames="desks-metaverses-verse-card"
      cover={
        <Image
          preview={false}
          src={image || house}
          alt="dimension"
          width="100%"
          height="150px"
          className="explore-card-img"
        />
      }>
      <div>
        <Flex justify="space-between">
          <Typography.Text
            style={{
              fontSize: "13px",
              lineHeight: "19.5px",
              color: "#202020",
              fontWeight: "500",
            }}
            title={title}
            ellipsis>
            {title}
          </Typography.Text>
          {isCheckboxShow && (
            <Form.Item
              className="desks-metaverses-verse-card-checkbox"
              valuePropName="checked"
              name={id}>
              <Checkbox />
            </Form.Item>
          )}
        </Flex>
      </div>
    </Card>
  );
};
export default VerseCard;
