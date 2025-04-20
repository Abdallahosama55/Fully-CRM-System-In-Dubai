import { useQueryClient } from "@tanstack/react-query";
import { Button, Card, Form, Space, message } from "antd";
import useCompanyInfoMutation from "services/newSettings/Mutations/useCompanyInfoMutation";
import "../styles.css";
import WorkingTimes from "./WorkingTimes";
import { days } from "../utils";
import dayjs from "dayjs";
import { useState } from "react";

const CompanyWorkingTimes = ({ data, queryKey }) => {
  const [form] = Form.useForm();
  const [checkedDays, setCheckedDays] = useState([]);

  const { editWorkingTime, isPendingEditWorkingTime } = useCompanyInfoMutation();
  const queryClient = useQueryClient();

  const mapWorkTimes = (formValues) => {
    const workingDays = days.filter((day) => formValues?.workingTimes?.[day + "Select"]);
    const workingTimes = workingDays.map((day, index) => ({
      id: index + 1,
      dayName: day,
      daySlips: [
        {
          slipId: 1,
          startTime: dayjs(formValues?.workingTimes?.[day + "Time"]?.[0])?.format("HH:mm"),
          endTime: dayjs(formValues?.workingTimes?.[day + "Time"]?.[1])?.format("HH:mm"),
          noHours: +(formValues?.workingTimes?.[day + "Total"]?.split(":")?.[0] ?? "0"),
        },
      ],
    }));

    return {
      data: {
        workingTimes,
      },
    };
  };

  const onFinish = (values) => {
    const mappedDays = mapWorkTimes(values);
    editWorkingTime({ id: data?.id, data: mappedDays })
      .then(() => {
        message.success("Company working hours updated Successfully");
        queryClient.invalidateQueries({ queryKey });
      })
      .catch(() => {
        message.error("Failed to update company working hours");
      });
  };

  const handleReset = () => {
    form.resetFields();
    const days = data?.companyWorkingTimes?.workingTimes?.map((day) => day.dayName) ?? [];
    setCheckedDays(days);
  };

  return (
    <Form className="company-info-setting" onFinish={onFinish} layout="vertical" form={form}>
      <Card bordered={false} className="info-card">
        <div className="d-flex justify-end" style={{ marginBottom: 16 }}>
          <Space>
            <Button size="small" onClick={handleReset}>
              Reset
            </Button>
            <Button
              size="small"
              type="primary"
              htmlType="submit"
              loading={isPendingEditWorkingTime}>
              Save
            </Button>
          </Space>
        </div>
        <WorkingTimes
          form={form}
          data={data}
          checkedDays={checkedDays}
          setCheckedDays={setCheckedDays}
        />
      </Card>
    </Form>
  );
};

export default CompanyWorkingTimes;
