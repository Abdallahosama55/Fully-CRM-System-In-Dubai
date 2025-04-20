import { useGetCustomerSourcesSuspense } from "services/Customers/Querys/useGetCustomerSources";
import { SourceItem } from "./SourceItem";
import { dayjs } from "utils/time";
import NoDataToShowComponent from "../NoDataToShowComponent";
const Content = ({ customerId }) => {
  const { data } = useGetCustomerSourcesSuspense(customerId, {
    select: (data) => data.data.data,
  });
  if (data.length === 0) {
    return <NoDataToShowComponent />;
  }
  return (
    <div className="insight-sources">
      {(data ?? []).map((item) => {
        return (
          <SourceItem
            type={item.source}
            date={dayjs(item.createdAt).tz(localStorage.getItem("time-zone")).format("DD MMM YYYY")}
            time={dayjs(item.createdAt).tz(localStorage.getItem("time-zone")).format("hh:mm A")}
            from={item.from}
            name={item.name}
            key={item.id}
          />
        );
      })}
    </div>
  );
};
export default Content;
