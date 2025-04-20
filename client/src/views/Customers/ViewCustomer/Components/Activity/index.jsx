import { Suspense } from "react";
import CreateActivity from "./CreateActivity";
import PageHeaderComponent from "../NewStyleComponents/NavigationPages/Components/PageHeaderComponent";
import ActivityTimeLine from "./ActivityTimeLine";
import { Collapse, Divider } from "antd";
import Box from "components/Box";
import Notes from "../Note";
import { useParams } from "react-router-dom";

import "./styles.css";

const Activity = ({ customerId, CustomerData, leadId }) => {
  const { id } = useParams();
  return (
    <div>
      <PageHeaderComponent title={"Activity"} />
      {/* {!leadId && ( */}

      <CreateActivity leadId={leadId} leads={CustomerData?.leads ?? []} customerId={customerId} />
      <Divider />

      {/* )} */}
      <Collapse
        className="view-customer-activity-comp"
        style={{
          background: "white",
          border: "1px solid #EFEFF1",
          fontSize: "14px",
          fontWeight: 500,
        }}
        defaultActiveKey={["1"]}
        items={[
          {
            key: "1",
            label: "Focus",
            children: (
              <Suspense fallback={"Loading"}>
                <Box
                  sx={{
                    maxHeight: "calc(100vh - 320px)",
                    overflowY: "auto",
                  }}>
                  <ActivityTimeLine customerId={customerId} leadId={leadId} />
                </Box>
              </Suspense>
            ),
          },
        ]}
      />
      <Notes leadId={leadId} customerId={id || customerId} />
    </div>
  );
};
export default Activity;
