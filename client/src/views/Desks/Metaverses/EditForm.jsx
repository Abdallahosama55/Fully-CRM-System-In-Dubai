import { Flex, Form } from "antd";
import VerseCard from "./VerseCard";
import NoDataToShowComponent from "views/Customers/ViewCustomer/Components/NewStyleComponents/NavigationPages/Components/NoDataToShowComponent";
import useGetMyDimensions from "services/Explore/Queries/useGetMyDimensions";
import LoadingPage from "components/common/LoadingPage";
import { useImperativeHandle } from "react";
const formatFormValue = (obj) => {
  const filteredArray = [];
  for (const key in obj) {
    if (obj[key] !== undefined) {
      filteredArray.push({ key: key, value: obj[key] });
    }
  }
  return filteredArray;
};

const formatInitValue = (array) => {
  const result = {};

  (array || []).forEach((obj) => {
    result[obj.dimensionId] = true;
  });
  return result;
};
const EditForm = ({ formRef, initValue, handleSubmit }) => {
  const [form] = Form.useForm();

  useImperativeHandle(
    formRef,
    () => ({
      onSubmit: onSubmit,
    }),
    [],
  );
  const { data: verses, isLoading } = useGetMyDimensions(
    {
      limit: 300,
    },
    {
      select: (data) => {
        return data.data.data;
      },
      refetchOnMount: false,
    },
  );
  const onSubmit = () => {
    form.submit();
  };
  const handleFinish = async (data) => {
    if (typeof handleSubmit === "function") await handleSubmit(formatFormValue(data));
  };
  if (isLoading) {
    return <LoadingPage></LoadingPage>;
  }

  return (
    <Form
      initialValues={formatInitValue(initValue)}
      form={form}
      onFinish={handleFinish}
      layout="vertical">
      {verses?.count === 0 ? (
        <NoDataToShowComponent></NoDataToShowComponent>
      ) : (
        <Flex wrap="wrap" gap={"8px"}>
          {(verses?.rows || []).map((item) => {
            return (
              <VerseCard
                id={item.id}
                isCheckboxShow={true}
                title={item?.name}
                image={item?.image}
                key={item.id}></VerseCard>
            );
          })}
        </Flex>
      )}
    </Form>
  );
};
export default EditForm;
