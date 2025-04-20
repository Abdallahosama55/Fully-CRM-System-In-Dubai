import { Col, Image, Row, Typography } from "antd";
import house from "assets/images/house.png";
import { useEffect } from "react";
const MeetingVerseList = ({ rows, onChange, value,setSelectedDimId }) => {
  useEffect(()=>{
    if(value)
    {
      //alert('set'+ value)
      setSelectedDimId(value)
    }
  },[value]);
  return (
    <Row justify="start" gutter={[32, 42]} style={{ marginTop: "15px" }} className="rows-verses">
      {(rows || []).map((verse) => (
        <Col
          style={{ opacity: "1", width: "268px" }}
          key={verse.id}
          onClick={() => onChange(verse.id,verse.places)}>
          <Row gutter={[10, 10]}>
            <Col xs={24}>
              <div
                className={`explore-card ${value === verse.id && "border-blue"}`}
                style={{ position: "relative" }}>
                <div className="image-holder">
                  <Image
                    preview={false}
                    src={verse.image || house}
                    alt="dimension"
                    width="100%"
                    height="100%"
                    className="explore-card-img"
                  />
                </div>
                <div className="image-text-holder">
                  <Typography.Text className="explore-card-subtitle" ellipsis>
                    {verse.name}
                  </Typography.Text>
                </div>
              </div>
            </Col>
          </Row>
        </Col>
      ))}
    </Row>
  );
};

export default MeetingVerseList;
