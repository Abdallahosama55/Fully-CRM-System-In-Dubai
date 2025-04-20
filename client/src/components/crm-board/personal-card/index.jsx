import { Avatar, Tabs } from "antd";
import "./styles.css";
import "./style.css";
import { CallSVG, EnvelopeRegularSVG, MeetingsPulsSVG } from "assets/jsx-svg";
import EditCustomerSVG from "assets/jsx-svg/EditCustomerSVG";
import { useState, useMemo } from "react";
import dayjs from "dayjs";
import { stringAvatar } from "utils/string";
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

function PersonalCard({
  isCompany,
  isShowingEdit = true,
  status,
  onEditStatus,
  onEditClicked,
  isShowingIcons = true,
  CustomerData,
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
        children: (
          <div>
            <div className="title-customer-item-info">
              <div className="title-customer-item">ID</div>
              <div className="address-info">{CustomerData?.customerID || "-"}</div>{" "}
            </div>
            <div className="title-customer-item-info">
              <div className="title-customer-item">Email</div>
              <div className="address-info">{CustomerData?.email}</div>{" "}
            </div>
            <div className="title-customer-item-info">
              <div className="title-customer-item">Contact Category</div>
              <div className="address-info">{CustomerData?.category?.name || "-"}</div>
            </div>
            <div className="title-customer-item-info">
              <div className="title-customer-item">Mobile No.</div>
              <div className="address-info">
                {CustomerData?.mobile ? CustomerData?.prefix + CustomerData?.mobile : "-"}
              </div>
            </div>
            <div className="title-customer-item-info">
              <div className="title-customer-item">Phone</div>
              <div className="address-info">{CustomerData?.telephone || "-"}</div>
            </div>
            {!isCompany && (
              <>
                <div className="title-customer-item-info">
                  <div className="title-customer-item">Nationality</div>
                  {CustomerData?.nationalities ? (
                    CustomerData?.nationalities?.map((item) => (
                      <div className="address-info" key={item.name}>
                        {item.name}
                      </div>
                    ))
                  ) : (
                    <div className="address-info">-</div>
                  )}
                </div>
                <div className="title-customer-item-info">
                  <div className="title-customer-item">Company Name</div>
                  <div className="address-info">{CustomerData?.companyName || "-"}</div>
                </div>
                <div className="title-customer-item-info">
                  <div className="title-customer-item">BOD</div>
                  <div className="address-info">
                    {CustomerData?.BOD ? dayjs(CustomerData?.BOD).format("YYYY-MM-DD") : "-"}
                  </div>
                </div>
              </>
            )}
            <div className="title-customer-item-info">
              <div className="title-customer-item">Responsible Employee</div>
              <div className="address-info">{CustomerData?.responsibleEmployee?.name || "-"}</div>
            </div>
          </div>
        ),
      },
      {
        key: "2",
        label: "Address",
        children: (
          <div>
            <div className="title-customer-item-info">
              <div className="title-customer-item">Country</div>
              <div className="address-info">{CustomerData?.countryLocation?.name || "-"}</div>
            </div>
            <div className="title-customer-item-info">
              <div className="title-customer-item">State</div>
              <div className="address-info">{CustomerData?.stateLocation?.name || "-"}</div>
            </div>

            <div className="title-customer-item-info">
              <div className="title-customer-item">City</div>
              <div className="address-info">{CustomerData?.cityLocation?.name || "-"}</div>
            </div>

            <div className="title-customer-item-info">
              <div className="title-customer-item">Street</div>
              <div className="address-info">{CustomerData?.street || "-"}</div>
            </div>
            <div className="title-customer-item-info">
              <div className="title-customer-item">Zip Code</div>
              <div className="address-info">{CustomerData?.zipCode || "-"}</div>
            </div>
          </div>
        ),
      },
    ],
    [CustomerData],
  );
  return (
    <div className="cem-personal-card">
      <div className="personal-details">
        {isShowingEdit && onEditClicked && (
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <span
              onClick={handleChangeStatus}
              style={{ color: accountStatus ? "green" : "red", cursor: "pointer" }}>
              {accountStatus ? "Active" : "Inactive"}
            </span>
            <span onClick={onEditClicked} style={{ cursor: "pointer", color: "#3a5ee3" }}>
              <span style={{ marginRight: 4 }}>
                <EditCustomerSVG />
              </span>
              Edit Info
            </span>
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
      <div>
        <Tabs defaultActiveKey="1" items={personalCardDetailsItems || defaultItems} />
      </div>
    </div>
  );
}

export default PersonalCard;
