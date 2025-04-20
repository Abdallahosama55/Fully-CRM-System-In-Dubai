import React from "react";

const TransferVoucher = ({
  insideWhitePage = false,
  primaryColor = "#1C5CA9",
  primaryColorWithOpacity = "#CAF1F4",
  secondaryColor = "#2F5BA4",
  isTemplate = true,
  data,
}) => {
  const content = {
    companyEmail: "voucher@gmail.com",
    companyPhone: "12345678",
    refId: "ATB0000000021",
    bookingDate: "Sun, Mar 9, 2025",
    departureDateTime: "Sun Mar 09, 2025, 02:09 PM",
    address: "FromGoroka Airport Airport  To Madang Airport Airport ",
    returnDateTime: "Mon Mar 10, 2025, 02:09 PM",
    from: "Goroka Airport Airport ",
    to: "Madang Airport Airport ",
    holderEmail: "abdqaddora732001@gmail.com",
    holderPhone: "0599676231",
    holderFullName: "abd Qaddora",
    confirmationNumber: "7j592fhu",
    supplierRefNo: "3320330",
    companyName: "Abrar supplier",
    companyImage:
      "https://chickchack.s3.eu-west-2.amazonaws.com/image/1726664355512travelio_logo_1.png",
    vehicleType: "Premium",
    vehicleBrand: "Jeep",
    vehicleModel: "Compass 2WD",
    vehicleyear: "2011",
    primaryColor: "#6453A9",
    secondPrimaryColor: "#6453A91A",
    secondaryColor: "#00B3BE",
    logo: "https://chickchack.s3.eu-west-2.amazonaws.com/image/1726664355512travelio_logo_1.png",
    meetingDetails: "this is a test",
    qrURL: "https://chickchack.s3.amazonaws.com/qr-codes/1741524605867qr_code_ATB0000000021.png",
    voucherUrl: null,
    bookingType: "TWO_WAY",
  };
  return (
    <div style={{ fontFamily: "Poppins" }}>
      <div
        style={{
          padding: insideWhitePage ? "0px " : "16px",
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
              EMAIL: {!isTemplate ? content?.companyEmail : "email@vbooking.io"}
            </td>
            <td
              style={{
                fontSize: "12px",
                fontWeight: "400",
                color: "#314155",
                paddingLeft: "24px",
                lineHeight: "18px",
              }}>
              Mobile: {!isTemplate ? content?.companyPhone : "+9701234567"}
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
                  {!isTemplate ? content?.refId : "LB02610"}
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
                  {!isTemplate ? content?.supplierRefNo : "BO01234567891"}
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
                  {!isTemplate ? content?.bookingDate : "Wed, 11 Sep, 2024"}
                </p>
              </div>
            </td>
          </tr>
        </table>
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
                  width="15"
                  height="10"
                  viewBox="0 0 15 10"
                  fill="none">
                  <path
                    d="M14.1344 3.11172C14.0659 3.02819 13.9637 2.97944 13.8565 2.97944H12.494C12.1578 2.09257 11.7197 1.22361 11.2218 0.895608C9.49936 -0.237541 4.93068 -0.237541 3.20823 0.895608C2.70996 1.22397 2.27371 2.094 1.93567 2.97944H0.57313C0.464872 2.97944 0.363067 3.02819 0.295317 3.11172C0.227208 3.19489 0.199964 3.30494 0.222189 3.41069L0.424007 4.38862C0.45842 4.55531 0.605392 4.67432 0.774948 4.67432H1.17858C0.788928 5.12386 0.600015 5.68989 0.597506 6.25629C0.594997 6.95604 0.860622 7.58839 1.34635 8.03577C1.35172 8.04043 1.3571 8.04366 1.36212 8.04832V9.41663C1.36212 9.71309 1.60301 9.95435 1.89982 9.95435H3.15661C3.45343 9.95435 3.69432 9.71309 3.69432 9.41663V8.86672H10.735V9.41663C10.735 9.71309 10.9759 9.95435 11.2727 9.95435H12.5295C12.8256 9.95435 13.0672 9.71309 13.0672 9.41663V8.0752C13.5827 7.60309 13.8289 6.95353 13.8322 6.30504C13.8343 5.71929 13.6368 5.13246 13.2242 4.67361H13.6547C13.825 4.67361 13.972 4.55459 14.0057 4.38754L14.2078 3.40997C14.2286 3.30494 14.2025 3.1956 14.1344 3.11172ZM3.79863 1.7936C5.17157 0.889872 9.25775 0.889872 10.63 1.7936C10.8967 1.96853 11.2397 2.67581 11.5541 3.54189H2.87522C3.18888 2.67617 3.53193 1.96925 3.79863 1.7936ZM2.19054 6.39108C2.19054 5.80676 2.66444 5.33357 3.24838 5.33357C3.83305 5.33357 4.30622 5.80676 4.30622 6.39108C4.30622 6.97539 3.83305 7.44894 3.24838 7.44894C2.66444 7.44894 2.19054 6.97539 2.19054 6.39108ZM11.1949 7.44894C10.611 7.44894 10.1371 6.97539 10.1371 6.39108C10.1371 5.80676 10.611 5.33357 11.1949 5.33357C11.7796 5.33357 12.2528 5.80676 12.2528 6.39108C12.2528 6.97539 11.7789 7.44894 11.1949 7.44894Z"
                    fill="white"
                    style={{ fill: "white", fillOpacity: 1 }}
                  />
                </svg>
              </td>
              <td>
                <p style={{ color: "#fff", paddingLeft: "8px" }}>Transfer Details</p>
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
                <td
                  width={"40px"}
                  style={{ verticalAlign: "top", paddingTop: "6px", paddingLeft: "6px" }}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={8}
                    height={69}
                    viewBox="0 0 8 69"
                    fill="none">
                    <path
                      d="M4 7.00009L4 65.0001"
                      stroke="#D0D5DD"
                      style={{
                        stroke: "#D0D5DD",
                        strokeOpacity: 1,
                      }}
                    />
                    <circle
                      cx={4}
                      cy={4.00009}
                      r={4}
                      fill={secondaryColor}
                      style={{
                        fill: secondaryColor,
                        fillOpacity: 1,
                      }}
                    />
                    <circle
                      cx={4}
                      cy={65.0001}
                      r={4}
                      fill={secondaryColor}
                      style={{
                        fill: secondaryColor,
                        fillOpacity: 1,
                      }}
                    />
                  </svg>
                </td>
                <td width={"50%"} style={{ verticalAlign: "top" }}>
                  <div>
                    <p
                      style={{
                        fontSize: "12px",
                        fontWeight: "400",
                        color: "#000",
                        lineHeight: "18px",
                      }}>
                      Pick-up
                    </p>
                    <p
                      style={{
                        fontSize: "12px",
                        fontWeight: "400",
                        color: "#000",
                        lineHeight: "18px",
                      }}>
                      {!isTemplate ? content?.departureDateTime : "Sun, 31 Oct 2024, 09:00 AM"}
                    </p>
                    <p
                      style={{
                        fontSize: "14px",
                        fontWeight: "600",
                        color: "#000",
                        lineHeight: "20px",
                        marginBottom: "8px",
                      }}>
                      {!isTemplate ? content?.from : "Dubai Airport (DXB)"}
                    </p>
                  </div>
                  <div>
                    <p
                      style={{
                        fontSize: "12px",
                        fontWeight: "400",
                        color: "#000",
                        lineHeight: "18px",
                      }}>
                      Drop-off
                    </p>
                    <p
                      style={{
                        fontSize: "12px",
                        fontWeight: "400",
                        color: "#000",
                        lineHeight: "18px",
                      }}>
                      {!isTemplate ? content?.returnDateTime : "Sun, 31 Oct 2024, 09:30 AM"}
                    </p>
                    <p
                      style={{
                        fontSize: "14px",
                        fontWeight: "600",
                        color: "#000",
                        lineHeight: "20px",
                      }}>
                      {!isTemplate ? content?.to : "Dubai Mall"}
                    </p>
                  </div>
                </td>
                <td style={{ verticalAlign: "top" }}>
                  {isTemplate && (
                    <>
                      <div style={{ marginBottom: "16px" }}>
                        <p
                          style={{
                            fontSize: "12px",
                            fontWeight: "400",
                            color: "#000",
                            lineHeight: "18px",
                          }}>
                          Transfer Distance (km)
                        </p>
                        <p
                          style={{
                            fontSize: "14px",
                            fontWeight: "600",
                            color: "#000",
                            lineHeight: "20px",
                          }}>
                          20 KM
                        </p>
                      </div>
                      <div>
                        <p
                          style={{
                            fontSize: "12px",
                            fontWeight: "400",
                            color: "#000",
                            lineHeight: "18px",
                          }}>
                          Transfer Duration
                        </p>
                        <p
                          style={{
                            fontSize: "14px",
                            fontWeight: "600",
                            color: "#000",
                            lineHeight: "20px",
                            marginBottom: "8px",
                          }}>
                          30 min
                        </p>
                      </div>
                    </>
                  )}
                </td>
              </tr>
            </table>
          </div>
        </div>
      </div>
      {isTemplate && (
        <div style={{ margin: "1rem 0" }}>
          <p
            style={{
              color: "#314155",
              fontSize: "12px",
              fontWeight: "700",
              lineHeight: "18px",
              marginBottom: "4px",
            }}>
            Vehicle Information
          </p>
          <table width="100%" cellSpacing="0" cellPadding="0" border="0">
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
                Vehicle Type
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
                Brand
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
                Model
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
                Year
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
                  {!isTemplate ? content?.vehicleType : "Economy"}
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
                  {!isTemplate ? content?.vehicleBrand : "Hyundai"}
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
                  {!isTemplate ? content?.vehicleModel : "ME-234567"}
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
                  {!isTemplate ? content?.vehicleyear : "2020"}
                </div>
              </td>
            </tr>
          </table>
        </div>
      )}
      <div style={{ margin: "1rem 0" }}>
        <p
          style={{
            color: "#314155",
            fontSize: "12px",
            fontWeight: "700",
            lineHeight: "18px",
            marginBottom: "4px",
          }}>
          Approval and Authorization
        </p>
        <table width="100%" cellSpacing="0" cellPadding="0" border="0">
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
              Prepared by
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
              Approved by
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
              Received By
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
                <p>Laila Adams</p>
                <p>31 Oct, 2024</p>
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
                <p>Laila Adams</p>
                <p>31 Oct, 2024</p>
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
                <p>Laila Adams</p>
                <p>31 Oct, 2024</p>
              </div>
            </td>
          </tr>
        </table>
      </div>
      <div
        style={{
          borderRadius: "16px",
          padding: insideWhitePage ? "0px " : "16px",
          background: "#FFF",
        }}>
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
          {!isTemplate
            ? content?.meetingDetails
            : `All rooms are guaranteed on the day of arrival. In the case pf a no-show, your room(s)
          will be released and you will be subject to the terms & conditions of the
          cancellation/no-show policy specified at the time you made the booking as well as noted in
          the confirmation email.`}
        </p>
      </div>
      {isTemplate && (
        <div
          style={{
            borderRadius: "16px",
            padding: insideWhitePage ? "0px " : "16px",
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
              "https://media.licdn.com/dms/image/v2/C4E12AQF8iAalo2py8w/article-cover_image-shrink_600_2000/article-cover_image-shrink_600_2000/0/1520128109388?e=2147483647&v=beta&t=N7We0uCE385hiUDX1h3Sd-lcdY-GDdalk_Et68Yczw8"
            }
            alt={"location"}
            width={"100%"}
            style={{ objectFit: "cover", height: "200px" }}
          />
        </div>
      )}
    </div>
  );
};

export default TransferVoucher;
