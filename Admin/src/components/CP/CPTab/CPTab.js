import React from "react";
import { Tabs } from "antd";

const { TabPane } = Tabs;

// type PropTypes = {
//   className?  ,
//   handleChange?  ,
//   onTabClick? ,
//   tabPane?  <Object>,
//   defaultKey?  ,
//   activeKey?  ,
//   operations?: Node,
//   size?  ,
//   position?  ,
//   type?  ,
//   centered?
// };

const CPTab = ({
  className,
  handleChange = () => {},
  onTabClick = () => {},
  operations,
  size = "default",
  position = "top",
  type = "default",
  activeKey,
  defaultKey,
  tabPane,
  centered,
  forceRender,
}) => {
  return (
    <Tabs
      className={`${className} tab`}
      activeKey={activeKey}
      defaultActiveKey={defaultKey}
      onChange={handleChange}
      tabBarExtraContent={operations}
      size={size}
      tabPosition={position}
      type={type}
      centered={centered}
      onTabClick={onTabClick}
    >
      {tabPane.map((v) => (
        <TabPane
          tab={v.tab}
          key={v.key}
          disabled={v.disabled}
          forceRender={forceRender}
        >
          {v.children}
        </TabPane>
      ))}
    </Tabs>
  );
};

export default CPTab;
