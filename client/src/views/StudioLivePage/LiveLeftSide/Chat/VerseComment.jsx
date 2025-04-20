import { Avatar, Col, Row, Typography } from "antd";
import dayjs from "dayjs";
// import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import newColorFind from "utils/randomColor";

// import userContext from "context/userContext";

export default function VerseComment({ data, handleDeleteComment, id }) {
  const navigate = useNavigate();
  // const { user } = useContext(userContext);

  return (
    <Row align="top" gutter={[16, 0]} wrap={false} style={{ marginRight: 0, marginBottom: "10px" }}>
      <Col>
        <Avatar
          size={"small"}
          src={data.profileImage}
          icon={<div>{data.fullName?.slice(0, 2)}</div>}
          style={{
            backgroundColor: !data.profileImage && `${newColorFind(data.id)}`,
          }}
        />
      </Col>

      <Col flex={1}>
        <Row>
          <Col xs={24}>
            <Row justify="space-between" align="middle">
              <Col>
                <Row align="middle" gutter={[8, 0]}>
                  <Col>
                    <Typography.Text
                      className="fw-600 fz-12 clickable underline"
                      ellipsis
                      onClick={() => navigate(`/profile/${data.id}`)}>
                      {data.fullName}
                    </Typography.Text>
                  </Col>

                  <Col>
                    <Typography.Text className="gc fz-12">
                      {dayjs(data.date).format("hh:mm")}
                    </Typography.Text>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Col>
          <Col xs={23}>
            <Typography.Text className="gc fz-12">{data.text}</Typography.Text>
          </Col>
        </Row>
      </Col>
      {/* <Col>
          {data.id === user.id && (
            <Button className="fz-12" onClick={() => handleDeleteComment(id)} type="text" danger>
              Delete
            </Button>
          )}
        </Col> */}
    </Row>
  );
}
