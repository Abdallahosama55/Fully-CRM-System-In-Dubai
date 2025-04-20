import React from "react";
import PageHeader from "./Components/PageHeaderComponent";
import CustomerPropertyComponent from "./Components/CustomerPropertyComponent";
import NoDataToShowComponent from "./Components/NoDataToShowComponent";
export default function CustomerPropertyPage({ customerDimensions }) {
  return (
    <>
      <PageHeader title={"Contact Properties"} />
      {customerDimensions?.length > 0 ? (
        <div style={{ height: "100vh" }}>
          <div className="row gy-3 ">
            {(customerDimensions || []).map((item) => (
              <div className="col-md-4" key={item?.id}>
                <CustomerPropertyComponent
                  id={item.id}
                  isEnableUpdateChecked={item.editable}
                  img={item?.image}
                  propertyName={item?.name}
                />
              </div>
            ))}
          </div>
        </div>
      ) : (
        <NoDataToShowComponent />
      )}
    </>
  );
}
