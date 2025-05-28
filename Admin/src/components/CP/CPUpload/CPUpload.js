import React, { useState } from "react";
import { Upload, message, Form, Tooltip } from "antd";
import { InboxOutlined } from "@ant-design/icons";
// Message
import { useIntl, FormattedMessage } from "react-intl";
const { Item } = Form;
const { Dragger } = Upload;

// type PropTypes = {
//   accept?  ,
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
//   name?  ,
//   listType?  ,
//   showUploadList?  ,
//   uploadType?  ,
//   rules?  ,
//   label?  ,
//   tooltip?: Node,
//   initialValue?  ,
//   validateStatus?: "success" | "warning" | "error" | "validating",
//   hasFeedback?  ,
//   dependencies?  ,
//   help?  ,
//   icon?: Node,
//   hintText?
// };

const CPUpload = ({
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
  typeUpload = "file",
  name,
  listType,
  showUploadList,
  uploadType,
  hasValidation,
  rules,
  label,
  hasFeedback,
  tooltip,
  dependencies,
  initialValue,
  validateStatus,
  help,
  icon,
  sizeType, // mb || kb
  placeholder = "",
  hintText = "",
  accept = ".xls,.xlsx,.doc,.docx,.pdf,.png,.jpg,.zip,.rar,.ogg,.mpa,.m4a,.mp4,.webp,.jpeg,.svg",
  maxCount = 1,
  multiple = false,
}) => {
  const [fileList, setFileList] = useState([]);
  const intl = useIntl();
  const fileType =
    "image/png,image/jpeg,image/jpg,text/plain,text/csv,application/pdf,application/vnd.ms-excel,application/octet-stream,application/x-zip-compressed,application/zip,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/msword";

  const onChange = ({ fileList: newFileList }) => {
    if (newFileList.length > 0) {
      // Extention File
      let fixExt = newFileList[0]?.name.split(".");
      fixExt = fixExt[fixExt?.length - 1];
      // check Size
      let checkSize;
      if (sizeType === "mb") {
        checkSize = newFileList[0]?.size / 1024 / 1024 <= size;
      } else {
        checkSize = newFileList[0]?.size / 1024 / 1024 / 1024 <= size;
      }

      if (!checkSize && newFileList.length > 0) {
        message.error(
          `${intl.formatMessage({
            id: "messageFileSize",
          })} ${size}${sizeType} ${intl.formatMessage({ id: "be" })}`
        );
        setFileList([]);
      } else if (accept.includes(fixExt.toLowerCase())) {
        setFileList(newFileList);
      } else {
        message.error(` نیست ${accept} شامل فرمت  ${newFileList[0]?.name}`);
        setFileList([]);
      }
    } else if (newFileList.length === 0) {
      setFileList([]);
    }
  };

  const beforeUpload = (file) => { };

  const isAcceptType = (type) => fileType.includes(type?.split("/")[1]);

  const textTooltip =
    // accept == ".png,.jpg"
    //   ? "The file format should be " +
    //   accept +
    //   " " +
    //   `- Max file size (${size} ${sizeType})`
    //   : `Max file count (${maxCount}) - Max file size (${size} ${sizeType})`;

    accept
      ? "فایل باید از نوع  " + accept + " باشد "
      : ``;

  if (hasValidation) {
    return (
      <>
        <Item
          label={label}
          dependencies={dependencies}
          hasFeedback={hasFeedback}
          help={help}
          initialValue={initialValue}
          name={name}
          rules={rules}
          tooltip={tooltip}
          validateStatus={validateStatus}
        >
          <Dragger

            multiple={multiple}
            maxCount={multiple ? maxCount : 1}
            accept={accept}
            fileList={fileList}
            listType={listType}
            // style={fileList.length < 1 ? {} : { display: "none" }}
            onChange={onChange}
            beforeUpload={beforeUpload}
          >
            <p className="ant-upload-drag-icon">
              <InboxOutlined />
            </p>
            <p className="ant-upload-text">
              برای آپلود روی فایل کلیک کنید یا داخل آن قرار دهید
            </p>
          </Dragger>
        </Item>
        <span style={{ color: "red" }}>{textTooltip} </span>
      </>
    );
  } else {
    return (
      <>
        <Dragger
          accept={accept}
          fileList={fileList}
          listType={listType}
          style={fileList.length < 1 ? {} : { display: "none" }}
          onChange={onChange}
          onRemove={() => console.log("onRemove")}
          multiple={multiple}
          maxCount={multiple ? maxCount : 1}
        >
          {fileList.length < 1 && placeholder}
        </Dragger>
        <span style={{ color: "red" }}>{textTooltip} </span>
      </>
    );
  }
};

export default CPUpload;
