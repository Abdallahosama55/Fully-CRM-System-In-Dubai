import EditCard from "../EditCard";
import { Dropdown } from "antd";
// utils
import { addOpacityToColor } from "utils/color-picker";
// icons
import { Delete2SVG, EditSVG, MenuDotsSVG } from "assets/jsx-svg";
// styles
import "./styles.css";
import useDeleteStageItem from "services/Pipelines/Mutations/useDeleteStageItem";
import { useNotification } from "context/notificationContext";
import shortenString from "components/common/shortenString";
import WarningModal from "components/common/WarningModal";
import { Fragment, useState } from "react";
import DeleteMoveStageWarningModal from "./DeleteMoveStageWarningModal";
import useDeleteAndMoveStageItem from "services/Pipelines/Mutations/useDeleteAndMoveStageItem";

function Index({ cartsData, items, setItems, setReloadState, dragHandleProps, isHasPrev, isHasNext }) {
  const { openNotificationWithIcon } = useNotification();

  const handelEdit = (cartsData) => {
    const newItems = items.map((item) => {
      if (item.id === cartsData.id) {
        return { ...item, isEdit: true };
      }
      return item;
    });
    setItems(newItems);
  };
  const { deleteStageItem, isPending: isDeleteStageItemPending } = useDeleteStageItem({
    onError: (error) => {
      var { errors } = error?.response.data;

      openNotificationWithIcon("error", errors[0]);
    },
    onSuccess: (data, payloadId) => {
      setIsDeleteModalOpen(false);

      openNotificationWithIcon("success", "Deleted successfully");
      const newItems = items.filter((item) => item.id !== payloadId);
      setItems(newItems);
    },
  });
  const { deleteAndMoveStageItem, isPending: isDeleteAndMoveStageItem } = useDeleteAndMoveStageItem(
    {
      onError: (error) => {
        var { errors } = error?.response.data;

        openNotificationWithIcon("error", errors[0]);
      },
      onSuccess: (data, payload) => {
        openNotificationWithIcon("success", "Deleted and Moved successfully");
        const newItems = items.filter((item) => item.id !== payload.stageIdToRemove);
        setItems(newItems);
        setReloadState((prev) => !prev);
        setIsDeleteModalOpen(false);
      },
    },
  );
  const handelDelete = (cartsData) => {
    deleteStageItem(cartsData.id);
  };

  //delete model
  const [objToDelete, setObjToDelete] = useState({});

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const onRowDelete = (ObjToDelete) => {
    showDeleteModal();
    setObjToDelete(ObjToDelete);
  };

  const showDeleteModal = () => {
    setIsDeleteModalOpen(true);
  };

  const handleDeleteModalOk = () => {
    handelDelete(cartsData);
    setIsDeleteModalOpen(false);
  };

  const handleDeleteModalCancel = () => {
    setIsDeleteModalOpen(false);
    setObjToDelete(null);
  };
  return (
    <Fragment>
      <WarningModal
        isWarningModalOpen={isDeleteModalOpen && cartsData.items?.length == 0}
        handleCancel={handleDeleteModalCancel}
        handleOk={handleDeleteModalOk}
        warningBody={`Are you sure you want to delete this "${objToDelete?.label}" stage?`}
      />
      <DeleteMoveStageWarningModal
        isWarningModalOpen={isDeleteModalOpen && cartsData.items?.length > 0}
        handleCancel={handleDeleteModalCancel}
        deleteAndMoveStageItem={deleteAndMoveStageItem}
        stageItems={items}
        objToDelete={objToDelete}
      />

      {!cartsData.isEdit ? (
        <div
          {...dragHandleProps}
          style={{ background: addOpacityToColor(cartsData?.color, 0.12) }}
          className={`piplines-item-card ${isHasNext ? "has_next_lead" : ""} ${isHasPrev ? "has_prev_lead" : ""}`}>
          <p title={cartsData?.label} className="fz-14" style={{ paddingInlineStart: "6px" }}>{cartsData?.label}</p>
          <div style={{ display: 'flex', gap: 0 }}>
            <p className="fz-14" style={{ color: cartsData?.color || "black", fontSize: "12px" }}>
              ${cartsData?.budget || 0}
            </p>
            <Dropdown
              overlayStyle={{ width: "120px" }}
              menu={{
                items: cartsData.editable
                  ? [
                    {
                      key: "1",
                      label: (
                        <div onClick={() => handelEdit(cartsData)}>
                          <EditSVG /> Edit
                        </div>
                      ),
                    },
                    {
                      key: "2",
                      label: (
                        <div
                          onClick={() => onRowDelete(cartsData)}
                          style={{ color: "#F40055" }}>
                          <Delete2SVG color="#F40055" /> Delete
                        </div>
                      ),
                    },
                  ]
                  : [
                    {
                      key: "1",
                      label: (
                        <div onClick={() => handelEdit(cartsData)}>
                          <EditSVG /> Edit
                        </div>
                      ),
                    },
                  ],
              }}>
              <MenuDotsSVG style={{ cursor: "pointer" }} />
            </Dropdown>
          </div>


          {/* <div style={{ background: cartsData?.color }} className="piplines-point">
              {cartsData.total}
            </div>

            <div>
          {/* </div> */}
        </div>
      ) : (
        <EditCard cartsData={cartsData} items={items} setItems={setItems} />
      )
      }
    </Fragment >
  );
}

export default Index;
