import { Form } from "antd";
import useLazyEffect from "hooks/useLazyEffect";

const FormAutoSave = ({ onFinish, children, initialValues, ...rest }) => {
  const [form] = Form.useForm();
  const customValue = Form.useWatch((value) => value, form);

  const onSubmit = (data) => {
    if (typeof onFinish == "function") onFinish({ ...data });
  };
  useLazyEffect(() => {
    form.submit();
  }, [customValue]);

  return (
    <Form initialValues={initialValues} onFinish={onSubmit} form={form} layout="vertical" {...rest}>
      {children}
    </Form>
  );
};

export default FormAutoSave;
