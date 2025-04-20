import { useEffect, useState, useContext } from "react";
import { ExclamationCircleFilled, LoadingOutlined } from "@ant-design/icons";
import { Button, Col, Modal, Row, Typography } from "antd";

import { ArrowRightSVG } from "assets/jsx-svg";
import { axiosCatch } from "utils/axiosUtils";
import DragContext from "../DragContext";
import DimensionsService from "services/dimensions.service";
import metaverseDefault from "assets/images/house.png";
import "./styles.css";
const { confirm } = Modal;
const showConfirm = (ok) => {
  confirm(
    {
      title: "Do you want to open these metaverse?",
      icon: <ExclamationCircleFilled />,

      onOk() {
        ok();
      },

      onCancel() {
        return;
      },
    },
    {},
  );
};
export default function MetaExperience({ setActiveBtn, sharingDimId, setOpenMobileMenu }) {
  const [myDims, setMyDims] = useState([]);
  const [loading, setLoading] = useState(false);
  const { setDragData } = useContext(DragContext);

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const res = await DimensionsService.getMyDimensions();
        setMyDims(res.data.data.rows);
      } catch (error) {
        axiosCatch(error);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <section className="meta-experience">
      <div className="back-word">
        <Row
          wrap={false}
          align="middle"
          gutter={[8, 0]}
          style={{ width: "fit-content" }}
          className="clickable"
          onClick={() => setActiveBtn("tools")}>
          <Col>
            <Row align="middle">
              <ArrowRightSVG color="#8E8E93" style={{ rotate: "180deg" }} />
            </Row>
          </Col>
          <Col>
            <Typography.Text className="gc">Back</Typography.Text>
          </Col>
        </Row>
      </div>

      {loading ? (
        <Row justify="center">
          <LoadingOutlined />
        </Row>
      ) : (
        <Row gutter={[0, 10]} style={{ marginTop: "2rem" }}>
          <Col xs={24}>
            <Typography.Paragraph ellipsis={{ rows: 3 }} className="fz-18 fw-600">
              Drag verse & drop it to your window to share with others
            </Typography.Paragraph>
          </Col>

          <Row style={{ maxHeight: "76vh", overflowY: "auto", width: "100%" }} gutter={[0, 12]}>
            {myDims.map((dim) => (
              <Col
                draggable
                xs={24}
                key={dim.id}
                onClick={() => {
                  if (window.innerWidth < 1180)
                    showConfirm(() => {
                      setOpenMobileMenu(false);
                      setDragData({
                        dragging: true,
                        dropText: "Dro",
                        dimId: dim.id,
                        file: null,
                        isClick: true,
                      });
                    });
                }}
                onDragStart={() =>
                  setDragData({
                    dragging: true,
                    dropText: "Drop to share dimension",
                    dimId: dim.id,
                    file: null,
                  })
                }
                onDragEnd={() =>
                  setDragData({
                    dragging: false,
                    dropText: "",
                    dimId: null,
                    file: null,
                  })
                }>
                <div
                  style={{
                    border: +sharingDimId === +dim.id && "2px solid #0000",
                    background:
                      +sharingDimId === +dim.id &&
                      `linear-gradient(#ffffff, #ffffff) padding-box,
                  linear-gradient(270deg, #8fcaf3 0%, #3a5ee3 100%)`,
                  }}
                  className="dim-card">
                  <div
                    style={{
                      background: `url(${dim.image || metaverseDefault})`,
                    }}
                    className="dim-card-img"
                  />

                  <div className="dim-card-text">
                    <Typography className="wc">{dim.name}</Typography>
                  </div>

                  {+sharingDimId === +dim.id && (
                    <div className="dim-card-btn">
                      <Button
                        type="primary"
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                        }}>
                        Exit
                      </Button>
                    </div>
                  )}
                </div>
              </Col>
            ))}
          </Row>
        </Row>
      )}
    </section>
  );
}
