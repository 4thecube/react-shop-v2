import React, { useState } from "react";

import "./Directory.scss";
import { sectionsData } from "./directory.data";
import MenuItem from "../menu-item/MenuItem";

const Directory = () => {
  const [sections, setSections] = useState(sectionsData);
  console.log(sections);
  return (
    <div className="directory-menu">
      {sections.map(({ title, imageUrl, id, size }) => (
        <MenuItem key={id} title={title} imageUrl={imageUrl} size={size} />
      ))}
    </div>
  );
};

export default Directory;
