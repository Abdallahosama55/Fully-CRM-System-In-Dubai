import { Button, Flex, Row, Typography } from "antd";
import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { LoadingOutlined } from "@ant-design/icons";
import home from "assets/images/house.png";
import { EditSVG } from "assets/jsx-svg";
import userContext from "context/userContext";
import useGetDeskById from "services/Desk/Querys/useGetDeskById";
import useGetDeskEmployessById from "services/Desk/Querys/useGetDeskEmployessById";
import BasicInformation from "./BasicInformation";
import "./styles.css";
import LoadingPage from "components/common/LoadingPage";

export default function DeskInformation() {
  const { id } = useParams();

  const { user } = useContext(userContext);
  const [deskData, setDeskData] = useState({});

  const { data: deskEmployess, isLoading: isLoadingDesk } = useGetDeskEmployessById(
    id ?? user.employeeDeskId,
    {
      refetchOnMount: true,
      enabled: !!id,
      select: (data) => {
        return data.data.data;
      },
    },
  );

  const { data: deskFullData, isLoading: loading } = useGetDeskById(id ?? user.employeeDeskId, {
    select: (resp) => {
      const data = resp.data.data;

      return data;
    },
  });
  useEffect(() => {
    if (deskFullData) {
      setDeskData({
        id: deskFullData.id,
        info: [
          {
            id: 1,
            firstCol: "Desk Name",
            secondeCol: deskFullData.name,
          },
          {
            id: 2,
            firstCol: "Service Type",
            secondeCol: deskFullData.serviceType?.join("-"),
          },
          {
            id: 3,
            firstCol: "Call Type",
            secondeCol: deskFullData.callType,
          },
          {
            id: 4,
            firstCol: "Meeting Verse",
            secondeCol: deskFullData.meetingVerseId ? "Meeting Verse" : "-",
            to: deskFullData.meetingVerseId
              ? `https://www.vverse.co/metaverse/${deskFullData.meetingVerseId}`
              : null,
          },
          {
            id: 5,
            firstCol: "Waiting Room Verse",
            secondeCol: deskFullData.waitingVerseId ? "Waiting Room Verse" : "-",
            to: deskFullData.waitingVerseId
              ? `https://www.vverse.co/metaverse/${deskFullData.waitingVerseId}`
              : null,
          },
        ],
      });
    }
  }, [deskFullData]);

  if (loading) {
    return <LoadingPage />;
  }

  return (
    <section className="desk-info">
      <Flex align="center" justify="space-between">
        <Typography.Text className="fw-500 fz-14">Desk Information</Typography.Text>
        <span className="d-flex" style={{ gap: "0.5rem" }}>
          <Link to={"edit-information"} className="d-flex align-center">
            <Button
              icon={<EditSVG color="#3a5ee3" width={12} height={11} />}
              style={{ color: "#3A5EE3", border: "1px solid #3A5EE3" }}
              size="small"
              color="primary">
              Edit
            </Button>
          </Link>
          {deskFullData.aiAgent && (
            <Link to={"ai-configrations"} className="d-flex align-center">
              <Button
                icon={<EditSVG color="#3a5ee3" width={12} height={11} />}
                style={{ color: "#3A5EE3", border: "1px solid #3A5EE3" }}
                size="small"
                color="primary">
                Edit AI
              </Button>
            </Link>
          )}
        </span>
      </Flex>
      {loading || isLoadingDesk ? (
        <Row align="middle" justify="center" className="loading">
          <LoadingOutlined />
        </Row>
      ) : (
        <div style={{ padding: "0" }} className="form-layout desk-info-layout">
          {/* <div
            className="image-desk"
            style={{
              backgroundImage: `url(${deskFullData?.image ? deskFullData?.image : home})`,
            }}></div> */}
          <BasicInformation
            department={deskFullData?.department?.name}
            image={deskFullData?.image ? deskFullData?.image : home}
            deskData={deskData}
            allowCustomerToChangeCallType={deskFullData?.allowCustomerToChangeCallType}
            deskFullData={deskFullData}
            deskEmployess={deskEmployess ?? deskFullData?.deskEmployees}
          />
          {/* <Tabs defaultActiveKey="1" items={items} /> */}
        </div>
      )}
    </section>
  );
}
