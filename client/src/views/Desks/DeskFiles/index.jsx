import React, { useCallback, useContext } from "react";
import { useParams } from "react-router-dom";
import useGetDeskAttachments from "services/Desk/Querys/useGetDeskAttachments";
import FileCard from "./FileCard";
import SectionToolbar from "./SectionsToolbar";
import Box from "components/Box";
import useDeleteDeskAttachment from "services/Desk/Mutations/useDeleteDeskAttachment";
import { queryClient } from "services/queryClient";
import NoDataToShowComponent from "views/Customers/ViewCustomer/Components/NewStyleComponents/NavigationPages/Components/NoDataToShowComponent";
import LoadingPage from "components/common/LoadingPage";
import { useNotification } from "context/notificationContext";
import userContext from "context/userContext";

import "./styles.css";

const DeskFiles = () => {
  const { id } = useParams();
  const { openNotificationWithIcon } = useNotification();
  const { user } = useContext(userContext);

  const { data, queryKey, isLoading } = useGetDeskAttachments(id ?? user?.employeeDeskId, {
    select: (data) => {
      return data.data.data;
    },
    refetchOnMount: false,
  });
  const { deleteAttachment } = useDeleteDeskAttachment({
    onSuccess: (_, id) => {
      openNotificationWithIcon("success", "Deleted file has been  successfully");
      queryClient.setQueryData(queryKey, (prev) => ({
        ...prev,
        data: {
          ...prev.data,
          data: prev.data.data.filter((item) => item.id !== id),
        },
      }));
    },
  });
  const handleDeleteFile = useCallback(async (id) => {
    await deleteAttachment(id);
  }, []);
  if (isLoading) {
    return <LoadingPage></LoadingPage>;
  }
  return (
    <section
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "24px",
      }}>
      <SectionToolbar isSharedForSignature={false} title="Files Shared with Customers" />
      {(data || []).filter((item) => !item.sharedForSigniture).length === 0 ? (
        <NoDataToShowComponent />
      ) : (
        <Box
          sx={{
            overflow: "auto",
            whiteSpace: "nowrap",
            display: "flex",
            gap: "8px",
            paddingBottom: "8px",
          }}>
          {(data || [])
            .filter((item) => !item.sharedForSigniture)
            .map((item) => {
              return (
                <FileCard
                  id={item.id}
                  onDelete={handleDeleteFile}
                  createdAt={item.createdAt}
                  link={item.attachment}
                  name={item.name}
                  key={item.id}></FileCard>
              );
            })}
        </Box>
      )}
      <SectionToolbar
        isSharedForSignature={true}
        title="Files shared with customers to add their signatures"
      />
      {(data || []).filter((item) => item.sharedForSigniture).length === 0 ? (
        <NoDataToShowComponent />
      ) : (
        <Box
          sx={{
            overflow: "auto",
            whiteSpace: "nowrap",
            display: "flex",
            gap: "8px",
            paddingBottom: "8px",
          }}>
          {(data || [])
            .filter((item) => item.sharedForSigniture)
            .map((item) => {
              return (
                <FileCard
                  id={item.id}
                  onDelete={handleDeleteFile}
                  createdAt={item.createdAt}
                  link={item.attachment}
                  name={item.name}
                  key={item.id}></FileCard>
              );
            })}
        </Box>
      )}
    </section>
  );
};
export default DeskFiles;
