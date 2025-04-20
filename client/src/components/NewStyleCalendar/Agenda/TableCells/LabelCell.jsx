import { Dropdown, Menu, Row, Typography } from "antd";

import MeetingAddIcon from "assets/jsx-svg/MeetingAddIcon";
import MeetingAddLabelIcon from "assets/jsx-svg/MeetingAddLabelIcon";
import { useState } from "react";
import usePutLabelMeeting from "services/meetings/Mutations/usePutLabelMeeting";
import useGetAllLabelsInfo from "services/newSettings/Query/useGetAllLabelsInfo";

const LabelCell = ({ record, onChangeLabel }) => {
  const { data: labels } = useGetAllLabelsInfo({
    refetchOnMount: false,
    select: (data) => {
      return data.data.data;
    },
  });

  const { updateMeetingLabel } = usePutLabelMeeting({
    onSuccess: (_, payload) => {
      onChangeLabel({
        id: record.id,
        label: payload.labelId ? labels?.find((item) => item.id === payload.labelId) : null,
      });
    },
  });
  const [selectedLabel, setSelectedLabel] = useState(record?.label ?? {});

  const handleChangeLabel = (label) => {
    setSelectedLabel(label);
    updateMeetingLabel({
      id: record?.id,
      labelId: label?.id ?? null,
    });
  };

  return (
    <Dropdown
      overlay={
        <Menu
          style={{
            border: "1px solid #E5E5EA",
            borderRadius: "12px",
            boxShadow: "3px 6px 16px #00000014",
          }}>
          {labels?.map((label) => (
            <Menu.Item
              key={`${label?.id}`}
              onClick={() => handleChangeLabel(label)}
              style={{ color: label.color }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                }}>
                <MeetingAddLabelIcon fill={label.color} style={{ marginRight: "10px" }} />
                {label?.name}
              </div>
            </Menu.Item>
          ))}
          <Menu.Item key="delete" onClick={() => handleChangeLabel({})}>
            Delete Label
          </Menu.Item>
        </Menu>
      }
      trigger={["click"]}>
      <Row align="middle" gutter={[8, 0]} style={{ cursor: "pointer" }}>
        {selectedLabel?.id ? (
          <>
            <MeetingAddLabelIcon fill={selectedLabel.color} />
            <Typography.Text style={{ color: selectedLabel.color, marginLeft: "10px" }}>
              {selectedLabel.name}
            </Typography.Text>
          </>
        ) : (
          <>
            <MeetingAddIcon fill="#3A5EE3" style={{ marginTop: "-1px" }} />
            <Typography.Text style={{ color: "#3A5EE3", marginLeft: "5px", fontSize: "12px" }}>
              Add
            </Typography.Text>
          </>
        )}
      </Row>
    </Dropdown>
  );
};

export default LabelCell;
