import { Flex, Spin } from "antd";
import { Outlet, useSearchParams } from "react-router-dom";
import useGetCompanyTokenForIframe from "services/unauth/useGetCompanyTokenForIframe";

const ExternalIframeParent = () => {
  const [searchParams] = useSearchParams();
  const getCompanyTokenMutation = useGetCompanyTokenForIframe(
    { id: searchParams?.get("id"), name: searchParams?.get("name") },
    {},
  );

  if (getCompanyTokenMutation?.isPending) {
    return (
      <Flex style={{ height: "100dvh" }} vertical align="center" justify="center">
        <Spin />
      </Flex>
    );
  }

  return <Outlet />;
};

export default ExternalIframeParent;
