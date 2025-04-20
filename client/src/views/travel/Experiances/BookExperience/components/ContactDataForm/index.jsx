import { Col, DatePicker, Form, Input, Row, Select } from "antd";
import React, { useMemo } from "react";
import { SYSTEM_CONTACT_INFORMTION_KEY } from "../..";
import CityInput from "components/common/CityInput";
import dayjs from "dayjs";
import useGetLanguages from "services/travel/experiance/ExperianceTab/Querys/useGetLanguages";
import useGetNationalites from "services/travel/accommodations/common/Queries/useGetNationalites";
import PhoneNumberInput from "components/common/PhoneNumberInput";

const getColProps = (questionsCount) => {
  return {
    lg: questionsCount < 4 ? 24 / questionsCount : 6,
    md: questionsCount < 4 ? 24 / questionsCount : 8,
    sm: questionsCount < 2 ? 24 : 12,
    xs: 24,
  };
};

const getQuestionByKey = (key, questions) => {
  return questions?.find((el) => el.key === key);
};

const ContactDataForm = ({ questions }) => {
  const languagesQuery = useGetLanguages();
  const nationalitesQuery = useGetNationalites();

  // const firstName = useMemo(() => getQuestionByKey(SYSTEM_CONTACT_INFORMTION_KEY.FIRST_NAME, questions), [questions]);
  // const lastName = useMemo(() => getQuestionByKey(SYSTEM_CONTACT_INFORMTION_KEY.LAST_NAME, questions), [questions]);
  const gender = useMemo(
    () => getQuestionByKey(SYSTEM_CONTACT_INFORMTION_KEY.GENDER, questions),
    [questions],
  );
  const address = useMemo(
    () => getQuestionByKey(SYSTEM_CONTACT_INFORMTION_KEY.ADDRESS, questions),
    [questions],
  );
  const dateOfBirth = useMemo(
    () => getQuestionByKey(SYSTEM_CONTACT_INFORMTION_KEY.DATE_OF_BIRTH, questions),
    [questions],
  );
  // const email = useMemo(() => getQuestionByKey(SYSTEM_CONTACT_INFORMTION_KEY.EMAIL, questions), [questions]);
  const language = useMemo(
    () => getQuestionByKey(SYSTEM_CONTACT_INFORMTION_KEY.LANGUAGE, questions),
    [questions],
  );
  const nationality = useMemo(
    () => getQuestionByKey(SYSTEM_CONTACT_INFORMTION_KEY.NATIONALITY, questions),
    [questions],
  );
  const organization = useMemo(
    () => getQuestionByKey(SYSTEM_CONTACT_INFORMTION_KEY.ORGANIZATION, questions),
    [questions],
  );
  const passportExpiry = useMemo(
    () => getQuestionByKey(SYSTEM_CONTACT_INFORMTION_KEY.PASSPORT_EXPIRY, questions),
    [questions],
  );
  const passportId = useMemo(
    () => getQuestionByKey(SYSTEM_CONTACT_INFORMTION_KEY.PASSPORT_ID, questions),
    [questions],
  );
  const personalIdNumber = useMemo(
    () => getQuestionByKey(SYSTEM_CONTACT_INFORMTION_KEY.PERSONAL_ID_NUMBER, questions),
    [questions],
  );
  const phoneNumber = useMemo(
    () => getQuestionByKey(SYSTEM_CONTACT_INFORMTION_KEY.PHONE_NUMBER, questions),
    [questions],
  );
  const title = useMemo(
    () => getQuestionByKey(SYSTEM_CONTACT_INFORMTION_KEY.TITLE, questions),
    [questions],
  );

  return (
    <Row gutter={[12, 12]}>
      {title && (
        <Col {...getColProps(questions?.length || 3)}>
          <Form.Item
            name={"holderTitle"}
            label={title?.name}
            rules={[
              {
                required: title.isRequired,
                message: `Enter ${title?.name?.toLowerCase()}`,
              },
            ]}>
            <Select
              placeholder="title"
              options={[
                { label: "Mr", value: "mr" },
                { label: "Mss", value: "mss" },
              ]}
            />
          </Form.Item>
        </Col>
      )}
      <Col {...getColProps(questions?.length || 3)}>
        <Form.Item
          name={"holderFirstName"}
          label={"First Name"}
          rules={[
            {
              required: true,
              message: `Enter first name`,
            },
          ]}>
          <Input placeholder="first name" />
        </Form.Item>
      </Col>
      <Col {...getColProps(questions?.length || 3)}>
        <Form.Item
          name={"holderLastName"}
          label={"Last name"}
          rules={[
            {
              required: true,
              message: `Enter last name`,
            },
          ]}>
          <Input placeholder="last name" />
        </Form.Item>
      </Col>
      {gender && (
        <Col {...getColProps(questions?.length || 3)}>
          <Form.Item
            name={"holderGender"}
            label={gender?.name}
            rules={[
              {
                required: gender.isRequired,
                message: `Enter ${gender?.name?.toLowerCase()}`,
              },
            ]}>
            <Select
              placeholder="gender"
              options={[
                { label: "Male", value: "male" },
                { label: "female", value: "female" },
              ]}
            />
          </Form.Item>
        </Col>
      )}
      {address && (
        <Col {...getColProps(questions?.length || 3)}>
          <Form.Item
            name={"holderAddress"}
            label={address?.name}
            rules={[
              {
                required: address.isRequired,
                message: `Enter ${address?.name?.toLowerCase()}`,
              },
            ]}>
            <CityInput className="w-100" placeholder="address" />
          </Form.Item>
        </Col>
      )}
      {dateOfBirth && (
        <Col {...getColProps(questions?.length || 3)}>
          <Form.Item
            name={"holderDateOfBirth"}
            label={dateOfBirth?.name}
            rules={[
              {
                required: dateOfBirth.isRequired,
                message: `Enter ${dateOfBirth?.name?.toLowerCase()}`,
              },
            ]}>
            <DatePicker
              placeholder="Date of birth"
              className="w-100"
              disabledDate={(day) => dayjs(day).isAfter(dayjs(new Date()))}
            />
          </Form.Item>
        </Col>
      )}
      <Col {...getColProps(questions?.length || 3)}>
        <Form.Item
          name={"holderEmail"}
          label={"Email"}
          rules={[
            {
              required: true,
              message: `Enter email address`,
            },
            { type: "email", message: `Enter valid email address` },
          ]}>
          <Input placeholder="email" />
        </Form.Item>
      </Col>
      {phoneNumber && (
        <Col {...getColProps(questions?.length || 3)}>
          <Form.Item
            name={"holderPhoneNumber"}
            label={"Phone number"}
            rules={[
              {
                validator: (_, value) => {
                  if (!value || value?.length < 7) {
                    return Promise.reject("Please enter a valid phone number");
                  }

                  return Promise.resolve();
                },
              },
            ]}>
            <PhoneNumberInput />
          </Form.Item>
        </Col>
      )}
      {language && (
        <Col {...getColProps(questions?.length || 3)}>
          <Form.Item
            name={"holderLanguage"}
            label={language?.name}
            rules={[
              {
                required: language.isRequired,
                message: `Enter ${language?.name?.toLowerCase()}`,
              },
            ]}>
            <Select
              placeholder="language"
              disabled={languagesQuery.isLoading}
              showSearch={true}
              options={languagesQuery?.data?.map((el) => {
                return {
                  label: el?.nativeName,
                  value: el?.iso,
                };
              })}
            />
          </Form.Item>
        </Col>
      )}
      {nationality && (
        <Col {...getColProps(questions?.length || 3)}>
          <Form.Item
            name={"holderNationality"}
            label={nationality?.name}
            rules={[
              {
                required: nationality.isRequired,
                message: `Enter ${nationality?.name?.toLowerCase()}`,
              },
            ]}>
            <Select
              placeholder="nationality"
              disabled={languagesQuery.isLoading}
              showSearch={true}
              options={nationalitesQuery?.data?.map((el) => {
                return {
                  label: el?.nationality,
                  value: el?.nationality,
                };
              })}
            />
          </Form.Item>
        </Col>
      )}
      {organization && (
        <Col {...getColProps(questions?.length || 3)}>
          <Form.Item
            name={"holderOrganization"}
            label={organization?.name}
            rules={[
              {
                required: organization.isRequired,
                message: `Enter ${organization?.name?.toLowerCase()}`,
              },
            ]}>
            <Input placeholder="organization" />
          </Form.Item>
        </Col>
      )}
      {passportId && (
        <Col {...getColProps(questions?.length || 3)}>
          <Form.Item
            name={"holderPassportID"}
            label={passportId?.name}
            rules={[
              {
                required: passportId.isRequired,
                message: `Enter ${passportId?.name?.toLowerCase()}`,
              },
            ]}>
            <Input placeholder="passport Id" type="number" />
          </Form.Item>
        </Col>
      )}
      {passportExpiry && (
        <Col {...getColProps(questions?.length || 3)}>
          <Form.Item
            name={"holderPassportExpiry"}
            label={passportExpiry?.name}
            rules={[
              {
                required: passportExpiry.isRequired,
                message: `Enter ${passportExpiry?.name?.toLowerCase()}`,
              },
            ]}>
            <DatePicker
              placeholder="passport expiry date"
              className="w-100"
              disabledDate={(day) => dayjs(day).isBefore(dayjs(new Date()))}
            />
          </Form.Item>
        </Col>
      )}
      {personalIdNumber && (
        <Col {...getColProps(questions?.length || 3)}>
          <Form.Item
            name={"holderPersonalIDNumber"}
            label={personalIdNumber?.name}
            rules={[
              {
                required: personalIdNumber.isRequired,
                message: `Enter ${personalIdNumber?.name?.toLowerCase()}`,
              },
            ]}>
            <Input placeholder="personal Id" />
          </Form.Item>
        </Col>
      )}
    </Row>
  );
};

export default ContactDataForm;
