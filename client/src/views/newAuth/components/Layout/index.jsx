import { Layout } from "antd";

import Header from "../header";
import Footer from "../footer";
import useGetCompanyInfo from "services/companyInfo/Queries/useGetCompanyInfo";
import { CompanyInfoContext } from "context/companyInfoContext";

const { Content } = Layout;

import "./styles.css";

const LayoutNotAuth = ({ children }) => {
  const companyInfoQuery = useGetCompanyInfo();

  return (
    <>
      {!companyInfoQuery.isPending && (
        <CompanyInfoContext.Provider value={{ ...companyInfoQuery?.data }}>
          <Layout className="registration-layout">
            <Header />
            <Content className="registration-content">{children}</Content>
            <Footer />
          </Layout>
        </CompanyInfoContext.Provider>
      )}
    </>
  );
};

export default LayoutNotAuth;
