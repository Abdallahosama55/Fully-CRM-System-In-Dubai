import { DownOutlined } from "@ant-design/icons";
import { Col, Dropdown, Input, Select, Space, Typography } from "antd";
import { SearchSVG } from "assets/jsx-svg";
import React, { Fragment, useMemo } from "react";
import renderColumns from "../renderColumns";
import ListColumn from "./ListColumn";
import ListColumns from "./ListColumn";

const Filters = () => {
  const handleMenuClick = () => {};
  const menuProps = useMemo(() => {
    return [
      {
        label: "All columns",
        key: "all",
      },
      ...renderColumns()
        .map((item) => {
          return { label: item.title, key: item.dataIndex };
        })
        .filter((value) => !["avatar", "actions"].includes(value.key)),
    ];
  }, []);
  return (
    <Fragment>
      <Col flex={1}>
        <Input
          className="general-table-search"
          placeholder="Search"
          //   onChange={(e) => setSearchQuery(e.target.value)}
          addonBefore={<ListColumns menuProps={menuProps}></ListColumns>}
          addonAfter={
            <div
              className="clickable center-items search"
              style={{
                width: "44px",
                height: "42px",
                borderRadius: "0 8px 8px 0",
              }}>
              <SearchSVG />
            </div>
          }
          suffix={<SearchSVG />}
        />
      </Col>
      <Col>
        <Select
          className="general-table-select"
          style={{ width: "150px" }}
          defaultValue="newest"
          options={[
            {
              value: "newest",
              label: (
                <Typography.Text className="fz-12">
                  Sort by: <span className="fw-600">Newest</span>
                </Typography.Text>
              ),
            },
          ]}
        />
      </Col>
    </Fragment>
  );
};

export default Filters;

{
  /* <Button
style={{ background: "#272942", color: "#fff" }}
onClick={() => {
  DrawerAPI.setDrawerContent(<CallsAndMeetingsAdd />);
  DrawerAPI.open("40%");
}}>
<Row align="middle" gutter={[8, 0]} wrap={false}>
  <Col>
    <Row align="middle">
      <PlusSVG />
    </Row>
  </Col>
  <Col>New Meeting</Col>
</Row>
</Button> */
}
