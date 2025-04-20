import { Button, Col, Flex, Row, Typography } from "antd";

import useListCommunity from "services/Community/Querys/useListCommunity";
import LoadingPage from "components/common/LoadingPage";
import CommunityCard from "./CommunityCard";

import "./styles.css";
import { NavLink } from "react-router-dom";

export default function Community() {
  const {
    data: community,
    isLoading,
    queryKey,
  } = useListCommunity({
    select: (data) => data.data.data,
  });

  return (
    <section className="community-list-view">
      <Flex justify="space-between">
        <Typography.Title level={3}>Communities</Typography.Title>
        <NavLink to="/community/add">
          <Button type="primary">Add Community</Button>
        </NavLink>
      </Flex>

      <Row gutter={[16, 16]} className="mt-1">
        {isLoading ? (
          <LoadingPage />
        ) : (
          community?.rows?.map((item) => (
            <Col xs={24} sm={12} md={8} xl={8} xxl={6} key={item.id}>
              <CommunityCard community={item} listCommunityQueryKey={queryKey} />
            </Col>
          ))
        )}
      </Row>
    </section>
  );
}
