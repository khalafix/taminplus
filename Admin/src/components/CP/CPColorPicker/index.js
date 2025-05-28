import React from "react";
// UI
import { SketchPicker } from "react-color";

const CPColorPicker = ({
  color,
  displayColorPicker,
  onClick,
  onClose,
  onChange,
}) => {
  return (
    <>
      <div
        style={{
          backgroundColor: color,
          width: "120px",
          height: "32px",
          borderRadius: "2px",
          marginTop: "3px",
          border: "1px dashed",
        }}
        onClick={onClick}
      >
        <div style={{ backgroundColor: color }} />
      </div>
      {displayColorPicker ? (
        <div style={{ position: "absolute", zIndex: "2" }}>
          <div
            style={{
              position: "fixed",
              top: "0px",
              right: "0px",
              bottom: "0px",
              left: "0px",
            }}
            onClick={onClose}
          />
          <SketchPicker color={color} onChange={onChange} />
        </div>
      ) : null}{" "}
    </>
  );
};

export default CPColorPicker;
