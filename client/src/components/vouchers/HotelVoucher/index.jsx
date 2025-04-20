import dayjs from "dayjs";
import React, { useMemo } from "react";

const HotelVoucher = ({
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
                  {content?.confirmationNumber || "LB02610"}
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
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={16}
                  height={16}
                  viewBox="0 0 16 16"
                  fill="none">
                  <path
                    d="M14.6666 7.33338V13.3334H13.3333V11.3334H2.66659V13.3334H1.33325V2.66672H2.66659V9.33338H7.99992V4.66672H11.9999C12.7072 4.66672 13.3854 4.94767 13.8855 5.44777C14.3856 5.94786 14.6666 6.62614 14.6666 7.33338ZM5.33325 8.66672C4.80282 8.66672 4.29411 8.456 3.91904 8.08093C3.54397 7.70586 3.33325 7.19715 3.33325 6.66672C3.33325 6.13628 3.54397 5.62758 3.91904 5.2525C4.29411 4.87743 4.80282 4.66672 5.33325 4.66672C5.86369 4.66672 6.37239 4.87743 6.74747 5.2525C7.12254 5.62758 7.33325 6.13628 7.33325 6.66672C7.33325 7.19715 7.12254 7.70586 6.74747 8.08093C6.37239 8.456 5.86369 8.66672 5.33325 8.66672Z"
                    fill="white"
                    style={{
                      fill: "white",
                      fillOpacity: 1,
                    }}
                  />
                </svg>
              </td>
              <td>
                <p style={{ color: "#fff", paddingLeft: "8px" }}>Hotel Booking Details</p>
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
                            ? dayjs(content?.checkInDate, "DD-MM-YYYY").isValid()
                              ? dayjs(content?.checkInDate, "DD-MM-YYYY").format(
                                  "ddd, DD MMM, YYYY",
                                )
                              : content?.checkInDate
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
                        Hotel:
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
                          {content?.hotelName || "Sample Hotel"}
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
                          {content?.hotelAddress || "55 Princess Square London United Kingdom"}
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
                            ? dayjs(content?.checkOutDate, "DD-MM-YYYY").isValid()
                              ? dayjs(content?.checkOutDate, "DD-MM-YYYY").format(
                                  "ddd, DD MMM, YYYY",
                                )
                              : content?.checkOutDate
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
                        Number of rooms:
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
                          1
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
                        Number of adults:
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
                          {content?.adults || "4"}
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
                    <tr style={{ borderBottom: "8px solid rgba(0,0,0,0)" }}>
                      <td
                        style={{
                          fontSize: "12px",
                          fontWeight: "400",
                          lineHeight: "18px",
                          verticalAlign: "middle",
                        }}
                        width={"125px"}>
                        Meal:
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
                          {content?.pensionName?.replaceAll("_", " ") || "With Break fast"}
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
                        Room type:
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
                          {content?.roomType || "2 Twin Room"}
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
      {/* <div style={{ borderRadius: "16px", padding: "16px", background: "#FFF" }}>
        <p
          style={{
            fontSize: "14px",
            fontWeight: "600",
            lineHeight: "20px",
            marginBottom: "6px",
            color: primaryColor,
          }}>
          Notes
        </p>
        <p
          style={{
            fontSize: "12px",
            fontWeight: "400",
            lineHeight: "18px",
            color: "#314155",
          }}>
          All rooms are guaranteed on the day of arrival. In the case pf a no-show, your room(s)
          will be released and you will be subject to the terms & conditions of the
          cancellation/no-show policy specified at the time you made the booking as well as noted in
          the confirmation email.
        </p>
      </div> */}
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

export default HotelVoucher;
