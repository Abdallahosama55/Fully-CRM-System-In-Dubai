import { Button, Form, message, Skeleton } from "antd";
import React, { useEffect, useState } from "react";
import BookPackageSection from "./components/BookPackageSection";
// images
import { PackagesSVG } from "assets/jsx-svg";
import passengerPNG from "assets/images/passengerPNG.png";
import contactUsPNG from "assets/images/contactUsPNG.png";
import documentsPNG from "assets/images/documentsPNG.png";
import moneyPNG from "assets/images/moneyPNG.png";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import useSessionStorage from "hooks/useSessionStorage";
import { MEETING_PARTICIPANTS_STORAGE_KEY } from "constants/MEETING_PARTICIPANTS_STORAGE_KEY";
import dayjs from "dayjs";
import ROUTER_URLS from "constants/ROUTER_URLS";
import SelectCustomerModal from "components/SelectCustomerModal";
import PassengersDataForm from "./components/PassengersDataForm";
import ContactDataForm from "./components/ContactDataForm";
import TermsAndCondation from "./components/TermsAndCondation";
import { useForm } from "antd/es/form/Form";
import PackageInfo from "./components/PackageInfo";
import useGetFinalPrice from "services/travel/booking/Package/Queries/useGetFinalPrice";
import useBookPackage from "services/travel/booking/Package/Mutations/useBookPackage";

const BookPackage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { state } = useLocation();
  const [form] = useForm();
  const [participants] = useSessionStorage(MEETING_PARTICIPANTS_STORAGE_KEY, []);
  const [isOpen, setIsOpen] = useState(false);
  const [customerId, setCustomerId] = useState(undefined);

  const bookPackageMutation = useBookPackage({
    onSuccess: (res, payload) => {
      console.log({ res, payload });
      if (res?.statusCode === 409) {
        message.error(res?.message);
        return;
      }
      message.success("Package booked successfully");
    },
    onError: (error) => {
      message?.error(error?.message);
    },
  });

  const finalPriceQuery = useGetFinalPrice({
    tripId: id,
    children: state?.childs,
    adults: state?.adult,
    services:
      state?.items &&
      Object.entries(state?.items)?.map(([_, object]) => {
        return {
          type: object?.type,
          id: object?.value,
        };
      }),
  });

  useEffect(() => {
    if (!state) {
      navigate(ROUTER_URLS.TRAVEL.PACKAGES.VIEW?.replace(":id", id) + id);
    }
  }, [state]);

  const handelFinish = (values) => {
    if (participants && participants.length > 0 && !customerId) {
      setIsOpen(true);
      return;
    }

    const temp = {
      ...values,
      tripId: id,
      date: state?.date,
      children: state?.childs?.split("-")?.map((item) => parseInt(item)),
      adults: state?.adult,
      holderEmail: values.holderEmail,
      holderMobile: values.holderMobile,
      paxes: values?.paxes?.map((el) => ({
        ...el,
        dateOfBirth: dayjs(el?.dateOfBirth).format("YYYY-MM-DD"),
        passportExpiry: dayjs(el?.passportExpiry).format("YYYY-MM-DD"),
      })),
      services: Object.entries(state?.items)?.map(([_, obj]) => {
        return { type: obj?.type, id: obj?.value };
      }),
      customerId,
      isMeeting: customerId ? true : false,
      packageInfo: undefined,
      items: undefined,
    };

    console.log(temp);

    bookPackageMutation.mutate(temp);
  };

  console.log("state", state);
  return (
    <div className="book_page">
      <div className="page_content">
        {participants && (
          <SelectCustomerModal
            isOpen={isOpen}
            close={() => setIsOpen(false)}
            participants={participants}
            handleOk={(id) => {
              setCustomerId(id);
              setIsOpen(false);
              form.submit();
            }}
          />
        )}
        <Form
          form={form}
          layout="vertical"
          onFinish={handelFinish}
          scrollToFirstError={{
            behavior: "smooth",
          }}>
          <BookPackageSection title="Package" icon={<PackagesSVG color="#2D6ADB" />}>
            <PackageInfo {...state?.packageInfo} finalPrice={finalPriceQuery?.data} />
          </BookPackageSection>
          <BookPackageSection
            title="Passengers Data"
            icon={<img src={passengerPNG} alt="passengerPNG" />}>
            <PassengersDataForm adults={state?.adult} childs={state?.child} />
          </BookPackageSection>
          <BookPackageSection
            title="Contact Information"
            icon={<img src={contactUsPNG} alt="contactUsPNG" />}>
            <ContactDataForm />
          </BookPackageSection>
          <BookPackageSection
            title="Terms and conditions"
            icon={<img src={documentsPNG} alt="documentsPNG" />}>
            <TermsAndCondation termsAndConditions={state?.packageInfo?.termsAndConditions} />
          </BookPackageSection>
          <BookPackageSection title="Total Due" icon={<img src={moneyPNG} alt="moneyPNG" />}>
            <div className="space-between">
              <span className="fz-16 fw-500">Gross Total Due</span>
              <span className="fz-22 fw-700">
                {finalPriceQuery?.isFetching ? (
                  <Skeleton.Node style={{ height: "40px" }} />
                ) : (
                  `${finalPriceQuery?.data} USD`
                )}
              </span>
            </div>
          </BookPackageSection>
          <div className="book_btns space-between">
            <Button type="default" onClick={() => navigate(-1)}>
              Back
            </Button>
            <Button
              type="primary"
              htmlType="submit"
              // loading={preBookMutation?.isPending || bookAccommodationLocal?.isPending}
            >
              Book
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default BookPackage;
