import React, { useEffect, useState } from "react";
import { useDebounce } from "hooks/useDebounce";

import { Input } from "antd";
// icons
import * as AllIcons from "assets/jsx-svg";
// style
import "./styles.css";
import { useNotification } from "context/notificationContext";
const AllIconsArray = Object.keys(AllIcons).map((key) => {
  return {
    name: key,
    component: AllIcons[key],
  };
});

const Icons = () => {
  const { openNotificationWithIcon } = useNotification();
  const [searchValue, setSearchValue] = useState("");
  const [icons, setIcons] = useState(AllIconsArray);

  const debounceQuery = useDebounce(searchValue, 500);

  useEffect(() => {
    if (!debounceQuery && icons !== AllIconsArray) {
      setIcons(AllIconsArray);
      return;
    }

    setIcons(
      AllIconsArray.filter((icon) => icon.name.toLowerCase().includes(debounceQuery.toLowerCase())),
    );
  }, [debounceQuery]);

  return (
    <div>
      <div className="search_input">
        <Input.Search onChange={(e) => setSearchValue(e.target.value)} />
      </div>

      <div className="icons_container">
        {icons.map((icon) => {
          return (
            <div
              key={icon.name}
              className="icon_card"
              onClick={() => {
                navigator.clipboard.writeText(`<${icon.name} />`);
                openNotificationWithIcon("success", `<${icon.name} /> Copied to clipboard`);
              }}>
              <icon.component />
              <div>{icon.name}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Icons;
