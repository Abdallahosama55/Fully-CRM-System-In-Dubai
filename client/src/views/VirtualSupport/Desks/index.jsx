import { useEffect, useState } from "react";
import { Button, Col, Row, Typography } from "antd";
import { useSearchParams } from "react-router-dom";

import DeskService from "services/Desk/desk.service";
import { LoadingOutlined } from "@ant-design/icons";

import "./styles.css";

export default function Desks({ SystemMessage, setActiveBtn, setSelectedDeskId }) {
  const [searchParams] = useSearchParams();
  const [desksData, setDesksData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const res = await DeskService.getMyDesks();
        setDesksData(res.data.data);
      } catch (axiosCatch) {
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <>
      <Typography.Text className="fz-18 fw-500">My Desks</Typography.Text>
      <section className="virtual-support-desks">
        {loading ? (
          <Row justify="center">
            <LoadingOutlined />
          </Row>
        ) : (
          desksData?.map((dim) => (
            <Row className="dim-info" id={dim.id} justify="start">
              <Typography.Text className="fz-18 fw-500">{dim.name} Desks :</Typography.Text>

              {dim.dimensionDesks.map((desk) => (
                <div className="desk-info">
                  <Row align="middle" justify="space-between">
                    <Col>
                      <Row>
                        <Typography.Text className="fw-500">{desk.name}</Typography.Text>
                      </Row>
                      <Row>
                        <Typography.Text>{desk.status}</Typography.Text>
                      </Row>
                    </Col>
                    <Col>
                      <Button
                        type="primary"
                        className="fz-14"
                        style={{ height: "30px", padding: "0 10px" }}
                        onClick={() => {
                          if (searchParams.get("deskId") === desk.meetingId) {
                            SystemMessage.stopDesk(desk.meetingId);
                            setSelectedDeskId(null);
                          } else {
                            setSelectedDeskId(desk.meetingId);
                            setActiveBtn("deskParticipants");
                          }
                        }}>
                        {searchParams.get("deskId") === desk.meetingId ? "Exit" : "Set"}
                      </Button>
                    </Col>
                  </Row>
                </div>
              ))}
            </Row>
          ))
        )}
      </section>
    </>
  );
}
