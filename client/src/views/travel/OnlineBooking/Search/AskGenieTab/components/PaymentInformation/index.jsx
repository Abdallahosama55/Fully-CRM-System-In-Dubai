import React from "react";
import HomeSection from "../HomeSection";
import { Cell, Label, Pie, PieChart } from "recharts";
// style
import "./styles.css";
import { Flex } from "antd";

const mockData = [
  { name: "Payment not required", value: 50000, color: "#0C3E85" },
  { name: "Payment required", value: 70000, color: "#83E0E3" },
  { name: "Overdue payment", value: 20000, color: "#E300D3" },
];
const PaymentInformation = () => {
  const total = mockData.reduce((sum, item) => sum + item.value, 0);

  return (
    <HomeSection title={"Payment information"}>
      <Flex vertical justify="space-between" gap={16}>
        <Flex align="center" justify="center" style={{ height: "190px" }}>
          <PieChart width={170} height={170}>
            <Pie
              data={mockData}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={85}
              dataKey="value">
              {mockData?.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry?.color || "#647087"} />
              ))}
              <Label
                value={`$${total.toLocaleString()}`}
                position="center"
                style={{
                  fontSize: "clamp(12px, 5vw, 24px)",
                  fontWeight: 600,
                  fill: "var(--font-primary)",
                  fontStyle: "normal",
                  fontWeight: 600,
                }}
              />
            </Pie>
          </PieChart>
        </Flex>
        <div style={{ marginTop: "1rem" }}>
          {mockData?.map((el) => (
            <Flex align="center" key={el?.name} justify="space-between">
              <Flex align="center" gap={6}>
                <div
                  className="payment_information_chart_container_legend"
                  style={{ backgroundColor: el?.color }}
                />
                <p className="xs_text_medium" style={{ color: "var(--font-secondary)" }}>
                  {el?.name}
                </p>
              </Flex>
              <p className="xs_text_medium" style={{ color: "var(--font-secondary)" }}>
                ${el?.value?.toLocaleString()}
              </p>
            </Flex>
          ))}
        </div>
      </Flex>
    </HomeSection>
  );
};

export default PaymentInformation;
