import React from 'react'
import { Collapse } from 'antd'

const { Panel } = Collapse

// type PropTypes = {
//   children?: Node,
//   header?: Node,
//   key?   ,
//   bordered?  ,
//   defaultActiveKey?
// };

const CPPanel = ({ children, header, key, bordered, defaultActiveKey, stylePanel=false  , styleClassName="custom-ant-collapse-header-yellow"}) => {
  const bgColor = 'red !important';

  return (
    stylePanel==true ?
      <>
        <Collapse bordered={bordered} defaultActiveKey={[defaultActiveKey]}  className={styleClassName} >
          <Panel header={header} key={defaultActiveKey}  className={styleClassName} >
          
            {children}

          </Panel>
        </Collapse>
      </>
      :
      <>
        <Collapse bordered={bordered} defaultActiveKey={[defaultActiveKey]} style={{ border: "5px #red solid" }}>
          <Panel header={header} key={defaultActiveKey} style={{ ["---collapse-header-border"]: "5px solid red !important" }}>
            {children}
          </Panel>
        </Collapse>
      </>

  )
}

export default CPPanel
