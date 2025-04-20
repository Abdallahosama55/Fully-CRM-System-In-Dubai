export const formatDefaultValues = (defaultValues) => {
  if (!defaultValues) return {};
  const { showUpcommingBtn, upCommingBtnProperties, media, mediaSetting, ...rest } = defaultValues;
  const properties =
    typeof upCommingBtnProperties === "string" && JSON.parse(upCommingBtnProperties ?? "{}");

  const mediaSettingsProperties =
    typeof mediaSetting === "string" && JSON.parse(mediaSetting || "{}");

  return {
    showComping: showUpcommingBtn,
    background: properties?.BGColor,
    fontColor: properties?.FGColor,
    compingUp: properties?.name,
    media: media,
    isExternalVideoLink: mediaSettingsProperties?.isExternalVideoLink,
    autoPlay: mediaSettingsProperties?.autoPlay,
    muteAudio: mediaSettingsProperties?.muteAudio,
    ...rest,
  };
};
