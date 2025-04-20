import { Card, Col, Rate, Row } from "antd";
import Meta from "antd/es/card/Meta";
import { TimeSVG } from "assets/jsx-svg";
import React from "react";

function Carts() {
  return (
    <div className="carts">
      <div>
        <div style={{ marginBottom: "12px", fontWeight: "600" }}>Top Picks</div>
        <Row gutter={[10, 10]}>
          <Col span={6}>
            <Card
              hoverable
              cover={
                <div className="cover">
                  <div className="new">new</div>
                  <img
                    style={{ width: "100%" }}
                    alt="example"
                    src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
                  />
                </div>
              }
            >
              <Meta
                title={<Rate className="rate" />}
                description={
                  <div className="cart-des">
                    <div className="name">Adidas Shoes</div>
                    <div className="price">$144</div>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center ",
                      }}
                    >
                      <div
                        style={{
                          fontSize: "8px",
                          borderRadius: "6px",
                          padding: "4px",
                          color: "#FFA200",
                          background: "rgb(255 162 0/17%)",
                          marginBottom: "4px",
                        }}
                      >
                        Via Metaverse
                      </div>
                      <div className="time">
                        <TimeSVG width="12px" height="12px" color="#8E8E93" /> 1
                        min
                      </div>
                    </div>
                  </div>
                }
              />
            </Card>
          </Col>
          <Col span={6}>
            <Card
              hoverable
              cover={
                <div className="cover">
                  <div className="new">new</div>
                  <img
                    style={{ width: "100%" }}
                    alt="example"
                    src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
                  />
                </div>
              }
            >
              <Meta
                title={<Rate className="rate" />}
                description={
                  <div className="cart-des">
                    <div className="name">Adidas Shoes</div>
                    <div className="price">$144</div>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center ",
                      }}
                    >
                      <div
                        style={{
                          fontSize: "8px",
                          borderRadius: "6px",
                          padding: "4px",
                          color: "#FFA200",
                          background: "rgb(255 162 0/17%)",
                          marginBottom: "4px",
                        }}
                      >
                        Via Metaverse
                      </div>
                      <div className="time">
                        <TimeSVG width="12px" height="12px" color="#8E8E93" /> 1
                        min
                      </div>
                    </div>
                  </div>
                }
              />
            </Card>
          </Col>
          <Col span={6}>
            <Card
              hoverable
              cover={
                <div className="cover">
                  <div className="new">new</div>
                  <img
                    style={{ width: "100%" }}
                    alt="example"
                    src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
                  />
                </div>
              }
            >
              <Meta
                title={<Rate className="rate" />}
                description={
                  <div className="cart-des">
                    <div className="name">Adidas Shoes</div>
                    <div className="price">$144</div>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center ",
                      }}
                    >
                      <div
                        style={{
                          fontSize: "8px",
                          borderRadius: "6px",
                          padding: "4px",
                          color: "#FFA200",
                          background: "rgb(255 162 0/17%)",
                          marginBottom: "4px",
                        }}
                      >
                        Via Metaverse
                      </div>
                      <div className="time">
                        <TimeSVG width="12px" height="12px" color="#8E8E93" /> 1
                        min
                      </div>
                    </div>
                  </div>
                }
              />
            </Card>
          </Col>
          <Col span={6}>
            <Card
              hoverable
              cover={
                <div className="cover">
                  <div className="new">new</div>
                  <img
                    style={{ width: "100%" }}
                    alt="example"
                    src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
                  />
                </div>
              }
            >
              <Meta
                title={<Rate className="rate" />}
                description={
                  <div className="cart-des">
                    <div className="name">Adidas Shoes</div>
                    <div className="price">$144</div>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center ",
                      }}
                    >
                      <div
                        style={{
                          fontSize: "8px",
                          borderRadius: "6px",
                          padding: "4px",
                          color: "#FFA200",
                          background: "rgb(255 162 0/17%)",
                          marginBottom: "4px",
                        }}
                      >
                        Via Metaverse
                      </div>
                      <div className="time">
                        <TimeSVG width="12px" height="12px" color="#8E8E93" /> 1
                        min
                      </div>
                    </div>
                  </div>
                }
              />
            </Card>
          </Col>
        </Row>
      </div>
      <div>
        <div
          style={{ marginBottom: "12px", marginTop: "16px", fontWeight: "600" }}
        >
          Favorite goods
        </div>
        <Row gutter={[10, 10]}>
          <Col span={6}>
            <Card
              hoverable
              cover={
                <div className="cover">
                  <div className="new">new</div>
                  <div className="heart">❤</div>
                  <img
                    style={{ width: "100%" }}
                    alt="example"
                    src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
                  />
                </div>
              }
            >
              <Meta
                title={<Rate className="rate" />}
                description={
                  <div className="cart-des">
                    <div className="name">Adidas Shoes</div>
                    <div className="price">$144</div>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center ",
                      }}
                    >
                      <div
                        style={{
                          fontSize: "8px",
                          borderRadius: "6px",
                          padding: "4px",
                          color: "#FFA200",
                          background: "rgb(255 162 0/17%)",
                          marginBottom: "4px",
                        }}
                      >
                        Via Metaverse
                      </div>
                      <div className="time">
                        <TimeSVG width="12px" height="12px" color="#8E8E93" /> 1
                        min
                      </div>
                    </div>
                  </div>
                }
              />
            </Card>
          </Col>
          <Col span={6}>
            <Card
              hoverable
              cover={
                <div className="cover">
                  <div className="new">new</div>
                  <div className="heart">❤</div>
                  <img
                    style={{ width: "100%" }}
                    alt="example"
                    src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
                  />
                </div>
              }
            >
              <Meta
                title={<Rate className="rate" />}
                description={
                  <div className="cart-des">
                    <div className="name">Adidas Shoes</div>
                    <div className="price">$144</div>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center ",
                      }}
                    >
                      <div
                        style={{
                          fontSize: "8px",
                          borderRadius: "6px",
                          padding: "4px",
                          color: "#FFA200",
                          background: "rgb(255 162 0/17%)",
                          marginBottom: "4px",
                        }}
                      >
                        Via Metaverse
                      </div>
                      <div className="time">
                        <TimeSVG width="12px" height="12px" color="#8E8E93" /> 1
                        min
                      </div>
                    </div>
                  </div>
                }
              />
            </Card>
          </Col>
          <Col span={6}>
            <Card
              hoverable
              cover={
                <div className="cover">
                  <div className="new">new</div>
                  <div className="heart">❤</div>
                  <img
                    style={{ width: "100%" }}
                    alt="example"
                    src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
                  />
                </div>
              }
            >
              <Meta
                title={<Rate className="rate" />}
                description={
                  <div className="cart-des">
                    <div className="name">Adidas Shoes</div>
                    <div className="price">$144</div>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center ",
                      }}
                    >
                      <div
                        style={{
                          fontSize: "8px",
                          borderRadius: "6px",
                          padding: "4px",
                          color: "#FFA200",
                          background: "rgb(255 162 0/17%)",
                          marginBottom: "4px",
                        }}
                      >
                        Via Metaverse
                      </div>
                      <div className="time">
                        <TimeSVG width="12px" height="12px" color="#8E8E93" /> 1
                        min
                      </div>
                    </div>
                  </div>
                }
              />
            </Card>
          </Col>
        </Row>
      </div>
      <div>
        <div
          style={{ marginBottom: "12px", marginTop: "16px", fontWeight: "600" }}
        >
          Shared goods
        </div>
        <Row gutter={[10, 10]}>
          <Col span={6}>
            <Card
              hoverable
              cover={
                <div className="cover">
                  <div className="new">new</div>
                  <div className="heart">❤</div>
                  <img
                    style={{ width: "100%" }}
                    alt="example"
                    src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
                  />
                </div>
              }
            >
              <Meta
                title={<Rate className="rate" />}
                description={
                  <div className="cart-des">
                    <div className="name">Adidas Shoes</div>
                    <div className="price">$144</div>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center ",
                      }}
                    >
                      <div
                        style={{
                          fontSize: "8px",
                          borderRadius: "6px",
                          padding: "4px",
                          color: "#FFA200",
                          background: "rgb(255 162 0/17%)",
                          marginBottom: "4px",
                        }}
                      >
                        Via Metaverse
                      </div>
                      <div className="time">
                        <TimeSVG width="12px" height="12px" color="#8E8E93" /> 1
                        min
                      </div>
                    </div>
                  </div>
                }
              />
            </Card>
          </Col>
          <Col span={6}>
            <Card
              hoverable
              cover={
                <div className="cover">
                  <div className="new">new</div>
                  <div className="heart">❤</div>
                  <img
                    style={{ width: "100%" }}
                    alt="example"
                    src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
                  />
                </div>
              }
            >
              <Meta
                title={<Rate className="rate" />}
                description={
                  <div className="cart-des">
                    <div className="name">Adidas Shoes</div>
                    <div className="price">$144</div>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center ",
                      }}
                    >
                      <div
                        style={{
                          fontSize: "8px",
                          borderRadius: "6px",
                          padding: "4px",
                          color: "#FFA200",
                          background: "rgb(255 162 0/17%)",
                          marginBottom: "4px",
                        }}
                      >
                        Via Metaverse
                      </div>
                      <div className="time">
                        <TimeSVG width="12px" height="12px" color="#8E8E93" /> 1
                        min
                      </div>
                    </div>
                  </div>
                }
              />
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default Carts;
