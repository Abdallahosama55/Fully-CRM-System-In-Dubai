import { useState } from "react";
import { Dropdown, Menu, Row, Col, Typography } from "antd";
// import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import { DeleteSVG, RenameSVG, CalenderFolderSVG, FolderIconSMSVG, EyeSVG } from "assets/jsx-svg";
import WarningModal from "./WarningModal";
import { useDrop } from "react-dnd";
import { MoreDimentionSVG } from "assets/jsx-svg";
export default function FolderCard({
  onDropDimention,
  name,
  id,
  deleteRequest,
  onFolderEditView,
  img,
  isProject,
  createdDate,
}) {
  const dateString = createdDate;
  const dateObject = new Date(dateString);

  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  };
  const formattedDate = new Intl.DateTimeFormat("en-US", options).format(dateObject);

  const [{ isOver }, drop] = useDrop({
    accept: "FOLDER",
    drop: (dimensionData) => {
      var { data } = dimensionData;
      var dimensionId = data?.id;
      onDropDimention(dimensionId, id);
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  });

  const navigate = useNavigate();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const showDeleteModal = () => {
    setIsDeleteModalOpen(true);
  };
  const handleDeleteModalOk = () => {
    deleteRequest(id);
    setIsDeleteModalOpen(false);
  };
  const handleDeleteModalCancel = () => {
    setIsDeleteModalOpen(false);
    // setCityToDelete(null);
  };

  var heightImage = isProject ? 80 : 100;
  var widthImage = isProject ? 114 : 160;
  const myStyle = {
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundImage: "url('" + img + "')",
    height: heightImage,
    width: widthImage,
    borderRadius: 10,
  };
  const myFolderDefaultStyle = {
    backgroundSize: "contain",
    backgroundRepeat: "no-repeat",
    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='75.028' height='70.267' viewBox='0 0 75.028 70.267'%3E%3Cg id='Group_54204' data-name='Group 54204' transform='translate(-556.011 -364.739)'%3E%3Cpath id='Vector' d='M73.788,22.436H0V13.678C0,6.127,7.428,0,16.581,0h8.7C31.4,0,33.312,1.64,35.75,4.333L41,10.089c1.163,1.269,1.313,1.424,3.489,1.424H54.957C63.622,11.512,71.012,16.061,73.788,22.436Z' transform='translate(556.011 364.739)' fill='%23fff'/%3E%3Cpath id='Vector-2' data-name='Vector' d='M74.951,0l.075,22.134A20.092,20.092,0,0,1,54.957,42.2H20.07A20.092,20.092,0,0,1,0,22.134V0Z' transform='translate(556.011 392.801)' fill='%23fff'/%3E%3Cpath id='Union_100' data-name='Union 100' d='M-9460.922-171.972a20.093,20.093,0,0,1-20.07-20.07v-22.133h74.951l.076,22.133a20.093,20.093,0,0,1-20.07,20.07Zm-20.07-47.831v-8.759c0-7.55,7.429-13.677,16.582-13.677h8.7c6.115,0,8.028,1.639,10.468,4.333l5.251,5.756c1.163,1.268,1.313,1.423,3.488,1.423h10.467c8.666,0,16.057,4.549,18.831,10.924Z' transform='translate(10037.004 606.978)' fill='rgba(255,187,33,0.6)'/%3E%3Cpath id='Vector-3' data-name='Vector' d='M73.788,22.334H0V13.616C0,6.1,7.428,0,16.581,0h8.7C31.4,0,33.312,1.633,35.75,4.313L41,10.043c1.163,1.263,1.313,1.417,3.489,1.417H54.957C63.622,11.46,71.012,15.988,73.788,22.334Z' transform='translate(556.011 364.841)' fill='rgba(255,187,33,0.6)'/%3E%3C/g%3E%3C/svg%3E")`,
    height: heightImage,
    width: widthImage,
    borderRadius: 10,
  };
  return (
    <>
      <WarningModal
        isWarningModalOpen={isDeleteModalOpen}
        handleCancel={handleDeleteModalCancel}
        handleOk={handleDeleteModalOk}
        warningBody={`Are you sure you want to delete the "${name}"?`}
      />

      <div
        ref={drop}
        className="card folder-card"
        style={{
          marginTop: 0,
          width: "100%",
          height: "100%",
          boxShadow: "0px 0px 8px #00000010",
          borderRadius: 12,
          overflow: "hidden",
          backgroundColor: "#F6F6F7",
          border: isOver ? "2px dashed #000" : "1px solid #E5E5EA",
        }}>
        <Dropdown
          dropdownRender={() => (
            <DimMenu
              onFolderEditView={onFolderEditView}
              onViewClicked={() => navigate("/metaverse/" + name + "/" + id)}
              onDeleteClicked={showDeleteModal}
            />
          )}
          trigger={["click"]}
          placement="bottomRight"
          arrow>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height: "20px",
              width: "20px",
              cursor: "pointer",
              position: "absolute",
              right: 20,
              top: 20,
              padding: "0px",
              backgroundColor: "#FFFFFF",
              borderRadius: 15,
              boxShadow: "0px 3px 6px #00000014",
            }}>
            <MoreDimentionSVG color="#030713" style={{ rotate: "0deg" }} />
          </div>
        </Dropdown>
        <div style={{ padding: "20px 20px" }}>
          <div
            onClick={() => navigate("/metaverse/" + name + "/" + id)}
            style={img ? myStyle : myFolderDefaultStyle}></div>

          <div style={{ display: "flex", marginTop: 15 }}>
            <FolderIconSMSVG style={{ height: 20 }} />
            <p onClick={() => navigate("/metaverse/" + name + "/" + id)} className="folder-name">
              {name}
            </p>
          </div>
          <div style={{ display: "flex", marginTop: 5 }}>
            <CalenderFolderSVG style={{ height: 20 }} />
            <p onClick={() => navigate("/metaverse/" + name + "/" + id)} className="folder-time">
              {formattedDate ? formattedDate : "24 May 2023, 08:00Am"}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

const DimMenu = ({ onFolderEditView, onViewClicked, onDeleteClicked }) => {
  // const { openMessage } = useNotification();
  return (
    <Menu
      className="profile-menu"
      style={{ width: "190px" }}
      items={[
        {
          label: (
            <Row align="middle" gutter={[14, 0]} wrap={false}>
              <Col>
                <Row align="middle">
                  <EyeSVG />
                </Row>
              </Col>
              <Col>
                <Typography>View</Typography>
              </Col>
            </Row>
          ),
          key: "0",
          onClick: () => onViewClicked(),
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
          key: "1",
          onClick: () => onFolderEditView(),
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
          key: "2",
          onClick: () => onDeleteClicked(),
        },
      ]}
    />
  );
};
