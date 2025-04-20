import { useContext, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import useSuspenseDeskMetaverses from "services/Desk/Querys/useSuspenseDeskMetaverses";
import NoDataToShowComponent from "views/Customers/ViewCustomer/Components/NewStyleComponents/NavigationPages/Components/NoDataToShowComponent";
import SectionToolbar from "./SectionsToolbar";
import EditForm from "./EditForm";
import useUpdateDeskMetaverses from "services/Desk/Mutations/useUpdateDeskMetaverses";
import { Flex } from "antd";
import VerseCard from "./VerseCard";
import { useNotification } from "context/notificationContext";
import LoadingPage from "components/common/LoadingPage";
import userContext from "context/userContext";

import "./styles.css";

const Metaverses = () => {
  const { id } = useParams();
  const { user } = useContext(userContext);

  const [isEditPage, setEditPage] = useState(false);
  const formRef = useRef();
  const { openNotificationWithIcon } = useNotification();
  const {
    data,
    refetch,
    isRefetching: isLoading,
  } = useSuspenseDeskMetaverses(id ?? user.employeeDeskId, {
    select: (data) => {
      return data.data.data;
    },
  });
  const { updateMetaverse, isPending } = useUpdateDeskMetaverses({
    onSuccess: () => {
      openNotificationWithIcon("success", "Uploaded meta verses have been  successfully");

      refetch();
      setEditPage(false);
    },
  });

  const onEditPage = () => {
    setEditPage((prev) => !prev);
  };
  const onClickSubmitButton = () => {
    if (formRef.current) {
      formRef.current.onSubmit();
    }
  };
  const handleSubmit = async (item) => {
    await updateMetaverse({
      id: id ?? user.employeeDeskId,
      metaverseIds: item.filter((item) => item.value).map((item) => Number(item.key)),
    });
  };

  return (
    <Flex vertical gap={24}>
      <SectionToolbar
        isSubmitting={isPending}
        onSubmit={onClickSubmitButton}
        isEdit={isEditPage}
        onEdit={onEditPage}
        title="Metaverses that you want to show to the customer"
      />
      {isLoading ? (
        <LoadingPage></LoadingPage>
      ) : isEditPage ? (
        <EditForm initValue={data} handleSubmit={handleSubmit} formRef={formRef} />
      ) : data.length === 0 ? (
        <NoDataToShowComponent />
      ) : (
        <div>
          <Flex wrap="wrap" gap={"8px"}>
            {(data || []).map((item) => {
              return (
                <VerseCard
                  id={item.id}
                  isCheckboxShow={false}
                  title={item?.customerDimension?.name}
                  image={item?.customerDimension?.image}
                  key={item.id}></VerseCard>
              );
            })}
          </Flex>
        </div>
      )}
    </Flex>
  );
};
export default Metaverses;
