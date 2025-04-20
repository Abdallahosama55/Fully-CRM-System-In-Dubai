import { Button, Input, message } from "antd";
import React, { useState } from "react";
// style
import "./styles.css";
import { Delete2SVG, PlusSVG } from "assets/jsx-svg";
/*
    value must be in format [
        {value:"" , error: boolean}
    ]
*/
const LinksInput = ({
  value = [],
  onChange = () => {},
  placeholder,
  validateLink = () => true,
}) => {
  const [link, setLink] = useState({ value: "", error: false });

  const addLink = () => {
    if (validateLink(link.value) && /^https?:\/\/\w+\.\w+/.test(link.value)) {
      onChange([link, ...value]);
      setLink({ value: "", error: false });
    } else {
      setLink((prev) => ({ ...prev, error: true }));
      message.error("Add valid link");
    }
  };

  const deleteLink = (index) => {
    const newLinks = [...value];
    newLinks.splice(index, 1);
    onChange(newLinks);
  };

  const updateLink = (index, newValue) => {
    const newLinks = [...value];
    if (validateLink(newValue) && /^https?:\/\/\w+\.\w+/.test(newValue)) {
      newLinks[index] = { value: newValue, error: false };
      onChange(newLinks);
    } else {
      newLinks[index] = { value: newValue, error: true };
      onChange(newLinks);
    }
  };

  return (
    <div>
      <div className="new_link">
        <Input
          status={link.error ? "error" : ""}
          placeholder={placeholder || "Add a link"}
          value={link.value}
          onChange={(e) => setLink({ value: e.target.value, error: false })}
        />
        <Button type={"primary"} onClick={() => addLink()} icon={<PlusSVG color="currentColor" />}>
          Add
        </Button>
      </div>
      <div className="links_list">
        {value.map((link, index) => (
          <div key={index} className="link_item">
            <Input
              status={link.error ? "error" : ""}
              value={link.value}
              onChange={(e) => updateLink(index, e.target.value)}
            />
            <Button
              type={"primary"}
              danger
              onClick={() => deleteLink(index)}
              icon={<Delete2SVG color={"currentColor"} />}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default LinksInput;
