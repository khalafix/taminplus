import React from "react";
import { Row, Col, Space, Button } from "antd";
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
          <span>
            {intl.formatMessage({ id: "deleteMessageProductCategory" })}
          </span>
        </Col>
        <Col xs={24}>
          <span>{intl.formatMessage({ id: "categoryName" })}: </span>
          <strong> {currentData.title} </strong>
        </Col>
      </Row>
      <CPDivider />
      <div className="footer-modal">
        <Row>
          <Col span={24}>
            <Space>
              <Button
                type="primary"
                danger
                onClick={handleDelete}
                loading={parentLoading}
                disabled={parentLoading}
              >
                <FormattedMessage id="yes" />
              </Button>

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
