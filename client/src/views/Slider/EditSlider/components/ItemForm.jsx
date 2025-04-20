import { Form } from "antd";
import { useForm } from "antd/es/form/Form";
import useLazyEffect from "hooks/useLazyEffect";
import "../style.css";
import ItemFields from "./ItemFields";
import { useSliderStore } from "../sliderStore";

const ItemForm = ({ ...rest }) => {
  const [form] = Form.useForm();
  const { updateItem } = useSliderStore();
  const customValue = Form.useWatch((value) => value, form);

  const onSubmit = (data) => {
    updateItem({ ...data, id: rest?.id });
  };
  useLazyEffect(() => {
    form.submit();
  }, [customValue]);
  const handleRemoveImage = () => {
    form.setFieldValue("photo", null);
  };

  return (
    <Form
      initialValues={{
        ...rest,
      }}
      onFinish={onSubmit}
      form={form}
      layout="vertical">
      <ItemFields photo={customValue?.photo} handleRemoveImage={handleRemoveImage} />
    </Form>
  );
};

export default ItemForm;
