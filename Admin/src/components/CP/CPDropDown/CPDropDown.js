import React from "react";
import { Dropdown, Menu } from "antd";
import CPLink from "../CPLink";

const { Item } = Menu;

// type PropTypes = {
//   arrow?  ,
//   disabled?  ,
//   getPopupContainer?  ,
//   overlay? ,
//   overlayClassName?  ,
//   className?  ,
//   overlayStyle?  ,
//   onVisibleChange?  ,
//   placement?  ,
//   trigger?  ,
//   menuList?  ,
//   buttonsRender?: Node,
//   icon?: Node,
//   onClick?  ,
//   size?  ,
//   type?  ,
//   children?: Node,
//   overlayCss?
// };

const CPDropDown = ({
  arrow,
  disabled,
  getPopupContainer,
  overlay,
  overlayClassName,
  className,
  overlayStyle,
  onVisibleChange,
  placement,
  trigger,
  menuList,
  buttonsRender,
  icon,
  onClick,
  size,
  type,
  children,
  overlayCss,
}) => {
  const onClickMenu = (e) => {
    if (e && e.key) onClick(e.key);
  };

  const renderDropDownContent = (menuItem) => (
    <div>
      {menuItem.image ? (
        <img alt={menuItem.name} src={menuItem.image} />
      ) : undefined}
      {menuItem.icon ? menuItem.icon : undefined}
      {menuItem.name}
    </div>
  );

  const menuItems = (
    <Menu onClick={onClickMenu} className={overlayCss}>
      {menuList?.map((menuItem) => {
        if (menuItem?.href) {
          return (
            <Item key={menuItem.value}>
              <CPLink href={menuItem.href}>
                {renderDropDownContent(menuItem)}
              </CPLink>
            </Item>
          );
        }
        return (
          <Item key={menuItem.value}>{renderDropDownContent(menuItem)}</Item>
        );
      })}
    </Menu>
  );

  return (
    <Dropdown
      arrow={arrow}
      disabled={disabled}
      getPopupContainer={getPopupContainer}
      overlay={overlay || menuItems}
      overlayClassName={overlayClassName}
      className={className}
      overlayStyle={overlayStyle}
      onVisibleChange={onVisibleChange}
      placement={placement}
      trigger={trigger}
      buttonsRender={buttonsRender}
      icon={icon}
      // onClick={onClick}
      size={size}
      type={type}
    >
      {children}
    </Dropdown>
  );
};

export default CPDropDown;
