import React, { useState, useEffect } from "react";
import { Row, Col, Space, Form, Spin, List , Alert} from "antd";
import { CPButton, CPInput, CPDivider, CPTextArea } from "components/CP";
import CPPanel from "components/CP/CPPanel/CPPanel";

import { poFinalEvalutionService } from "services/purchase/poEvaluations/poFinalEvalutionService";

// Message
import { FormattedMessage, useIntl } from "react-intl";

const { useForm } = Form;

export const POFinalEvaluation = ({
  onCloseModal,
  parentLoading,
  currentData,
  companyId
}) => {
  const intl = useIntl();
  const [form] = useForm();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);

  useEffect(() => {

    getEvalutionById();

  }, []);


  const getEvalutionById = async () => {
    setLoading(true)
    let result = await poFinalEvalutionService.getPoFinalEvaluationForCompany(companyId);
    if (result.isSuccess) {
      setLoading(false)
      setData([...result.data]);

      let model = {};
      for (let index = 0; index < result.data.length; index++) {
        const element = result.data[index];
        element.items.map((x) => {
          model["score" + x.questionId] = `${x.score}`;
        });

        element.items.map((x) => {
          model["scoreTitle" + x.questionId] = `${x.scoreTitle}`;
        });

        element.items.map((x) => {
          model["maxScore" + x.questionId] = `${x.maxScore}`;
        });

      }

      form.setFieldsValue(model);
    }
    else{
      setLoading(false)
    }
  };


  return (
    <div>
      <Form form={form} name="poMidTermEvaluation" layout="vertical">
        {loading ? (
          <Spin className="spin-custom" />
        ) : (
          <>
            <Row gutter={[24, 24]}>
              <Col sm={24} xs={24} md={24}>
                {
                  data?.length >0 ?
                  <>

                      {data && data?.map((value) => {
                        return (
                          <>
                            <Col xs={24} sm={12} md={24}>
                              <Row gutter={[24, 24]}>
                                <>

                                  <Col xs={24} sm={24} md={24}>
                                    <CPPanel
                                      header={
                                        value.registerUserFullName + " - " + value.createDateShow
                                      } bordered>
                                      <div style={{ overflowY: "scroll", height: "320px" }}>


                                        <List
                                          header={<div>{value.remark ? intl.formatMessage({ id: "remark", }) + " : " + value.remark : intl.formatMessage({ id: "noMessage", })}</div>}
                                          // footer={<div>Footer</div>}
                                          bordered
                                          dataSource={value.items}
                                          renderItem={(item) => (
                                            <List.Item
                                              rules={[
                                                {
                                                  pattern: /^(?:\d*)$/,
                                                  message: "Value should contain just number",
                                                },
                                                {
                                                  max: item.maxScore,
                                                  message: `Value should be less than ${item.maxScore} `,
                                                },
                                              ]}
                                            >
                                              <Col xs={14} sm={14} md={14}>
                                                <span>{item.questionTitle}</span>
                                              </Col>
                                              {item.questionType == 2 ? (
                                                <>
                                                  <Col xs={5} sm={5} md={5}>
                                                    <label>
                                                      <FormattedMessage id="maxScore" />
                                                    </label>
                                                    <CPInput
                                                      disabled={true}
                                                      placeholder={item.maxScore}
                                                      type={"number"}
                                                      min={0}
                                                      hasValidation
                                                      name={"maxScore" + item.questionId}
                                                      id={"maxScore" + item.questionId}
                                                    />
                                                  </Col>
                                                </>
                                              ) : null}

                                              {item.questionType == 2 ? (
                                                <>
                                                  <Col xs={5} sm={5} md={5}>
                                                    <label style={{ marginRight: "30%" }}>
                                                      <FormattedMessage id="score" />
                                                    </label>
                                                    <CPInput
                                                      type={"number"}
                                                      min={0}
                                                      max={item.maxScore}
                                                      hasValidation
                                                      disabled={true}
                                                      name={"score" + item.questionId}
                                                      id={"score" + item.questionId}
                                                    />
                                                  </Col>
                                                </>
                                              ) : (
                                                <>
                                                  <Col xs={10} sm={10} md={10}>
                                                    <label style={{ marginRight: "30%" }}>
                                                      <FormattedMessage id="scoreTitle" />
                                                    </label>
                                                    <CPInput
                                                      type={"text"}
                                                      hasValidation
                                                      name={"scoreTitle" + item.questionId}
                                                      id={"scoreTitle" + item.questionId}
                                                      rules={[
                                                        {
                                                          required: true,
                                                          message: (
                                                            <FormattedMessage id="requiredMessage" />
                                                          ),
                                                        },
                                                      ]}
                                                    />
                                                  </Col>
                                                </>
                                              )}
                                            </List.Item>
                                          )}
                                        />
                                      </div>
                                    </CPPanel>

                                  </Col>
                                </>
                              </Row>

                            </Col>
                          </>
                        );
                      })}
                    </> :

                    <Alert showIcon message={`${intl.formatMessage({ id: "noData", })}`} type="error" />

                }

              </Col>
            </Row>

            <CPDivider />
            <div className="footer-modal">
              <Row>
                <Col span={12}>
                  <Space>
                    <CPButton onClick={onCloseModal} disabled={parentLoading}>
                      <FormattedMessage id="close" />
                    </CPButton>
                  </Space>
                </Col>
              </Row>
            </div>
          </>
        )}
      </Form>
    </div >
  );
};
export default POFinalEvaluation;
