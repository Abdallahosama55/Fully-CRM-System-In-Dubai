import { useEffect } from "react";
import { Divider, Form, Select, Skeleton, Typography, message } from "antd";
import { useWatch } from "antd/es/form/Form";
import useGetExperianceServices from "services/travel/experiance/ExperianceTab/Querys/useGetExperianceServices";
import useGetInclusions from "services/travel/experiance/ExperianceTab/Querys/useGetInclusions";
import useAddOrEditInclusions from "services/travel/experiance/ExperianceTab/Mutations/useAddOrEditInclusions";
import TextEditor from "components/common/TextEditor";

// images
import drinkPNG from "assets/images/drink.png";
import { ArrowDownSVG } from "assets/jsx-svg";

const InclusionsAndExclusions = ({ id, next }) => {
  const [form] = Form.useForm();
  const inclusionsServices = useWatch("inclusionsServices", form);

  const servicesQuery = useGetExperianceServices({ initialData: [] });
  const InclusionsQuery = useGetInclusions(id, {
    enabled: Boolean(id),
  });

  useEffect(() => {
    if (InclusionsQuery?.isSuccess) {
      form.setFieldsValue({
        ...InclusionsQuery?.data,
      });
    }

    if (InclusionsQuery?.isError) {
      message.error(InclusionsQuery?.error?.message);
    }
  }, [
    InclusionsQuery?.data,
    InclusionsQuery?.error,
    InclusionsQuery?.isError,
    InclusionsQuery?.isSuccess,
    form,
  ]);

  const addOrEditInclusionsMutation = useAddOrEditInclusions(id, {
    onSuccess: () => {
      next();
    },
    onError: (error) => message.error(error.message),
  });

  if (InclusionsQuery?.isLoading || addOrEditInclusionsMutation?.isLoading) {
    return <Skeleton active />;
  }

  const handelFinish = (values) => {
    addOrEditInclusionsMutation.mutate({
      ...values,
      isLiveGuideLang: false,
      isAudioGuideLang: false,
      isReadingMaterialLang: false,
    });
  };

  return (
    <div className="inclusion">
      <img src={drinkPNG} alt="drink" />
      <Typography.Title level={3} className="fz-18 title">
        What's Included?
      </Typography.Title>
      <Typography.Paragraph className="fz-14 sub_title">
        Inform travelers about what's provided, such as food, drinks, special equipment, and
        admission fees
      </Typography.Paragraph>
      <Form form={form} layout="vertical" id="form_inside_tab" onFinish={handelFinish}>
        <Form.Item name={"inclusionsServices"} label="Inclusions" initialValue={[]}>
          <Select
            mode="multiple"
            placeholder="Select inclusion"
            suffixIcon={<ArrowDownSVG />}
            disabled={servicesQuery?.isLoading}
            options={servicesQuery?.data.map((el) => {
              return {
                value: el?.id,
                label: el?.name,
              };
            })}
          />
        </Form.Item>
        <Form.Item name={"inclusionsDetails"} initialValue={""}>
          <TextEditor />
        </Form.Item>
        <Divider />
        <Form.Item name={"exclusionsServices"} label="exclusions" initialValue={[]}>
          <Select
            placeholder="Select exclusions"
            mode="multiple"
            suffixIcon={<ArrowDownSVG />}
            options={servicesQuery?.data
              .filter((serivce) => !inclusionsServices?.includes(serivce.id))
              .map((el) => {
                return {
                  value: el?.id,
                  label: el?.name,
                };
              })}
          />
        </Form.Item>
        <Form.Item name="exclusionsDetails" initialValue={""}>
          <TextEditor />
        </Form.Item>
      </Form>
    </div>
  );
};

export default InclusionsAndExclusions;
