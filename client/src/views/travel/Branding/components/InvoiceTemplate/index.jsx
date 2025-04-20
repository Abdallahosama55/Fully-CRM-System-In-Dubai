import React from "react";
// style
import "./styles.css";
/*

{
    "totalPrice": 1217.7,
    "price": 1217.7,
    "amount": 1,
    "unit": 1,
}
 */
const InvoiceTemplate = ({ withData = false, logo, waterMark, primaryColor, secondaryColor, ...props }) => {
  return (
    <div
      className="template_page"
      style={{ "--primary-color": `${primaryColor}`, "--secoundry-color": `${secondaryColor}` }}>
      {waterMark?.link && <img src={waterMark?.link} alt="waterMark" className="template_watermark" />}
      <div className="template_header template_space_between">
        {logo?.link || props?.companyLogo ? <img src={props?.companyLogo || logo?.link} alt="logo" className="template_header_logo" /> : <p></p>}
        <p className="template_header_title primary_color fz-20 fw-700">Invoice</p>
      </div>
      <div className="template_body">
        <div className="template_body_section">
          <p className="template_space_between fz-10 fw-400 color_dark_gray">
            <span>INVOICE NUMBER</span>
            <span>ISSUED DATE</span>
          </p>
          <p className="template_space_between fz-14 fw-700 color_black">
            <span>{withData ? (props?.invoiceNumber ? props?.invoiceNumber : "") : "PS-00000999/2024"}</span>
            <span>{withData ? (props?.issueDate ? props?.issueDate : "") : "Oct 09, 2024"}</span>
          </p>
        </div>

        <div className="template_body_section">
          <p className="template_space_between fz-10 fw-400 color_dark_gray">
            <span>SELLER</span>
            <span>BUYER</span>
          </p>
          <p className="template_space_between fz-10 fw-700 primary_color">
            <span>{withData ? (props?.sellerData?.sellerCompanyName ? props?.sellerData?.sellerCompanyName : "") : "Al Madineh Travel"}</span>
            <span>{withData ? (props?.buyerData?.companyName ? props?.buyerData?.companyName : "") : "Al Madineh Travel"}</span>
          </p>
          <p className="template_space_between fz-10 fw-400 color_dark_gray">
            <span>{withData ? (props?.sellerData?.sellerCompanyEmail ? "Email: " + props?.sellerData?.sellerCompanyEmail : "") : "Email: google@gmail.com"}</span>
            <span>{withData ? (props?.buyerData?.companyEmail ? "Email: " + props?.buyerData?.companyEmail : "") : "Email: google@gmail.com"}</span>
          </p>
          <p className="template_space_between fz-10 fw-400 color_dark_gray">
            <span>{withData ? (props?.sellerData?.sellerCompanyPhone ? "PHONE: " + props?.sellerData?.sellerCompanyPhone : "") : "PHONE: 205555555"}</span>
            <span>{withData ? (props?.buyerData?.companyPhone ? "PHONE: " + props?.buyerData?.companyPhone : "") : "PHONE: 205555555"}</span>
          </p>
          <p className="template_space_between fz-10 fw-400 color_dark_gray">
            <span>{withData ? (props?.sellerData?.iban ? "IBAN: " + props?.sellerData?.iban : "") : "IBAN: 4516946115845454545442"}</span>
            <span>{withData ? (props?.buyerData?.id ? "ID: " + props?.buyerData?.id : "") : "ID: TA1234567"}</span>
          </p>
          <p className="template_space_between fz-10 fw-400 color_dark_gray">
            <span>{withData ? (props?.sellerData?.swift ? "SWIFT: " + props?.sellerData?.swift : "") : "SWIFT: 4516946115845454545442"}</span>
          </p>
          <p className="template_space_between fz-10 fw-400 color_dark_gray">
            <span>{withData ? (props?.sellerData?.swift ? "Bank account number: " + props?.sellerData?.swift : "") : "Bank account number: 125465364581"}</span>
          </p>
        </div>

        <div className="template_body_section">
          <table className="template_table">
            <thead className="template_table_header">
              <tr>
                <td className="fz-10 fw-600">NO.</td>
                <td className="fz-10 fw-600">Item</td>
                <td className="fz-10 fw-600">Amount</td>
                <td className="fz-10 fw-600">Unit</td>
                <td className="fz-10 fw-600">Price</td>
                <td className="fz-10 fw-600">Total Price</td>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="fz-10 fw-400">1.</td>
                <td>
                  <p className="fz-10 fw-400">{props.type ? props.type : "Flight (adult 14/0096/2024)"} </p>
                  <p className="fz-10 fw-400">Booking ID {props.bookingId ? props.bookingId : "JHNDFGBNIUOHF[MNBHFJHUBJ]"}</p>
                </td>
                <td className="fz-10 fw-400">{props?.amount ? props?.amount : 3}</td>
                <td className="fz-10 fw-400">{props?.unit ? props?.unit : 1}</td>
                <td className="fz-10 fw-400">{props?.price ? props?.price : 371.54}</td>
                <td className="fz-10 fw-400">{props?.totalPrice ? props?.totalPrice : 371.54}</td>
              </tr>
            </tbody>
          </table>
          <p className="template_space_between fz-14 fw-700 color_black">
            <p></p>
            <p className="fz-10 fw-400">
              Net price total: <span className="fw-700">{props?.totalPrice ? props?.totalPrice : 371.54} USD</span>
            </p>
          </p>
          <p className="template_space_between fz-14 fw-700 color_black">
            <p></p>
            <p className="fz-10 fw-400">
              {" "}
              Due total: <span className="fw-700">{props?.totalPrice ? props?.totalPrice : 371.54} USD</span>
            </p>
          </p>
          <p className="fz-10 fw-700">
            <span className="fw-400">Items:</span> 1 for the total price: {props?.totalPrice ? props?.totalPrice : 371.54} USD
          </p>
          <p className="fz-10 fw-700">{props.totalPriceToWords ? props.totalPriceToWords : "Three hundred seventy-one dollars fifty-four cent"}</p>
          <p className="fz-10 fw-700">Payment is performed within one banking day</p>
        </div>
        <p className="fz-10 fw-400 color_dark_gray">
          This is a computer generated document & does not need a signature and stamp
        </p>
      </div>
    </div>
  );
};

export default InvoiceTemplate;
