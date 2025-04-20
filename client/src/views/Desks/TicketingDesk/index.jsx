import { useContext, useEffect, useState } from "react";
import { Button, Col, Input, Row, Select, Table, Typography } from "antd";
import { columns } from "./TableColumns";
import { Link } from "react-router-dom";
import userContext from "context/userContext";
// api
import TicketService from "services/ticket.service";
// utils
import { axiosCatch } from "utils/axiosUtils";
import { getDatabase, onValue, ref } from "firebase/database";
import dayjs from "dayjs";
// hooks
import { useDebounce } from "hooks/useDebounce";
// icons
import { PlusSVG, SearchSVG } from "assets/jsx-svg";
// style
import "./styles.css";

const mapTicketsResponse = (tickets, setStatus, setReRenderWhenAssign) => {
  return tickets.map((ticket) => {
    return {
      key: ticket.id,
      id: ticket.id,
      link: ticket.link,
      employeeId: ticket.employeeId,
      ticketTitle: ticket.title,
      status: ticket.status,
      priority: ticket.priority,
      name: ticket.customer?.fullName,
      ticketDescription: {
        description: ticket.content,
        title: ticket.title,
        number: ticket.id,
      },
      assignedTo: ticket.employee ? ticket.employee?.fullName : "-",
      time: dayjs(ticket.updatedAt).format("DD-MM-YYYY HH:mm A"),
      services: ticket.serviceType?.join("-"),
      callType: ticket.callType,
      setStatus: setStatus,
      setReRenderWhenAssign: setReRenderWhenAssign,
    };
  });
};

export default function TicketingDesk() {
  const [isLoading, setIsLoading] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [page, setPage] = useState(0);
  const [ticketsCount, setTicketsCount] = useState(0);

  const [searchQuery, setSearchQuery] = useState("");
  const debounceSearchQuery = useDebounce(searchQuery, 500);
  const [searchColumnName, setSearchColumnName] = useState("title");

  const [status, setStatus] = useState("");
  const [reRenderWhenAssign, setReRenderWhenAssign] = useState(0);

  const [updatedAt, setUpdatedAt] = useState("");
  const db = getDatabase();

  const { user } = useContext(userContext);

  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);

        const res = await TicketService.search({
          offset: page,
          searchKey: searchQuery,
          columnName: searchColumnName ? searchColumnName : "title",
        });

        setTicketsCount(res.data.data.count);
        setTableData(mapTicketsResponse(res.data.data.rows, setStatus, setReRenderWhenAssign));
      } catch (err) {
        axiosCatch(err);
      } finally {
        setIsLoading(false);
      }
    })();
  }, [page, status, debounceSearchQuery, reRenderWhenAssign, updatedAt]);

  useEffect(() => {
    const ticketRef = ref(db, `Company/${user.companyId}/ticket`);
    onValue(ticketRef, (snapShot) => {
      if (snapShot.val()) {
        setUpdatedAt(Date.now());
      }
    });
  }, []);

  return (
    <section className="body-content ticketing-desk">
      <Row align="middle" justify="space-between" gutter={[12, 12]}>
        <Col>
          <Typography.Title level={5}>Ticketing Desk</Typography.Title>
        </Col>
        <Col>
          <Row align="middle" gutter={[16, 16]}>
            <Col flex={1}>
              <div className="search_block">
                <Select
                  className="select"
                  defaultValue={"title"}
                  onChange={(value) => {
                    setSearchColumnName(value);
                  }}>
                  <Select.Option value="title">title</Select.Option>
                  <Select.Option value="content">description</Select.Option>
                  <Select.Option value="$customer.fullName$">Full Name</Select.Option>
                  <Select.Option value="addedBy">added By</Select.Option>
                </Select>
                <Input
                  className="general-table-search"
                  placeholder="Search"
                  addonAfter={
                    <div
                      className="clickable center-items"
                      style={{
                        width: "44px",
                        height: "42px",
                        borderRadius: "0 8px 8px 0",
                      }}>
                      <SearchSVG />
                    </div>
                  }
                  suffix={<SearchSVG />}
                  onChange={(e) => {
                    setPage(0);
                    setTicketsCount(0);
                    setSearchQuery(e.target.value);
                  }}
                />
              </div>
            </Col>
            <Col>
              <Link to="/desks/ticketing-desk/add-ticket">
                <Button style={{ background: "#272942", color: "#fff" }}>
                  <Row align="middle" gutter={[8, 0]} wrap={false}>
                    <Col>
                      <Row align="middle">
                        <PlusSVG />
                      </Row>
                    </Col>
                    <Col>Ticket</Col>
                  </Row>
                </Button>
              </Link>
            </Col>
          </Row>
        </Col>
      </Row>

      <div style={{ position: "relative" }}>
        <Table
          loading={isLoading}
          scroll={{ x: 700 }}
          style={{ marginTop: "32px" }}
          columns={columns}
          dataSource={tableData}
          pagination={{
            pageSize: 10,
            total: ticketsCount,
            onChange: (page) => {
              setPage((page - 1) * 10);
            },
            defaultCurrent: page / 10 + 1,
          }}
        />

        <Typography.Text className="table-bottom-info hide-sm">
          Total tickets : {ticketsCount}
        </Typography.Text>
      </div>
    </section>
  );
}
