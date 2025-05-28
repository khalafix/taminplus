import React from "react";

const Popup = ({ record, visible, x, y }) =>
  visible && (
    <ul className="popup" style={{ left: `${x}px`, top: `${y}px` }}>
      <li>edit</li>
      <li>Like it</li>
      <li>Bookmark</li>
    </ul>
  );

export default Popup;
