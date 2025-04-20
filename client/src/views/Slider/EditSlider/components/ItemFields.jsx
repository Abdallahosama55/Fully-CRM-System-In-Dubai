import { Fragment, useEffect, useState } from "react";
import {
  Col,
  ColorPicker,
  Form,
  Input,
  Pagination,
  Radio,
  Row,
  Spin,
  Typography,
  Upload,
} from "antd";
import ItemInformation from "./ItemInformation";
import { SearchSVG } from "assets/jsx-svg";
import "../style.css";
import MeetingVerseList from "./MeetingVerseList";
import { getBase64 } from "utils/getBase64";
import { LIST_IGNORE } from "antd/es/upload/Upload";
import { PlusOutlined } from "@ant-design/icons";
import useGetDimensionSearch from "services/Dimensions/Queries/useGetDimensionSearch";
import { useDebounce } from "hooks/useDebounce";
import CustomColorPicker from "./CustomColorPicker";

const ItemFields = ({ handleRemoveImage, photo }) => {
  const [search, setSearch] = useState();
  const [page, setPage] = useState(0);
  const [places, setPlaces] = useState([]);
  const [selectedDimId, setSelectedDimId] = useState([]);
  const searchDebounce = useDebounce(search);
  const { data, isLoading } = useGetDimensionSearch(
    { searchKey: searchDebounce, offset: (page ? page - 1 : page) * 10, limit: 20 },
    {
      select: (data) => {
        return data.data.data;
      },
    },
  );
  //const dimensionId = watch('dimensionId');
  useEffect(()=>{
    if(selectedDimId && data?.rows){
      //alert('get' + selectedDimId)
      //alert('rows:' + JSON.stringify(data?.rows.filter(x=> x.id === selectedDimId)))
      const places = data?.rows.filter(x=> x.id === selectedDimId)?.[0]?.places;
      if(places){
       // alert('place' + places)

        setPlaces(JSON.parse(places));
      }else{
       // alert('reset')
        setPlaces([]);
      }
    }
  },[selectedDimId,data?.rows]);

  return (
    <Fragment>
      <ItemInformation />
      <div className="editor-slider-builder">
        <Row align="middle" justify="space-between" gutter={[16, 16]}>
          <Col>
            <Typography.Text className="fw-500">Select Meeting Verse</Typography.Text>
          </Col>
          <Col>
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
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </Col>
            </Row>
          </Col>
        </Row>
        <Spin spinning={isLoading}>
          <Form.Item
            name="dimensionId"
            rules={[
              {
                required: true,
                message: "Please Select Verse",
              },
            ]}
            style={{ marginBottom: "0px" }}>
            <MeetingVerseList rows={data?.rows} onChange={(verseId,places)=>{
              if(places){
                setPlaces(JSON.parse(places));
              }else{
                setPlaces([]);
              }
            }}
            setSelectedDimId={setSelectedDimId}></MeetingVerseList>
          </Form.Item>
        </Spin>

        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            marginTop: "12px",
          }}>
          <Pagination onChange={(e) => setPage(e)} defaultCurrent={1} total={data?.count} />
        </div>
      </div>

      {places?.length ? <Form.Item label="Select Drop Point" name="dimensionDropPoint">
        <Radio.Group>
          {places?.map((item) => {
            return (
              <Radio value={item.name} key={item.name}>
                {item.name}
              </Radio>
            );
          })}
        </Radio.Group>
      </Form.Item> : <></>
      }
      <Form.Item
        extra={
          photo && (
            <div
              onClick={() => {
                handleRemoveImage();
              }}
              style={{ cursor: "pointer" }}>
              Remove image
            </div>
          )
        }
        name="photo"
        id="photo"
        label={"Hover image"}
        rules={[{ required: false }]}>
        <UploadImage />
      </Form.Item>
      <Row gutter={[8, 0]}>
        <Col xs={12}>
          <div className="item-picker">
            <Form.Item className="color-picker-form" style={{ margin: 0 }} name="FGColor">
              <CustomColorPicker
                format="hex"
                defaultFormat="hex"
                disabledAlpha
                defaultValue="#1677ff"
                showText={() => <span>Font Color</span>}
              />
            </Form.Item>{" "}
          </div>{" "}
        </Col>
        <Col xs={12}>
          <div className="item-picker">
            <Form.Item className="color-picker-form" style={{ margin: 0 }} name="BGColor">
              <CustomColorPicker
                format="hex"
                defaultFormat="hex"
                disabledAlpha
                defaultValue="#1677ff"
                showText={() => <span>background Color</span>}
              />
            </Form.Item>
          </div>
        </Col>
      </Row>
    </Fragment>
  );
};

const UploadImage = ({ value, onChange }) => {
  return (
    <Upload
      accept="image/*"
      multiple={false}
      maxCount={1}
      name="photo"
      listType="picture-card"
      className="avatar-uploader"
      showUploadList={false}
      onChange={async (info) => {
        onChange({
          imageBase64: await getBase64(info.fileList[0].originFileObj),
          file: info.fileList[0].originFileObj,
        });
      }}
      fileList={[]}
      beforeUpload={(file) => {
        if (file.size > 4194304) {
          message.error("Image must be less than 4MB");
          onChange("");

          return LIST_IGNORE;
        }
        return false;
      }}>
      {value?.imageBase64 ? (
        <img style={{ width: "100%" }} src={value.imageBase64} alt="avatar" />
      ) : (
        uploadButton
      )}
    </Upload>
  );
};
const uploadButton = (
  <div>
    <PlusOutlined />
    <div
      style={{
        marginTop: 8,
      }}>
      Upload
    </div>
  </div>
);
const DROP_POINT = [
  {
    label: "Entrance",
    value: 1,
  },
  {
    label: "Store",
    value: 2,
  },
  {
    label: "Counter",
    value: 3,
  },
  {
    label: "Market",
    value: 4,
  },
];

export default ItemFields;
