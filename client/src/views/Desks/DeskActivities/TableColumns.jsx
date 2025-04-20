import { Button, Col, Row, Tooltip, Typography } from "antd";
import { TicketSVG } from "assets/jsx-svg";
import { getDatabase, ref, update, set, remove } from "firebase/database";
import CommonService from "services/common.service";

export const columns = [
  {
    title: "NO.",
    dataIndex: "activitiesNo",
    key: "activitiesNo",
    width: 80,
    align: "center",
    render: (_, { priority, ticketNumber, key }) => (
      <Row justify="start" align="middle">
        <Col xs={12}>
          <Row justify="start" align="middle">
            <Tooltip title={priority}>
              {/* <TicketSVG color={prioritysColor[priority]} /> */}
              <TicketSVG />
            </Tooltip>
          </Row>
        </Col>
        <Col xs={12}>
          <Typography.Text className="fw-500">#{key + 1}</Typography.Text>
        </Col>
      </Row>
    ),
  },
  {
    title: "Customer name",
    dataIndex: "name",
    key: "name",
    ellipsis: true,
    width: 150,
  },
  {
    title: "Time",
    dataIndex: "time",
    key: "time",
    ellipsis: true,
    width: 160,
  },
  {
    title: "Call type",
    dataIndex: "callType",
    key: "callType",
    ellipsis: true,
    width: 160,
  },

  {
    title: "Status",
    dataIndex: "status",
    key: "status",
    ellipsis: true,
    align: "center",
    width: 100,
    render: (_, { status, key }) => {
      let color = "";
      if (status === "finished") {
        color = "#5EAF2F";
      } else if (status === "inProcess") {
        color = "#caf400";
      } else {
        color = "#F40055";
      }

      return (
        <Row justify="center" key={key}>
          <div
            style={{
              background: `${color}0F`,
              borderRadius: "8px",
              width: "90px",
              height: "30px",
            }}
            className="center-items">
            <Tooltip title={status}>
              <Typography.Text style={{ color: color }} ellipsis>
                {status}
              </Typography.Text>
            </Tooltip>
          </div>
        </Row>
      );
    },
  },

  {
    title: " ",
    key: "actions",
    dataIndex: "actions",
    align: "center",
    width: 90,
    render: (user, info) => {
      const db = getDatabase();
      const assignChatToEmployee = async () => {
        console.log(info, "info");
        await CommonService.accept(user.customer.callId);

        const CallUnAssignedCallId = ref(
          db,
          `Company/${user.companyId}/Calls/CallUnAssigned/${info.id}`,
        );
        const CallData = ref(db, `Company/${user.companyId}/Calls/call/${info.id}/data`);

        const chatsEmployeesRef = ref(
          db,
          `Company/${user.companyId}/Calls/empolyee/${user.id}/${info.id}`,
        );

        update(CallData, {
          status: "inProcess",
        });
        set(chatsEmployeesRef, info.id);
        remove(CallUnAssignedCallId);

        //open the meeting
        const url = new URL(user.customer.callLink);

        const newURL = `http://${url.host}${url.pathname}`;

        window.open(newURL, "_blank");
      };

      const endTheMeet = () => {
        const CallData = ref(db, `Company/${user.companyId}/Calls/call/${info.id}/data`);

        update(CallData, {
          status: "finished",
        });
      };

      return (
        <>
          {info.status === "waiting" && user.customer.callLink && (
            <Button onClick={assignChatToEmployee} type="primary">
              Join
            </Button>
          )}
          {info.status === "inProcess" && (
            <Button style={{ background: "#ff0000" }} onClick={endTheMeet} type="primary">
              Finished
            </Button>
          )}
        </>
      );
    },
  },
];
