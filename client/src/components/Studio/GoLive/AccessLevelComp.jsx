import { useState } from "react";
import { Button, Checkbox, Col, Form, Input, Radio, Row, Table, Tag } from "antd";
import { v4 as uuidv4 } from "uuid";

import { DeleteSVG, EditSVG } from "assets/jsx-svg";

import "./styles.css";

const access = [
  { id: "OPEN", label: "Open For All" },
  { id: "INVITED_MEMBERS", label: "Invited Members" },
];

export default function AccessLevelComp({
  setActiveCreateEventTab,
  participantList,
  setParticipantList,
  setEventDetails,
  initialAccessLevel = null,
}) {
  const [accessLevel, setAccessLevel] = useState(initialAccessLevel || "OPEN");
  const [addParticipantForm] = Form.useForm();
  const addToList = (values) => {
    const objectToAdd = {
      id: uuidv4(),
      ...values,
      source: "FRONT",
    };
    setParticipantList([objectToAdd, ...participantList]);
  };
  const updateItem = (id, values) => {
    console.log("values", values);
    const otherParticipantList = participantList.filter((item) => item.id !== id);
    const objToSave = {
      id: id,
      ...values,
      source: "FRONT",
    };
    setParticipantList([objToSave, ...otherParticipantList]);
  };
  const onFinish = async (values) => {
    console.log("values", values);
    if (!idToEdit) {
      addToList(values);
    } else {
      updateItem(idToEdit, values);
    }
    setIdToEdit(null);
    addParticipantForm.resetFields();
  };
  const handelCancelEdit = () => {
    setIdToEdit(null);
    addParticipantForm.resetFields();
  };
  const handelDeleteParticipant = (id) => {
    let itemToDelete = participantList.filter((item) => item.id === id)[0];

    if (itemToDelete.source === "BACK") {
      setParticipantList([
        ...participantList.filter((item) => item.id !== id),
        { ...itemToDelete, isDeleted: true },
      ]);
    } else {
      setParticipantList(participantList.filter((item) => item.id !== id));
    }
  };
  const [idToEdit, setIdToEdit] = useState();
  const onRowEditView = (row) => {
    setIdToEdit(row.id);
    addParticipantForm.setFieldsValue({
      ...row,
    });
  };

  const handelNext = () => {
    setActiveCreateEventTab((prev) => ++prev);
  };

  console.log("participantList", participantList);

  const columns = [
    {
      title: "No.",
      dataIndex: "title",
      key: "title",
      ellipsis: true,
      width: 70,
      render: (id, record, index) => {
        ++index;
        return index;
      },
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      ellipsis: true,
      width: 100,
    },
    {
      title: "User Badge",
      dataIndex: "isVIP",
      key: "isVIP",
      render: (isVIP) =>
        isVIP ? <Tag color="purple">VIP</Tag> : <Tag color="#98A2B3">ATTENDE</Tag>,
      ellipsis: true,
      width: 100,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      ellipsis: true,
      width: 200,
    },

    {
      title: "Actions",
      key: "actions",
      dataIndex: "actions",
      ellipsis: true,
      width: 180,
      render: (_, record) => {
        return (
          <div style={{ display: "flex", columnGap: 5 }}>
            {record?.source === "FRONT" && (
              <span
                title={"Edit"}
                style={{ cursor: "pointer" }}
                onClick={() => onRowEditView(record)}>
                <EditSVG />
              </span>
            )}

            <span
              title="Delete"
              style={{ cursor: "pointer" }}
              onClick={() => handelDeleteParticipant(record.id)}>
              <DeleteSVG />
            </span>
          </div>
        );
      },
    },
  ];
  return (
    <>
      <Form
        onFinish={onFinish}
        layout="vertical"
        form={addParticipantForm}
        requiredMark={false}
        className="go-live">
        <Form.Item
          label={"Access"}
          name="accessLevel"
          initialValue={accessLevel || "OPEN"}
          className="mt-1">
          <Radio.Group
            onChange={(e) => {
              setEventDetails((prev) => ({
                ...prev,
                accessLevel: e.target.value,
              }));
              setAccessLevel(e.target.value);
            }}>
            {access.map((item) => (
              <Radio key={item.id} value={item.id}>
                {item.label}
              </Radio>
            ))}
          </Radio.Group>
        </Form.Item>

        {accessLevel === "INVITED_MEMBERS" ? (
          <>
            <Row gutter={5}>
              <Col span={12}>
                <Form.Item
                  name="name"
                  label="Name"
                  rules={[
                    {
                      required: true,
                      message: "Pleaes Enter a Name",
                    },
                  ]}>
                  <Input placeholder="write here" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="email"
                  label="Email"
                  rules={[
                    {
                      type: "email",
                    },
                    {
                      required: true,
                      message: "Pleaes Enter Email",
                    },
                  ]}>
                  <Input placeholder="write here" />
                </Form.Item>
              </Col>
            </Row>
            {/* </div> */}
            <Row justify="end">
              <Form.Item name="isVIP" valuePropName="checked">
                <Checkbox>Is VIP</Checkbox>
              </Form.Item>
            </Row>
            <Row justify="end">
              <Col span={12}>
                <div style={{ height: 20 }}></div>
                {idToEdit && (
                  <Button style={{ width: "48%" }} block onClick={handelCancelEdit}>
                    Cancel
                  </Button>
                )}
                <Button
                  style={{ float: "right", width: "48%" }}
                  htmlType="submit"
                  // loading={addLoading}
                  type="primary">
                  {idToEdit ? "Save" : "Add"}
                </Button>
              </Col>
            </Row>
            <h4>Participants</h4>
            <Table
              // scroll={{ x: 700, y: 400 }}
              rowKey={"id"}
              className="studio-table"
              dataSource={participantList?.filter((item) => !item?.isDeleted) || []}
              locale={{ emptyText: "No data yet. Add participants to view here directly" }}
              style={{ marginTop: "30px" }}
              columns={columns}
            />
          </>
        ) : null}
      </Form>
      <Row align="end" gutter={[12]} className="mt-1">
        <Button
          type="text"
          className=" fz-14"
          onClick={() => setActiveCreateEventTab((prev) => --prev)}
          style={{ marginRight: "8px" }}>
          Previous
        </Button>
        <Button onClick={handelNext} style={{ background: "#272942", color: "#fff" }}>
          Next
        </Button>
      </Row>
    </>
  );
}
