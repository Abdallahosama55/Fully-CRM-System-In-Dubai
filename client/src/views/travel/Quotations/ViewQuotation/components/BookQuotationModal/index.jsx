import { Flex, message, Modal, Tag } from "antd";
import dayjs from "dayjs";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import useBookQuotation from "services/travel/quotation/Mutations/useBookQuotation";
import ContactDataForm from "./ContactDataForm";
import PassengersDataForm from "./PassengersDataForm";
import QUOTATION_ITEM_TYPES from "constants/QUOTATION_ITEM_TYPES";

const BookQuotationModal = ({ isOpen, quotation = {}, close, qutationItems, searchParams }) => {
  const { id } = useParams();
  const [activeStep, setActiveStep] = useState(0);
  const [stepsData, setStepsData] = useState([{}, ...qutationItems?.map(() => ({}))]);
  const [addedPassengers, setAddedPassengers] = useState([]);

  const handelUpdatePassengers = (passenger) => {
    if (!addedPassengers?.find((pax) => pax?.passportID === passenger?.passportID)) {
      setAddedPassengers((prev) => [...prev, passenger]);
      return;
    }
    setAddedPassengers((prev) => [
      ...prev.map((pax) => (pax?.passportID === passenger?.passportID ? passenger : pax)),
    ]);
  };

  const handelNext = (values) => {
    if (activeStep === 0) {
      handelUpdatePassengers({
        firstName: values?.holderFirstName,
        lastName: values?.holderLastName,
        dateOfBirth: values?.holderDateOfBirth,
        passportID: values?.holderPassportID,
        passportExpiry: values?.holderPassportExpiry,
        nationality: values?.holderNationality,
      });
    } else {
      values?.paxes?.forEach((pax) => {
        handelUpdatePassengers(pax);
      });
    }

    if (activeStep === qutationItems?.length) {
      handelFinish(stepsData?.map((step, index) => (index === activeStep ? values : step)));
      return;
    }

    setStepsData((prev) => prev?.map((step, index) => (index === activeStep ? values : step)));
    setActiveStep((prev) =>
      prev + 1 < qutationItems?.length + 1 ? prev + 1 : qutationItems?.length + 1,
    );
  };

  const handelPrev = (values) => {
    if (activeStep === 0) {
      close();
      return;
    }
    setStepsData((prev) => prev?.map((step, index) => (index === activeStep ? values : step)));
    setActiveStep((prev) => (prev - 1 >= 0 ? prev - 1 : 0));
  };

  const bookQuotation = useBookQuotation({
    onSuccess: () => {
      message.success("Quotation booked successfully");
      close();
    },
    onError: (error) => {
      message.error(error.message || "Something went wrong");
    },
  });

  const handelFinish = (values) => {
    if (!values || (Array.isArray(values) && values.length === 0)) {
      return;
    }

    const groupPaxesByRooms = (paxes, rooms) => {
      return rooms?.map((room, roomIndex) => ({
        bookingKey: room?.bookingKey,
        roomName: room?.name,
        mealType: room?.mealType || "",
        pax: `${room?.adults}${
          room?.childs
            ? `-${paxes
                ?.filter((el) => el?.roomIndex === roomIndex && el?.type === "CHILD")
                ?.map(({ dateOfBirth }) => dayjs().diff(dayjs(dateOfBirth), "year"))
                ?.join("-")}`
            : ""
        }`,
        paxes: paxes?.filter((el) => el?.roomIndex === roomIndex),
      }));
    };

    bookQuotation.mutate({
      qutationId: id,
      ...values[0],
      holderPassportExpiry: dayjs(values[0]?.holderPassportExpiry).format("YYYY-MM-DD"),
      holderDateOfBirth: dayjs(values[0]?.holderDateOfBirth).format("YYYY-MM-DD"),
      holderMobile: values?.[0]?.holderMobile,
      items: values?.slice(1)?.map((step, index) => {
        return {
          type: qutationItems[index]?.type,
          name: qutationItems[index]?.name,
          itemId: qutationItems[index]?.itemId,
          rooms:
            qutationItems[index]?.type === QUOTATION_ITEM_TYPES?.ACCOMMODATION
              ? groupPaxesByRooms(step?.paxes, qutationItems?.[index]?.details?.rooms)
              : undefined,
          paxes:
            qutationItems[index]?.type !== QUOTATION_ITEM_TYPES?.ACCOMMODATION
              ? step?.paxes?.map((pax) => ({
                  ...pax,
                  passportExpiry: dayjs(pax?.passportExpiry).format("YYYY-MM-DD"),
                  dateOfBirth: dayjs(pax?.dateOfBirth).format("YYYY-MM-DD"),
                }))
              : undefined,
        };
      }),
    });
  };

  return (
    <Modal
      width={1200}
      open={isOpen}
      centered={true}
      onCancel={close}
      title={(() => {
        if (activeStep === 0) {
          return "Contact Data";
        }

        if (qutationItems[activeStep - 1]?.type === QUOTATION_ITEM_TYPES?.ACCOMMODATION) {
          return (
            <Flex align="center" gap={10}>
              <p style={{ textTransform: "capitalize" }}>
                {qutationItems[activeStep - 1]?.details?.hotelInfo?.HotelName ||
                  qutationItems[activeStep - 1]?.details?.hotelInfo?.name}
              </p>
              <Tag
                color={
                  [
                    "cyan-inverse",
                    "green-inverse",
                    "blue-inverse",
                    "geekblue-inverse",
                    "orange-inverse",
                    "",
                  ]?.[Math.ceil(Math.random() * 5)]
                }>
                Hotel
              </Tag>
            </Flex>
          );
        }

        return (
          <Flex align="center" gap={10}>
            <p style={{ textTransform: "capitalize" }}>{qutationItems[activeStep - 1]?.name}</p>
            <Tag
              color={
                [
                  "cyan-inverse",
                  "green-inverse",
                  "blue-inverse",
                  "geekblue-inverse",
                  "orange-inverse",
                  "",
                ]?.[Math.ceil(Math.random() * 5)]
              }>
              {qutationItems[activeStep - 1]?.type?.toLowerCase()}
            </Tag>
          </Flex>
        );
      })()}
      footer={null}
      okText="Book"
      okButtonProps={{ loading: bookQuotation?.isPending }}>
      {activeStep === 0 && (
        <ContactDataForm
          quotation={quotation}
          handelNext={handelNext}
          handelPrev={handelPrev}
          inatialData={stepsData[0]}
        />
      )}
      {qutationItems?.map(
        (item, index) =>
          index + 1 === activeStep && (
            <PassengersDataForm
              inatialData={stepsData[index + 1]}
              addedPassengers={addedPassengers}
              key={index}
              handelNext={handelNext}
              handelPrev={handelPrev}
              isLastItem={index === qutationItems?.length - 1}
              {...item}
            />
          ),
      )}
    </Modal>
  );
};

export default BookQuotationModal;
