import React from "react";
import { Row, Col, Space } from "antd";
import { CPButton, CPDivider } from "components/CP";
// Message
import { FormattedMessage, useIntl } from "react-intl";

const Delete = ({
  onClickDelete,
  onCloseModal,
  currentData,
  parentLoading,
}) => {
  const intl = useIntl();

  const handleDelete = () => {
    onClickDelete(currentData.key);
  };
  return (
    <>
      <Row gutter={[8, 8]} style={{ flexDirection: "column" }}>
        {/* Message  */}

        <Col xs={24}>
          <span>{intl.formatMessage({ id: "deleteMessageRole" })}</span>
        </Col>
        <Col xs={24}>
          <span>{intl.formatMessage({ id: "roleName" })}: </span>
          <strong className="selectedRole"> {currentData.title} </strong>
        </Col>
      </Row>
      <CPDivider />
      <div className="footer-modal">
        <Row>
          <Col span={24}>
            <Space>
              <CPButton
                type="primary"
                danger
                onClick={handleDelete}
                loading={parentLoading}
              >
                <FormattedMessage id="yes" />
              </CPButton>

              <CPButton onClick={onCloseModal} disabled={parentLoading}>
                <FormattedMessage id="no" />
              </CPButton>
            </Space>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default Delete;
