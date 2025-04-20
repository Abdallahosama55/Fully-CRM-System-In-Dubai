import { useState, useEffect } from "react";
import { Col, Image, Row, Tooltip } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import InfiniteScroll from "react-infinite-scroll-component";

import VverseMediaService from "services/VverseMedia/vverse-media.service";
import { axiosCatch } from "utils/axiosUtils";
import videoImg from "assets/images/video.jpg";

export default function MediaTabsContent({
  activeTab,
  setSelectedMedia,
  selectedMedia,
  setUploadedData,
}) {
  const [loading, setLoading] = useState(false);
  const [media, setMedia] = useState([]);
  const [mediaOffest, setMediaOffest] = useState(0);
  const [mediaCount, setMediaCount] = useState(0);

  useEffect(() => {
    (async () => {
      try {
        setMedia([]);
        setLoading(true);
        const res = await VverseMediaService.getByType(activeTab, 20, 0);
        setMedia(res.data.data.rows);
        setMediaCount(res.data.data.count);
        setMediaOffest(20);
      } catch (err) {
        setMedia([]);
        axiosCatch(err);
      } finally {
        setLoading(false);
      }
    })();
  }, [activeTab]);

  const fetchMedia = async () => {
    console.log("tsetsetsets");
    if (mediaOffest < mediaCount) {
      try {
        const res = await VverseMediaService.getByType(activeTab, 20, mediaOffest);
        setMedia((prev) => [...prev, ...res.data.data.rows]);
        setMediaCount(res.data.data.count);
        setMediaOffest((prev) => prev + 20);
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <section className="modal-tabs-content" id="modal-tabs-content">
      {loading && (
        <Row className="h-100" justify="center" align="middle">
          <LoadingOutlined />
        </Row>
      )}
      {media.length ? (
        <InfiniteScroll
          style={{ overflow: "hidden", padding: "0px 4px" }}
          dataLength={media.length}
          next={fetchMedia}
          hasMore={mediaOffest < mediaCount}
          loader={
            <Row justify="center" className="mt-1">
              <LoadingOutlined />
            </Row>
          }
          scrollableTarget="modal-tabs-content">
          <div style={{ overflow: "hidden" }}>
            <Row gutter={[8, 8]} wrap={true}>
              {media.map((item) => (
                <Col style={{ width: "20%" }} draggable key={item.id}>
                  <Row gutter={[8, 0]} wrap={false}>
                    <Col>
                      <Tooltip title={item.name}>
                        <Image
                          onClick={() => {
                            setUploadedData(null);
                            setSelectedMedia(item);
                          }}
                          style={{
                            borderRadius: "8px",
                            objectFit: "cover",
                            border: selectedMedia?.id === item.id && "3px solid #3a5ee3",
                          }}
                          preview={false}
                          width="91px"
                          height="78px"
                          src={item.image || videoImg}
                        />
                      </Tooltip>
                    </Col>
                  </Row>
                </Col>
              ))}
            </Row>
          </div>
        </InfiniteScroll>
      ) : null}
    </section>
  );
}
