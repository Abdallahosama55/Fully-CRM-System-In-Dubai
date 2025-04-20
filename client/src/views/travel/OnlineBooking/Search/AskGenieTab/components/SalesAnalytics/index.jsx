import React from "react";
import HomeSection from "../HomeSection";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import formatNumber from "utils/formatNumber";
const mockData = [
  { month: "Jan", packages: 720, hotels: 420, experiences: 120 },
  { month: "Feb", packages: 730, hotels: 425, experiences: 135 },
  { month: "Mar", packages: 740, hotels: 430, experiences: 150 },
  { month: "Apr", packages: 750, hotels: 435, experiences: 160 },
  { month: "May", packages: 760, hotels: 440, experiences: 180 },
  { month: "Jun", packages: 765, hotels: 445, experiences: 200 },
  { month: "Jul", packages: 770, hotels: 450, experiences: 260 },
  { month: "Aug", packages: 780, hotels: 455, experiences: 290 },
  { month: "Sep", packages: 790, hotels: 460, experiences: 270 },
  { month: "Oct", packages: 800, hotels: 465, experiences: 280 },
  { month: "Nov", packages: 810, hotels: 470, experiences: 300 },
  { month: "Dec", packages: 840, hotels: 475, experiences: 340 },
];

const SalesAnalytics = () => {
  return (
    <HomeSection title={"Sales Analytics"}>
      <div style={{ height: "280px" }}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={mockData} margin={{ top: 0, right: 0, left: -10, bottom: 0 }}>
            <CartesianGrid vertical={false} />
            <Tooltip />
            <Legend
              verticalAlign="top"
              align="right"
              iconType="circle"
              iconSize={8}
              wrapperStyle={{ paddingBottom: "10px" }}
            />
            <XAxis dataKey={"month"} padding={{ left: 16 }} />
            <YAxis
              type="number"
              axisLine={false}
              tickLine={false}
              tickMargin={8}
              tickFormatter={(value) => value?.toLocaleString()}
            />
            <Line type="monotone" dataKey="packages" stroke="#A126A6" strokeWidth={2} />
            <Line type="monotone" dataKey="hotels" stroke="#2F5BA4" strokeWidth={2} />
            <Line type="monotone" dataKey="experiences" stroke="#A8DCE1" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </HomeSection>
  );
};

export default SalesAnalytics;
