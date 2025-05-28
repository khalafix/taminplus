import React, { useState } from "react";
import { Upload, message, Form } from "antd";
// Message
import { useIntl } from "react-intl";
const { Item } = Form;
const { Dragger } = Upload;

// type PropTypes = {
//   accept  ,
//   placeholder?  ,
//   addonAfter?   | Node,
//   addonBefore?   | Node,
//   defaultValue?  ,
//   disabled?  ,
//   id?  ,
//   maxLength?   ,
//   prefix?   | Node,
//   size?  ,
//   suffix?   | Node,
//   type?  ,
//   value?  ,

//   onPressEnter?  ,
//   allowClear?  ,
//   bordered?  ,
//   className?  ,
//   hasValidation?  ,
//   name?  ,
//   listType?  ,
//   showUploadList?  ,
//   uploadType?  ,
//   isOneUpload?  ,
//   rules?  ,
//   label?  ,
//   tooltip?: Node,
//   initialValue?  ,
//   validateStatus?: "success" | "warning" | "error" | "validating",
//   hasFeedback?  ,
//   dependencies?  ,
//   help?
// };

const CPUploadImage = ({
  accept,
  placeholder,
  addonAfter,
  addonBefore,
  defaultValue,
  disabled,
  id,
  maxLength,
  prefix,
  size,
  suffix,
  type,
  value,
  onPressEnter,
  allowClear,
  bordered,
  className,
  name,
  listType = "picture",
  showUploadList = false,
  uploadType,
  isOneUpload,
  hasValidation,
  rules,
  label,
  hasFeedback,
  tooltip,
  dependencies,
  initialValue,
  validateStatus,
  help,
  resolution,
  sizeType, // mb || kb
}) => {
  const intl = useIntl();
  const [fileList, setFileList] = useState([]);

  const onChange = ({ fileList: newFileList }) => {
    // check Size
    let checkSize;
    if (sizeType === "mb") {
      checkSize = newFileList[0]?.size <= size * 1024 * 1024;
    } else {
      //kb
      checkSize = newFileList[0]?.size <= size * 1024;
    }

    if (!checkSize && newFileList.length > 0) {
      message.error(
        `${intl.formatMessage({
          id: "messageFileSize",
        })} ${size}${sizeType} ${intl.formatMessage({ id: "be" })}`
      );
      setFileList([]);
    } else if (isAcceptType(newFileList[0]?.type)) {
      setFileList(newFileList);
    } else if (newFileList.length === 0) {
      setFileList(newFileList);
    } else {
      message.error(`${newFileList[0]?.name} is not ${accept} file`);
      setFileList([]);
    }
  };
  const beforeUpload = (file) => {};

  const onPreview = async (file) => {
    let src = file.url;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj);
        reader.onload = () => resolve(reader.result);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow.document.write(image.outerHTML);
  };
  const isAcceptType = (type) => accept.includes(type?.split("/")[1]);

  if (hasValidation) {
    return (
      <Item
        dependencies={dependencies}
        hasFeedback={hasFeedback}
        help={help}
        initialValue={initialValue}
        label={label}
        name={name}
        rules={rules}
        tooltip={tooltip}
        validateStatus={validateStatus}
      >
        <Dragger
          accept={accept}
          fileList={fileList}
          listType={listType}
          style={fileList.length < 1 ? {} : { display: "none" }}
          onChange={onChange}
          beforeUpload={beforeUpload}
          onPreview={onPreview}
        >
          {fileList.length < 1 && placeholder}
        </Dragger>
      </Item>
    );
  } else {
    return (
      <Dragger
        accept={accept}
        fileList={fileList}
        listType={listType}
        style={fileList.length < 1 ? {} : { display: "none" }}
        onChange={onChange}
        onRemove={() => console.log("onRemove")}
        onPreview={onPreview}
      >
        {fileList.length < 1 && placeholder}
      </Dragger>
    );
  }
};

export default CPUploadImage;
