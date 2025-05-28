import React from 'react'
import { Drawer } from 'antd'

// type PropTypes = {
//   children: Node,
//   closable  ,
//   destroyOnClose  ,
//   mask  ,
//   maskClosable  ,
//   style  ,
//   title: Node,
//   visible  ,
//   width  ,
//   height  ,
//   className  ,
//   zIndex   ,
//   placement: "",
//   onClose  ,
//   getContainer
// };

const CPDrawer = ({
  children,
  closable = true,
  destroyOnClose = false,
  mask = false,
  maskClosable = false,
  style = {},
  title,
  visible = false,
  width = '350',
  height = '100vh',
  className = '',
  zIndex,
  placement = '',
  onClose = () => {},
  getContainer = ''
}) => {
  if (process.env.BROWSER) {
    return (
      <Drawer
        closable={closable}
        destroyOnClose={destroyOnClose}
        mask={mask}
        maskClosable={maskClosable}
        style={style}
        title={title}
        visible={visible}
        width={width}
        height={height}
        className={className}
        zIndex={zIndex}
        placement={placement}
        onClose={onClose}
        getContainer={getContainer}
      >
        {children}
      </Drawer>
    )
  }
  return <div />
}

export default CPDrawer
