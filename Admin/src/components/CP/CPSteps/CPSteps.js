import React from 'react'
import { Steps, Popover } from 'antd'
import { Color } from "../../../utils/color";

const { Step } = Steps;

const CPSteps = ({ items, current, size = "large", direction ,isPopover=true }) => {
  
  const customDot = (dot, { status, index, title }) => (
    isPopover ==true ?
    <Popover
      content={
        <>
          <span>
            Step {index} status: {title.includes("Reject") ? <span style={{color:Color.red}}>Reject</span>   :
             title.includes("Accept Request With Procurement Manager") ? <span style={{color:Color.green}}>Finish</span>  
             : title.includes("Return")  ? <span style={{color:Color.yellow}}>Wait</span> 
             : "Process"}
          </span>
          <p>{title}</p>
        </>

      }
    >
      {dot}
    </Popover> :null
  );

  return (
    <>
      <Steps progressDot={customDot} size={size} current={current}
        direction={direction}
      //  progressDot={customDot}
      >
        {items?.map((item, index=1) =>
          <Step key={index} status={item.status}  
            icon={item.icon} title={item.title} 

            description={item.description} />

        )}
      </Steps>
    </>


  )
}

export default CPSteps
