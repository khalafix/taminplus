import React, { useState } from "react";
import { Modal } from "antd";
import Draggable from "react-draggable";

const CPModal = ({
  title,
  visible = false,
  children,
  footer,
  className,
  confirmLoading = false,
  closable = false,
  mask = true,
  maskClosable = false,
  afterClose,
  onClose,
  width = 520,
  onCancel = () => {},
  onOk = () => {},
  okText,
  cancelText,
  centered = true,
  okButtonProps,
  cancelButtonProps,
  bodyStyle,
}) => {
  const draggleRef = React.createRef();
  const [disabled, setDisabled] = useState(true);
  const [bounds, setBounds] = useState({
    left: 0,
    top: 0,
    bottom: 0,
    right: 0,
  });
  const onStart = (event, uiData) => {
    const { clientWidth, clientHeight } = window?.document?.documentElement;
    const targetRect = draggleRef?.current?.getBoundingClientRect();
    setBounds({
      left: -targetRect?.left + uiData?.x,
      right: clientWidth - (targetRect?.right - uiData?.x),
      top: -targetRect?.top + uiData?.y,
      bottom: clientHeight - (targetRect?.bottom - uiData?.y),
    });
  };
  return (
    <Modal
      destroyOnClose={true}
      title={
        <div
          style={{
            width: "100%",
            cursor: "move",
          }}
          onMouseOver={() => {
            if (disabled) {
              setDisabled(false);
            }
          }}
          onMouseOut={() => {
            setDisabled(true);
          }}
          onFocus={() => {}}
          onBlur={() => {}}
          // end
        >
          {title}
        </div>
      }
      closable={closable}
      maskClosable={maskClosable}
      mask={mask}
      confirmLoading={confirmLoading}
      className={className}
      width={width}
      visible={visible}
      footer={footer}
      onCancel={onCancel}
      bodyStyle={bodyStyle}
      onOk={onOk}
      afterClose={afterClose}
      onClose={onClose}
      okText={okText}
      cancelText={cancelText}
      centered={centered}
      okButtonProps={okButtonProps}
      cancelButtonProps={cancelButtonProps}
      modalRender={(modal) => (
        <Draggable
          disabled={disabled}
          bounds={bounds}
          onStart={(event, uiData) => onStart(event, uiData)}
        >
          <div ref={draggleRef}>{modal}</div>
        </Draggable>
      )}
    >
      {children}
    </Modal>
  );
};

export default CPModal;
