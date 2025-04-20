import { Suspense, useCallback, useState } from "react";
import PortalDetailsCard from "./Components/PortalDetailsCard";
import PageHeader from "./Components/PageHeaderComponent";
import Box from "components/Box";
import { useParams } from "react-router-dom";
import useGetCustomerById from "services/Customers/Querys/useGetCustomerById";
import { ACCOUNT_STATUS_TEXT, ACCOUNT_STATUS_VALUE } from "./constant";
import dayjs from "dayjs";
import Statistic from "./Components/Statistic";
import TopStatistic from "./Components/TopStatistic";
import InsightSources from "./Components/InsightSources";
import { Spin } from "antd";

export default function PortalDetailsPage({ customerId, leadId }) {
  const { id } = useParams();

  const { data: customerData } = useGetCustomerById(id || customerId, {
    refetchOnMount: false,
    enabled: Boolean(customerId),
    select: (data) => {
      return data.data.data;
    },
  });
  const portal = customerData?.customerPortalAccountInfo;

  const [isEditState, setIsEditState] = useState(false);

  const onEditPortalDetails = useCallback(() => {
    setIsEditState((prev) => !prev);
  }, []);

  return (
    <Box
      sx={{
        paddingInline: "0",
        paddingBottom: "8px",
      }}>
      {/* <PageHeader
        title={"Portal Details"}
        onEditClicked={
          [ACCOUNT_STATUS_TEXT.PENDING, undefined].includes(portal?.accountStatus)
            ? undefined
            : onEditPortalDetails
        }
        isEditState={isEditState}
        setIsEditState={setIsEditState}
      /> */}
      <Box sx={{ marginBottom: "16px" }}>
        <Suspense
          fallback={
            <Box sx={{ textAlign: "center" }}>
              <Spin spinning />
            </Box>
          }>
          <TopStatistic customerId={id || customerId} customerData={customerData} />{" "}
        </Suspense>
      </Box>
      <PortalDetailsCard
        id={id}
        leadId={leadId}
        isEditState={isEditState}
        statusTypeId={portal?.accountStatus ? ACCOUNT_STATUS_VALUE[portal?.accountStatus] : 4}
        isActive={portal?.accountStatus ? ACCOUNT_STATUS_VALUE[portal?.accountStatus] === 2 : 1}
        statusName={portal?.accountStatus ?? null}
        ActivationDate={
          customerData?.customerPortalAccountInfo?.activationDate?.split("T")[0] || "-"
        }
        sendingDate={portal?.sendingDate ? dayjs(portal?.sendingDate).format("DD MMM, YYYY") : "-"}
      />
      <Box sx={{ marginTop: "16px" }}>
        <InsightSources customerId={id || customerId} />
      </Box>
    </Box>
  );
}
