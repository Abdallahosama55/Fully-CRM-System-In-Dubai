import { useEffect, useState } from "react";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Col, Input, Menu, Modal, Row, Typography, Select, Breadcrumb, Form } from "antd";
import {
  AddEventSVG,
  AddSVG,
  DeleteSVG,
  EmbeddedCodeSVG,
  EyeSVG,
  LinkSVG,
  RenameSVG,
  SearchSVG,
  UserSVG,
} from "assets/jsx-svg";

import AddMetaverse from "./AddMetaverse";
import DimensionsService from "services/dimensions.service";
import { axiosCatch } from "utils/axiosUtils";
import AddMetaverseForm from "./add-metaverse/addMetaverse";
import VerseCard from "components/common/VerseCard";

import "./style.css";
import AddDesk from "./AddDesk";
import DesksList from "./DeskList";
import { useNotification } from "context/notificationContext";
import AddToCustomerModal from "../Projects/Components/AddToCustomerModal";
const MetaverseView = () => {
  const [verseModalOpen, setVerseModalOpen] = useState({
    open: false,
    data: null,
  });
  const [dimensions, setDimensions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [deleteDimLoading, setDeleteDimLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const delayDebounceFn = setTimeout(
      () => {
        (async () => {
          try {
            setLoading(true);
            const res = await DimensionsService.searchDimensions({
              limit: 100,
              searchKey: searchQuery,
            });
            setDimensions(res.data.data.rows);
          } catch (err) {
            console.log(err);
          } finally {
            setLoading(false);
          }
        })();
      },
      searchQuery.length > 0 ? 500 : 0,
    );

    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery]);

  const deleteDim = async (id) => {
    try {
      setDeleteDimLoading(id);
      await DimensionsService.deleteDimension(id);
      setDimensions((prev) => prev.filter((dim) => dim.id !== id));
    } catch (err) {
      axiosCatch(err);
    } finally {
      setDeleteDimLoading(false);
    }
  };
  const [addToCustomerModalOpen, setAddToCustomerModalOpen] = useState({ open: false, data: null });
  const { openNotificationWithIcon } = useNotification();

  const [addToCustomerform] = Form.useForm();
  const addToCustomerOnFinsh = (values) => {
    var values = {
      dimensionId: addToCustomerModalOpen.data.id,
      email: values.email,
    };
    console.log("values==", values);
    addToCustomerRequest(values);
  };
  const addToCustomerOnCancel = () => {
    addToCustomerform.resetFields();
    setAddToCustomerModalOpen({ ...addToCustomerModalOpen, open: false });
  };
  const addToCustomerRequest = (data) => {
    DimensionsService.pushToCustomer(data)
      .then(({ data }) => {
        setLoading(false);
        addToCustomerform.resetFields();
        openNotificationWithIcon("success", "Sent successfully");

        setAddToCustomerModalOpen({ data: null, open: false });
      })
      .catch((error) => {
        setLoading(false);
        var { errors } = error?.response.data;
        openNotificationWithIcon("error", errors[0]);
      });
  };
  return (
    <section style={{ padding: "0.5rem" }}>
      <Row align="middle" justify="space-between" gutter={[12, 12]}>
        <Breadcrumb
          items={[
            {
              title: "Metaverse",
            },
            {
              title: "Verses",
            },
          ]}
        />
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
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </Col>
            <Col>
              <Select
                className="general-table-select"
                style={{ width: "100%" }}
                defaultValue="newest"
                options={[
                  {
                    value: "newest",
                    label: (
                      <Typography.Text className="fz-12">
                        Sort by: <span className="fw-600">Newest</span>
                      </Typography.Text>
                    ),
                  },
                ]}
              />
            </Col>
            <Col>
              <Button
                onClick={() => setModalOpen(true)}
                className="wc"
                style={{ background: "#272942", width: "100%" }}>
                <PlusOutlined className="wc" />
                Request Custom Verse
              </Button>
            </Col>
            <AddMetaverseForm setModalOpen={setModalOpen} modalOpen={modalOpen} />

            <Col>
              <Button
                onClick={() => setVerseModalOpen({ open: true })}
                className="wc"
                style={{ background: "#272942", width: "100%" }}>
                <PlusOutlined className="wc" />
                New Verse
              </Button>
            </Col>
          </Row>
        </Col>
      </Row>

      <Row justify="start" gutter={[32, 42]} style={{ marginTop: "47px" }}>
        {loading ? (
          <div className="center-items" style={{ width: "100%" }}>
            <LoadingOutlined />
          </div>
        ) : (
          <>
            {dimensions.map((dim) => {
              return (
                <Col xs={24} sm={24} md={12} lg={8} key={dim.id}>
                  <VerseCard
                    data={dim}
                    setVerseModalOpen={setVerseModalOpen}
                    deleteDim={deleteDim}
                    DimMenu={() => (
                      <DimMenu
                        data={dim}
                        id={dim.id}
                        name={dim.name}
                        deleteDim={deleteDim}
                        setVerseModalOpen={setVerseModalOpen}
                        setAddToCustomerModalOpen={setAddToCustomerModalOpen}
                      />
                    )}
                    link={`/metaverse/${dim.name}`}
                    linkStyle={{
                      opacity: deleteDimLoading === dim.id && "0.5",
                    }}
                  />
                </Col>
              );
            })}
          </>
        )}
      </Row>
      <Modal
        open={verseModalOpen.open}
        onCancel={() => setVerseModalOpen({ open: false, id: null })}
        centered
        closable={true}
        footer={false}
        destroyOnClose>
        {verseModalOpen.render ? (
          verseModalOpen.render
        ) : (
          <AddMetaverse
            data={verseModalOpen.data}
            setVerseModalOpen={setVerseModalOpen}
            setDimensions={setDimensions}
          />
        )}
      </Modal>
      <AddToCustomerModal
        form={addToCustomerform}
        onFinish={addToCustomerOnFinsh}
        isAddToCustomerModalOpen={addToCustomerModalOpen.open}
        handleAddToCustomerModalCancel={addToCustomerOnCancel}
      />
    </section>
  );
};
export default MetaverseView;

const DimMenu = ({ id, name, deleteDim, setVerseModalOpen, data, setAddToCustomerModalOpen }) => {
  const { openMessage } = useNotification();
  return (
    <Menu
      className="profile-menu"
      style={{ width: "190px" }}
      items={[
        {
          label: (
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <div style={{ display: "flex" }}>
                <UserSVG />
                <Typography style={{ marginLeft: 13 }}>Add to customer</Typography>
              </div>
            </div>
          ),
          key: "-1",
          onClick: () => setAddToCustomerModalOpen({ open: true, data }),
        },
        {
          label: (
            <Row align="middle" gutter={[14, 0]} wrap={false}>
              <Col>
                <Row align="middle">
                  <LinkSVG />
                </Row>
              </Col>
              <Col>
                <Typography>Copy Link</Typography>
              </Col>
            </Row>
          ),
          key: "0",
          onClick: () => {
            navigator.clipboard.writeText(
              `${window.location.origin}/metaverse/${name.split(" ").join("_")}`,
            );
            openMessage({ type: "success", message: "Copied Successfully ✔" });
          },
        },
        {
          label: (
            <Row align="middle" gutter={[14, 0]} wrap={false}>
              <Col>
                <Row align="middle">
                  <EmbeddedCodeSVG />
                </Row>
              </Col>
              <Col>
                <Typography>Embedded Code</Typography>
              </Col>
            </Row>
          ),
          key: "1",
          // onClick: toggleAddDeskModal,
        },
        // {
        //   label: (
        //     <Row align="middle" gutter={[14, 0]} wrap={false}>
        //       <Col>
        //         <Row align="middle">
        //           <AddSVG />
        //         </Row>
        //       </Col>
        //       <Col>
        //         <Typography>Add Desk</Typography>
        //       </Col>
        //     </Row>
        //   ),
        //   key: "2",
        //   onClick: () =>
        //     setVerseModalOpen({
        //       open: true,
        //       data,
        //       render: <AddDesk setVerseModalOpen={setVerseModalOpen} id={id} />,
        //     }),
        // },
        {
          label: (
            <Row align="middle" gutter={[14, 0]} wrap={false}>
              <Col>
                <Row align="middle">
                  <EyeSVG />
                </Row>
              </Col>
              <Col>
                <Typography>Desks List</Typography>
              </Col>
            </Row>
          ),
          key: "3",
          onClick: () =>
            setVerseModalOpen({
              open: true,
              data,
              render: <DesksList setVerseModalOpen={setVerseModalOpen} companyDimensionId={id} />,
            }),
        },
        {
          label: (
            <Row align="middle" gutter={[14, 0]} wrap={false}>
              <Col>
                <Row align="middle">
                  <RenameSVG />
                </Row>
              </Col>
              <Col>
                <Typography>Edit</Typography>
              </Col>
            </Row>
          ),
          key: "4",
          onClick: () => setVerseModalOpen({ open: true, data }),
        },
        {
          label: (
            <Row align="middle" gutter={[14, 0]} wrap={false}>
              <Col>
                <Row align="middle">
                  <DeleteSVG />
                </Row>
              </Col>
              <Col>
                <Typography style={{ color: "#f93e3e" }}>Delete</Typography>
              </Col>
            </Row>
          ),
          key: "5",
          onClick: () => deleteDim(id),
        },
      ]}
    />
  );
};
