import { useState, useEffect, useContext } from "react";
import { Button, Col, Form, Image, Input, Radio, Row, Typography } from "antd";

import "./styles.css";
import SurveyService from "services/survey.service";
import userContext from "context/userContext";

import vverseLogo from "assets/images/vverseLogo.png";
import Logo from "components/common/Logo";

export default function CreateMetaverseForm({
  lang = "en",
  isAuth = false,
  setModalOpen,
}) {
  const { user } = useContext(userContext);
  const [form] = Form.useForm();
  const [radioValue, setRadioValue] = useState("");

  useEffect(() => {
    form.setFieldValue("companyFieldMore", "");
  }, [radioValue]);

  const onFinish = async (values) => {
    await SurveyService.addSurvey({
      name: user.fullName,
      phone: values.phone,
      email: user.email,
      countryName: values.country,
      jobTitle: values.job,
      companyName: values.company,
      companyWorkField:
        radioValue === 7 ? values.companyFieldMore : values.companyField,
    });
    form.resetFields();
    setModalOpen(false);
  };

  return (
    <main className="container-layout">
      <Form
        dir={lang === "ar" ? "rtl" : "ltr"}
        form={form}
        onFinish={onFinish}
        layout="vertical"
        className="create-metaverse-form"
        style={{ margin: isAuth && "0px auto" }}
      >
        <Row
          align={"middle"}
          style={{ marginBottom: "25px", justifyContent: "space-evenly" }}
        >
          <Col>
            <Image preview={false} src={vverseLogo} alt="Vverse Logo" />
          </Col>
          <Col>
            <Logo />
          </Col>
        </Row>
        <Form.Item>
          <Row justify="space-between" align="middle" gutter={[16, 16]}>
            <Col>
              <Typography.Title level={3}>
                {translate[lang].title.split("<br />").join("/n")}
              </Typography.Title>
            </Col>
          </Row>
        </Form.Item>
        <Form.Item>
          <Typography.Text className="fz-16 fw-500 gc">
            {`${translate[lang].subTitle}`}
          </Typography.Text>
        </Form.Item>
        <Form.Item>
          <Typography.Text className="fz-18 fw-500">
            {translate[lang].firstParagraphTitle}
          </Typography.Text>
          <br />
          <Typography.Text>
            {translate[lang].firstParagraph}
          </Typography.Text>{" "}
          <br />
          <br />
          <Typography.Text>{translate[lang].secondeParagraph}</Typography.Text>
        </Form.Item>

        <Form.Item
          name="phone"
          label={lang === "en" ? "Phone Number" : "رقم الهاتف"}
          rules={[
            {
              required: true,
              message:
                lang === "en"
                  ? "Please Enter Your Phone Number"
                  : "الرجاء ادخال رقم الهاتف",
            },
          ]}
        >
          <Input
            placeholder={
              lang === "en" ? "Enter Your Phone Number" : "ادخل رقم الهاتف"
            }
          />
        </Form.Item>

        <Form.Item
          name="country"
          label={lang === "en" ? "Country" : "اسم الدولة"}
          rules={[
            {
              required: true,
              message:
                lang === "en"
                  ? "Please Enter Your Country"
                  : "الرجاء ادخال اسم الدولة",
            },
          ]}
        >
          <Input
            placeholder={
              lang === "en" ? "Enter Your Country" : "ادخل اسم الدولة"
            }
          />
        </Form.Item>
        <Form.Item
          name="job"
          label={lang === "en" ? "Job Title" : "اسم الوظيفة"}
          rules={[
            {
              required: true,
              message:
                lang === "en"
                  ? "Please Enter Your Job Title"
                  : "الرجاء ادخال اسم الوظيفة",
            },
          ]}
        >
          <Input
            placeholder={
              lang === "en" ? "Enter Your Job Title" : "ادخل اسم الوظيفة"
            }
          />
        </Form.Item>
        <Form.Item
          name="company"
          label={lang === "en" ? "Company Name" : "اسم الشركة"}
          rules={[
            {
              required: true,
              message:
                lang === "en"
                  ? "Please Enter Your Company Name"
                  : "الرجاء ادخال اسم الشركة",
            },
          ]}
        >
          <Input
            placeholder={
              lang === "en" ? "Enter Your Company Name" : "ادخل اسم الشركة"
            }
          />
        </Form.Item>
        <Form.Item
          name="companyField"
          label={
            lang === "en" ? "The company's field of work" : "مجال عمل الشركة"
          }
          rules={[
            {
              required: true,
              message:
                lang === "en"
                  ? "Please Select Your Company field"
                  : "الرجاء اختيار مجال عمل الشركة",
            },
          ]}
        >
          <Radio.Group
            onChange={(e) => setRadioValue(e.target.value)}
            value={radioValue}
          >
            <Row gutter={[0, 12]}>
              <Col xs={24}>
                <Radio value={lang === "en" ? "Retail" : "البيع بالتجزئة"}>
                  {lang === "en" ? "Retail" : "البيع بالتجزئة"}
                </Radio>
              </Col>
              <Col xs={24}>
                <Radio value={lang === "en" ? "Education" : "التعليم"}>
                  {lang === "en" ? "Education" : "التعليم"}
                </Radio>
              </Col>
              <Col xs={24}>
                <Radio value={lang === "en" ? "Real Estate" : "العقارات"}>
                  {lang === "en" ? "Real Estate" : "العقارات"}
                </Radio>
              </Col>
              <Col xs={24}>
                <Radio
                  value={
                    lang === "en" ? "Tourism and Travel" : "السياحة والسفر"
                  }
                >
                  {lang === "en" ? "Tourism and Travel" : "السياحة والسفر"}
                </Radio>
              </Col>
              <Col xs={24}>
                <Radio value={lang === "en" ? "Marketing" : "التسويق"}>
                  {lang === "en" ? "Marketing" : "التسويق"}
                </Radio>
              </Col>
              <Col xs={24}>
                <Radio
                  value={
                    lang === "en"
                      ? "We are not a company.. We work in the government sector"
                      : "لسنا شركة .. نعمل في قطاع الحكومات  "
                  }
                >
                  {lang === "en"
                    ? "We are not a company.. We work in the government sector"
                    : "لسنا شركة .. نعمل في قطاع الحكومات  "}
                </Radio>
              </Col>
              <Col xs={24}>
                <Radio value={7}>
                  {lang === "en" ? "Other..." : "أخرى... "}
                  <Form.Item
                    name="companyFieldMore"
                    noStyle
                    rules={[
                      {
                        required: radioValue === 7,
                        message: "Please Enter Your Company field",
                      },
                    ]}
                  >
                    <Input
                      disabled={radioValue !== 7}
                      style={{
                        width: 400,
                        marginLeft: 10,
                      }}
                    />
                  </Form.Item>
                </Radio>
              </Col>
            </Row>
          </Radio.Group>
        </Form.Item>
        <Form.Item>
          <Row justify="end">
            <Button htmlType="submit" type="primary">
              {lang === "en" ? "Submit" : "قدِّم"}
            </Button>
          </Row>
        </Form.Item>
      </Form>
    </main>
  );
}

const translate = {
  en: {
    title: "Create your own virtual environment using Metaverse!",
    subTitle: `Now is your chance to outperform the competitors! 
    Transform your business into a 3D virtual environment using Metaverse,
    Discover a new dimension of participation and interaction through our leading virtual experience platform!`,
    firstParagraphTitle: `We offer endless possibilities for businesses!`,
    firstParagraph: `The virtual experience is not just for entertainment, it has changed the rules of the game for companies, as our platform opens up a world of opportunities to showcase products, host virtual conferences, and connect with customers like never before.`,
    secondeParagraph: `Join the virtual revolution today! Get ahead of everyone else and register now to customize your virtual experience!`,
  },

  ar: {
    title: "أنشئ بيئتك الإفتراضية بإستخدام الميتافيرس!",
    subTitle: `فُرصتك الآن للتفوّق على المنافسين! 
    حوّل عملك الخاص الى بيئة إفتراضية ثلاثية الأبعاد بإستخدام الميتافيرس،
    اكتشف بُعداً جديداً للمشاركة والتفاعل من خلال منصتنا الرائدة للتجربة الإفتراضية!`,
    firstParagraphTitle: `نُقدم إمكانيات لا حصر لها للشركات!`,
    firstParagraph: `نُقدم إمكانيات لا حصر لها للشركات!
    التجربة الإفتراضية ليست للترفيه فقط، لقد غيّرت قواعد اللعبة للشركات، حيث تفتح منصتنا عالماً من الفرص لعرض المنتجات واستضافة المؤتمرات الإفتراضية والتواصل مع العملاء كما لم يحدث من قبل.`,
    secondeParagraph: `انضم إلى الثورة الإفتراضية اليوم!إسبق الجميع وسجّل الآن لتخصيص تجربتك الإفتراضية!`,
  },
};
