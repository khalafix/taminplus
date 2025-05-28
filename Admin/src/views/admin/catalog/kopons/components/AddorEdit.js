import React, { useState, useEffect } from "react";
import { Row, Col, Space, Form, Spin, message, Button } from "antd";
import {
  CPButton,
  CPInput,
  CPDivider,
  CPSelect,
  CPTextArea, CPDatePicker
} from "components/CP";
// Message
import { FormattedMessage, useIntl } from "react-intl";

// Api
import { koponServices } from "services/catalog/koponServices";
import dayjs from "dayjs";

const { useForm } = Form;
dayjs.calendar("jalali");

const Add = ({
  onCloseModal,
  parentLoading,
  onSubmit,
  currentData,
  typeAction,
}) => {
  const intl = useIntl();
  const [form] = useForm();
  const [loading, setLoading] = useState(false);

  const convertToMoment = (date) => {
    return date !== "" ? dayjs(date, { jalali: true }) : "";
  }
  const onFinish = (data) => {
    data.toDate = data?.toDate?.format("YYYY-MM-DD");
    data.fromDate = data?.fromDate?.format("YYYY-MM-DD");
    if (typeAction === "edit") {
      onSubmit({ ...data, id: currentData.id });
    } else {
      onSubmit(data);
    }
  };

  const GetData = async () => {
    setLoading(true);
    const result = await koponServices.getById(currentData.id);
    if (result.isSuccess) {
      if (result.data) {

        result.data.fromDate = result?.data?.fromDate ? convertToMoment(result?.data?.fromDate) : null;
        result.data.toDate = result?.data?.toDate ? convertToMoment(result?.data?.toDate) : null;
      }

      result.data.status = result.data.isActive;
      form.setFieldsValue({
        ...result.data,
      });
      setLoading(false);
    }
    else {
      message.error(result.message);
      setLoading(false);
    }
  };
  useEffect(() => {
    if (typeAction === "edit") {
      GetData();
    }
  }, []);

  return (
    <div>
      <Form form={form} name="addoredit" onFinish={onFinish} layout="vertical">
        {loading ? (
          <Spin className="spin-custom" />
        ) : (
          <>
            <Row gutter={[8, 8]}>
              <Col xs={24} sm={12} md={8}>
                <CPInput
                  hasValidation
                  name={"title"}
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
                <CPInput
                  hasValidation
                  name={"code"}
                  type={"text"}
                  label={`${intl.formatMessage({ id: "code" })}:`}
                  placeholder={intl.formatMessage({ id: "code" })}
                  rules={[
                    {
                      required: true,
                      message: <FormattedMessage id="requiredMessage" />,
                    },
                  ]}
                />
              </Col>

              <Col xs={24} sm={12} md={8}>
                <CPSelect
                  hasValidation
                  name={"status"}
                  label={`${intl.formatMessage({ id: "status" })}:`}
                  placeholder={intl.formatMessage({ id: "status" })}
                  dataSource={[
                    { value: true, text: intl.formatMessage({ id: "active" }) },
                    { value: false, text: intl.formatMessage({ id: "deactivate" }) },
                  ]}
                  rules={[
                    {
                      required: true,
                      message: <FormattedMessage id="requiredMessage" />,
                    },
                  ]}
                />
              </Col>
              <Col xs={24} sm={12} md={8}>
                <CPInput
                  min={0}
                  hasValidation
                  name={"percent"}
                  type={"number"}
                  label={`${intl.formatMessage({ id: "percentKopon" })}:`}
                  placeholder={intl.formatMessage({ id: "percentKopon" })}
                  rules={[
                    {
                      required: true,
                      message: <FormattedMessage id="requiredMessage" />,
                    },
                  ]}
                />
              </Col>

              <Col xs={24} sm={12} md={8}>
                <CPDatePicker
                  placeholder={`${intl.formatMessage({ id: "fromDate" })}`}
                  hasValidation
                  showToday={false}
                  name={"fromDate"}
                  label={`${intl.formatMessage({ id: "fromDate" })}:`}
                  rules={[
                    {
                      required: true,
                      message: <FormattedMessage id="requiredMessage" />,
                    },
                  ]}
                />
              </Col>
              <Col xs={24} sm={12} md={8}>
                <CPDatePicker
                  placeholder={`${intl.formatMessage({ id: "toDate" })}`}
                  hasValidation
                  showToday={false}
                  name={"toDate"}
                  label={`${intl.formatMessage({ id: "toDate" })}:`}
                  rules={[
                    {
                      required: true,
                      message: <FormattedMessage id="requiredMessage" />,
                    },
                  ]}
                />
              </Col>

              <Col xs={24} sm={24} md={24}>
                <CPTextArea
                  hasValidation
                  name={"remark"}
                  rows={3}
                  label={`${intl.formatMessage({ id: "remark" })}:`}
                  placeholder={intl.formatMessage({ id: "remark" })}
                  rules={[
                    {
                      required: false,
                      message: <FormattedMessage id="requiredMessage" />,
                    },
                  ]}
                />
              </Col>
            </Row>

            <CPDivider />
            <div className="footer-modal">
              <Row>
                <Col span={12}>
                  <Space>
                    <Button
                      type="primary"
                      htmlType="submit"
                      loading={parentLoading}
                      disabled={parentLoading}
                    >
                      <span>
                        <FormattedMessage id="addInformation" />
                      </span>
                    </Button>
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
