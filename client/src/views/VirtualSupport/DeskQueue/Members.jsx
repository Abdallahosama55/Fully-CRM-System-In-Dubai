import { Fragment } from "react";
import { Avatar, Col, Divider, List, Popover, Row, Typography } from "antd";
import { stringAvatar } from "utils/string";

const Members = ({ customers, employees }) => {
  return (
    <div>
      <Popover
        overlayStyle={{ width: "300px" }}
        content={<Content employees={employees} customers={customers}></Content>}
        trigger={"click"}>
        <Typography.Link style={{ fontSize: "12px" }} ellipsis underline color="#3A5EE3">
          Participant and Customer
        </Typography.Link>
      </Popover>
    </div>
  );
};
const Content = ({ customers = [], employees }) => {
  return (
    <div>
      {customers.length > 0 && (
        <Row>
          <Item title={"Customer"} data={customers} length={customers.length}></Item>
        </Row>
      )}
      {employees.length > 0 && (
        <Row>
          <Item title={"Employees"} data={employees} length={employees.length}></Item>
        </Row>
      )}
    </div>
  );
};

const Item = ({ title, length, data }) => {
  return (
    <Fragment>
      <Col span={24} className="fz-14 fw-500">
        {title} ({length})
        <Divider
          style={{
            marginTop: "4px !important",
            marginBottom: "4px !important",
          }}
        />
      </Col>
      <Col span={24}>
        <List
          itemLayout="horizontal"
          dataSource={data}
          renderItem={(item) => (
            <List.Item className="virtial-support-desk-queue-members-list">
              <List.Item.Meta
                avatar={
                  <Avatar
                    size={"small"}
                    src={item.profileImage}
                    {...stringAvatar(item?.fullName)}
                  />
                }
                title={<span title={item?.fullName}>{item?.fullName}</span>}
                description={
                  <span title={item?.email} style={{ fontSize: "12px" }}>
                    {item?.email}
                  </span>
                }
              />
            </List.Item>
          )}
        />
      </Col>
    </Fragment>
  );
};
export default Members;
