import React, { useState, useEffect } from "react";
import { Row, Col, Space, Form, Spin, Image, Popconfirm, message } from "antd";
import {
  CPButton,
  CPInput,
  CPDivider,
  CPTextArea,
  CPUploadImage,
  CPCard,
  CPTooltip, CPUpload
} from "components/CP";
// Message
import { FormattedMessage, useIntl } from "react-intl";

// Api
import { companyQuestionServices } from "services/companyQuestionServices";
import iconMap from "utils/iconMap";

const { useForm } = Form;

const Add = ({
  onCloseModal,
  parentLoading,
  onSubmit,
  currentData,
  typeAction,
  companyId,
  handleDeleteAnswer,
}) => {
  const intl = useIntl();
  const [form] = useForm();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({});

  const onFinish = (values) => {
    const { attachmentFile } = values;
    const bodyFormData = new FormData();

    bodyFormData.append("title", values.title);
    bodyFormData.append("body", values.body);
    bodyFormData.append("userQuestionId", currentData.id);
    if (attachmentFile?.fileList[0]?.originFileObj) {
      bodyFormData.append(
        "attachmentFile",
        attachmentFile && attachmentFile?.fileList[0]?.originFileObj
      );
    }

    onSubmit(bodyFormData);
  };

  const GetData = async () => {
    setLoading(true);
    const result = await companyQuestionServices.getById(currentData.id);
    if (result.isSuccess) {
      setData(result.data);
      form.setFieldsValue({
        ...result.data?.answer,
      });
      setLoading(false);
      
      if(currentData.companyQuestionStatus==1){
        await companyQuestionServices.visitQuesiton(currentData.id);
      }
       
    }
    else {
      message.error(result.message);
      setLoading(false);
    }
  };
  useEffect(() => {
    GetData();
  }, []);

  return (
    <div>
      <Form form={form} name="addoredit" onFinish={onFinish} layout="vertical">
        {loading ? (
          <Spin className="spin-custom" />
        ) : (
          <>
            {/* <CPCard
              bordered
              className={"mb-20"}
              title={intl.formatMessage({
                id: "Questions",
              })}
              bodyStyle={{ backgroundColor: "#f9f9f9" }}
            > */}
            <h4>
              <Row gutter={[8, 8]}>
                <Col span={4}>
                  <b>{`${intl.formatMessage({
                    id: "companyName",
                  })}:`}</b>
                </Col>
                <Col span={8}>
                  {data?.companyName}
                </Col>

                <Col span={4}>
                  <b>{`${intl.formatMessage({
                    id: "userName",
                  })}:`}</b>
                </Col>
                <Col span={8}>
                  {data?.userName}
                </Col>

                <Col span={4}>
                  <b>{`${intl.formatMessage({
                    id: "sendDate",
                  })}:`}</b>
                </Col>
                <Col span={20}>
                  {data?.createDate}
                </Col>

                <Col span={4}>
                  <b>{`${intl.formatMessage({
                    id: "questions",
                  })}:`}</b>
                </Col>
                <Col span={20}>
                  {data?.title}
                </Col>

                <Col >
                  <b>{`${intl.formatMessage({
                    id: "description",
                  })}:`}</b>
                </Col>
                <Col span={24}>
                  {data?.body}
                </Col>

                <Col span={24}>
                  <Image
                    width={50}
                    src={`data:images/png;base64,${data?.attachmentFileBase64}`}
                  />
                </Col>
              </Row>

              <CPDivider />
            </h4>

              
                <h4>
                  <Row gutter={[8, 8]}>

                    <Col xs={24} sm={12} md={24}>
                      <CPTextArea
                        label={`${intl.formatMessage({ id: "answer" })}:`}
                        hasValidation
                        initialValue={""}
                        rows={4}
                        name={"body"}
                        /*           className="ant-custom-input" */
                        placeholder={intl.formatMessage({ id: "description" })}
                        rules={[
                          {
                            required: true,
                            message: <FormattedMessage id="requiredMessage" />,
                          },
                        ]}
                      />
                    </Col>
                  </Row>

                  <Row gutter={[8, 8]} className="mb-20">
                    <Col xs={24} sm={12} md={24}>
                      <CPUpload
                        accept = ".png,.jpg"
                        hasValidation
                        showUploadList={false}
                        label={intl.formatMessage({
                          id: "selectFile",
                        })}
                        name={"attachmentFile"}
                        size={5}
                        sizeType="mb"
                        placeholder={intl.formatMessage({
                          id: "selectFile",
                        })}
                      />
                    </Col>
                  </Row>
                </h4>
            <CPDivider />
            <div className="footer-modal">
              <Row>
                <Col span={12}>
                  <Space>
                    <CPButton
                      type="primary"
                      htmlType="submit"
                      loading={parentLoading}
                    >
                      <span>
                        <FormattedMessage id="addInformation" />
                      </span>
                    </CPButton>
                    {data.companyQuestionStatus === 3 && (
                      <CPTooltip
                        title={<FormattedMessage id="delete" />}
                        key="2"
                      >
                        <span>
                          <Popconfirm
                            key={2}
                            title={`${intl.formatMessage({
                              id: "deleteMessage",
                            })}`}
                            trigger="click"
                            okText={`${intl.formatMessage({ id: "yes" })}`}
                            cancelText={`${intl.formatMessage({ id: "no" })}`}
                            placement="bottom"
                            onConfirm={() =>
                              handleDeleteAnswer(data?.answer?.id)
                            }
                          >
                          </Popconfirm>
                        </span>
                      </CPTooltip>
                    )}
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
    </div>
  );
};

export default Add;
