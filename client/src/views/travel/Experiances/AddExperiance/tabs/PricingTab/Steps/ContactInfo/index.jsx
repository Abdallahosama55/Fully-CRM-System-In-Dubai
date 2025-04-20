import { useEffect, useState } from "react";
import { Checkbox, Col, Form, Row, Skeleton, Typography, message } from "antd";
import useGetContactInfoQuestions from "services/travel/experiance/BookingTab/Querys/useGetContactInfoQuestions";
import useGetContactInfo from "services/travel/experiance/BookingTab/Querys/useGetContactInfo";
import useAddContactInfo from "services/travel/experiance/BookingTab/Mutations/useAddContactInfo";

const ContactInfo = ({ next, productId }) => {
  const [selectedQuestions, setSelectedQuestions] = useState([]);
  const [selectedQuestionsForEachPassenger, setSelectedQuestionsForEachPassenger] = useState([]);
  const [form] = Form.useForm();

  const contactInfoQuestionsQuery = useGetContactInfoQuestions({
    initialData: [],
  });

  const contactInfoQuery = useGetContactInfo(productId, {
    initialData: [],
  });

  useEffect(() => {
    if (contactInfoQuery.data) {
      const tempContactQuestions = contactInfoQuery.data;
      setSelectedQuestions(
        tempContactQuestions?.productBookingMainContact?.length > 0
          ? tempContactQuestions?.productBookingMainContact?.map((el) => {
              return {
                ...el,
                id: el.systemContactInformtionId,
              };
            })
          : [
              {
                id: 2,
                isRequired: true,
                ...contactInfoQuestionsQuery?.data?.find((el) => el?.id === 2),
              },
              {
                id: 4,
                isRequired: true,
                ...contactInfoQuestionsQuery?.data?.find((el) => el?.id === 4),
              },
            ],
      );
      setSelectedQuestionsForEachPassenger(
        tempContactQuestions?.productBookingPassengerContact?.length > 0
          ? tempContactQuestions?.productBookingPassengerContact?.map((el) => {
              return {
                ...el,
                id: el.systemContactInformtionId,
              };
            })
          : [
              {
                id: 1,
                isRequired: false,
                ...contactInfoQuestionsQuery?.data?.find((el) => el?.id === 1),
              },
              {
                id: 2,
                isRequired: false,
                ...contactInfoQuestionsQuery?.data?.find((el) => el?.id === 2),
              },
            ],
      );
    }
  }, [contactInfoQuery.data]);

  useEffect(() => {
    if (contactInfoQuery.isError) {
      message.error(contactInfoQuery.error.message);
    }
  }, [contactInfoQuery.isError, contactInfoQuery.error]);

  useEffect(() => {
    if (contactInfoQuestionsQuery.isError) {
      message.error(contactInfoQuestionsQuery.error.message);
    }
  }, [contactInfoQuestionsQuery.isError, contactInfoQuestionsQuery.error]);

  const { addContactInfo, isPending } = useAddContactInfo({
    onSuccess: () => {
      contactInfoQuery.refetch();
      next();
    },
    onError: (error) => {
      message.error(error.message);
    },
  });

  const handelFinish = () => {
    if (selectedQuestions.length === 0) {
      message.error("Add at least one main contact question");
    } else {
      if (!isPending) {
        addContactInfo({
          productId,
          data: {
            mainContactInformation: selectedQuestions.map((el) => ({
              id: el.id,
              isRequired: el.isRequired,
            })),
            passengerContactInformation: selectedQuestionsForEachPassenger?.map((el) => ({
              id: el.id,
              isRequired: el.isRequired,
            })),
          },
        });
      }
    }
  };

  if ((contactInfoQuestionsQuery.isLoading || contactInfoQuery.isLoading, isPending)) {
    return <Skeleton active />;
  }

  return (
    <div>
      <Typography.Title level={3} className="fz-20 title">
        Will you need to collect any personal information from the primary participant in this
        experience?
      </Typography.Title>
      <Typography.Paragraph className="fz-14 sub_title">
        Focus on asking the necessary information you need for your experience, such as their names,
        contact details or ages. These questions will be asked during checkout
      </Typography.Paragraph>
      <p className="fz-18 fw-600 mb-1">What to ask the main contact</p>
      <Form id="form_inside_tab" form={form} onFinish={handelFinish}>
        <div className="questions_card">
          {selectedQuestions && selectedQuestions.length > 0 && (
            <div className="questions_card_selected_questions">
              {selectedQuestions.map((question, index) => (
                <div key={question.id} className="space-between mb-1">
                  <Checkbox
                    checked={true}
                    onChange={(e) => {
                      setSelectedQuestions((prev) => prev.filter((el) => el.id !== question.id));
                    }}>
                    {question?.name}
                  </Checkbox>
                  <Checkbox
                    value={question?.isRequired}
                    checked={question?.isRequired}
                    onChange={(e) => {
                      setSelectedQuestions((prev) =>
                        prev.map((el) => {
                          if (el.id === question.id) {
                            return { ...el, isRequired: e.target.checked };
                          }
                          return el;
                        }),
                      );
                    }}>
                    Required field
                  </Checkbox>
                </div>
              ))}
            </div>
          )}
          <div className="questions_card_not_selected_questions">
            {contactInfoQuestionsQuery?.data?.length === 0 && <Skeleton active />}
            <Row gutter={[12, 12]}>
              {contactInfoQuestionsQuery.data
                ?.filter((question) => !selectedQuestions.map((el) => el.id).includes(question?.id))
                .map((question) => (
                  <Col lg={6} md={8} xs={12} key={question?.name}>
                    <Checkbox
                      onChange={() => {
                        setSelectedQuestions((prev) => [
                          ...prev,
                          {
                            ...question,
                            isRequired: false,
                          },
                        ]);
                      }}>
                      {question?.name}
                    </Checkbox>
                  </Col>
                ))}
            </Row>
          </div>
        </div>
        <p
          className="fz-18 fw-500 check_container is_ask_each_passenger"
          style={{ marginTop: "2rem" }}>
          What to ask each passenger
        </p>
        <div className="questions_card">
          {selectedQuestionsForEachPassenger.length > 0 && (
            <div className="questions_card_selected_questions">
              {selectedQuestionsForEachPassenger.map((question, index) => (
                <div key={question.id} className="space-between mb-1">
                  <Checkbox
                    checked={true}
                    onChange={(e) => {
                      setSelectedQuestionsForEachPassenger((prev) =>
                        prev.filter((el) => el.id !== question.id),
                      );
                    }}>
                    {question?.name}
                  </Checkbox>
                  <Checkbox
                    value={question?.isRequired}
                    checked={question?.isRequired}
                    onChange={(e) => {
                      setSelectedQuestionsForEachPassenger((prev) =>
                        prev.map((el) => {
                          if (el.id === question.id) {
                            return { ...el, isRequired: e.target.checked };
                          }
                          return el;
                        }),
                      );
                    }}>
                    Required field
                  </Checkbox>
                </div>
              ))}
            </div>
          )}
          <div className="questions_card_not_selected_questions">
            <Row gutter={[12, 12]}>
              {contactInfoQuestionsQuery?.data?.length === 0 && <Skeleton active />}

              {contactInfoQuestionsQuery.data
                ?.filter(
                  (question) =>
                    !selectedQuestionsForEachPassenger.map((el) => el.id).includes(question?.id),
                )
                .map((question) => (
                  <Col lg={6} md={8} xs={12} key={question?.name}>
                    <Checkbox
                      onChange={() => {
                        setSelectedQuestionsForEachPassenger((prev) => [...prev, question]);
                      }}>
                      {question?.name}
                    </Checkbox>
                  </Col>
                ))}
            </Row>
          </div>
        </div>
      </Form>
    </div>
  );
};
export default ContactInfo;
