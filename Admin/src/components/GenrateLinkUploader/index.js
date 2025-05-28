import React, { useState, useEffect } from "react";
import { Row, Space, Card, Form, Popconfirm, message, Alert } from "antd";
import { downloadWithLinkFile } from "utils/helpers";
import { ServerFileIdentifier } from "constants/configs";
import iconMap from "utils/iconMap";
import { fileServices } from "services/file/fileServices";
// Message
import { FormattedMessage, useIntl } from "react-intl";
const { Item } = Form;

const GenrateLinkUploader = ({ items, title, label, hasBorder = true, isLocked = false }) => {

  const [files, setFiles] = useState()
  const intl = useIntl();

  const gridStyle = {
    width: "100%",
    fontSize: "13px",
  };

  useEffect(() => {
    setFiles(items)
  }, [items]);

  const handleDownloadFile = async (fileUrl) => {
    if (fileUrl) {
      const ad = ServerFileIdentifier();
      let path = `${ad}/${fileUrl}`;
      downloadWithLinkFile(path);
    }
  };

  const getFileName = (link) => {

    const fileName = link?.substring(link.lastIndexOf("\\") + 1, link.length);
    return fileName;
  };

  const deleteFile = async (file) => {

    const result = await fileServices.delete(file);
    
    if (result == true) {
      //remove current file row
      const tempFiles = files.filter(f => f.filePath != file.filePath);
      setFiles(tempFiles);
      message.success(`${intl.formatMessage({ id: "fileRemoved" })}`)
    }

  }

  return (
    <>



      {
        files?.length > 0 && label ?
          <>

            <Item label={label}>
              <ul className="list-no-style show-file-box " style={{ display: "flex" }}>
                {files?.map((file, index) => (
                  <li style={{ display: 'flex' }}>
                    {
                      isLocked ? null :
                        <Popconfirm
                          key={1}
                          title={`${intl.formatMessage({
                            id: "confirmRemoveFile",
                          })}`}
                          trigger="click"
                          okText={`${intl.formatMessage({ id: "yes" })}`}
                          cancelText={`${intl.formatMessage({ id: "no" })}`}
                          placement="top"
                          onConfirm={() => deleteFile(file)}
                        >
                          <a style={{ marginTop: "2%" }}>
                            <span style={{ display: "inline", padding: "0 3px", color: "red" }}>
                              {iconMap["deleteIcon"]}
                            </span>
                          </a>
                        </Popconfirm>
                    }


                    <a
                      download
                      className="download-link-btn"
                      onClick={() => handleDownloadFile(file.filePath)}
                    >

                      <span style={{ display: "inline", padding: "0 3px" }}>
                        {iconMap["downloadIcon"]}
                      </span>

                      {getFileName(file.filePath)}
                    </a>
                  </li>
                ))}
              </ul>
            </Item>


          </> :

          files?.length > 0 && title ?
            <>
              <Card
                title={title}
                hoverable={false}
                style={gridStyle}
                className="enNumber"
                bordered={hasBorder}
              >
                <Row style={{ marginTop: "1%" }}>
                  <Space>
                    <ul className="list-no-style">
                      {files?.map((file, index) => (
                        <li style={{ display: 'flex' }}>

                          {
                            isLocked ? null :
                              <Popconfirm
                                key={1}
                                title={`${intl.formatMessage({
                                  id: "confirmRemoveFile",
                                })}`}
                                trigger="click"
                                okText={`${intl.formatMessage({ id: "yes" })}`}
                                cancelText={`${intl.formatMessage({ id: "no" })}`}
                                placement="top"
                                onConfirm={() => deleteFile(file)}
                              >
                                <a style={{ marginTop: "2%" }}>
                                  <span style={{ display: "inline", padding: "0 3px", color: "red" }}>
                                    {iconMap["deleteIcon"]}
                                  </span>
                                </a>
                              </Popconfirm>
                          }
                          <a
                            download
                            className="download-link-btn"
                            onClick={() => handleDownloadFile(file.filePath)}
                          >

                            <span style={{ display: "inline", padding: "0 3px" }}>
                              {iconMap["downloadIcon"]}
                            </span>

                            {getFileName(file.filePath)}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </Space>
                </Row>
              </Card>



            </> : title && <Alert type="danger" message={`${intl.formatMessage({
              id: "nofile",
            })}`} />

      }


    </>
  );
};
export default GenrateLinkUploader;
