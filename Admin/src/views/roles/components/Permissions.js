import React, { useEffect, useState } from "react";
// UI
import { Col, Form, Row, Space, Spin, Checkbox , message } from "antd";

import { CPButton, CPCard, CPDivider } from "components/CP";

// Message
import { FormattedMessage, useIntl } from "react-intl";
// API
import { userService } from "services/userService";

const { useForm } = Form;

const CheckboxGroup = Checkbox.Group;
const Add = ({
  onCloseModal,
  currentData,
  parentLoading,
  onSubmit,
  typeAction,
}) => {
  const intl = useIntl();
  const [form] = useForm();
  const [loading, setLoading] = useState(false);
  const [data, setData] = React.useState([]);

  const onSubmitData = () => {
    let checkedItems = [];
    data.forEach((parent) => {
      checkedItems = [
        ...checkedItems,
        ...parent.children?.filter((x) => x.checked),
      ];
    });
    let payload = {
      roleId: currentData.key,
      body: checkedItems,
    };
    onSubmit(payload);
  };

  const getRolePermissions = async () => {
    setLoading(true);
    const result = await userService.getRolePermissions(currentData?.key);
    if (result.isSuccess) {
      setLoading(false);
      setData(result.data);
    }
    else{
      message.error(result.message);
      setLoading(false);
    }
  };

  const onChange = (e, childValue, parentId) => {
    let temp = [...data];
    let parent = temp.find((x) => x.value === parentId);
    let childIndex = parent.children.findIndex((xx) => xx.value === childValue);
    parent.children[childIndex].checked = e.target.checked;

    setData([...temp]);
  };

  const onCheckAllChange = (e, key) => {
    let temp = [...data];

    let groupTempIndex = temp.findIndex((x) => x.value === key);
    temp[groupTempIndex].checked = e.target.checked;
    temp[groupTempIndex].children?.forEach((element) => {
      element.checked = e.target.checked;
    });
    setData([...temp]);
  };

  useEffect(() => {
    getRolePermissions();
  }, []);

  return (
    <div>
      <Form
        form={form}
        name="addrole"
        onFinish={onSubmitData}
        layout="vertical"
      >
        {loading ? (
          <Spin className="spin-custom" />
        ) : (
          <>
            <Row gutter={[8, 8]}>
              <Col xs={24} sm={12} md={24} className="mb-20">
                <span>{intl.formatMessage({ id: "selectedRole" })}: </span>
                <strong className="selectedRole"> {currentData?.title} </strong>
              </Col>
              {data?.map((item) => {
                return (
                  <Col xs={24} sm={12} md={8}>
                    <CPCard
                      bordered
                      hoverable
                      headStyle={{
                        paddingRight: 10,
                        paddingLeft: 10,
                        backgroundColor: "darkgrey",
                      }}
                      bodyStyle={{
                        padding: 10,
                        backgroundColor: "#F2F2F2",
                      }}
                      title={
                        <Checkbox
                          onChange={(e) => onCheckAllChange(e, item.value)}
                          checked={item.checked}
                          key={item.value}
                        >
                          {intl.formatMessage({ id: item.enTitle })}
                        </Checkbox>
                      }
                    >
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          lineHeight: 3,
                          height:"350px",
                          overflow:"auto",
                        }}
                      >
                        {item?.children?.length > 0
                          ? item.children.map((x) => (
                              <Checkbox
                                onChange={(e) =>
                                  onChange(e, x.value, item.value)
                                }
                                checked={x.checked}
                                key={x.value}
                              >
                                {intl.formatMessage({ id: x.enTitle })}
                              </Checkbox>
                            ))
                          : null}
                      </div>
                    </CPCard>
                  </Col>
                );
              })}
            </Row>

            <CPDivider />
            <div className="footer-modal">
              <Row>
                <Col span={24}>
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
