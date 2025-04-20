import React from 'react'
import { Col, DatePicker, Divider, Form, Input, Row, Select, Skeleton } from 'antd'
import { InfoSVG } from 'assets/jsx-svg'
import GeneralInput from '../GeneralInput'
import { SYSTEM_CONTACT_INFORMTION_KEY } from '../..'
import CityInput from 'components/common/CityInput'
import dayjs from 'dayjs'
import PhoneNumberInput from 'components/common/PhoneNumberInput'
import useGetLanguages from 'services/travel/experiance/ExperianceTab/Querys/useGetLanguages'
import useGetNationalites from 'services/travel/accommodations/common/Queries/useGetNationalites'

const getColProps = (questionsCount) => {
    return {
        lg: questionsCount < 4 ? (24 / questionsCount) : 6,
        md: questionsCount < 4 ? (24 / questionsCount) : 8,
        sm: questionsCount < 2 ? 24 : 12,
        xs: 24,
    }
}

const getQuestionByKey = (key, questions) => {
    return questions?.find(el => el.key === key);
}

const PassengersDataForm = ({ adults, childs, bookingKey, questions }) => {
    const languagesQuery = useGetLanguages();
    const nationalitesQuery = useGetNationalites();
    if (!questions) {
        return <Skeleton active />
    }

    const firstName = getQuestionByKey(SYSTEM_CONTACT_INFORMTION_KEY.FIRST_NAME, questions);
    const lastName = getQuestionByKey(SYSTEM_CONTACT_INFORMTION_KEY.LAST_NAME, questions);
    const gender = getQuestionByKey(SYSTEM_CONTACT_INFORMTION_KEY.GENDER, questions);
    const address = getQuestionByKey(SYSTEM_CONTACT_INFORMTION_KEY.ADDRESS, questions);
    const dateOfBirth = getQuestionByKey(SYSTEM_CONTACT_INFORMTION_KEY.DATE_OF_BIRTH, questions);
    const email = getQuestionByKey(SYSTEM_CONTACT_INFORMTION_KEY.EMAIL, questions);
    const language = getQuestionByKey(SYSTEM_CONTACT_INFORMTION_KEY.LANGUAGE, questions);
    const nationality = getQuestionByKey(SYSTEM_CONTACT_INFORMTION_KEY.NATIONALITY, questions);
    const organization = getQuestionByKey(SYSTEM_CONTACT_INFORMTION_KEY.ORGANIZATION, questions);
    const passportExpiry = getQuestionByKey(SYSTEM_CONTACT_INFORMTION_KEY.PASSPORT_EXPIRY, questions);
    const passportId = getQuestionByKey(SYSTEM_CONTACT_INFORMTION_KEY.PASSPORT_ID, questions);
    const personalIdNumber = getQuestionByKey(SYSTEM_CONTACT_INFORMTION_KEY.PERSONAL_ID_NUMBER, questions);
    const phoneNumber = getQuestionByKey(SYSTEM_CONTACT_INFORMTION_KEY.PHONE_NUMBER, questions);
    const title = getQuestionByKey(SYSTEM_CONTACT_INFORMTION_KEY.TITLE, questions);
    return (
        <div>
            <Form.Item hidden initialValue={bookingKey} name={"bookingKey"} />

            {
                [...new Array(adults || 0)]?.map((_, index) => {
                    return <Row gutter={[12, 12]} key={index}>
                        <Form.Item
                            hidden
                            initialValue={"adult"}
                            name={["paxes", index, "type"]}
                        />
                        <Col span={24}>
                            <p className='fz-14 fw-600'>{index + 1}. Passenger (Adult)</p>
                        </Col>
                        {title && <Col {...getColProps(questions.length)}>
                            <Form.Item
                                name={["paxes", index, "title"]}
                                label={title?.name}
                                rules={[{
                                    required: title.isRequired,
                                    message: `Enter ${title?.name?.toLowerCase()}`
                                }]}
                            >
                                <Select
                                    placeholder="title"
                                    options={[
                                        { label: "Mr", value: "mr" },
                                        { label: "Mss", value: "mss" },
                                    ]}
                                />
                            </Form.Item>
                        </Col>}
                        {firstName && <Col {...getColProps(questions.length)}>
                            <Form.Item
                                name={["paxes", index, "firstName"]}
                                label={firstName?.name}
                                rules={[{
                                    required: firstName.isRequired,
                                    message: `Enter ${firstName?.name?.toLowerCase()}`
                                }]}
                            >
                                <Input placeholder='first name' />
                            </Form.Item>
                        </Col>}
                        {lastName && <Col {...getColProps(questions.length)}>
                            <Form.Item
                                name={["paxes", index, "lastName"]}
                                label={lastName?.name}
                                rules={[{
                                    required: lastName.isRequired,
                                    message: `Enter ${lastName?.name?.toLowerCase()}`
                                }]}
                            >
                                <Input placeholder='last name' />
                            </Form.Item>
                        </Col>}
                        {gender && <Col {...getColProps(questions.length)}>
                            <Form.Item
                                name={["paxes", index, "gender"]}
                                label={gender?.name}
                                rules={[{
                                    required: gender.isRequired,
                                    message: `Enter ${gender?.name?.toLowerCase()}`
                                }]}
                            >
                                <Select
                                    placeholder='gender'
                                    options={[
                                        { label: "Male", value: "male" },
                                        { label: "female", value: "female" }
                                    ]} />
                            </Form.Item>
                        </Col>}
                        {address && <Col {...getColProps(questions.length)}>
                            <Form.Item
                                name={["paxes", index, "address"]}
                                label={address?.name}
                                rules={[{
                                    required: address.isRequired,
                                    message: `Enter ${address?.name?.toLowerCase()}`
                                }]}
                            >
                                <CityInput className="w-100" placeholder='address' />
                            </Form.Item>
                        </Col>}
                        {dateOfBirth && <Col {...getColProps(questions.length)}>
                            <Form.Item
                                name={["paxes", index, "dateOfBirth"]}
                                label={dateOfBirth?.name}
                                rules={[{
                                    required: dateOfBirth.isRequired,
                                    message: `Enter ${dateOfBirth?.name?.toLowerCase()}`
                                }]}
                            >
                                <DatePicker placeholder='Date of birth' className="w-100" disabledDate={(day) => dayjs(day).isAfter(dayjs(new Date()))} />
                            </Form.Item>
                        </Col>}
                        {email && <Col {...getColProps(questions.length)}>
                            <Form.Item
                                name={["paxes", index, "email"]}
                                label={email?.name}
                                rules={[{
                                    required: email.isRequired,
                                    message: `Enter ${email?.name?.toLowerCase()}`
                                },
                                { type: "email", message: `Enter valid ${email?.name?.toLowerCase()}` }]}
                            >
                                <Input placeholder='email' />
                            </Form.Item>
                        </Col>}
                        {phoneNumber && <Col {...getColProps(questions.length)}>
                            <Form.Item
                                name={["paxes", index, "phoneNumber"]}
                                label={phoneNumber?.name}
                                rules={[{
                                    validator: (_, value) => {
                                        if (!value || value?.length < 7) {
                                            return Promise.reject('Please enter a valid phone number');
                                        }

                                        return Promise.resolve();
                                    }
                                }]}
                            >
                                <PhoneNumberInput />
                            </Form.Item>
                        </Col>}
                        {language && <Col {...getColProps(questions.length)}>
                            <Form.Item
                                name={["paxes", index, "language"]}
                                label={language?.name}
                                rules={[{
                                    required: language.isRequired,
                                    message: `Enter ${language?.name?.toLowerCase()}`
                                }]}
                            >
                                <Select
                                    placeholder='language'
                                    disabled={languagesQuery.isLoading}
                                    showSearch={true}
                                    options={languagesQuery?.data?.map(el => {
                                        return {
                                            label: el?.nativeName,
                                            value: el?.iso
                                        }
                                    })} />
                            </Form.Item>
                        </Col>}
                        {nationality && <Col {...getColProps(questions.length)}>
                            <Form.Item
                                name={["paxes", index, "nationality"]}
                                label={nationality?.name}
                                rules={[{
                                    required: nationality.isRequired,
                                    message: `Enter ${nationality?.name?.toLowerCase()}`
                                }]}
                            >
                                <Select
                                    placeholder='nationality'
                                    disabled={languagesQuery.isLoading}
                                    showSearch={true}
                                    options={nationalitesQuery?.data?.map(el => {
                                        return {
                                            label: el?.nationality,
                                            value: el?.nationality
                                        }
                                    })}
                                />
                            </Form.Item>
                        </Col>}
                        {organization && <Col {...getColProps(questions.length)}>
                            <Form.Item
                                name={["paxes", index, "organization"]}
                                label={organization?.name}
                                rules={[{
                                    required: organization.isRequired,
                                    message: `Enter ${organization?.name?.toLowerCase()}`
                                }]}
                            >
                                <Input placeholder='organization' />
                            </Form.Item>
                        </Col>}
                        {passportId && <Col {...getColProps(questions.length)}>
                            <Form.Item
                                name={["paxes", index, "passportID"]}
                                label={passportId?.name}
                                rules={[
                                    {
                                        required: passportId.isRequired,
                                        message: `Enter ${passportId?.name?.toLowerCase()}`
                                    },
                                    {
                                        validator: (_, value) => {
                                            console.log('value', value)
                                            if (value && isNaN(value)) {
                                                return Promise.reject('Enter valid passport id');
                                            }

                                            if (value && value?.length < 5) {
                                                return Promise.reject('Passport must be at least 5 numbers');
                                            }
                                            return Promise.resolve();
                                        }
                                    }
                                ]}
                            >
                                <Input placeholder='passport Id' />
                            </Form.Item>
                        </Col>}
                        {passportExpiry && <Col {...getColProps(questions.length)}>
                            <Form.Item
                                name={["paxes", index, "passportExpiry"]}
                                label={passportExpiry?.name}
                                rules={[{
                                    required: passportExpiry.isRequired,
                                    message: `Enter ${passportExpiry?.name?.toLowerCase()}`
                                }
                                ]}
                            >
                                <DatePicker placeholder='passport expiry date' className="w-100" disabledDate={(day) => dayjs(day).isBefore(dayjs(new Date()))} />
                            </Form.Item>
                        </Col>}
                        {personalIdNumber && <Col {...getColProps(questions.length)}>
                            <Form.Item
                                name={["paxes", index, "personalIDNumber"]}
                                label={personalIdNumber?.name}
                                rules={[{
                                    required: personalIdNumber.isRequired,
                                    message: `Enter ${personalIdNumber?.name?.toLowerCase()}`
                                }]}
                            >
                                <Input placeholder='personal Id' />
                            </Form.Item>
                        </Col>}
                    </Row >
                })
            }
            {childs > 0 && <>
                <Divider />
                {
                    [...new Array(childs || 0)]?.map((_, index) => {
                        return <Row gutter={[12, 20]} key={index}>
                            <Form.Item
                                hidden
                                initialValue={"child"}
                                name={["paxes", adults + index, "type"]}
                            />
                            <Col span={24}>
                                <p className='fz-14 fw-600'>{adults + index + 1}. Passenger (Adult)</p>
                            </Col>
                            {title && <Col {...getColProps(questions.length)}>
                                <Form.Item
                                    name={["paxes", adults + index, "title"]}
                                    label={title?.name}
                                    rules={[{
                                        required: title.isRequired,
                                        message: `Enter ${title?.name?.toLowerCase()}`
                                    }]}
                                >
                                    <Select
                                        placeholder="title"
                                        options={[
                                            { label: "Mr", value: "mr" },
                                            { label: "Mss", value: "mss" },
                                        ]}
                                    />
                                </Form.Item>
                            </Col>}
                            {firstName && <Col {...getColProps(questions.length)}>
                                <Form.Item
                                    name={["paxes", adults + index, "firstName"]}
                                    label={firstName?.name}
                                    rules={[{
                                        required: firstName.isRequired,
                                        message: `Enter ${firstName?.name?.toLowerCase()}`
                                    }]}
                                >
                                    <Input placeholder='first name' />
                                </Form.Item>
                            </Col>}
                            {lastName && <Col {...getColProps(questions.length)}>
                                <Form.Item
                                    name={["paxes", adults + index, "lastName"]}
                                    label={lastName?.name}
                                    rules={[{
                                        required: lastName.isRequired,
                                        message: `Enter ${lastName?.name?.toLowerCase()}`
                                    }]}
                                >
                                    <Input placeholder='last name' />
                                </Form.Item>
                            </Col>}
                            {gender && <Col {...getColProps(questions.length)}>
                                <Form.Item
                                    name={["paxes", adults + index, "gender"]}
                                    label={gender?.name}
                                    rules={[{
                                        required: gender.isRequired,
                                        message: `Enter ${gender?.name?.toLowerCase()}`
                                    }]}
                                >
                                    <Select
                                        placeholder='gender'
                                        options={[
                                            { label: "Male", value: "male" },
                                            { label: "female", value: "female" }
                                        ]} />
                                </Form.Item>
                            </Col>}
                            {address && <Col {...getColProps(questions.length)}>
                                <Form.Item
                                    name={["paxes", adults + index, "address"]}
                                    label={address?.name}
                                    rules={[{
                                        required: address.isRequired,
                                        message: `Enter ${address?.name?.toLowerCase()}`
                                    }]}
                                >
                                    <CityInput className="w-100" placeholder='address' />
                                </Form.Item>
                            </Col>}
                            {dateOfBirth && <Col {...getColProps(questions.length)}>
                                <Form.Item
                                    name={["paxes", adults + index, "dateOfBirth"]}
                                    label={dateOfBirth?.name}
                                    rules={[{
                                        required: dateOfBirth.isRequired,
                                        message: `Enter ${dateOfBirth?.name?.toLowerCase()}`
                                    }]}
                                >
                                    <DatePicker placeholder='Date of birth' className="w-100" disabledDate={(day) => dayjs(day).isAfter(dayjs(new Date()))} />
                                </Form.Item>
                            </Col>}
                            {email && <Col {...getColProps(questions.length)}>
                                <Form.Item
                                    name={["paxes", adults + index, "email"]}
                                    label={email?.name}
                                    rules={[{
                                        required: email.isRequired,
                                        message: `Enter ${email?.name?.toLowerCase()}`
                                    },
                                    { type: "email", message: `Enter valid ${email?.name?.toLowerCase()}` }]}
                                >
                                    <Input placeholder='email' />
                                </Form.Item>
                            </Col>}
                            {phoneNumber && <Col {...getColProps(questions.length)}>
                                <Form.Item
                                    name={["paxes", adults + index, "phoneNumber"]}
                                    label={phoneNumber?.name}
                                    rules={[{
                                        validator: (_, value) => {
                                            if (!value.prefix || !value.mobile || value.mobile?.length < 7) {
                                                return Promise.reject('Please enter a valid phone number');
                                            }

                                            return Promise.resolve();
                                        }
                                    }]}
                                >
                                    <PhoneNumberInput />
                                </Form.Item>
                            </Col>}
                            {language && <Col {...getColProps(questions.length)}>
                                <Form.Item
                                    name={["paxes", adults + index, "language"]}
                                    label={language?.name}
                                    rules={[{
                                        required: language.isRequired,
                                        message: `Enter ${language?.name?.toLowerCase()}`
                                    }]}
                                >
                                    <Select
                                        placeholder='language'
                                        disabled={languagesQuery.isLoading}
                                        showSearch={true}
                                        options={languagesQuery?.data?.map(el => {
                                            return {
                                                label: el?.nativeName,
                                                value: el?.iso
                                            }
                                        })} />
                                </Form.Item>
                            </Col>}
                            {nationality && <Col {...getColProps(questions.length)}>
                                <Form.Item
                                    name={["paxes", adults + index, "nationality"]}
                                    label={nationality?.name}
                                    rules={[{
                                        required: nationality.isRequired,
                                        message: `Enter ${nationality?.name?.toLowerCase()}`
                                    }]}
                                >
                                    <Select
                                        placeholder='nationality'
                                        disabled={languagesQuery.isLoading}
                                        showSearch={true}
                                        options={nationalitesQuery?.data?.map(el => {
                                            return {
                                                label: el?.nationality,
                                                value: el?.nationality
                                            }
                                        })}
                                    />
                                </Form.Item>
                            </Col>}
                            {organization && <Col {...getColProps(questions.length)}>
                                <Form.Item
                                    name={["paxes", adults + index, "organization"]}
                                    label={organization?.name}
                                    rules={[{
                                        required: organization.isRequired,
                                        message: `Enter ${organization?.name?.toLowerCase()}`
                                    }]}
                                >
                                    <Input placeholder='organization' />
                                </Form.Item>
                            </Col>}
                            {passportId && <Col {...getColProps(questions.length)}>
                                <Form.Item
                                    name={["paxes", adults + index, "passportID"]}
                                    label={passportId?.name}
                                    rules={[{
                                        required: passportId.isRequired,
                                        message: `Enter ${passportId?.name?.toLowerCase()}`
                                    }]}
                                >
                                    <Input placeholder='passport Id' />
                                </Form.Item>
                            </Col>}
                            {passportExpiry && <Col {...getColProps(questions.length)}>
                                <Form.Item
                                    name={["paxes", adults + index, "passportExpiry"]}
                                    label={passportExpiry?.name}
                                    rules={[{
                                        required: passportExpiry.isRequired,
                                        message: `Enter ${passportExpiry?.name?.toLowerCase()}`
                                    }
                                    ]}
                                >
                                    <DatePicker placeholder='passport expiry date' className="w-100" disabledDate={(day) => dayjs(day).isBefore(dayjs(new Date()))} />
                                </Form.Item>
                            </Col>}
                            {personalIdNumber && <Col {...getColProps(questions.length)}>
                                <Form.Item
                                    name={["paxes", adults + index, "personalIDNumber"]}
                                    label={personalIdNumber?.name}
                                    rules={[{
                                        required: personalIdNumber.isRequired,
                                        message: `Enter ${personalIdNumber?.name?.toLowerCase()}`
                                    }]}
                                >
                                    <Input placeholder='personal Id' />
                                </Form.Item>
                            </Col>}
                        </Row>
                    })
                }
            </>}
            <p className="d-flex" style={{ gap: "6px", alignItems: "center" }}>
                <InfoSVG />
                <span>Use all given names and surnames exactly as they appear in your passport/iD to avoid boarding complications.</span>
            </p>
        </div>
    )
}

export default PassengersDataForm