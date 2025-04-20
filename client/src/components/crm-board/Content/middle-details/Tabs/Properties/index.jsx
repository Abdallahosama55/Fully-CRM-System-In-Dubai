// style
import "./styles.css";
import CustomerPropertyComponent from "views/Customers/ViewCustomer/Components/NewStyleComponents/NavigationPages/Components/CustomerPropertyComponent";
import NoDataToShowComponent from "views/Customers/ViewCustomer/Components/NewStyleComponents/NavigationPages/Components/NoDataToShowComponent";
import useGetCustomerProperties from "services/CustomerLeadBoard/Querys/useGetCustomerProperties";
const Properties = () => {
  const { data: customerDimensions } = useGetCustomerProperties({});
  return (
    <div className="tasks_tab">
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
    </div>
  );
};

export default Properties;
