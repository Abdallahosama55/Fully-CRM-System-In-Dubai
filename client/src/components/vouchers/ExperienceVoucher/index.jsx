import dayjs from "dayjs";
import React, { useMemo } from "react";

const ExperienceVoucher = ({
  data,
  insideWhitePage = false,
  primaryColor = "#1C5CA9",
  primaryColorWithOpacity = "#CAF1F4",
  secondaryColor = "#2F5BA4",
}) => {
  const content = useMemo(() => data?.content || {}, [data]);
  return (
    <div style={{ fontFamily: "Poppins" }}>
      <div
        style={{
          padding: insideWhitePage ? "0px" : "16px",
          background: "#fff",
          borderBottomLeftRadius: "8px",
          borderBottomRightRadius: "8px",
        }}>
        <table>
          <tr>
            <td
              style={{
                fontSize: "12px",
                fontWeight: "400",
                color: "#314155",
                lineHeight: "18px",
              }}>
              EMAIL: {content?.companyEmail || "email@vbooking.io"}
            </td>
            <td
              style={{
                fontSize: "12px",
                fontWeight: "400",
                color: "#314155",
                paddingLeft: "24px",
                lineHeight: "18px",
              }}>
              Mobile: {content?.companyPhone || "+9701234567"}
            </td>
          </tr>
        </table>
        <div
          style={{
            height: "1px",
            width: "100%",
            background: "#CCD5DF",
            margin: "8px 0",
          }}></div>
        <table width={"80%"}>
          <tr>
            <td>
              <div>
                <p
                  style={{
                    fontSize: "12px",
                    fontWeight: "400",
                    color: "#314155",
                    lineHeight: "18px",
                  }}>
                  BOOKING ID
                </p>
                <p
                  style={{
                    fontSize: "14px",
                    fontWeight: "600",
                    color: "#000",
                    lineHeight: "20px",
                  }}>
                  {data?.bookingId || "LB02610"}
                </p>
              </div>
            </td>
            <td>
              <div>
                <p
                  style={{
                    fontSize: "12px",
                    fontWeight: "400",
                    color: "#314155",
                    lineHeight: "18px",
                  }}>
                  SUPPLIER REF. NO.
                </p>
                <p
                  style={{
                    fontSize: "14px",
                    fontWeight: "600",
                    color: "#000",
                    lineHeight: "20px",
                  }}>
                  {content?.supplierRefNo || "BO01234567891"}
                </p>
              </div>
            </td>
            <td>
              <div>
                <p
                  style={{
                    fontSize: "12px",
                    fontWeight: "400",
                    color: "#314155",
                    lineHeight: "18px",
                  }}>
                  ISSUED
                </p>
                <p
                  style={{
                    fontSize: "14px",
                    fontWeight: "600",
                    color: "#000",
                    lineHeight: "20px",
                  }}>
                  {content?.bookingDate || "Wed, 11 Sep, 2024"}
                </p>
              </div>
            </td>
          </tr>
        </table>
        <div style={{ marginTop: "16px" }}>
          <p
            style={{
              fontSize: "12px",
              fontWeight: "400",
              color: "#314155",
              lineHeight: "18px",
            }}>
            GUEST NAME
          </p>
          <p
            style={{
              fontSize: "14px",
              fontWeight: "600",
              color: "#000",
              lineHeight: "20px",
            }}>
            {content?.guestNames?.join(", ") ||
              "MR John Doe, MRS John Doe, MR John Doe ( 8 years old), MR Doe Nash, MRS Doe Nash, MR Doe Nash ( 7 years old)."}
          </p>
        </div>
      </div>
      <div style={{ margin: "1rem 0" }}>
        <div
          style={{
            background: primaryColor,
            padding: "4px 24px",
            borderTopLeftRadius: "6px",
            borderTopRightRadius: "6px",
            height: "30px",
          }}>
          <table>
            <tr>
              <td style={{ verticalAlign: "middle" }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="white">
                  <g fill="white" clipPath="url(#a)">
                    <path
                      d="M9.319 4.27A4.993 4.993 0 0 1 5.457.41a.514.514 0 0 0-1.007 0A4.993 4.993 0 0 1 .588 4.27a.514.514 0 0 0 0 1.006A4.993 4.993 0 0 1 4.45 9.14a.514.514 0 0 0 1.007 0 4.993 4.993 0 0 1 3.862-3.862.514.514 0 0 0 0-1.006ZM8.469 12.765a2.353 2.353 0 0 1-1.82-1.82.514.514 0 0 0-1.007 0 2.353 2.353 0 0 1-1.82 1.82.514.514 0 0 0 0 1.007 2.353 2.353 0 0 1 1.82 1.82.514.514 0 0 0 1.007 0 2.353 2.353 0 0 1 1.82-1.82.514.514 0 0 0 0-1.007ZM15.412 8.004a3.18 3.18 0 0 1-2.46-2.46.514.514 0 0 0-1.006 0 3.18 3.18 0 0 1-2.46 2.46.514.514 0 0 0 0 1.006 3.18 3.18 0 0 1 2.46 2.46.514.514 0 0 0 1.007 0 3.18 3.18 0 0 1 2.46-2.46.514.514 0 0 0 0-1.006Z"
                      style={{ fill: "white", fillOpacity: 1 }}></path>
                  </g>
                  <defs>
                    <clipPath id="a">
                      <path
                        fill="#fff"
                        d="M0 0h16v16H0z"
                        style={{ fill: "rgb(255, 255, 255)", fillOpacity: 1 }}></path>
                    </clipPath>
                  </defs>
                </svg>
              </td>
              <td>
                <p style={{ color: "#fff", paddingLeft: "8px" }}>Experience Booking Details</p>
              </td>
            </tr>
          </table>
        </div>
        <div>
          <div
            style={{
              background: primaryColorWithOpacity,
              borderBottomLeftRadius: "6px",
              borderBottomRightRadius: "6px",
              padding: "16px",
            }}>
            <table width={"100%"}>
              <tr>
                <td width={"50%"}>
                  <table width={"100%"}>
                    <tr>
                      <td
                        style={{
                          fontSize: "12px",
                          fontWeight: "400",
                          lineHeight: "18px",
                          verticalAlign: "top",
                        }}
                        width={"95px"}>
                        Check in
                      </td>
                      <td
                        style={{
                          fontSize: "14px",
                          fontWeight: "600",
                          lineHeight: "20px",
                          verticalAlign: "top",
                        }}>
                        <p style={{ paddingBottom: "8px" }}>
                          {content?.checkInDate
                            ? dayjs(content?.checkInDate).format("ddd, DD MMM, YYYY")
                            : "Wed, 14 Sep, 2024"}
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td
                        style={{
                          fontSize: "12px",
                          fontWeight: "400",
                          lineHeight: "18px",
                          verticalAlign: "top",
                        }}
                        width={"95px"}>
                        Experience:
                      </td>
                      <td style={{ verticalAlign: "top" }}>
                        <p
                          style={{
                            fontSize: "14px",
                            fontWeight: "600",
                            lineHeight: "20px",
                            background: "#fff",
                            padding: "4px 8px",
                            minHeight: "78px",
                            marginBottom: "8px",
                            borderRadius: "8px",
                            border: "1px solid #005EAF",
                          }}>
                          {content?.experianceName || "Experiance"}
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td
                        style={{
                          fontSize: "12px",
                          fontWeight: "400",
                          lineHeight: "18px",
                          verticalAlign: "top",
                        }}
                        width={"95px"}>
                        Address:
                      </td>
                      <td style={{ verticalAlign: "top" }}>
                        <p
                          style={{
                            fontSize: "14px",
                            fontWeight: "600",
                            lineHeight: "20px",
                            background: "#fff",
                            padding: "4px 8px",
                            minHeight: "80px",
                            marginBottom: "8px",
                            borderRadius: "8px",
                            border: "1px solid #005EAF",
                          }}>
                          {content?.experianceAddress || "London United Kingdom"}
                        </p>
                      </td>
                    </tr>
                  </table>
                </td>
                <td width={"50%"} style={{ verticalAlign: "top", paddingLeft: "26px" }}>
                  <table width={"100%"}>
                    <tr>
                      <td
                        style={{
                          fontSize: "12px",
                          fontWeight: "400",
                          lineHeight: "18px",
                          verticalAlign: "top",
                        }}
                        width={"125px"}>
                        Check out
                      </td>
                      <td
                        style={{
                          fontSize: "14px",
                          fontWeight: "600",
                          lineHeight: "20px",
                          verticalAlign: "top",
                        }}>
                        <p style={{ paddingBottom: "8px" }}>
                          {" "}
                          {content?.checkOutDate
                            ? dayjs(content?.checkOutDate).format("ddd, DD MMM, YYYY")
                            : "Wed, 20 Sep, 2024"}
                        </p>
                      </td>
                    </tr>
                    <tr style={{ borderBottom: "8px solid rgba(0,0,0,0)" }}>
                      <td
                        style={{
                          fontSize: "12px",
                          fontWeight: "400",
                          lineHeight: "18px",
                          verticalAlign: "middle",
                        }}
                        width={"125px"}>
                        Number of children:
                      </td>
                      <td
                        style={{
                          fontSize: "14px",
                          fontWeight: "600",
                          lineHeight: "20px",
                          verticalAlign: "top",
                        }}>
                        <p
                          style={{
                            paddingBottom: "8px",
                            background: "#fff",
                            padding: "4px 8px",
                            borderRadius: "8px",
                            border: "1px solid #005EAF",
                          }}>
                          {content?.adults || "1"}
                        </p>
                      </td>
                    </tr>
                    <tr style={{ borderBottom: "8px solid rgba(0,0,0,0)" }}>
                      <td
                        style={{
                          fontSize: "12px",
                          fontWeight: "400",
                          lineHeight: "18px",
                          verticalAlign: "middle",
                        }}
                        width={"125px"}>
                        Number of children:
                      </td>
                      <td
                        style={{
                          fontSize: "14px",
                          fontWeight: "600",
                          lineHeight: "20px",
                          verticalAlign: "top",
                        }}>
                        <p
                          style={{
                            paddingBottom: "8px",
                            background: "#fff",
                            padding: "4px 8px",
                            borderRadius: "8px",
                            border: "1px solid #005EAF",
                          }}>
                          {content?.childrenNumber || "0"}
                        </p>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
          </div>
        </div>
      </div>
      <div
        style={{
          borderRadius: "16px",
          padding: insideWhitePage ? "0px" : "16px",
          background: "#FFF",
          margin: "1rem 0",
        }}>
        <p
          style={{
            fontSize: "14px",
            fontWeight: "600",
            lineHeight: "20px",
            marginBottom: "6px",
            color: primaryColor,
          }}>
          Map
        </p>
        <img
          src={
            content?.imageUrl ||
            "https://media.licdn.com/dms/image/v2/C4E12AQF8iAalo2py8w/article-cover_image-shrink_600_2000/article-cover_image-shrink_600_2000/0/1520128109388?e=2147483647&v=beta&t=N7We0uCE385hiUDX1h3Sd-lcdY-GDdalk_Et68Yczw8"
          }
          alt={"location"}
          style={{ objectFit: "cover", height: "250px", width: "102%" }}
        />
      </div>
    </div>
  );
};

export default ExperienceVoucher;
