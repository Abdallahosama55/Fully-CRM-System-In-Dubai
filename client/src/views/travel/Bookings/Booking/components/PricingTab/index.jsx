import { Typography } from "antd";
import React from "react";
const haveAValue = (value) => {
  return value !== null && value !== undefined;
};
const PricingTab = ({ data }) => {
  console.log("data , ", data);
  return (
    <div>
      <Typography.Title
        level={4}
        className="md_text_bold"
        style={{ color: "var(--gray-700);", marginBottom: "0.5rem" }}>
        Pricing Details
      </Typography.Title>
      {Array.isArray(data) ? (
        data.map((el, index) => <DataTable data={el} key={index} index={index} />)
      ) : (
        <DataTable data={data} />
      )}
    </div>
  );
};

const DataTable = ({ data, index }) => {
  return (
    <table className="booking_info_table">
      <tbody>
        <tr>
          <td className="xs_text_medium" colSpan={2}>
            {haveAValue(data?.roomPrice)
              ? `Room ${index + 1}`
              : haveAValue(data?.productPrice)
              ? "Product"
              : "Flight"}
          </td>
        </tr>
        {haveAValue(data?.roomPrice) && (
          <tr>
            <td className="xs_text_medium">Room price</td>
            <td className="xs_text_medium">
              {data?.roomPrice} {data?.marginCurrency || "USD"}
            </td>
          </tr>
        )}
        {haveAValue(data?.flightPrice) && (
          <tr>
            <td className="xs_text_medium">Flight price</td>
            <td className="xs_text_medium">
              {data?.flightPrice} {data?.marginCurrency || "USD"}
            </td>
          </tr>
        )}
        {haveAValue(data?.productPrice) && (
          <tr>
            <td className="xs_text_medium">Product price</td>
            <td className="xs_text_medium">
              {data?.productPrice} {data?.marginCurrency || "USD"}
            </td>
          </tr>
        )}
        {haveAValue(data?.breakfastPrice) && (
          <tr>
            <td className="xs_text_medium">Breakfast price</td>
            <td className="xs_text_medium">
              {data?.breakfastPrice} {data?.marginCurrency || "USD"}
            </td>
          </tr>
        )}
        {haveAValue(data?.fees) && (
          <tr>
            <td className="xs_text_medium">fees</td>
            <td className="xs_text_medium">
              {data?.fees} {data?.marginCurrency || "USD"}
            </td>
          </tr>
        )}
        {haveAValue(data?.tripPrice) && (
          <tr>
            <td className="xs_text_bold">Trip price</td>
            <td className="xs_text_bold">
              {data.tripPrice} {data?.marginCurrency || "USD"}
            </td>
          </tr>
        )}
        {haveAValue(data?.margin) && (
          <tr>
            <td className="xs_text_medium">Margin price</td>
            <td className="xs_text_medium">
              {data?.margin} {data?.marginCurrency || "USD"}
            </td>
          </tr>
        )}
        {haveAValue(data?.marginAmount) && (
          <tr>
            <td className="xs_text_medium">Margin price</td>
            <td className="xs_text_medium">
              {data?.marginAmount} {data?.marginCurrency || "USD"}
            </td>
          </tr>
        )}
        {haveAValue(data?.marginPercent) && (
          <tr>
            <td className="xs_text_medium">Margin percent</td>
            <td className="xs_text_medium">{data?.marginPercent} %</td>
          </tr>
        )}
        {haveAValue(data?.marginType) && (
          <tr>
            <td className="xs_text_medium">Margin type</td>
            <td className="xs_text_medium">{data?.marginType}</td>
          </tr>
        )}
        {haveAValue(data?.grossPrice) && (
          <tr>
            <td className="xs_text_bold">Net price</td>
            <td className="xs_text_bold">
              {data.grossPrice} {data?.marginCurrency || "USD"}
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
};
export default PricingTab;
