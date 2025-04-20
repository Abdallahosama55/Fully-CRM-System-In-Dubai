import {
  Checkbox,
  Col,
  Form,
  Image,
  Input,
  InputNumber,
  Pagination,
  Radio,
  Row,
  Select,
  message,
} from "antd";
import Dragger from "antd/es/upload/Dragger";
import { useContext, useEffect, useState } from "react";

import { CloseSVG, PictureSVG, SearchSVG } from "assets/jsx-svg";

import VerseCard from "components/common/VerseCard";
import DimensionsService from "services/dimensions.service";
import { axiosCatch } from "utils/axiosUtils";

import SelectLookups from "components/SelectLookups";
import { useParams } from "react-router-dom";
import useGetSearchEmployeesMini from "services/Employees/Querys/useGetSearchEmployeesMini";
import "./styles.css";
import { DURATION_VALUES } from "views/Desks/options";
import userContext from "context/userContext";

const options = [
  {
    label: "Meeting Call",
    value: "STANDARD",
  },
  {
    label: "Metaverse Meeting",
    value: "METAVERSE",
  },
];

const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

export default function BasicInformation({
  loading,
  form,
  previewPic,
  setPreviewPic,
  servicesSelected,
  setServicesSelected,
  servicesSelectedRoom,
  setServicesSelectedRoom,
  searchQuery,
  setSearchQuery,
  searchQueryRoom,
  setSearchQueryRoom,
  setPreviewPicForm,
}) {
  const { id } = useParams();
  const [verses, setVerses] = useState([]);
  const [room, setRoom] = useState([]);
  const [versesCount, setVersesCount] = useState(0);
  const [roomCount, setRoomCount] = useState(0);
  const [items, setItems] = useState(0);
  const [itemsRoom, setTtemsRoom] = useState(0);
  const [dimensionPlacese, setDimensionPlacese] = useState([]);
  const [dimensionRoomPlacese, setDimensionRoomPlacese] = useState([]);

  useEffect(() => {
    if (servicesSelected) {
      let selectedVerse = verses.filter((item) => item.id == servicesSelected)[0];

      setDimensionPlacese(selectedVerse?.places ? JSON.parse(selectedVerse?.places) : []);
    }
  }, [verses, servicesSelected]);

  useEffect(() => {
    if (servicesSelectedRoom) {
      let selectedVerse = verses.filter((item) => item.id == servicesSelectedRoom)[0];

      setDimensionRoomPlacese(selectedVerse?.places ? JSON.parse(selectedVerse?.places) : []);
    }
  }, [verses, servicesSelectedRoom]);
  const { data: dataEmployees } = useGetSearchEmployeesMini(
    {},
    {
      select: (res) => {
        return res.data.data.data;
      },
    },
  );

  const { user } = useContext(userContext);

  const callType = Form.useWatch("callType", form);
  const durationSelection = Form.useWatch("durationSelection", form);
  const duration = Form.useWatch("duration", form);
  const aiAgent = Form.useWatch("aiAgent", form);

  useEffect(() => {
    form.setFieldValue("meetingVerse", servicesSelected);
    form.setFieldValue("waitingRoomVerse", servicesSelectedRoom);
  }, [form, servicesSelected, servicesSelectedRoom]);
  const props = {
    name: "file",
    multiple: false,
    action: false,
    maxCount: 1,
    beforeUpload: () => {
      return false;
    },
    async onChange(info) {
      const { status } = info.file;
      setPreviewPic(await getBase64(info.fileList[0].originFileObj));
      setPreviewPicForm(info.fileList[0].originFileObj);
      if (status !== "uploading") {
        console.log(info.file, info.fileList);
      }
      if (status === "done") {
        message.success(`${info.file.name} file uploaded successfully.`);
      } else if (status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    accept: "image/*",
    height: 192,
    style: { background: "white", border: previewPic && "none" },
  };

  useEffect(() => {
    const delayDebounceFn = setTimeout(
      () => {
        (async () => {
          try {
            const res = await DimensionsService.searchDimensions({
              limit: 10,
              searchKey: searchQuery,
              offset: items * 10,
            });
            setVerses(res.data.data.rows);
            setVersesCount(res.data.data.count);
          } catch (err) {
            axiosCatch(err);
          }
        })();
      },
      searchQuery.length > 0 ? 500 : 0,
    );

    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery, items]);

  useEffect(() => {
    const delayDebounceFn = setTimeout(
      () => {
        (async () => {
          try {
            const res = await DimensionsService.searchDimensions({
              limit: 10,
              searchKey: searchQueryRoom,
              offset: itemsRoom * 10,
            });
            setRoom(res.data.data.rows);
            setRoomCount(res.data.data.count);
          } catch (err) {
            axiosCatch(err);
          }
        })();
      },
      searchQueryRoom.length > 0 ? 500 : 0,
    );

    return () => clearTimeout(delayDebounceFn);
  }, [searchQueryRoom, itemsRoom]);

  useEffect(() => {
    if (aiAgent) {
      form.setFieldValue("deskEmployees", [user?.id]);
      form.setFieldValue("showAvailableBookingTimesInWidget", false);
    }
  }, [aiAgent]);

  const hadlepagination = (itemsData) => {
    setItems(itemsData - 1);
  };
  const hadlepaginationRoom = (itemsData) => {
    setTtemsRoom(itemsData - 1);
  };

  return (
    <section className="basic-information " style={{ padding: 0 }}>
      <div className="fw-500 fz-16" style={{ paddingBottom: "14px" }}>
        {id ? "Edit desk" : "Create New Desk"}
      </div>
      <div className="basic-info-upload-wraper">
        <Row>
          <Col xs={12}>
            <Form.Item>
              <Dragger showUploadList={false} {...props}>
                {previewPic && (
                  <>
                    <div className="basic-info-upload-img">
                      <Image preview={false} src={previewPic} style={{ maxHeight: "100%" }} />
                    </div>
                    <div
                      className="basic-info-upload-img-close"
                      onClick={(e) => {
                        e.stopPropagation();
                        setPreviewPic("");
                        setPreviewPicForm("");
                      }}>
                      <CloseSVG />
                    </div>
                  </>
                )}
                <div>
                  <div>
                    <PictureSVG />
                  </div>
                </div>
                <p className="ant-upload-hint">Upload desk picture</p>
                <p className="ant-upload-hint">Or Drag & Drop</p>
              </Dragger>
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={8}>
          <Col xs={12}>
            <Form.Item
              name="deskName"
              required
              // className="make-row"
              label="Desk Name"
              rules={[{ required: true, message: "Please Enter Desk Name" }]}>
              <Input placeholder="Enter Desk Name" />
            </Form.Item>
          </Col>
          <Col xs={12}>
            <Form.Item name="departmentId" label="Department">
              <SelectLookups allowClear type="departements" placeholder={"Select Department"} />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col xs={12}>
            <Form.Item label={<span></span>} valuePropName="checked" name={"aiAgent"}>
              <Checkbox>Is AI Agent</Checkbox>
            </Form.Item>
          </Col>
          <Col xs={12}>
            <Form.Item label="Invitees can schedule" name="scheduleDaysRange">
              <InputNumber
                type="number"
                className="w-100"
                suffix="Calender days into the future"
                placeholder="Day"
                defaultValue={60}
                min={0}
              />
            </Form.Item>
          </Col>
          {!aiAgent && (
            <Col xs={24}>
              <Form.Item
                name="deskEmployees"
                required
                rules={[
                  {
                    required: true,
                  },
                ]}
                label="Select which employees will work at this desk">
                <Select
                  placeholder="Select"
                  mode="multiple"
                  filterOption={(inputValue, option) => option.label.includes(inputValue)}
                  options={(dataEmployees || []).map((item) => ({
                    label: item.email,
                    value: item.id,
                  }))}
                />
              </Form.Item>
            </Col>
          )}
        </Row>
        <Row>
          <Col xs={24}>
            <Row gutter={8}>
              <Col xs={12}>
                <Form.Item
                  initialValue={DURATION_VALUES.includes(duration) ? duration : "CUSTOM"}
                  name="durationSelection"
                  label="Duration">
                  <Select
                    placeholder="Select"
                    options={[
                      ...DURATION_VALUES.map((item) => ({
                        label: `${item} min`,
                        value: item,
                      })),
                      { label: "Custom", value: "CUSTOM" },
                    ]}
                    onSelect={(val) => {
                      if (val != "CUSTOM") {
                        form.setFieldValue("duration", val);
                      }
                    }}
                  />
                </Form.Item>
              </Col>
              {durationSelection === "CUSTOM" && (
                <Col xs={12}>
                  <Form.Item
                    initialValue={duration ? duration : 30}
                    name="duration"
                    label="Custom Duration">
                    <Input type="number" placeholder="Duration" />
                  </Form.Item>
                </Col>
              )}
            </Row>
          </Col>
          <Col xs={24}>
            <Form.Item name="description" label="Description">
              <Input.TextArea placeholder="Description" />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={[0, 12]}>
          <Col xs={12}>
            <Form.Item
              name="callType"
              label="Call Type"
              rules={[{ required: true, message: "Please Select Call Type" }]}
              initialValue={"STANDARD"}>
              <Radio.Group options={options}></Radio.Group>
              {/* <Checkbox.Group  /> */}
            </Form.Item>
          </Col>
          <Col xs={12}>
            <Form.Item
              initialValue={true}
              label="Allow Customer To Change Call Type"
              name="allowCustomerToChangeCallType">
              <Radio.Group
                options={[
                  {
                    label: "Yes",
                    value: true,
                  },
                  {
                    label: "No",
                    value: false,
                  },
                ]}></Radio.Group>
            </Form.Item>
          </Col>
        </Row>

        {callType?.includes("METAVERSE") && (
          <>
            <Row className="Search">
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
            <Form.Item
              name="meetingVerse"
              rules={[
                {
                  required: true,
                  message: "Please Select Verse",
                },
              ]}>
              <Row
                justify="start"
                gutter={[32, 42]}
                style={{ marginTop: "15px" }}
                className="rows-verses">
                {verses.map((verse) => (
                  <Col
                    style={{ maxWidth: "300px" }}
                    xs={24}
                    sm={24}
                    md={12}
                    lg={6}
                    className="w-100"
                    key={verse.id}
                    onClick={() => setServicesSelected(verse.id)}>
                    <VerseCard
                      data={verse}
                      className={servicesSelected === verse.id && "border-blue"}
                    />
                  </Col>
                ))}
              </Row>
            </Form.Item>
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <Pagination
                onChange={hadlepagination}
                defaultCurrent={1}
                total={Math.ceil(versesCount / 10)}
              />
            </div>
            {servicesSelected && dimensionPlacese && dimensionPlacese?.length > 0 && (
              <>
                <Form.Item label={"Drop Point"} name="meetingDimensionDropPoint">
                  <Radio.Group>
                    {dimensionPlacese?.map((place) => (
                      <Radio value={place.name}>{place.name}</Radio>
                    ))}
                  </Radio.Group>
                </Form.Item>
              </>
            )}
            <Row style={{ marginTop: "30px" }} className="Search">
              <div>Waiting Room Verse</div>
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
                    value={searchQueryRoom}
                    onChange={(e) => setSearchQueryRoom(e.target.value)}
                  />
                </Col>
              </Row>
            </Row>
            <Form.Item name="waitingRoomVerse">
              <Row
                justify="start"
                gutter={[32, 42]}
                style={{ marginTop: "15px" }}
                className="rows-verses">
                {room.map((verse) => (
                  <Col
                    style={{ maxWidth: "300px" }}
                    xs={24}
                    sm={24}
                    md={12}
                    lg={6}
                    className="w-100"
                    key={verse.id}
                    onClick={() => setServicesSelectedRoom(verse.id)}>
                    <VerseCard
                      data={verse}
                      className={servicesSelectedRoom === verse.id && "border-blue"}
                    />
                  </Col>
                ))}
              </Row>
            </Form.Item>
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <Pagination
                onChange={hadlepaginationRoom}
                defaultCurrent={1}
                total={Math.ceil(roomCount / 10)}
              />
            </div>
            {servicesSelectedRoom && dimensionRoomPlacese && dimensionRoomPlacese?.length > 0 && (
              <>
                <Form.Item label={"Drop Point"} name="waitingDimensionDropPoint">
                  <Radio.Group>
                    {dimensionRoomPlacese?.map((place) => (
                      <Radio value={place.name}>{place.name}</Radio>
                    ))}
                  </Radio.Group>
                </Form.Item>
              </>
            )}
          </>
        )}
        <Row>
          <Col xs={12}>
            <Form.Item
              initialValue={true}
              label="Show In Engagements (Widgets)"
              name="showInWidget">
              <Radio.Group
                options={[
                  {
                    label: "Yes",
                    value: true,
                  },
                  {
                    label: "No",
                    value: false,
                  },
                ]}></Radio.Group>
            </Form.Item>
          </Col>
          {!aiAgent && (
            <Col xs={12}>
              <Form.Item
                initialValue={false}
                label="Show Available Booking Times in Engagements (Widgets)"
                name="showAvailableBookingTimesInWidget">
                <Radio.Group
                  options={[
                    {
                      label: "Yes",
                      value: true,
                    },
                    {
                      label: "No",
                      value: false,
                    },
                  ]}></Radio.Group>
              </Form.Item>
            </Col>
          )}
        </Row>
        <Row>
          <Form.Item
            initialValue={true}
            label="Auto Approve For Any Schedule Meeting"
            name="autoApproveForScheduleMeeting">
            <Radio.Group
              options={[
                {
                  label: "Yes",
                  value: true,
                },
                {
                  label: "No",
                  value: false,
                },
              ]}></Radio.Group>
          </Form.Item>
        </Row>
      </div>
    </section>
  );
}
