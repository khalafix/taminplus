import React from "react";
import { Row, Col, Space, Descriptions } from "antd";
import { CPButton, CPInput, CPDivider } from "components/CP";
// Message
import { FormattedMessage, useIntl } from "react-intl";
import { RiArrowDropLeftFill } from "react-icons/ri";

const Info = ({ onCloseModal, data }) => {
  const intl = useIntl();

  return (
    <div>
      <Row gutter={[8, 8]}>
        <Col xs={24} sm={12} md={24}>
          <Descriptions title={`${intl.formatMessage({ id: "details" })}:`}>
            <Descriptions.Item
              label={
                <>
                  <RiArrowDropLeftFill />
                  {intl.formatMessage({ id: "indexTemplateTypeForLevel" })}
                </>
              }
            >
              <strong>{data.level}</strong>
            </Descriptions.Item>
            <Descriptions.Item
              label={
                <>
                  <RiArrowDropLeftFill />
                  {intl.formatMessage({ id: "showTrendsTitle" })}
                </>
              }
            >
              <strong>{data.showTrendTitle}</strong>
            </Descriptions.Item>
            <Descriptions.Item
              label={
                <>
                  <RiArrowDropLeftFill />
                  {intl.formatMessage({ id: "hasShowTrend" })}
                </>
              }
            >
              <strong>
                {data.hasShowTrends === true
                  ? `${intl.formatMessage({ id: "hasit" })}`
                  : `${intl.formatMessage({ id: "hasnot" })}`}
              </strong>
            </Descriptions.Item>

            <Descriptions.Item
              label={
                <>
                  <RiArrowDropLeftFill />
                  {intl.formatMessage({ id: "hasNextLevel" })}
                </>
              }
            >
              <strong>
                {" "}
                {data.hasNextLevel === true
                  ? `${intl.formatMessage({ id: "hasit" })}`
                  : `${intl.formatMessage({ id: "hasnot" })}`}
              </strong>
            </Descriptions.Item>
          </Descriptions>
        </Col>
      </Row>

      <CPDivider />
      <div className="footer-modal">
        <Row>
          <Col span={12}>
            <Space>
              <CPButton onClick={onCloseModal}>
                <FormattedMessage id="close" />
              </CPButton>
            </Space>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default Info;
