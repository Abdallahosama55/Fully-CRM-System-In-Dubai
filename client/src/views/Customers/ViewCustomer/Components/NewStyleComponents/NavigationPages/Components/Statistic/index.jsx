import React from "react";
import "./style.css";

const Statistic = ({ title, trends, dateTime }) => {
  return (
    <div className="profile-statistic">
      {title && (
        <div className="div">
          <div className="text-wrapper">{title}</div>
        </div>
      )}
      <div className="div-2">
        {(trends || []).length > 0 && (
          <div className="div-3">
            {(trends || []).map((item, index) => (
              <>
                <div key={index} className="div-4">
                  <div className="text-wrapper-2">{item.value}</div>
                  <div className="div-5">
                    <div className="dot">
                      <div
                        className={`${
                          item.color === "blue"
                            ? "dot-2"
                            : item.color === "green"
                            ? "dot-3"
                            : item.color === "red"
                            ? "dot-4"
                            : ""
                        }`}
                      />
                    </div>

                    <div
                      className={`${
                        item.color === "blue"
                          ? "text-wrapper-3"
                          : item.color === "green"
                          ? "text-wrapper-4"
                          : item.color === "red"
                          ? "text-wrapper-6"
                          : ""
                      }`}>
                      {item.label}
                    </div>
                  </div>
                </div>{" "}
              </>
            ))}

            {/* <div className="div-4">
            <div className="text-wrapper-2">250</div>
            <div className="div-5">
              <div className="dot">
                <div className="dot-3" />
              </div>
              <div className="text-wrapper-4">Count</div>
            </div>
          </div> */}
          </div>
        )}
        {dateTime && (
          <div className="div-6">
            <div className="text-wrapper">{dateTime?.title}</div>
            <div className="text-wrapper-5">{dateTime?.lastDate}</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Statistic;
