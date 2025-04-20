import {
  Button,
  Col,
  Empty,
  Flex,
  Input,
  message,
  Row,
  Space,
  Tag,
  Tooltip,
  Typography,
} from "antd";
import { DeleteSVG, EditSVG, EyeSVG, PlusSVG, SearchSVG } from "assets/jsx-svg";
import Badge from "components/common/Badge";
import CustomTable from "components/CustomTable";
import ROUTER_URLS from "constants/ROUTER_URLS";
import { useDebounce } from "hooks/useDebounce";
import usePageTitle from "hooks/usePageTitle";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { queryClient } from "services/queryClient";
import useDeletePage from "services/web-builder/Mutations/useDeletePage";
import useGetPagesList from "services/web-builder/Queries/useGetPagesList";

const Pages = () => {
  usePageTitle("Pages");
  const [page, setPage] = useState();
  const [searchQuery, setSearchQuery] = useState("");
  const debouncedSearch = useDebounce(searchQuery, 300);

  // queries
  const listOfPages = useGetPagesList();
  // mutations
  const deletePage = useDeletePage({
    onSuccess: () => {
      message.success("Page deleted successfully");
      listOfPages.refetch();
    },
    onError: (error) => {
      message.error(error?.message || "something went wrong");
    },
  });

  return (
    <section>
      <Row className="mb-1" align="middle" justify="space-between" gutter={[8, 8]}>
        <Col lg={12}>
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by page path"
            prefix={<SearchSVG />}
          />
        </Col>
        <Col lg={12} className="d-flex" style={{ justifyContent: "flex-end" }}>
          <Link to={ROUTER_URLS.PAGES.ADD}>
            <Button icon={<PlusSVG color="white" />} type="primary">
              New
            </Button>
          </Link>
        </Col>
      </Row>
      <CustomTable
        locale={{
          emptyText: (
            <Empty
              style={{ padding: "5rem 0" }}
              description={
                <div>
                  <p>No pages to display. </p>
                  <p>
                    <Link to={ROUTER_URLS.PAGES.ADD}>
                      <Typography.Link>Click here</Typography.Link>
                    </Link>{" "}
                    to add new page.
                  </p>
                </div>
              }
            />
          ),
        }}
        page={page}
        setPage={setPage}
        pageSize={10}
        total={listOfPages?.data?.length || 0}
        loading={listOfPages?.isLoading}
        dataSource={listOfPages?.data?.filter((el) =>
          el?.page?.toLowerCase().includes(debouncedSearch?.toLowerCase()),
        )}
        columns={[
          {
            title: "#",
            width: 50,
            dataIndex: "id",
            key: "id",
            onCell: () => ({ style: { verticalAlign: "middle" } }),
          },
          {
            title: "Page Path",
            dataIndex: "page",
            key: "page",
            onCell: () => ({ style: { verticalAlign: "middle" } }),
            render: (page, rowData) => (
              <Typography.Paragraph
                className="fz-12 fw-500"
                style={{ marginBottom: "4px" }}
                ellipsis={{ rows: 2, tooltip: page }}>
                {page ? page : "-"}{" "}
                {rowData.isRoot ? <Badge status="warning">Root Page</Badge> : ""}
              </Typography.Paragraph>
            ),
          },
          {
            title: "Meta Keywords",
            dataIndex: "metaKeywords",
            key: "metaKeywords",
            onCell: () => ({ style: { verticalAlign: "middle" } }),
            render: (metaKeywords) => (
              <Flex wrap={"wrap"}>
                {Array.isArray(metaKeywords)
                  ? metaKeywords?.map((el) => (
                      <Tag key={el} color="#272942">
                        {el}
                      </Tag>
                    ))
                  : ""}
              </Flex>
            ),
          },
          {
            width: 120,
            title: "",
            dataIndex: "id",
            key: "id",
            onCell: () => ({ style: { verticalAlign: "middle" } }),
            render: (id, rowData) => {
              return (
                <Space wrap={false}>
                  <Tooltip title={"View"}>
                    <Link to={ROUTER_URLS.PAGES.INDEX + "/" + id}>
                      <Button icon={<EyeSVG color="#000" />} className="table_action_button" />
                    </Link>
                  </Tooltip>
                  <Tooltip title={"Edit"}>
                    <Link to={ROUTER_URLS.PAGES.EDIT + id}>
                      <Button
                        type="primary"
                        icon={<EditSVG color="#fff" />}
                        className="table_action_button"
                      />
                    </Link>
                  </Tooltip>
                  <Tooltip title={"Delete"}>
                    <Button
                      type="primary"
                      className="table_action_button"
                      danger
                      icon={<DeleteSVG color="#fff" />}
                      onClick={() => {
                        if (rowData?.isRoot) {
                          message.info("You can't delete the root page");
                          return;
                        }
                        deletePage.mutate(id);
                      }}
                    />
                  </Tooltip>
                </Space>
              );
            },
          },
        ]}
      />
    </section>
  );
};

/*
{
    "id": 7,
    "isRoot": true,
    "page": "/",
    "content": "<h1> test </h1>",
    "identifierId": 21,
    "createdAt": "2024-11-04T12:47:42.629Z",
    "updatedAt": "2024-11-04T12:47:42.629Z"
}
*/

export default Pages;
