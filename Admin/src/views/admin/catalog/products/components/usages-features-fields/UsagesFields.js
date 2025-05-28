import React from "react";
import { PlusOutlined } from "@ant-design/icons";
import { Form, Button, Row, Col } from "antd";
import { CPButton, CPTooltip, CPInput, CPCard } from "components/CP";

// Message
import { FormattedMessage, useIntl } from "react-intl";
import { RiDeleteBinLine } from "react-icons/ri";
const UsagesFields = ({ productUsages }) => {
  const intl = useIntl();

  return (
    <CPCard bordered className={"mb-20 mt-10"}>
      <Form.List name="productUsages">
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
                  <Col xs={23} sm={23} md={23}>
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

                  {/*   {fields.length > 1 ? ( */}
                  <Col xs={24} sm={12} md={1} className="pt-30">
                    <CPTooltip
                      title={<FormattedMessage id="delete" />}
                      key={field.key}
                    >
                      <span>
                        <CPButton
                          shape="circle"
                          type="primary"
                          danger
                          onClick={() => remove(index)}
                          icon={
                            <span className="icon-box">
                              <RiDeleteBinLine />
                            </span>
                          }
                        />
                      </span>
                    </CPTooltip>
                  </Col>
                  {/*    ) : null} */}
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

export default UsagesFields;
