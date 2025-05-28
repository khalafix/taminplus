import React, { useState, useEffect } from "react";

import { Row, Col, Space, Descriptions, Spin } from "antd";
import { CPButton, CPDivider } from "components/CP";
import { RiArrowDropLeftFill } from "react-icons/ri";
// Message
import { FormattedMessage, useIntl } from "react-intl";

// API
import { userService } from "services/userService";

const Index = ({ onCloseModal }) => {
  const intl = useIntl();
  const [data, setData] = useState(1);
  const [loading, setLoading] = useState(false);

  const getData = async () => {
    setLoading(true);
    const result = await userService.getCurrentUser();
    if (result.isSuccess) {
      setData(result.data);
      setLoading(false);
    } else{
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <Row>
        {loading ? (
          <Spin className="spin-custom" />
        ) : (
          <Col xs={24} sm={12} md={24}>
            <Descriptions>
              <Descriptions.Item
                label={
                  <>
                    <RiArrowDropLeftFill />
                    {intl.formatMessage({ id: "firstName" })}
                  </>
                }
              >
                <strong>{data.firstName}</strong>
              </Descriptions.Item>
              <Descriptions.Item
                label={
                  <>
                    <RiArrowDropLeftFill />
                    {intl.formatMessage({ id: "lastName" })}
                  </>
                }
              >
                <strong>{data.lastName}</strong>
              </Descriptions.Item>
              <Descriptions.Item
                label={
                  <>
                    <RiArrowDropLeftFill />
                    {intl.formatMessage({ id: "email" })}
                  </>
                }
              >
                <strong>{data.email}</strong>
              </Descriptions.Item>

              <Descriptions.Item span={3}
                label={
                  <>
                    <RiArrowDropLeftFill />
                    {intl.formatMessage({ id: "roles" })}
                  </>
                }
              >
                <strong>{data?.rolesName?.toString()}</strong>
              </Descriptions.Item>
            </Descriptions>
          </Col>
        )}
      </Row>
      <CPDivider />
      <div className="footer-modal">
        <Row>
          <Col span={12}>
            <Space>
              <CPButton onClick={onCloseModal} disabled={loading}>
                <FormattedMessage id="close" />
              </CPButton>
            </Space>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default Index;
