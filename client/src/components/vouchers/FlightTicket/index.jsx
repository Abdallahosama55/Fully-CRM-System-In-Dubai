import React, { useMemo } from "react";
import mock_flight_company_logo from "assets/images/mock_flight_company_logo.png";
const FlightTicket = ({
  insideWhitePage = false,
  primaryColor = "#1C5CA9",
  primaryColorWithOpacity = "#CAF1F4",
  secondaryColor = "#2F5BA4",
  data,
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
                  PREPARED FOR
                </p>
                <p
                  style={{
                    fontSize: "14px",
                    fontWeight: "600",
                    color: "#000",
                    lineHeight: "20px",
                  }}>
                  {Array.isArray(content?.passengers) && content?.passengers?.length > 0
                    ? content?.passengers[0]?.fullName
                    : "MR John Doe"}
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
                  BOOKING REFERENCE
                </p>
                <p
                  style={{
                    fontSize: "14px",
                    fontWeight: "600",
                    color: "#000",
                    lineHeight: "20px",
                  }}>
                  {content?.refId || "BO01234567891"}
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
                  CONFIRMATION NUMBER
                </p>
                <p
                  style={{
                    fontSize: "14px",
                    fontWeight: "600",
                    color: "#000",
                    lineHeight: "20px",
                  }}>
                  {content?.confirmationNumber || "TN01234567891"}
                </p>
              </div>
            </td>
          </tr>
        </table>
      </div>
      <table width="100%" cellSpacing="0" cellPadding="0" border="0" style={{ margin: "1rem 0" }}>
        <tr>
          <td width="25%">
            <div style={{ height: "220px" }}>
              <div
                style={{
                  background: primaryColor,
                  padding: "4px 24px",
                  borderTopLeftRadius: "6px",
                  height: "30px",
                }}>
                <table>
                  <tr>
                    <td style={{ verticalAlign: "middle" }}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="15"
                        height="15"
                        viewBox="0 0 15 15"
                        fill="none">
                        <g clipPath="url(#clip0_27_172)">
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M12.8137 0.647903C12.4029 0.647903 12.0088 0.811114 11.7183 1.10163L9.86227 2.95767C9.70289 3.11705 9.47158 3.18112 9.25292 3.12646L1.90537 1.28957L1.25155 1.94339C1.00097 2.19398 1.00097 2.60026 1.25155 2.85085C1.30032 2.89961 1.35663 2.9402 1.41832 2.97104L7.03871 5.78124L4.47204 8.3479H1.66028C1.41723 8.3479 1.19505 8.48522 1.08635 8.70261L0.62204 9.63124L3.18871 10.9146L4.47204 13.4812L5.40067 13.0169C5.61805 12.9082 5.75537 12.686 5.75537 12.443V9.63124L8.32204 7.06457L11.1322 12.685C11.2907 13.0019 11.6762 13.1304 11.9931 12.9719C12.0548 12.9411 12.1111 12.9005 12.1599 12.8517L12.8137 12.1979L10.9768 4.85036C10.9222 4.6317 10.9862 4.40039 11.1456 4.24101L13.0016 2.38496C13.2922 2.09445 13.4554 1.70042 13.4554 1.28957C13.4554 0.935187 13.1681 0.647903 12.8137 0.647903Z"
                            fill="white"
                            // style="fill:white;fill-opacity:1;"
                            style={{ fill: "white", fillOpacity: 1 }}
                          />
                        </g>
                        <defs>
                          <clipPath id="clip0_27_172">
                            <rect
                              width="14"
                              height="14"
                              style={{ fill: "white", fillOpacity: 1 }}
                              fill="white"
                              //   style="fill:white;fill-opacity:1;"
                              transform="translate(0.0386963 0.0645752)"
                            />
                          </clipPath>
                        </defs>
                      </svg>
                    </td>
                    <td>
                      <p style={{ color: "#fff", paddingLeft: "8px" }}>FLIGHT E-TICKET</p>
                    </td>
                  </tr>
                </table>
              </div>
              <div
                style={{
                  background: primaryColorWithOpacity,
                  height: "190px",
                  borderBottomLeftRadius: "6px",
                  padding: "16px",
                }}>
                <img
                  src={mock_flight_company_logo}
                  alt="logo"
                  height="14px"
                  style={{ objectFit: "contain", marginBottom: "2px" }}
                />
                <p
                  style={{
                    fontSize: "12px",
                    fontWeight: "400",
                    color: "#314155",
                    lineHeight: "18px",
                  }}>
                  FLIGHT NUMBER
                </p>
                <p
                  style={{
                    fontSize: "14px",
                    fontWeight: "600",
                    color: "#000",
                    lineHeight: "20px",
                    marginBottom: "8px",
                  }}>
                  {content?.outboundFlightNo || "PR 452"}
                </p>
                <p
                  style={{
                    fontSize: "12px",
                    fontWeight: "400",
                    color: "#314155",
                    lineHeight: "18px",
                  }}>
                  DURATION
                </p>
                <p
                  style={{
                    fontSize: "14px",
                    fontWeight: "600",
                    color: "#000",
                    lineHeight: "20px",
                    marginBottom: "8px",
                  }}>
                  {content?.outboundFlightDuration || "1 hour 50 min"}
                </p>
                {/* <p
                  style={{
                    fontSize: "12px",
                    fontWeight: "400",
                    color: "#314155",
                    lineHeight: "18px",
                  }}>
                  CLASS
                </p>
                <p
                  style={{
                    fontSize: "14px",
                    fontWeight: "600",
                    color: "#000",
                    lineHeight: "20px",
                    marginBottom: "8px",
                  }}>
                  Economy (V)
                </p> */}
              </div>
            </div>
          </td>
          <td width="1px" style={{ padding: "0 6px" }}>
            <div style={{ borderLeft: "1px dashed #005EAF", height: "220px" }}></div>
          </td>
          <td>
            <div style={{ height: "220px" }}>
              <div
                style={{
                  background: primaryColor,
                  padding: "4px 24px",
                  borderTopRightRadius: "6px",
                  height: "30px",
                }}>
                <p style={{ color: "#fff", textAlign: "center" }}>
                  OUTBOUND FLIGHT:{" "}
                  <span style={{ fontWeight: 700 }}>
                    {content?.outboundFlightDate || "Wed., 27. Sep. 2024."}
                  </span>
                </p>
              </div>
              <div
                style={{
                  background: primaryColorWithOpacity,
                  height: "190px",
                  borderBottomRightRadius: "6px",
                  padding: "16px",
                }}>
                <table>
                  <tr>
                    <td>
                      <div style={{ marginRight: "40px" }}>
                        <p
                          style={{
                            fontSize: "12px",
                            fontWeight: "400",
                            color: "#314155",
                            lineHeight: "18px",
                          }}>
                          {content?.outboundFlightFromAirPortCode || "GES"}
                        </p>
                        <p
                          style={{
                            fontSize: "14px",
                            fontWeight: "600",
                            color: "#000",
                            lineHeight: "20px",
                            marginBottom: "8px",
                          }}>
                          {content?.outboundFlightFromAirPort || "General Santos"}
                        </p>
                        <p
                          style={{
                            fontSize: "12px",
                            fontWeight: "400",
                            color: "#314155",
                            lineHeight: "18px",
                          }}>
                          Departing
                        </p>
                        <p
                          style={{
                            fontSize: "14px",
                            fontWeight: "600",
                            color: "#000",
                            lineHeight: "20px",
                            marginBottom: "8px",
                          }}>
                          {content?.outboundFlightDepartureTime || "11:10"}
                        </p>
                        {/* <p
                          style={{
                            fontSize: "12px",
                            fontWeight: "400",
                            color: "#314155",
                            lineHeight: "18px",
                          }}>
                          Terminal
                        </p>
                        <p
                          style={{
                            fontSize: "14px",
                            fontWeight: "600",
                            color: "#000",
                            lineHeight: "20px",
                            marginBottom: "8px",
                          }}>
                          N/A
                        </p> */}
                      </div>
                    </td>
                    <td>
                      <div style={{ marginLeft: "40px" }}>
                        <p
                          style={{
                            fontSize: "12px",
                            fontWeight: "400",
                            color: "#314155",
                            lineHeight: "18px",
                          }}>
                          {content?.outboundFlightToAirPortCode || "MNL"}
                        </p>
                        <p
                          style={{
                            fontSize: "14px",
                            fontWeight: "600",
                            color: "#000",
                            lineHeight: "20px",
                            marginBottom: "8px",
                          }}>
                          {content?.outboundFlightToAirPort || "Manila"}
                        </p>
                        <p
                          style={{
                            fontSize: "12px",
                            fontWeight: "400",
                            color: "#314155",
                            lineHeight: "18px",
                          }}>
                          Arriving
                        </p>
                        <p
                          style={{
                            fontSize: "14px",
                            fontWeight: "600",
                            color: "#000",
                            lineHeight: "20px",
                            marginBottom: "8px",
                          }}>
                          {content?.outboundFlightArrivalTime || "13:10"}
                        </p>
                        {/* <p
                          style={{
                            fontSize: "12px",
                            fontWeight: "400",
                            color: "#314155",
                            lineHeight: "18px",
                          }}>
                          Terminal
                        </p>
                        <p
                          style={{
                            fontSize: "14px",
                            fontWeight: "600",
                            color: "#000",
                            lineHeight: "20px",
                            marginBottom: "8px",
                          }}>
                          N/A
                        </p> */}
                      </div>
                    </td>
                  </tr>
                </table>
              </div>
            </div>
          </td>
        </tr>
      </table>
      {content?.returnFlightNo && (
        <table width="100%" cellSpacing="0" cellPadding="0" border="0" style={{ margin: "1rem 0" }}>
          <tr>
            <td width="25%">
              <div style={{ height: "220px" }}>
                <div
                  style={{
                    background: primaryColor,
                    padding: "4px 24px",
                    borderTopLeftRadius: "6px",
                    height: "30px",
                  }}>
                  <table>
                    <tr>
                      <td style={{ verticalAlign: "middle" }}>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="15"
                          height="15"
                          viewBox="0 0 15 15"
                          fill="none">
                          <g clipPath="url(#clip0_27_172)">
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M12.8137 0.647903C12.4029 0.647903 12.0088 0.811114 11.7183 1.10163L9.86227 2.95767C9.70289 3.11705 9.47158 3.18112 9.25292 3.12646L1.90537 1.28957L1.25155 1.94339C1.00097 2.19398 1.00097 2.60026 1.25155 2.85085C1.30032 2.89961 1.35663 2.9402 1.41832 2.97104L7.03871 5.78124L4.47204 8.3479H1.66028C1.41723 8.3479 1.19505 8.48522 1.08635 8.70261L0.62204 9.63124L3.18871 10.9146L4.47204 13.4812L5.40067 13.0169C5.61805 12.9082 5.75537 12.686 5.75537 12.443V9.63124L8.32204 7.06457L11.1322 12.685C11.2907 13.0019 11.6762 13.1304 11.9931 12.9719C12.0548 12.9411 12.1111 12.9005 12.1599 12.8517L12.8137 12.1979L10.9768 4.85036C10.9222 4.6317 10.9862 4.40039 11.1456 4.24101L13.0016 2.38496C13.2922 2.09445 13.4554 1.70042 13.4554 1.28957C13.4554 0.935187 13.1681 0.647903 12.8137 0.647903Z"
                              fill="white"
                              // style="fill:white;fill-opacity:1;"
                              style={{ fill: "white", fillOpacity: 1 }}
                            />
                          </g>
                          <defs>
                            <clipPath id="clip0_27_172">
                              <rect
                                width="14"
                                height="14"
                                style={{ fill: "white", fillOpacity: 1 }}
                                fill="white"
                                //   style="fill:white;fill-opacity:1;"
                                transform="translate(0.0386963 0.0645752)"
                              />
                            </clipPath>
                          </defs>
                        </svg>
                      </td>
                      <td>
                        <p style={{ color: "#fff", paddingLeft: "8px" }}>FLIGHT E-TICKET</p>
                      </td>
                    </tr>
                  </table>
                </div>
                <div
                  style={{
                    background: primaryColorWithOpacity,
                    height: "190px",
                    borderBottomLeftRadius: "6px",
                    padding: "16px",
                  }}>
                  <img
                    src={mock_flight_company_logo}
                    alt="logo"
                    height="14px"
                    style={{ objectFit: "contain", marginBottom: "2px" }}
                  />
                  <p
                    style={{
                      fontSize: "12px",
                      fontWeight: "400",
                      color: "#314155",
                      lineHeight: "18px",
                    }}>
                    FLIGHT NUMBER
                  </p>
                  <p
                    style={{
                      fontSize: "14px",
                      fontWeight: "600",
                      color: "#000",
                      lineHeight: "20px",
                      marginBottom: "8px",
                    }}>
                    {content?.returnFlightNo || "PR 452"}
                  </p>
                  <p
                    style={{
                      fontSize: "12px",
                      fontWeight: "400",
                      color: "#314155",
                      lineHeight: "18px",
                    }}>
                    DURATION
                  </p>
                  <p
                    style={{
                      fontSize: "14px",
                      fontWeight: "600",
                      color: "#000",
                      lineHeight: "20px",
                      marginBottom: "8px",
                    }}>
                    {content?.returnFlightDuration || "1 hour 50 min"}
                  </p>
                  {/* <p
                  style={{
                    fontSize: "12px",
                    fontWeight: "400",
                    color: "#314155",
                    lineHeight: "18px",
                  }}>
                  CLASS
                </p>
                <p
                  style={{
                    fontSize: "14px",
                    fontWeight: "600",
                    color: "#000",
                    lineHeight: "20px",
                    marginBottom: "8px",
                  }}>
                  Economy (V)
                </p> */}
                </div>
              </div>
            </td>
            <td width="1px" style={{ padding: "0 6px" }}>
              <div style={{ borderLeft: "1px dashed #005EAF", height: "220px" }}></div>
            </td>
            <td>
              <div style={{ height: "220px" }}>
                <div
                  style={{
                    background: primaryColor,
                    padding: "4px 24px",
                    borderTopRightRadius: "6px",
                    height: "30px",
                  }}>
                  <p style={{ color: "#fff", textAlign: "center" }}>
                    RETURN FLIGHT:{" "}
                    <span style={{ fontWeight: 700 }}>
                      {content?.returnFlightDate || "Wed., 27. Sep. 2024."}
                    </span>
                  </p>
                </div>
                <div
                  style={{
                    background: primaryColorWithOpacity,
                    height: "190px",
                    borderBottomRightRadius: "6px",
                    padding: "16px",
                  }}>
                  <table>
                    <tr>
                      <td>
                        <div style={{ marginRight: "40px" }}>
                          <p
                            style={{
                              fontSize: "12px",
                              fontWeight: "400",
                              color: "#314155",
                              lineHeight: "18px",
                            }}>
                            {content?.returnFlightFromAirPortCode || "GES"}
                          </p>
                          <p
                            style={{
                              fontSize: "14px",
                              fontWeight: "600",
                              color: "#000",
                              lineHeight: "20px",
                              marginBottom: "8px",
                            }}>
                            {content?.returnFlightFromAirPort || "General Santos"}
                          </p>
                          <p
                            style={{
                              fontSize: "12px",
                              fontWeight: "400",
                              color: "#314155",
                              lineHeight: "18px",
                            }}>
                            Departing
                          </p>
                          <p
                            style={{
                              fontSize: "14px",
                              fontWeight: "600",
                              color: "#000",
                              lineHeight: "20px",
                              marginBottom: "8px",
                            }}>
                            {content?.returnFlightDepartureTime || "11:10"}
                          </p>
                          {/* <p
                          style={{
                            fontSize: "12px",
                            fontWeight: "400",
                            color: "#314155",
                            lineHeight: "18px",
                          }}>
                          Terminal
                        </p>
                        <p
                          style={{
                            fontSize: "14px",
                            fontWeight: "600",
                            color: "#000",
                            lineHeight: "20px",
                            marginBottom: "8px",
                          }}>
                          N/A
                        </p> */}
                        </div>
                      </td>
                      <td>
                        <div style={{ marginLeft: "40px" }}>
                          <p
                            style={{
                              fontSize: "12px",
                              fontWeight: "400",
                              color: "#314155",
                              lineHeight: "18px",
                            }}>
                            {content?.returnFlightToAirPortCode || "MNL"}
                          </p>
                          <p
                            style={{
                              fontSize: "14px",
                              fontWeight: "600",
                              color: "#000",
                              lineHeight: "20px",
                              marginBottom: "8px",
                            }}>
                            {content?.returnFlightToAirPort || "Manila"}
                          </p>
                          <p
                            style={{
                              fontSize: "12px",
                              fontWeight: "400",
                              color: "#314155",
                              lineHeight: "18px",
                            }}>
                            Arriving
                          </p>
                          <p
                            style={{
                              fontSize: "14px",
                              fontWeight: "600",
                              color: "#000",
                              lineHeight: "20px",
                              marginBottom: "8px",
                            }}>
                            {content?.returnFlightArrivalTime || "13:10"}
                          </p>
                          {/* <p
                          style={{
                            fontSize: "12px",
                            fontWeight: "400",
                            color: "#314155",
                            lineHeight: "18px",
                          }}>
                          Terminal
                        </p>
                        <p
                          style={{
                            fontSize: "14px",
                            fontWeight: "600",
                            color: "#000",
                            lineHeight: "20px",
                            marginBottom: "8px",
                          }}>
                          N/A
                        </p> */}
                        </div>
                      </td>
                    </tr>
                  </table>
                </div>
              </div>
            </td>
          </tr>
        </table>
      )}
      <table width="100%" cellSpacing="0" cellPadding="0" border="0" style={{ margin: "1rem 0" }}>
        <tr>
          <td
            width={"25%"}
            style={{
              background: secondaryColor,
              color: "#fff",
              padding: "6px",
              fontSize: "12px",
              fontWeight: "400",
              lineHeight: "18px",
              borderTopLeftRadius: "8px",
            }}>
            Confirmation Number
          </td>
          <td
            width={"25%"}
            style={{
              background: secondaryColor,
              color: "#fff",
              padding: "6px",
              fontSize: "12px",
              fontWeight: "400",
              lineHeight: "18px",
            }}>
            Airline Booking Ref
          </td>
          <td
            width={"25%"}
            style={{
              background: secondaryColor,
              color: "#fff",
              padding: "6px",
              fontSize: "12px",
              fontWeight: "400",
              lineHeight: "18px",
            }}>
            Name
          </td>
          <td
            width={"25%"}
            style={{
              background: secondaryColor,
              color: "#fff",
              padding: "6px",
              fontSize: "12px",
              fontWeight: "400",
              lineHeight: "18px",
              borderTopRightRadius: "8px",
            }}>
            Status
          </td>
        </tr>
        <tr>
          <td width={"25%"}>
            <div
              style={{
                border: `1px solid ${secondaryColor}`,
                padding: "6px",
                fontSize: "14px",
                fontWeight: "600",
                lineHeight: "20px",
                borderBottomLeftRadius: "8px",
              }}>
              {content?.confirmationNumber || "TN01234567891"}
            </div>
          </td>
          <td width={"25%"}>
            <div
              style={{
                border: `1px solid ${secondaryColor}`,
                padding: "6px",
                fontSize: "14px",
                fontWeight: "600",
                lineHeight: "20px",
              }}>
              {content?.refId || "BO01234567891"}
            </div>
          </td>
          <td width={"25%"}>
            <div
              style={{
                border: `1px solid ${secondaryColor}`,
                padding: "6px",
                fontSize: "14px",
                fontWeight: "600",
                lineHeight: "20px",
              }}>
              {Array.isArray(content?.passengers) && content?.passengers?.length > 0
                ? content?.passengers[0]?.fullName
                : "MR John Doe"}
            </div>
          </td>
          <td width={"25%"}>
            <div
              style={{
                border: `1px solid ${secondaryColor}`,
                padding: "6px",
                fontSize: "14px",
                fontWeight: "600",
                lineHeight: "20px",
                borderBottomRightRadius: "8px",
              }}>
              --
            </div>
          </td>
        </tr>
      </table>
    </div>
  );
};
export default FlightTicket;
