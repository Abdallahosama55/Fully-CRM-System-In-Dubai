import ReactQuill, { Quill } from "react-quill";
// style
import "./quill.snow.css";
import "./styles.css";
import { Button, Input, Form } from "antd";
import { DatePicker, Select, Row, Col } from "antd";
import { ArrowDownSVG, UsersThreeRegularSVG } from "assets/jsx-svg";

//Alignment
Quill.register(Quill.import("attributors/style/align"), true);

const Editor = ({
  value,
  onChange,
  onSubmit,
  btn_label,
  className,
  placeholder,
  isTask,
  form,
  isLoading = false,
  showTitle = false,
  titlePlaceholder,
}) => {
  return (
    <div className={`editor ${className ? className : ""}`}>
      <Form requiredMark="optional" form={form} onFinish={onSubmit} autoComplete="off">
        {showTitle && (
          <Form.Item labelCol={{ span: 24 }} wrapperCol={{ span: 24 }} name="title">
            <Input placeholder={titlePlaceholder} style={{ border: "none", fontSize: 18 }} />
          </Form.Item>
        )}

        <Form.Item
          style={{ marginBottom: 0 }}
          labelCol={{ span: 24 }} // Default label column width
          wrapperCol={{ span: 24 }}
          name="description">
          <ReactQuill
            value={value}
            onChange={onChange}
            placeholder={placeholder ? placeholder : "Type here..."}
            modules={{
              toolbar: [
                // [{ 'align': [] }],
                [{ align: [] }, "bold", "italic", "underline", "strike", "link", "image"],
              ],
            }}
          />
        </Form.Item>
        {(isTask || btn_label) && (
          <Row justify={"end"} style={{ padding: "0px 10px", gap: 10 }}>
            {isTask && (
              <Col>
                <Form.Item name={"date"}>
                  <DatePicker
                    style={{ border: "unset" }}
                    size="small"
                    placeholder={new Date().toDateString()}
                    suffixIcon={<ArrowDownSVG />}
                  />
                </Form.Item>
              </Col>
            )}
            {isTask && (
              <Col>
                <Form.Item name="assingTo">
                  <Select
                    className="general-table-select"
                    style={{ width: "150px" }}
                    defaultValue="all"
                    suffixIcon={<ArrowDownSVG />}
                    options={[
                      {
                        value: "all",
                        label: (
                          <div className="fz-12">
                            <UsersThreeRegularSVG fill="#AEAEB2" style={{ marginRight: "8px" }} />
                            <span>All employees</span>
                          </div>
                        ),
                      },
                      {
                        value: "1",
                        label: (
                          <div className="fz-12">
                            <UsersThreeRegularSVG fill="#AEAEB2" style={{ marginRight: "8px" }} />
                            <span>1 employees</span>
                          </div>
                        ),
                      },
                    ]}
                  />
                </Form.Item>
              </Col>
            )}
            {isTask && (
              <Col>
                <Form.Item name="priority">
                  <Select
                    className="general-table-select"
                    style={{ width: "150px" }}
                    defaultValue="all"
                    suffixIcon={<ArrowDownSVG />}
                    options={[
                      {
                        value: "all",
                        label: (
                          <div className="fz-12">
                            <UsersThreeRegularSVG fill="#AEAEB2" style={{ marginRight: "8px" }} />
                            <span>All employees</span>
                          </div>
                        ),
                      },
                      {
                        value: "all3",
                        label: (
                          <div className="fz-12">
                            <UsersThreeRegularSVG fill="#AEAEB2" style={{ marginRight: "8px" }} />
                            <span>all3 employees</span>
                          </div>
                        ),
                      },
                    ]}
                  />
                </Form.Item>
              </Col>
            )}
            <Col>
              <Form.Item>
                {btn_label && (
                  <Button
                    loading={isLoading}
                    htmlType="submit"
                    type="primary"
                    size="middle"
                    style={{ float: "right" }}>
                    {btn_label}
                  </Button>
                )}
              </Form.Item>
            </Col>
          </Row>
        )}
      </Form>
    </div>
  );
};

export default Editor;
