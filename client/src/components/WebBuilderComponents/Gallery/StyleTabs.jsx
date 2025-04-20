import React from "react";

const Tabs = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { label: "Content", key: "content" },
    { label: "Basic Styles", key: "style" },
    { label: "Advanced Styles", key: "advanced" },
  ];

  return (
    <div className="tabs">
      {tabs.map(({ label, key }) => (
        <button
          key={key}
          className={activeTab === key ? "active" : ""}
          onClick={() => setActiveTab(key)}
        >
          {label}
        </button>
      ))}
    </div>
  );
};

export default Tabs;
