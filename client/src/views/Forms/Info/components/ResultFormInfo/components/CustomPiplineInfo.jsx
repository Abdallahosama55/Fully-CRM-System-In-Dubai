import React from "react";
import { Card, Avatar, Badge, Flex } from "antd";
import { UserOutlined } from "@ant-design/icons";
import Box from "components/Box";

const { Meta } = Card;

const data = [
  {
    title: "Users",
    count: 3,
    color: "#3FB9ED1F",
    bdgcolor: "#3FB9ED",
    users: [
      { name: "Darrell Steward", img: "https://i.pravatar.cc/40?img=1" },
      { name: "Cameron Williamson", img: "https://i.pravatar.cc/40?img=2" },
      { name: "Darlene Robertson", img: "https://i.pravatar.cc/40?img=3" },
    ],
  },
  {
    title: "Travel experts",
    count: 2,
    bdgcolor: "#3A5EE3",
    color: "#3A5EE31F",
    users: [
      { name: "Guy Hawkins", img: "https://i.pravatar.cc/40?img=4" },
      { name: "Wade Warren", img: "https://i.pravatar.cc/40?img=5" },
    ],
  },
  {
    title: "Agents",
    count: 3,
    color: "#6A2EF81F",
    bdgcolor: "#6A2EF8",
    users: [
      { name: "Kathryn Murphy", img: "https://i.pravatar.cc/40?img=6" },
      { name: "Jenny Wilson", img: "https://i.pravatar.cc/40?img=7" },
      { name: "Marvin McKinney", img: "https://i.pravatar.cc/40?img=8" },
    ],
  },
  {
    title: "Travelers",

    count: 5,
    bdgcolor: "#5EAF2F",
    color: "#5EAF2F1F",
    users: [
      { name: "Courtney Henry", img: "https://i.pravatar.cc/40?img=9" },
      { name: "Ronald Richards", img: "https://i.pravatar.cc/40?img=10" },
      { name: "Dianne Russell", img: "https://i.pravatar.cc/40?img=11" },
      { name: "Jenny Wilson", img: "https://i.pravatar.cc/40?img=7" },
      { name: "Marvin McKinney", img: "https://i.pravatar.cc/40?img=8" },
    ],
  },
  {
    title: "Premium",
    count: 1,
    color: "#E812241F",
    bdgcolor: "#E81224",
    users: [{ name: "Cody Fisher", img: "https://i.pravatar.cc/40?img=12" }],
  },
];

const CustomPiplineInfo = () => {
  return (
    <div
      style={{
        display: "flex",
        gap: 16,
        padding: 16,
        overflowX: "auto",
        whiteSpace: "nowrap",
      }}>
      {data.map((group, index) => (
        <Card
          key={index}
          style={{
            borderRadius: 16,
            width: 220,
            backgroundColor: "#ffffff",
            border: "none",
            padding: 0,
          }}
          bodyStyle={{ padding: 0 }}>
          {/* Colored Header */}
          <div
            style={{
              backgroundColor: group.color,
              borderRadius: 12,
              padding: "12px 16px",
              color: "#030713",
              fontWeight: 600,
              fontSize: 14,
            }}>
    <Flex align="center" justify="space-between">
  <Box>
    {group.title}
    <p style={{ color: "#8E8E93" }}>---</p>
  </Box>
  <Badge count={group.count} style={{ backgroundColor: group.bdgcolor }} />
</Flex>

          </div>

          <div style={{ paddingBottom: 12 }}>
            {group.users.map((user, idx) => (
              <Card
                key={idx}
                style={{
                  marginBlock: 8,
                  borderRadius: 12,
                  border: "1px solid #f0f0f0",
                  boxShadow: "none",
                }}
                bodyStyle={{ padding: "8px 12px" }}>
                <Meta
                  avatar={<Avatar src={user.img} icon={<UserOutlined />} />}
                  title={<span style={{ fontSize: 14, fontWeight: 600 }}>{user.name}</span>}
                />
              </Card>
            ))}
          </div>
        </Card>
      ))}
    </div>
  );
};

export default CustomPiplineInfo;
