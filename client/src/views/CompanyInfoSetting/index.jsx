import TabsMenu from "components/TabsMenu";
import { useState } from "react";
import useCompanyInfoQuery from "services/newSettings/Query/useCompanyInfoQuery";
import CompanyAddress from "./components/CompanyAddress";
import CompanyContactInfo from "./components/CompanyContactInfo";
import CompanyInfo from "./components/CompanyInfo";
import CompanyWorkingTimes from "./components/CompanyWorkingTimes";
import ImageUpload from "./components/ImageUpload";
import "./styles.css";

function CompanyInfoSetting() {
  const [currentTab, setCurrentTab] = useState("companyInfo");

  const { data, key } = useCompanyInfoQuery({
    select: (data) => data.data?.data,
  });

  const subTabItems = [
    {
      key: "companyInfo",
      label: "Company Information",
    },
    {
      key: "address",
      label: "Address",
    },
    {
      key: "contactInfo",
      label: "Contact Information",
    },
    {
      key: "workingTimes",
      label: "Working Times",
    },
  ];

  return (
    <div className="company-info-root">
      <ImageUpload company={data} queryKey={key} />
      <TabsMenu
        tabs={subTabItems}
        defaultTabKey={"companyInfo"}
        onTabChanged={(tab) => setCurrentTab(tab)}
      />
      {currentTab === "companyInfo" && <CompanyInfo data={data} queryKey={key} />}
      {currentTab === "address" && <CompanyAddress data={data} queryKey={key} />}
      {currentTab === "contactInfo" && <CompanyContactInfo data={data} queryKey={key} />}
      {currentTab === "workingTimes" && <CompanyWorkingTimes data={data} queryKey={key} />}
    </div>
  );
}

export default CompanyInfoSetting;
