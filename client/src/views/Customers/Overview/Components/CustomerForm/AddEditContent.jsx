import { Col, Divider, Form, message } from "antd";
import { useState } from "react";
import { PersonalInfoField } from "./PersonalInfo";
import { ContentDetailsFields } from "./ContactDetails";
import { AddressContent } from "./Address";
import Footer from "./Footer";
import { omit } from "lodash-es";
import useGetCustomerById from "services/Customers/Querys/useGetCustomerById";
import useUpdateCustomer from "services/Customers/Mutations/useUpdateCustomerProfile";
import { omitBy, isUndefined, isNull } from "lodash";
import dayjs from "dayjs";
import { useQueryClient } from "@tanstack/react-query";
import { useNotification } from "context/notificationContext";
import Header from "./Header";
import CustomerSectionHeader from "./CustomerSectionHeader";
import {
  ContactInformationSVG,
  CustomerLocationSVG,
  EditCustomerTitleSVG,
  PersonalInformationCustomerSVG,
} from "assets/jsx-svg";
import AvatarUpload from "../AvatarUpload";
import useAddCustomer from "services/Customers/Mutations/useAddCustomer";
import { QUERY_KEY } from "services/constants";

const formatData = (data) => {
  const omitData = omit(data, [
    "jobPosition",
    "nationalities",
    "category",
    "companies",
    "customerDimensions",
    "mobile",
    "profileImage",
    "BOD",
    "countryLocation",
    "stateLocation",
  ]);

  return {
    ...omitData,
    mobile: data?.mobile
      ? {
          prefix: data?.prefix,
          mobile: data.mobile,
        }
      : undefined,
    image: data.profileImage,
    BOD: data?.BOD ? dayjs(data?.BOD) : undefined,
    jobTitleId: data.jobPosition?.id,
    nationalityId: data?.nationalities.length > 0 ? data?.nationalities[0]?.id : undefined,
    categoryId: data.category?.id,
    countryId: data?.countryLocation?.id,
    stateId: data?.stateLocation?.id,
  };
};
const AddEditContent = ({ onCancel, id, onUpdateSuccess, isCompany }) => {
  const { openNotificationWithIcon } = useNotification();
  const [previewPicData, setPreviewPicData] = useState(null);
  const [form] = Form.useForm();
  const [selectedCompanyValue, setSelectedCompanyValue] = useState({ value: "", option: {} });
  const countryId = Form.useWatch("countryId", form);
  const statesId = Form.useWatch("stateId", form);
  const { data, key } = useGetCustomerById(id, {
    refetchOnMount: false,
    enabled: Boolean(id),
    select: (data) => {
      return formatData(data.data.data);
    },
  });
  const queryClient = useQueryClient();
  const { updateCustomer, isPending: isPendingUpdateCustomer } = useUpdateCustomer(id, {
    onSuccess: (data) => {
      openNotificationWithIcon("success", `Edited successfully`);
      queryClient.invalidateQueries({ queryKey: key });
      onUpdateSuccess?.();
      onCancel();
    },
    onError: (data) => {
      openNotificationWithIcon(
        "error",
        data?.response?.data?.errors ?? data?.response?.data?.message,
      );
    },
  });
  const { addCustomer, isPending: isPendingAddCustomer } = useAddCustomer({
    onError: (data) => {
      message.error(data?.response?.data?.errors ?? data?.response?.data?.message);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.CUSTOMERS] });
      message.success(data.data.message);
      onCancel();
    },
  });

  const onFinish = (item) => {
    console.log("item selectedCompanyValue==>", selectedCompanyValue);
    console.log("item==>", item);

    const form = new FormData();

    Object.entries(
      omitBy(item, (value) => {
        return isUndefined(value) || isNull(value) || value === "null" || value == "";
      }),
    ).forEach(async ([key, value]) => {
      if (key == "companyName") {
      }

      if (key === "image") {
        if (typeof value === "string" && value.length > 2) {
          //check if the image is deleted
          previewPicData ? form.append(key, value) : form.append(key, null);
        } else {
          form.append(key, previewPicData);
        }
      } else if (key === "mobile") {
        console.log("value", value);
        form.append("prefix", value?.prefix);
        form.append(key, value?.mobile);
      } else form.append(key, value);
    });

    form.delete("companyName");
    if (Object.keys(selectedCompanyValue.option).length > 0) {
      form.append("linkToCompanyAccountId", selectedCompanyValue.option?.key);
    } else {
      form.append("companyName", selectedCompanyValue?.value);
    }
    form.append("type", isCompany ? "COMPANY" : "LEAD");
    id ? updateCustomer(form) : addCustomer(form);
  };
  const getPageTitle = () => {
    if (isCompany && id) {
      return "Edit Company Info";
    }
    if (isCompany && !id) {
      return "Add Company Info";
    }
    if (!isCompany && id) {
      return "Edit Contact Info";
    }
    if (!isCompany && !id) {
      return "Add Contact Info";
    }
  };
  return (
    <>
      <Form
        initialValues={{ ...data, companyName: data?.customerCompany?.fullName }}
        form={form}
        size={"small"}
        layout="vertical"
        labelAlign="left"
        colon={false}
        onFinish={onFinish}
        labelCol={{
          span: 24,
        }}
        wrapperCol={{
          span: 23,
        }}>
        <Header
          isLoading={isPendingUpdateCustomer || isPendingAddCustomer}
          onCancel={onCancel}
          onSave={() => form.submit()}
          title={getPageTitle()}></Header>
        <Divider></Divider>

        <CustomerSectionHeader
          SvgIcon={PersonalInformationCustomerSVG}
          title={isCompany ? "Company Information" : "Personal Information"}
        />
        <Form.Item name="image" label="" className="avater-label">
          <AvatarUpload
            setPreviewPicData={setPreviewPicData}
            title={isCompany ? "Company Picture" : "Contact Picture"}
          />
        </Form.Item>
        <PersonalInfoField
          setSelectedValue={setSelectedCompanyValue}
          selectedValue={selectedCompanyValue}
          isCompany={isCompany}
          columns={8}>
          <CustomerSectionHeader SvgIcon={ContactInformationSVG} title={"Contact Information"} />
          <ContentDetailsFields column={8} />
          <CustomerSectionHeader SvgIcon={CustomerLocationSVG} title={"Address Information"} />

          <AddressContent
            columns={8}
            streetColumn={8}
            countryId={countryId}
            statesId={statesId}
            form={form}
          />
        </PersonalInfoField>
      </Form>
    </>
  );
};
export default AddEditContent;
