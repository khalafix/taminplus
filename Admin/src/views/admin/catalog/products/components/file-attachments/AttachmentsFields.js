import React, { useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { Form, Button, Row, Col, Space, Image, message } from "antd";
import {
  CPButton,
  CPTooltip,
  CPInput,
  CPCard,
  CPUploadImage,
} from "components/CP";

// Message
import { FormattedMessage, useIntl } from "react-intl";
import { RiDeleteBinLine, RiUpload2Line } from "react-icons/ri";
import { downloadWithLinkFile } from "utils/helpers";

// Api
import { SERVER_ADDRESS } from "constants/configs";
import { productServices } from "services/productServices";

const AttachmentsFields = ({ productAttachments, key }) => {
  const intl = useIntl();
  const [loading, setLoading] = useState(false);

  const handleDownloadFile = async (filed) => {
    if (productAttachments.length > 0) {
      let atth = productAttachments[filed.key];
      setLoading(true);
      downloadWithLinkFile(
        `${SERVER_ADDRESS}/Company/Download/${atth.id}`,
        () => setLoading(false)
      );
    }
  };
  const handleRemove = async (filed, callBack) => {
    if (productAttachments.length > 0) {
      let atth = productAttachments[filed];
      setLoading(true);

      const result = await productServices.deleteAttachment(atth.id);
      if (result.isSuccess) {
        message.success(result.message);
        callBack();
        setLoading(false);
      } else {
        message.error(result.message);
        setLoading(false);
      }
    }
  };
  return (
    <CPCard bordered className="mt-10">
      <Form.List name="productAttachments" key={key}>
        {(fields, { add, remove }) => {
          return (
            <Row gutter={[8, 8]} className="mb-10">
              {fields.map((field, index) => (
                <Row
                  key={field.key}
                  gutter={[8, 8]}
                  className="mb-10"
                  style={{ width: "100%" }}
                >
                  <Col xs={24} sm={12} md={8}>
                    <CPInput
                      hasValidation
                      name={[index, "title"]}
                      type={"text"}
                      label={`${intl.formatMessage({ id: "title" })}:`}
                      placeholder={intl.formatMessage({ id: "title" })}
                      rules={[
                        {
                          required: true,
                          message: <FormattedMessage id="requiredMessage" />,
                        },
                      ]}
                    />
                  </Col>

                  <Col xs={24} sm={12} md={8}>
                    <CPUploadImage
                      label={`${intl.formatMessage({
                        id: "selectCover",
                      })}:`}
                      isOneUpload
                      hasValidation
                      showUploadList={false}
                      accept=".png,.jpg,.jpeg"
                      size={50}
                      sizeType={"mb"}
                      name={[index, "file"]}
                      placeholder={
                        <span className="icon-box">
                          <RiUpload2Line />
                        </span>
                      }
                      rules={[
                        {
                          required: false,
                          message: <FormattedMessage id="requiredMessage" />,
                        },
                      ]}
                    ></CPUploadImage>
                  </Col>
                  <Col xs={24} sm={12} md={1} className="pt-30">
                    <Space>
                      {/* <CPTooltip
                        title={<FormattedMessage id="download" />}
                        key={1}
                      >
                        <span>
                          <CPButton
                            shape="circle"
                            type="primary"
                            onClick={() => handleDownloadFile(field)}
                            disabled={loading}
                            loading={loading}
                            icon={
                              <span className="icon-box">
                                <RiDownload2Fill />
                              </span>
                            }
                          />
                        </span>
                      </CPTooltip> */}
                      {productAttachments[field.key]?.fileBase64 && (
                        <Image
                          width={75}
                          height={55}
                          src={`data:images/png;base64,${
                            productAttachments[field.key]?.fileBase64
                          }`}
                        />
                      )}
                      <CPTooltip
                        title={<FormattedMessage id="delete" />}
                        key={field.name}
                      >
                        <span>
                          <CPButton
                            shape="circle"
                            type="primary"
                            danger
                            loading={loading}
                            disabled={loading}
                            onClick={() => {
                              handleRemove(field.key, () => remove(field.key));
                            }}
                            icon={
                              <span className="icon-box">
                                <RiDeleteBinLine />
                              </span>
                            }
                          />
                        </span>
                      </CPTooltip>
                    </Space>
                  </Col>
                </Row>
              ))}

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
            </Row>
          );
        }}
      </Form.List>
    </CPCard>
  );
};

export default AttachmentsFields;
