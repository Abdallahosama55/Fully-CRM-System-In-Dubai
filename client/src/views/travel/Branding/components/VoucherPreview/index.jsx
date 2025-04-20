import { Button, Divider, Space, Typography } from "antd";
import { BedSVG3, ExperiencesSVG, PlaneSVG, TransferSVG } from "assets/jsx-svg";
import React, { useState } from "react";
import { VOUCHER_TYPES } from "constants/VOUCHER_TYPES";
import TransferVoucher from "components/vouchers/TransferVoucher";
import TemplateLayout from "./templates/Layout";
import hexToHexWithAlpha from "utils/hexToHexWithAlpha";
import HotelVoucher from "components/vouchers/HotelVoucher";
import ExperienceVoucher from "components/vouchers/ExperienceVoucher";
import FlightTicket from "components/vouchers/FlightTicket";

const VoucherPreview = (props) => {
  const [activeVoucherKey, setActiveVoucherKey] = useState(VOUCHER_TYPES.FLIGHT);
  return (
    <div className="branding_section w-100">
      <Space className="space-between">
        <div>
          <Typography.Title level={5} className="fz-18 fw-600" style={{ marginBottom: 0 }}>
            Voucher Configure
          </Typography.Title>
        </div>
        <Space split={<Divider type="vertical" />}>
          <div>
            <Button
              style={{ marginInlineStart: "8px" }}
              onClick={() => setActiveVoucherKey(VOUCHER_TYPES.FLIGHT)}
              size="small"
              type={activeVoucherKey === VOUCHER_TYPES.FLIGHT ? "primary" : "default"}
              icon={
                <PlaneSVG fill={activeVoucherKey === VOUCHER_TYPES.FLIGHT ? "#fff" : "#667085"} />
              }
            />
            <Button
              style={{ marginInlineStart: "8px" }}
              onClick={() => setActiveVoucherKey(VOUCHER_TYPES.ACCOMMODATION)}
              size="small"
              type={activeVoucherKey === VOUCHER_TYPES.ACCOMMODATION ? "primary" : "default"}
              icon={
                <BedSVG3
                  fill={activeVoucherKey === VOUCHER_TYPES.ACCOMMODATION ? "#fff" : "#667085"}
                />
              }
            />
            <Button
              style={{ marginInlineStart: "8px" }}
              onClick={() => setActiveVoucherKey(VOUCHER_TYPES.EXPERIENCE)}
              size="small"
              type={activeVoucherKey === VOUCHER_TYPES.EXPERIENCE ? "primary" : "default"}
              icon={
                <ExperiencesSVG
                  fill={activeVoucherKey === VOUCHER_TYPES.EXPERIENCE ? "#fff" : "#667085"}
                />
              }
            />
            <Button
              style={{ marginInlineStart: "8px" }}
              onClick={() => setActiveVoucherKey(VOUCHER_TYPES.TRANSFER)}
              size="small"
              type={activeVoucherKey === VOUCHER_TYPES.TRANSFER ? "primary" : "default"}
              icon={
                <TransferSVG
                  fill={activeVoucherKey === VOUCHER_TYPES.TRANSFER ? "#fff" : "#667085"}
                />
              }
            />
          </div>
        </Space>
      </Space>
      <div className="white_page">
        <TemplateLayout {...props} activeVoucher={activeVoucherKey}>
          {activeVoucherKey === VOUCHER_TYPES.ACCOMMODATION && (
            <HotelVoucher
              {...props}
              primaryColorWithOpacity={hexToHexWithAlpha(props?.primaryColor || "#1C5CA9", 0.1)}
              insideWhitePage={true}
            />
          )}
          {activeVoucherKey === VOUCHER_TYPES.EXPERIENCE && (
            <ExperienceVoucher
              {...props}
              primaryColorWithOpacity={hexToHexWithAlpha(props?.primaryColor || "#1C5CA9", 0.1)}
              insideWhitePage={true}
            />
          )}
          {activeVoucherKey === VOUCHER_TYPES.FLIGHT && (
            <FlightTicket
              {...props}
              primaryColorWithOpacity={hexToHexWithAlpha(props?.primaryColor || "#1C5CA9", 0.1)}
              insideWhitePage={true}
            />
          )}
          {activeVoucherKey === VOUCHER_TYPES.TRANSFER && (
            <TransferVoucher
              {...props}
              primaryColorWithOpacity={hexToHexWithAlpha(props?.primaryColor || "#1C5CA9", 0.1)}
              insideWhitePage={true}
            />
          )}
        </TemplateLayout>
      </div>
    </div>
  );
};

export default VoucherPreview;
