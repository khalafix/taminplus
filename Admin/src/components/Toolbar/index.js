import React from "react";
import { Space } from "antd";
import { CPButton, CPDropDown } from "components/CP";
import { RiArrowDownSLine, RiAddCircleFill,RiFileExcel2Fill } from "react-icons/ri";

// type PropTypes = {
//   items  <ItemsTypes>
// };
// export type ItemsTypes = {
//   type: "button" | "dropdown",
//   btnType?: "primary" | "secondary",
//   danger?  ,
//   label  ,
//   onClick  ,
//   menuList?  <Object>,
//   iconType?: "plus",
//   permissions?  ,
//   disabled?
// };

const Toolbar = ({ items }) => {
  const renderItems = (item, index) => {
    switch (item.type) {
      case "button":
        return (
          /*  <CheckPermissions permissions={item.permissions}> */
          <CPButton
            type={item.btnType ? item.btnType : "primary"}
            danger={item.danger}
            disabled={item.disabled}
            onClick={item.onClick}
            key={index}
          >
            {item.iconType && (
              <span className="btn-icon btn-icon-style">
                <RiAddCircleFill />
              </span>
            )}
            <span className="btn-title">{item.label}</span>
          </CPButton>
          /*   </CheckPermissions> */
        );
      case "excel":
        return (
          /*  <CheckPermissions permissions={item.permissions}> */
          <CPButton
            type={item.btnType ? item.btnType : "primary"}
            danger={item.danger}
            disabled={item.disabled}
            onClick={item.onClick}
            key={index}
          >
            {item.iconType && (
              <span className="btn-icon btn-icon-style">
                <RiFileExcel2Fill />
              </span>
            )}
            <span className="btn-title">{item.label}</span>
          </CPButton>
          /*   </CheckPermissions> */
        );
      case "dropdown":
        return (
          /*    <CheckPermissions permissions={item.permissions}> */
          <CPDropDown
            menuList={item.menuList}
            placement="bottomCenter"
            trigger={["click"]}
            disabled={item.disabled}
            onClick={item.onClick}
            key={index}
          >
            <CPButton type={item.btnType ? item.btnType : "secondary"}>
              <span className="btn-icon btn-icon-style">
                {item.iconType === "plus" ? (
                  <RiAddCircleFill />
                ) : (
                  <RiArrowDownSLine />
                )}
              </span>
              {item.label}
            </CPButton>
          </CPDropDown>
          /*   </CheckPermissions> */
        );
    }
  };
  return (
    <Space>
      {items?.map((item, index) => {
        return renderItems(item, index);
      })}
    </Space>
  );
};

export default Toolbar;
