import React from "react";
import { PlusOutlined } from "@ant-design/icons";
import { Form, Button, Row, Col } from "antd";
import { CPButton, CPTooltip, CPInput, CPCard, CPTextArea, CPUpload } from "components/CP";

// Message
import { FormattedMessage, useIntl } from "react-intl";
import { RiDeleteBinLine } from "react-icons/ri";
import GenrateLinkUploader from "components/GenrateLinkUploader";
import CPPanel from "components/CP/CPPanel/CPPanel";
import { IconMap } from "antd/lib/result";

const IntroductionVideo = ({ currentData }) => {
  const intl = useIntl();

  const styleTextArea = {
    direction: "ltr"
  }


  const getPanelTitle = (title, index) => {
    
    if (title == null) {
      index++;
      return index + " - " + intl.formatMessage({ id: "video" });
    }
    return title;
  };


  return (
    <div>
      <Form.List name="listVideoProductAttachmentModel">
        {(fields, { add, remove }) => {
          return (
            <CPCard bordered >
              <Row gutter={[8, 8]} className="mb-10">
                {fields.map((field, index) => (
                  <>
                    <Col xs={24} sm={24} md={24}>

                      <CPPanel
                        header={
                          <>
                            <Col xs={5} sm={5} md={5} >
                              {
                                getPanelTitle(
                                  currentData && currentData[field.key]?.videoTitle, index
                                )
                              }
                            </Col>

                            <Col xs={17} sm={17} md={17} >
                              <CPInput
                                name={[index, "id"]}
                                hasValidation
                                style={{ display: "none" }}
                              />
                            </Col>
                            <div style={{ display: "flex", justifyContent: "space-between" }}>

                              <CPTooltip
                                title={<FormattedMessage id="delete" />}
                                key={field.name}
                              >
                                <span >
                                  <CPButton
                                    shape="circle"
                                    type="primary"
                                    danger
                                    onClick={() => remove(field.name)}
                                    icon={
                                      <span className="icon-box">
                                        <RiDeleteBinLine />
                                      </span>
                                    }
                                  />
                                </span>
                              </CPTooltip>
                            </div>
                          </>


                        }
                        bordered
                        bodyStyle={{ backgroundColor: "#FAFBFC" }}
                      >
                        <Row
                          key={field.key}
                          gutter={[8, 8]}
                          className="mb-10"
                          style={{ width: "100%" }}
                        >
                          <Col xs={24} sm={12} md={12}>
                            <CPInput
                              hasValidation
                              name={[index, "videoTitle"]}
                              type={"text"}
                              label={`${intl.formatMessage({ id: "videoTitle" })}:`}
                              placeholder={intl.formatMessage({ id: "videoTitle" })}
                              rules={[
                                {
                                  required: false,
                                  message: <FormattedMessage id="requiredMessage" />,
                                },
                              ]}
                            />
                          </Col>
                          <Col xs={24} sm={12} md={12}>
                            <CPTextArea
                              style={styleTextArea}
                              hasValidation
                              name={[index, "videoLink"]}
                              type={"text"}
                              label={`${intl.formatMessage({ id: "videoLink" })}:`}
                              placeholder={intl.formatMessage({ id: "videoLink" })}
                              rules={[
                                {
                                  required: false,
                                  message: <FormattedMessage id="requiredMessage" />,
                                },
                              ]}
                            />
                          </Col>
                          <Col xs={12} sm={12} md={12}>
                            <CPUpload
                              hasValidation
                              showUploadList={false}
                              label={intl.formatMessage({
                                id: "selectFile",
                              })}
                              name={[index, "file"]}
                              size={100}
                              accept={".ogg,.mpa,.m4a,.mp4"}
                              multiple={true}
                              maxCount={10}
                              sizeType="mb"
                              placeholder={intl.formatMessage({
                                id: "selectFile",
                              })}
                            />
                          </Col>
                          {
                            currentData && currentData[field.key]?.fileAttachments?.length > 0 ?
                              <Col xs={8} sm={8} md={8} style={{ margin: '0 1%' }}>


                                <GenrateLinkUploader
                                  items={
                                    currentData[field.key]?.fileAttachments
                                  }
                                  label={intl.formatMessage({
                                    id: "uploadedFiles",
                                  })}
                                />

                              </Col>
                              : null
                          }






                        </Row>
                      </CPPanel>
                    </Col>
                  </>
                ))}


              </Row>
              <Col xs={24} sm={12} md={6}>
                <Form.Item>
                  <Button
                    key={1}
                    type="dashed"
                    onClick={() => add()}
                    style={{ width: "60%" }}
                  >
                    <PlusOutlined /> <FormattedMessage id="add" />
                  </Button>
                </Form.Item>
              </Col>
            </CPCard >

          );
        }}
      </Form.List>
    </div>
  )
}

export default IntroductionVideo
