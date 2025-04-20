import { useEffect, useMemo, useState } from "react";
import { Form, Table, Typography, message } from "antd";

import useGetSessions from "services/travel/experiance/AvailabilityTab/Querys/useGetSessions";
import useGetAvailability from "services/travel/experiance/AvailabilityTab/Querys/useGetAvailability";
import getTableColumns from "./table.columns";
import AddSession from "../../components/AddSession";
import ViewSession from "../../components/ViewSession";
import CustomButton from "components/common/Button";
import { PlusOutlineSVG } from "assets/jsx-svg";
import { STEPS_KEYS } from "views/travel/Experiances/AddExperiance";

const AvailabilitySessions = ({ next, productId, updateDoneSteps }) => {
  const [isAddSession, setIsAddSession] = useState(false);
  const [viewSessionId, setViewSessionId] = useState(null);

  const handelFinish = () => {
    if (sessions?.length === 0) {
      message.error("Add at least one session");
    } else {
      updateDoneSteps(STEPS_KEYS.TIME_AND_DATE_RANGE);
      next();
    }
  };

  const {
    data: sessions,
    isLoading: getSessionsLoading,
    refetch: refetchGetSessions,
  } = useGetSessions(productId, {
    enabled: false,
    initialData: [],
  });

  const {
    data: availabilityInfo,
    isSuccess: isGetAvailability,
    isError,
    error,
    isPending: getAvailabilityLoading,
  } = useGetAvailability(productId, { initialData: [] });

  useEffect(() => {
    if (isError) {
      message.error(error?.message);
    }
  }, [isError, error]);

  useEffect(() => {
    if (isGetAvailability) {
      refetchGetSessions();
    }
  }, [isGetAvailability, refetchGetSessions]);

  const TABLE_COLUMNS = useMemo(() => {
    return getTableColumns({
      onDelete: refetchGetSessions,
      viewSession: setViewSessionId,
    });
  }, [refetchGetSessions]);

  if (isAddSession) {
    return (
      <AddSession
        minStartDate={availabilityInfo?.fromDate}
        maxEndDate={availabilityInfo?.toDate}
        back={() => {
          setIsAddSession(false);
          refetchGetSessions();
        }}
        productId={productId}
      />
    );
  }

  if (Boolean(viewSessionId)) {
    return <ViewSession sessionId={viewSessionId} back={() => setViewSessionId(null)} />;
  }

  return (
    <div>
      <Form hidden={true} id="form_inside_tab" onFinish={handelFinish} />
      <Typography.Title level={3} className="fz-18 title availability_tab_title">
        Is your experience only offered during specific hours?
      </Typography.Title>
      <Typography.Paragraph className="fz-14 sub_title">
        Your travellers will be able to see this information on their ticket once they have booked
        the experience
      </Typography.Paragraph>
      <Table
        dataSource={sessions}
        columns={TABLE_COLUMNS}
        pagination={false}
        loading={getSessionsLoading || getAvailabilityLoading}
      />
      <CustomButton
        className="mt-1"
        color="dark"
        icon={<PlusOutlineSVG />}
        onClick={() => {
          setIsAddSession(true);
        }}>
        Add Session
      </CustomButton>
    </div>
  );
};

export default AvailabilitySessions;
