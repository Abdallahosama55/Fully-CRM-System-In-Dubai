import { DatePicker, Form, Input, TimePicker } from "antd";
import { cloneElement, useContext, useEffect, useMemo, useRef, useState } from "react";
import SelectAirlineCompany from "./SelectAirlineCompany";
import SelectAirport from "./SelectAirport";
import { EditableContext } from "./EditableRow";

const EditableCell = ({
  title,
  editable,

  children,
  dataIndex,
  record,
  handleSave,
  inputType,
  ...restProps
}) => {
  const [editing, setEditing] = useState(false);
  const inputRef = useRef(null);
  const form = useContext(EditableContext);

  useEffect(() => {
    if (editing) {
      inputRef.current?.focus();
    }
  }, [editing]);

  const toggleEdit = () => {
    setEditing(!editing);

    form.setFieldsValue({ [dataIndex]: record?.outboundFlight?.[dataIndex] });
  };

  const save = async () => {
    try {
      const values = await form.validateFields();

      let companyObjet = {};
      if (form.getFieldValue("airlineCompanyIdInfo")) {
        companyObjet = {
          airlineCompany: {
            id: form.getFieldValue("airlineCompanyIdInfo")?.id,
            name: form.getFieldValue("airlineCompanyIdInfo")?.name,
          },
        };
        form.setFieldValue("fromAirportIdInfo", null);
        form.setFieldValue("toAirportIdInfo", null);
      }
      if (form.getFieldValue("fromAirportIdInfo") || form.getFieldValue("toAirportIdInfo")) {
        companyObjet = {
          [form.getFieldValue("fromAirportIdInfo") ? "fromAirPortInfo" : "toAirPortInfo"]: {
            id: (form.getFieldValue("fromAirportIdInfo") || form.getFieldValue("toAirportIdInfo"))
              ?.id,
            name: (form.getFieldValue("fromAirportIdInfo") || form.getFieldValue("toAirportIdInfo"))
              ?.name,
          },
        };
        form.setFieldValue("fromAirportIdInfo", null);
        form.setFieldValue("toAirportIdInfo", null);
      }
      toggleEdit();
      handleSave({
        ...record,
        outboundFlight: {
          ...record.outboundFlight,
          ...values,
          ...companyObjet,
        },
      });
    } catch (errInfo) {
      console.log("Save failed:", errInfo);
    }
  };

  let childNode = children;

  const inputNode = useMemo(() => {
    switch (inputType) {
      case "input":
        return <Input />;
      case "airline":
        return <SelectAirlineCompany form={form} />;
      case "airport":
        return <SelectAirport form={form} />;
      case "time":
        return <TimePicker format={"HH:mm"} />;
      case "date":
        return <DatePicker />;
      case "dateTime":
        return <DatePicker showTime showSecond={false} />;
      case "number":
        return <Input type="number" />;
      default:
        return <Input />;
    }
  }, [inputType]);

  if (editable) {
    childNode = editing ? (
      <Form.Item
        style={{ margin: 0 }}
        name={dataIndex}
        rules={[
          {
            required: true,
            message: `the field is required.`,
          },
        ]}>
        {cloneElement(inputNode, {
          ref: inputRef,
          onPressEnter: save,
          onBlur: inputType === "dateTime" ? () => {} : save,
          onOpenChange: (data) => (inputType === "dateTime" ? !data && save() : {}),
        })}
      </Form.Item>
    ) : (
      <div className="editable-cell-value-wrap" style={{ paddingRight: 24 }} onClick={toggleEdit}>
        {children}
      </div>
    );
  }

  return <td {...restProps}>{childNode}</td>;
};
export default EditableCell;
