export const formatMenu = (consentMenu, serverMenu = []) => {
  try {
    const item = [];

    (serverMenu || []).forEach((serverItem) => {
      const itemMatch = consentMenu.find((item) => item?.id === serverItem.name);

      if (itemMatch) {
        const children = (itemMatch.children || [])?.filter((item) =>
          (serverItem?.children || []).some((some) => some.name === item.id),
        );
        item.push({
          ...itemMatch,
          children: children.length === 0 ? undefined : children,
        });
      }
    });

    return item;
  } catch (e) {
    console.log(e);
    return consentMenu;
  }
};
