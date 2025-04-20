import { SearchOutlined } from "@ant-design/icons";
import { Input, Menu, Space } from "antd";
import { FavoriteSVG, ImagesSVG, SoundWavesSVG } from "assets/jsx-svg";
import { useMemo, useState } from "react";
import FrameBrowseItem from "./FrameBrowseItem/FrameBrowseItem";
import { useMetavarseBottomScreenContext } from "../context/metavarseBottomScreenContext";
import "../styles.css";

const frameTabs = [
  {
    label: "All",
    key: "all",
  },
  {
    label: "Favourite",
    key: "favourite",
    icon: <FavoriteSVG width={12} height={12} />,
  },
];

const typeTabs = [
  {
    label: "Media Frames",
    key: "MEDIA",
    icon: <ImagesSVG width={15} height={15} />,
  },
  {
    label: "Audio Frames",
    key: "AUDIO",
    icon: <SoundWavesSVG width={15} height={15} />,
  },
];

export default function FramesPreview({ updateDraggingState }) {
  const [searchText, setSearchText] = useState("");
  const { allFrames } = useMetavarseBottomScreenContext();
  const [frameTab, setFrameTab] = useState("all");
  const [frameTypeTab, setFrameTypeTab] = useState("MEDIA");

  const onChangeFrameTab = (e) => {
    setFrameTab(e.key);
  };

  const onChangeFrameType = (e) => {
    setFrameTypeTab(e.key);
  };

  const filteredFrames = useMemo(() => {
    let filtered =
      allFrames
        ?.slice()
        .filter(({ name }) => name?.toLowerCase().includes(searchText.toLowerCase())) ?? [];
    if (frameTab == "favourite") {
      filtered = filtered.filter(({ isFav }) => isFav);
    }

    return filtered.filter((frame) => frame.type == frameTypeTab);
  }, [allFrames, frameTab, frameTypeTab, searchText]);

  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
  };

  return (
    <Space direction="vertical" className="w-100" size="large">
      <Input placeholder="Search" onChange={handleSearchChange} prefix={<SearchOutlined />} />
      <Menu
        onClick={onChangeFrameTab}
        selectedKeys={[frameTab]}
        mode="horizontal"
        items={frameTabs}
      />
      <Menu
        onClick={onChangeFrameType}
        selectedKeys={[frameTypeTab]}
        mode="horizontal"
        items={typeTabs}
      />
      <div className="frames-preview-list">
        {filteredFrames.map((frame) => (
          <FrameBrowseItem
            key={frame.id}
            frame={frame}
            showSettings={false}
            updateDraggingState={updateDraggingState}
          />
        ))}
      </div>
    </Space>
  );
}
