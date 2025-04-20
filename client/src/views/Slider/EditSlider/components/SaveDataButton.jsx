import React from "react";
import { useSliderStore } from "../sliderStore";
import { Button } from "antd";
import { isEmpty } from "utils";
import useUpsertSliderItem from "services/Sliders/Mutations/useUpsertSliderItem";
import { useParams } from "react-router-dom";
import { formatPayloadData } from "../utils";
import { useNotification } from "context/notificationContext";
const ButtonSaveData = () => {
  const { state } = useSliderStore();
  const { id } = useParams();
  const { openNotificationWithIcon } = useNotification();

  const { upsertSliderItem, isPending } = useUpsertSliderItem({
    onSuccess: () => {
      openNotificationWithIcon("success", "Items have been successfully edited ✅");
    },
  });
  const handleSave = () => {
    const formData = new FormData();
    formData.append("sliderItems", JSON.stringify(formatPayloadData(state)));
    formData.append("sliderId", id);
    // state.filter((item) => !!item.photo?.file).forEach((item) => listPhoto.push(item.photo.file));

    // Create a new FormData object

    // Append each file to the FormData object
    const listPhoto = [];
    state
      .filter((item) => !!item.photo?.file)
      .forEach((item) => {
        listPhoto.push(item.photo.file);
      });

    // Append the list of files to formData
    listPhoto.forEach((file) => {
      formData.append("hoverImages", file);
    });
    upsertSliderItem(formData);
  };
  return (
    <Button
      loading={isPending}
      onClick={handleSave}
      disabled={!isValid(state) || state.length === 0}
      className="wc"
      style={{ background: "#272942" }}>
      Save
    </Button>
  );
};

const isValid = (data) => {
  const items = data.filter((item) => item.type === "item");
  if (items.some((item) => isEmpty(item.title) || !item?.dimensionId)) {
    return false;
  }
  return true;
};
export default ButtonSaveData;
