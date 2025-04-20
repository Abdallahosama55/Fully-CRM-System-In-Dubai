import { Avatar, Button, Collapse, Flex, Tooltip, Typography } from "antd";
import "./styles.css";
import "./style.css";
import {
  BirthDateSVG,
  CallSVG,
  CitySVG,
  CountrySVG,
  EmailSVG,
  EnvelopeRegularSVG,
  JobPositionSVG,
  MeetingsPulsSVG,
  NationalitySVG,
  PhoneSVG,
  StateSVG,
  StreetSVG,
  ZipCodeSVG,
} from "assets/jsx-svg";
import EditCustomerSVG from "assets/jsx-svg/EditCustomerSVG";
import { useState, useMemo } from "react";
import dayjs from "dayjs";
import { stringAvatar } from "utils/string";
import Box from "components/Box";
import ContactType from "views/Customers/Overview/Components/ContactType";
const defaultItems = [
  {
    key: "1",
    label: <div>Lead Info</div>,
    children: (
      <div>
        <div className="address-title">Lead Owner</div>
        <div className="address-info">Fritsch Muhammad</div>
        <div className="address-title">Description</div>
        <div className="address-info">
          Quaerat Natus Reiciendis Natus Qui Similique Debitis Impedit Quia. Quod Dolores Ut. Non
          Aut Quo Quasi Eos Illum Dolore Voluptatem Rerum.
        </div>
        <div className="address-title">Annual Revenue</div>
        <div className="address-info">$10.000</div>
        <div className="address-title">Added Date & Time</div>
        <div className="address-info">June 21, 2023 12:02 PM</div>
      </div>
    ),
  },
  {
    key: "2",
    label: <div>Address</div>,
    children: (
      <div>
        <div className="address-title">Street</div>
        <div className="address-info">Mouth, North Glennie, West</div>
        <div className="address-title">City</div>
        <div className="address-info">West Rodrickville</div>
        <div className="address-title">State</div>
        <div className="address-info">Iowa</div>
        <div className="address-title">Country</div>
        <div className="address-info">Canada</div>
        <div className="address-title">Zip Code</div>
        <div className="address-info">21959</div>
      </div>
    ),
  },
];

function CustomerCard({
  isShowingEdit = true,
  status,
  onEditStatus,
  onEditClicked,
  isShowingIcons = true,
  CustomerData,
  isCompany,
  onSelectLead,
  isLoading,
}) {
  const [accountStatus, setAccountStatus] = useState(status);
  const handleChangeStatus = async () => {
    try {
      setAccountStatus((prev) => !prev);
      if (typeof onEditStatus === "function") await onEditStatus();
    } catch {
      setAccountStatus((prev) => !prev);
    }
  };

  const personalCardDetailsItems = useMemo(
    () => [
      {
        key: "1",
        label: "Personal info",
        style: {
          marginBottom: 24,
          background: "#00000005",
          borderRadius: 4,
          border: "none",
        },
        children: (
          <Box sx={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            <Item Icon={EmailSVG} title={CustomerData?.email}></Item>
            <Item
              Icon={PhoneSVG}
              title={
                CustomerData?.mobile ? CustomerData?.prefix + CustomerData?.mobile : "-"
              }></Item>
            <Item
              Icon={BirthDateSVG}
              title={
                CustomerData?.BOD ? dayjs(CustomerData?.BOD).format("YYYY-MM-DD") : "-"
              }></Item>
            <Item Icon={JobPositionSVG} title={CustomerData?.jobPosition?.title ?? "-"} />
            <Item
              Icon={NationalitySVG}
              title={
                CustomerData?.nationalities ? CustomerData?.nationalities?.[0]?.name ?? "-" : "-"
              }
            />
          </Box>
        ),
      },
      {
        key: "2",
        label: "Address",
        style: {
          marginBottom: 24,
          background: "#00000005",
          borderRadius: 4,
          border: "none",
        },
        children: (
          <Box sx={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            <Item Icon={CountrySVG} title={CustomerData?.countryLocation?.name || "-"} />
            <Item Icon={StateSVG} title={CustomerData?.stateLocation?.name || "-"} />
            <Item Icon={CitySVG} title={CustomerData?.cityLocation?.name || "-"} />
            <Item Icon={StreetSVG} title={CustomerData?.street || "-"} />
            <Item Icon={ZipCodeSVG} title={CustomerData?.zipCode ?? "-"} />
          </Box>
        ),
      },
      {
        key: "3",
        label: "Lead",
        style: {
          marginBottom: 24,
          background: "#00000005",
          borderRadius: 4,
          border: "none",
        },
        children: (
          <Box sx={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            {(CustomerData?.deals || []).map((item) => {
              return (
                <div
                  onClick={() => onSelectLead && onSelectLead(item.id)}
                  key={item.id}
                  className="title-customer-item-info">
                  <Box
                    sx={{
                      padding: "4px",
                      display: "flex",
                      flexDirection: "column",
                      gap: "2px",
                      textAlign: "left",
                      fontSize: "12px",
                    }}
                    key={item.id}>
                    <Typography.Text
                      style={{
                        color: "#2D5FEB",
                        fontSize: "12px",
                        fontWeight: 500,
                        cursor: "pointer",
                        textDecoration: "underline",
                      }}>
                      {item.title}
                    </Typography.Text>
                    <Typography.Text style={{ fontSize: "12px" }}>{item.budget}</Typography.Text>
                  </Box>
                </div>
              );
            })}
          </Box>
        ),
      },
    ],
    [CustomerData],
  );
  return (
    <div
      className="cem-personal-card"
      style={{
        borderRadius: "16px",
        boxShadow: "#efeff178 3px 0px 7px",
        border: "1px solid #EFEFF1",
      }}>
      <div className="personal-details">
        {isShowingEdit && onEditClicked && (
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <span
              onClick={handleChangeStatus}
              style={{ color: accountStatus ? "green" : "red", cursor: "pointer" }}>
              {accountStatus ? "Active" : "Inactive"}
            </span>
            <Button
              onClick={onEditClicked}
              size="small"
              icon={<EditCustomerSVG color="white" />}
              style={{
                cursor: "pointer",
                color: "white",
                background: "#0E7B43",
                borderRadius: "8px",
                padding: "4px 6px",
              }}>
              Edit
            </Button>
          </div>
        )}
        <div className="personal-img">
          <Avatar
            size={80}
            {...stringAvatar(CustomerData?.fullName || "")}
            src={CustomerData?.profileImage}
            style={{
              borderRadius: "50%",
              ...(stringAvatar(CustomerData?.fullName || "Jones Remington")?.style ?? {}),
            }}
          />
          {/* <Image fallback= preview={false} width={80} height={80} src={img}  /> */}
        </div>
        <div className="personal-name">{CustomerData?.fullName || "Jones Remington"}</div>
        {CustomerData?.jobPosition?.title && (
          <div className="personal-job-title">{CustomerData?.jobPosition?.title}</div>
        )}
        {isShowingIcons && (
          <div className="icons">
            <div>
              <CallSVG width={"10px"} height="10px" color={"#000"} />
            </div>
            <div>
              <EnvelopeRegularSVG />
            </div>
            <div>
              <MeetingsPulsSVG />
            </div>
          </div>
        )}
      </div>
      <Box
        sx={{
          marginTop: "16px",
          maxHeight: "calc(100vh - 220px)",
          overflowY: "auto",
          overflowX: "hidden",
          " &::-webkit-scrollbar": {
            display: "none",
          },
        }}>
        <Collapse
          className="common-customer-card-collapse"
          defaultActiveKey={["1", "2", "3"]}
          style={{
            border: "unset",
            fontSize: "12px",
            color: "#020714",
            background: "#F6F6FA",
          }}
          items={
            personalCardDetailsItems.filter((item) => {
              if ((CustomerData?.leads || [])?.length === 0) {
                return ["1", "2"].includes(item.key);
              }
              return true;
            }) || defaultItems
          }
        />
      </Box>
      <div style={{ paddingBlock: 15 }}>
        <ContactType record={CustomerData} borderRadius="none" padding="10px" width={"100%"} />
      </div>
    </div>
  );
}

const Item = ({ Icon, title }) => {
  return (
    <Flex gap={8} align="center" className="item-customer-info">
      <Icon></Icon>{" "}
      <Tooltip title={title}>
        <Typography.Text style={{ fontSize: "12px" }} className="information-text" ellipsis>
          {title}
        </Typography.Text>
      </Tooltip>
    </Flex>
  );
};

export default CustomerCard;
