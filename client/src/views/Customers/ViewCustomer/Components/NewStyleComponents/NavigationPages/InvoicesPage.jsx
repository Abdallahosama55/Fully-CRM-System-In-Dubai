import PageHeader from "./Components/PageHeaderComponent";
import NoDataToShowComponent from "./Components/NoDataToShowComponent";

export default function InvoicesPage({ attachments = [] }) {
  return (
    <>
      <PageHeader title={"Invoices"} />

      <NoDataToShowComponent />
    </>
  );
}
