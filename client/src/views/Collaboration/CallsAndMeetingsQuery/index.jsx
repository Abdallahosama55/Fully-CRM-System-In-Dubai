import { useEffect, useState } from "react";
import {
  Button,
  Col,
  Input,
  Row,
  Select,
  Space,
  Table,
  Typography,
} from "antd";
import { DownOutlined } from "@ant-design/icons";

import CallsAndMeetingsColumns from "./TableColumns";
import { PlusSVG, SearchSVG } from "assets/jsx-svg";

import { axiosCatch } from "utils/axiosUtils";
import BookedMeetingService from "services/bookedMeeting.service";
import CallsAndMeetingsAdd from "../CallsAndMeetingsAdd";

import "./styles.css";
import { useDrawer } from "hooks/useDrawer";

export default function CallsAndMeetingsQuery() {
  const [loading, setLoading] = useState(false);
  const [calls, setCalls] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [page, setPage] = useState(0);
  const [callsCount, setCallsCount] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const DrawerAPI = useDrawer();

  useEffect(() => {
    if (!DrawerAPI.isDrawerOpen) {
      const delayDebounceFn = setTimeout(
        () => {
          (async () => {
            try {
              setLoading(true);

              const res = await BookedMeetingService.callsSearch({
                limit: 10,
                offset: page,
                searchKey: searchQuery,
              });

              setCallsCount(res.data.data.count);
              setCalls(res.data.data.rows);
            } catch (err) {
              axiosCatch(err);
            } finally {
              setLoading(false);
            }
          })();
        },
        searchQuery.length > 0 ? 500 : 0,
      );

      return () => clearTimeout(delayDebounceFn);
    }
  }, [page, searchQuery, DrawerAPI.isDrawerOpen]);

  useEffect(() => {
    if (calls.length) {
      setTableData(
        calls.map((call) => {
          return {
            key: call.id,
            ...call,
          };
        }),
      );
    } else {
      setTableData([]);
    }
  }, [calls]);

  return (
    <section className="body-content calls-meetings-query">
      {DrawerAPI.Render}
      <Row align="middle" justify="space-between" gutter={[12, 12]}>
        <Col>
          <Typography.Title level={5}>Calls And Meetings</Typography.Title>
        </Col>
        <Col>
          <Row align="middle" gutter={[16, 16]}>
            <Col flex={1}>
              <Input
                className="general-table-search"
                placeholder="Search"
                onChange={(e) => setSearchQuery(e.target.value)}
                addonBefore={
                  <Space>
                    All columns
                    <DownOutlined />
                  </Space>
                }
                addonAfter={
                  <div
                    className="clickable center-items search"
                    style={{
                      width: "44px",
                      height: "42px",
                      borderRadius: "0 8px 8px 0",
                    }}
                  >
                    <SearchSVG />
                  </div>
                }
                suffix={<SearchSVG />}
              />
            </Col>
            <Col>
              <Select
                className="general-table-select"
                style={{ width: "150px" }}
                defaultValue="newest"
                options={[
                  {
                    value: "newest",
                    label: (
                      <Typography.Text className="fz-12">
                        Sort by: <span className="fw-600">Newest</span>
                      </Typography.Text>
                    ),
                  },
                ]}
              />
            </Col>

            <Col>
              <Button
                style={{ background: "#272942", color: "#fff" }}
                onClick={() => {
                  DrawerAPI.setDrawerContent(<CallsAndMeetingsAdd DrawerAPI={DrawerAPI}/>)
                  DrawerAPI.open("40%")
                }}
              >
                <Row align="middle" gutter={[8, 0]} wrap={false}>
                  <Col>
                    <Row align="middle">
                      <PlusSVG />
                    </Row>
                  </Col>
                  <Col>New Meeting</Col>
                </Row>
              </Button>
            </Col>
          </Row>
        </Col>
      </Row>

      <div style={{ position: "relative" }}>
        <Table
          loading={loading}
          scroll={{ x: 700 }}
          style={{ marginTop: "32px" }}
          columns={CallsAndMeetingsColumns({ setCallsCount, setCalls , DrawerAPI })}
          dataSource={tableData}
          pagination={{
            pageSize: 10,
            total: callsCount,
            onChange: (page) => {
              setPage((page - 1) * 10);
            },
            defaultCurrent: page / 10 + 1,
          }}
        />

        <Typography.Text className="table-bottom-info hide-sm">
          Showing data {page + 1} to {page + Math.min(10, tableData?.length)} of{" "}
          {callsCount} entries
        </Typography.Text>
      </div>
    </section>
  );
}
