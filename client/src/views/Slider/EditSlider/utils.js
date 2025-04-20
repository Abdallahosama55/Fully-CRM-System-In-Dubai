export const formatGroupItem = (data) => {
  try {
    return data
      ?.filter((item) => !item.groupId)
      ?.map((item) => {
        if (data.filter((filter) => filter.groupId === item.id).length > 0) {
          return {
            ...item,
            childs: data
              .filter((filter) => filter.groupId === item.id)
              .map((item) => {
                if (data.filter((filter) => filter.groupId === item.id).length > 0)
                  return { ...item, childs: data.filter((filter) => filter.groupId === item.id) };
                return item;
              }),
          };
        } else {
          return item;
        }
      });
  } catch (e) {
    return [];
  }
};

export const formatPayloadData = (data) => {
  const formatter = data.map((item) => {
    const { photo, BGColor, FGColor, ...rest } = item;
    return {
      isHoverImageEmpty: typeof photo?.file === "string" ? false : !Boolean(photo?.file),
      hoverImage: typeof photo?.file === "string" ? photo.file : undefined,
      itemProperties: {
        BGColor,
        FGColor,
      },
      ...rest,
    };
  });
  return formatGroupItem(formatter).map((item) => {
    const { id, groupId, isOpen, ...rest } = item;

    return {
      ...rest,
      type: rest.type === "item" ? "SEPARATED_ITEM" : "GROUP_ITEM",
      childs: rest?.childs?.map((child) => {
        const { id, groupId, isOpen, ...rest } = child;
        return {
          ...rest,
          type: rest.type === "item" ? "CHILD_ITEM" : "GROUP_ITEM",
          childs: child.childs?.map((item) => {
            const { id, groupId, isOpen, ...rest } = item;
            return { ...rest, type: rest.type === "item" ? "CHILD_ITEM" : "GROUP_ITEM" };
          }),
        };
      }),
    };
  });
};

export const formatResponse = (data) => {
  return data.map((item) => {
    const {
      dimensionId,
      parentId,
      id,
      itemProperties: { BGColor, FGColor },
      title,
      type,
      hoverImage,
      description,
      dimensionDropPoint,
    } = item;
    return {
      description,
      dimensionId,
      groupId: parentId,
      id,
      BGColor,
      FGColor,
      title,
      type: ["SEPARATED_ITEM", "CHILD_ITEM"].includes(type) ? "item" : "group",
      photo: hoverImage && {
        imageBase64: hoverImage,
        file: hoverImage,
      },
      dimensionDropPoint,
    };
  });
};
