import EditCart from "../EditCart";
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

function ItemCard({ cartsData, items, setItems, index, isTemplateEditMode }) {
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
  // const { deleteStageItem, isPending: isDeleteStageItemPending } = useDeleteStageItem({
  //   onError: (error) => {
  //     var { errors } = error?.response.data;

  //     openNotificationWithIcon("error", errors[0]);
  //   },
  //   onSuccess: (data, payloadId) => {
  //     openNotificationWithIcon("success", "Deleted successfully");
  //     const newItems = items.filter((item) => item.id !== payloadId);
  //     setItems(newItems);
  //   },
  // });
  const handelDelete = (cartsData) => {
    const newItems = items.filter((item) => item.id !== cartsData.id);
    setItems(newItems);
    //must delete card here from BE useing cartsData.id
    // deleteStageItem(cartsData.id);
  };
  console.log("cartsData-->", cartsData);
  return (
    <>
      {!cartsData.isEdit ? (
        <div
          style={{ background: addOpacityToColor(cartsData?.color, 0.12) }}
          className="piplines-item-card">
          <div>
            <div>{index + 1}</div>
            <div title={cartsData?.label}>{shortenString(cartsData?.label, 9)}</div>
          </div>
          <div>
            <div style={{ background: cartsData?.color }} className="piplines-point"></div>

            {isTemplateEditMode && (
              <div>
                <Dropdown
                  overlayStyle={{ width: "120px" }}
                  menu={{
                    items: [
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
                          <div onClick={() => handelDelete(cartsData)} style={{ color: "#F40055" }}>
                            <Delete2SVG color="#F40055" /> Delete
                          </div>
                        ),
                      },
                    ],
                  }}>
                  <MenuDotsSVG />
                </Dropdown>
              </div>
            )}
          </div>
        </div>
      ) : (
        <EditCart cartsData={cartsData} items={items} setItems={setItems} />
      )}
    </>
  );
}

export default ItemCard;
