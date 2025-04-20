import { Button, Col, Form, Row, Select, Typography, message } from "antd";
import { useEffect, useState } from "react";
import BookedMeetingService from "services/bookedMeeting.service";
import CommonService from "services/common.service";
import { axiosCatch } from "utils/axiosUtils";

export default function AddParticipants({ callDetails, setCallDetails, id, form, dropdownOpened }) {
  const [editLoading, setEditLoading] = useState(false);
  const [customerSearch, setCustomerSearch] = useState("");
  const [customersList, setCustomersList] = useState([]);

  const onFinish = async (values) => {
    if (values.participantsToAdd) {
      try {
        setEditLoading(true);
        const res = await BookedMeetingService.editMeeting(
          {
            ...callDetails,
            invites: callDetails.invites
              ? [...callDetails.invites, ...values.participantsToAdd]
              : values.participantsToAdd,
          },
          id,
        );
        message.success("Participants Added Successfully ✅");
        setCallDetails(res.data.data[0]);
      } catch (err) {
        axiosCatch(err);
      } finally {
        setEditLoading(false);
      }
    }
  };

  useEffect(() => {
    if (dropdownOpened) {
      const delayDebounceFn = setTimeout(
        () => {
          (async () => {
            try {
              const res = await CommonService.customerSearch({
                limit: 100,
                searchKey: customerSearch,
              });

              setCustomersList(res.data.data);
            } catch (err) {
              axiosCatch(err);
            }
          })();
        },
        customerSearch.length > 0 ? 500 : 0,
      );

      return () => clearTimeout(delayDebounceFn);
    }
  }, [customerSearch, dropdownOpened]);

  return (
    <Form form={form} onFinish={onFinish} className="select-dropdown">
      <Row gutter={[0, 12]}>
        <Col xs={24}>
          <Row justify="space-between" align="middle">
            <Col>
              <Typography.Text>Add Participants</Typography.Text>
            </Col>
            <Col>
              <Button onClick={() => form.submit()} type="primary" loading={editLoading}>
                Add
              </Button>
            </Col>
          </Row>
        </Col>
        <Col xs={24}>
          <Form.Item name="participantsToAdd" noStyle>
            <Select
              style={{ minWidth: "200px" }}
              mode="tags"
              onSearch={(text) => setCustomerSearch(text)}
              options={customersList.map((customer) => ({
                label: customer.email,
                value: customer.email,
              }))}
              placeholder="Select or Add"
              className="w-100"
            />
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
}
