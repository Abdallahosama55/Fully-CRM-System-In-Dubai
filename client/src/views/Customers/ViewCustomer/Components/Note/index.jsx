import React, { Suspense } from "react";
import CreateNote from "./CreateNote";
import useGetNotes from "services/Note/Querys/useGetNotes";
import NoteCard from "./NoteCard";
import Box from "components/Box";
import dayjs from "dayjs";
import { Collapse, Divider, Timeline } from "antd";
import Note from "components/crm-board/Content/middle-details/Tabs/Notes/Note";
import { queryClient } from "services/queryClient";
import NoDataToShowComponent from "../NewStyleComponents/NavigationPages/Components/NoDataToShowComponent";

import "./styles.css";

const Notes = ({ customerId, leadId }) => {
  const { data, isLoading, queryKey } = useGetNotes(
    { customerId: leadId ? undefined : customerId, dealId: leadId, limit: 500 },
    {
      enabled: Boolean(customerId || leadId),
      select: (res) => {
        return res.data.data;
      },
    },
  );
  const handleRemoveNote = (id) => {
    queryClient.setQueryData(queryKey, (prev) => {
      return {
        ...prev,
        data: {
          ...prev.data,
          data: {
            ...prev.data.data,
            rows: (prev.data.data.rows || []).filter((item) => item.id !== id),
          },
        },
      };
    });
  };
  return (
    <div>
      {!isLoading && (
        <CreateNote
          defaultOpenNote={(data?.rows || []).length === 0}
          queryKey={queryKey}
          leadId={leadId}
          customerId={customerId}
        />
      )}
      {data?.rows.length > 0 && (
        <Divider
          style={{
            marginBlock: "8px",
          }}
        />
      )}
      <Box sx={{ display: "flex", flexDirection: "column", gap: "8px", marginTop: "16px" }}>
        {isLoading ? (
          Array(5)
            .fill(1)
            .map((item, index) => <NoteCard key={index + item} loading={true}></NoteCard>)
        ) : (
          <Collapse
            className="view-customer-note-collapse"
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
                label: "Notes",
                children: (
                  <Suspense fallback={"Loading"}>
                    <Box
                      sx={{
                        maxHeight: "calc(100vh - 320px)",
                        overflowY: "auto",
                      }}>
                      {(data?.rows || []).length === 0 ? (
                        <NoDataToShowComponent></NoDataToShowComponent>
                      ) : (
                        <Timeline
                          items={(data?.rows || []).map((item) => ({
                            children: (
                              <Box
                                sx={{
                                  ".collapse_card ": {
                                    // background: "#FFF4CF",
                                  },
                                }}>
                                <Note
                                  refetchNotes={handleRemoveNote}
                                  by={item.account?.fullName}
                                  key={item.id}
                                  id={item.id}
                                  Due={dayjs(item.noteDate).format("YYYY-MM-DD")}
                                  description={
                                    <div
                                      style={{ color: "#020714", fontWeight: 500 }}
                                      dangerouslySetInnerHTML={{ __html: item?.text }}
                                    />
                                  }></Note>
                              </Box>
                            ),
                          }))}></Timeline>
                      )}
                    </Box>
                  </Suspense>
                ),
              },
            ]}
          />
        )}
      </Box>
    </div>
  );
};
export default Notes;
