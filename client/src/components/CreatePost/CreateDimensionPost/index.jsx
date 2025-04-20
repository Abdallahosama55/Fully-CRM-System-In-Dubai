import { useState, useContext, useEffect } from "react";
import {
  Avatar,
  Button,
  Col,
  Flex,
  Form,
  Input,
  Pagination,
  Row,
  Skeleton,
  Typography,
} from "antd";
import { Link, useParams } from "react-router-dom";
import { useForm } from "antd/es/form/Form";
import userContext from "context/userContext";

import { LeftArrowSVG, SearchSVG } from "assets/jsx-svg";

import { axiosCatch } from "utils/axiosUtils";
import PostsService from "services/posts.service";
import DimensionsService from "services/dimensions.service";
import VerseCard from "components/common/VerseCard";

import "./styles.css";
import { stringAvatar } from "utils/string";

export default function CreateDimensionPost({ setPostsList }) {
  const [form] = useForm();
  const { user } = useContext(userContext);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [addLoading, setAddLoading] = useState(false);
  const [selectedDim, setSelectedDim] = useState({});
  const [dimensions, setDimensions] = useState([]);
  const [dimensionsCount, setDimensionsCount] = useState(0);
  const [page, setPage] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const { communityId } = useParams();

  const onFinish = (values) => {
    setAddLoading(true);
    const formData = new FormData();
    formData.append("description", values.description || "");
    formData.append("image", selectedDim.image || "");

    PostsService.createPost({ communityId, formData })
      .then(({ data }) => {
        setPostsList((prev) => [
          {
            ...data.data,
            communityPostLikes: [],
            account: {
              fullName: user.fullName,
              profileImage: user.profileImage,
            },
            comment: [],
          },
          ...prev,
        ]);
      })
      .catch(axiosCatch)
      .finally(() => {
        setAddLoading(false);
        setSelectedDim({});
        setSearchQuery("");
        form.resetFields();
      });
  };

  useEffect(() => {
    if (selectedDim.customer) {
      form.setFieldValue(
        "description",
        `Join my dimension now ${window.location.origin}/metaverse/${selectedDim.account.fullName
          .split(" ")
          .join("_")}/${selectedDim.name.split(" ").join("_")}`,
      );
    }
  }, [form, selectedDim]);

  useEffect(() => {
    const delayDebounceFn = setTimeout(
      () => {
        (async () => {
          try {
            setLoading(true);
            const res = await DimensionsService.searchDimensions({
              limit: 10,
              searchKey: searchQuery,
              offset: (page ? page - 1 : page) * 10,
            });
            setDimensions(res.data.data.rows);
            setDimensionsCount(res.data.data.count);
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
  }, [searchQuery, page]);

  return (
    <>
      <Row justify="space-between" wrap={false} gutter={[16, 16]}>
        <Col flex={1}>
          <Flex vertical>
            <Row className="Search" justify="space-between" align="middle">
              <div>Select Meeting Verse</div>
              <Row align="middle" gutter={[16, 16]}>
                <Col>
                  <Input
                    placeholder="Search.."
                    className="general-table-search"
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
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </Col>
              </Row>
            </Row>
            {loading ? (
              <div>
                <Row
                  justify="start"
                  gutter={[32, 42]}
                  style={{ marginTop: "15px" }}
                  className="rows-verses">
                  {[1, 2, 3, 4, 5, 6, 7].map((verse) => (
                    <Col key={verse} style={{ maxWidth: "300px" }} xs={24} sm={24} md={12} lg={6}>
                      <Skeleton active style={{ width: "100%", height: "216px" }} />
                    </Col>
                  ))}
                </Row>
              </div>
            ) : (
              <Row
                justify="start"
                gutter={[32, 42]}
                style={{ marginTop: "15px" }}
                className="rows-verses">
                {dimensions.map((dimension) => (
                  <Col
                    style={{ maxWidth: "300px" }}
                    xs={24}
                    sm={24}
                    md={12}
                    lg={6}
                    className="w-100"
                    key={dimension.id}
                    onClick={() => setSelectedDim(dimension)}>
                    <VerseCard
                      data={dimension}
                      className={selectedDim.id === dimension.id && "border-blue"}
                    />
                  </Col>
                ))}
              </Row>
            )}
            <div style={{ display: "flex", justifyContent: "flex-end" }} className="mt-1">
              <Pagination onChange={(e) => setPage(e)} defaultCurrent={1} total={dimensionsCount} />
            </div>
          </Flex>
        </Col>
        <Col>
          {showForm ? (
            <Button onClick={() => form.submit()} type="primary" loading={addLoading}>
              Post
            </Button>
          ) : (
            <Button
              disabled={!selectedDim.id}
              type="primary"
              shape="circle"
              className="center-items"
              onClick={() => setShowForm(true)}
              style={{ minWidth: "42px", height: "42px" }}>
              <LeftArrowSVG style={{ width: "14px", height: "14px", rotate: "180deg" }} />
            </Button>
          )}
        </Col>
      </Row>
      {!loading && !dimensions.length && (
        <Row gutter={[0, 32]}>
          <Col xs={24}>
            <Typography.Text className="fz-22 fw-500 gc">
              You don't have any dimensions
            </Typography.Text>
          </Col>
          <Col xs={24}>
            <Row>
              <Link to={"/add-dimension"}>
                <Button type="primary">Add Dimension</Button>
              </Link>
            </Row>
          </Col>
        </Row>
      )}
      {showForm && (
        <Form form={form} name="post-form" onFinish={onFinish}>
          <Row justify="space-between" gutter={[16, 0]} className="mt-1">
            <Col>
              <Avatar
                size={45}
                src={user.profileImage}
                {...(user?.profileImag ? {} : { ...stringAvatar(user?.fullName) })}
              />
            </Col>
            <Col flex={1}>
              <Form.Item
                name="description"
                rules={[
                  {
                    required: true,
                    message: "Please input description!",
                  },
                ]}>
                <Input.TextArea rows={4} className="postInput" placeholder="Try mix reality lens" />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      )}
    </>
  );
}
