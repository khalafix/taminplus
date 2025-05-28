import React, { useState, useEffect } from "react";
import { Row, Col, Space, Form, Spin, Tag, Input, message, Button } from "antd";
import {
  CPButton,
  CPInput,
  CPDivider,
  CPSelect,
  CPTextArea,
  CPInputNumber,
  CPTreeSelect,CPSwitch
} from "components/CP";
// Message
import { FormattedMessage, useIntl } from "react-intl";
// Api
import { featureServices } from "services/catalog/featureServices";
import { comboServices } from "services/comboService";
import Tags from './Tags';
import { symbolServices } from "services/catalog/symbolServices";

const { useForm } = Form;

const Add = ({
  onCloseModal,
  parentLoading,
  onSubmit,
  currentData,
  typeAction,
}) => {
  const intl = useIntl();
  const [form] = useForm();
  const [comboDataSet, setComboDataSet] = useState({});
  const [loading, setLoading] = useState(false);
  const [controlType, setControlType] = useState(0);
  const [option, setOption] = useState([]);
  const [defalutOption, setDefalutOption] = useState([]);
  const [featureCategoryData, setfeatureCategoryData] = useState([]);
  const [symbolList, setSymbolList] = useState([]);


  const GetSymbols = async () => {
    const result = await symbolServices.getTree()
    if (result.isSuccess) {
      setSymbolList(result.data);

    }
  };

  const getComboDataSet = async () => {
    const result = await comboServices.getIndexTemplateCombo();
    setComboDataSet(result);
  };

  const GetFeatureCategory = async () => {
    const result = await comboServices.getFeatureCategory();
    setfeatureCategoryData(result);
  };


  const onFinish = (data) => {
    data.showInFilter = data.showInFilter ? data.showInFilter : false;

    if (typeAction === "edit") {

      if (data.controlType == 104) {

        if (option.length == 0) {
          data.option = defalutOption.join(",");
        } else {
          data.option = option.join(",");
        }

      }
      onSubmit({ ...data, id: currentData.id });
    } else {
      if (data.controlType == 104) {
        data.option = option.join(",");
      }
      onSubmit(data);
    }
  };

  const GetFeatureData = async () => {
    setLoading(true);
    const result = await featureServices.getById(currentData.id);
    if (result.isSuccess) {

      form.setFieldsValue({
        ...result.data,
      });
      if (result.data.controlType == 104 && result.data.option != null) {
        if(result.data?.option && result.data?.option.length > 0){
          let option = result.data?.option?.split(",");
          // let tempOption=['*'];
          // let finallyOption=tempOption.concat(option)
          setDefalutOption(option)
        }
 
      }

      setControlType(result.data.controlType)
      setLoading(false);
    }
    else {
      message.error(result.message);
      setLoading(false);
    }
  };
  useEffect(() => {
    getComboDataSet();
    GetFeatureCategory();
    GetSymbols();
    changeControlType();

    if (typeAction === "edit") {
      GetFeatureData();
    }
  }, []);

  const changeControlType = (el) => {
    setControlType(el)
  }
  const getOptions = (el) => {

    setOption([...el])
  }

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
                {/* <CPSelect
                  hasValidation
                  name={"unitType"}
                  label={`${intl.formatMessage({ id: "symbol" })}:`}
                  placeholder={intl.formatMessage({ id: "symbol" })}
                  dataSource={comboDataSet.unitTypes}
                  rules={[
                    {
                      required: true,
                      message: <FormattedMessage id="requiredMessage" />,
                    },
                  ]}
                /> */}
                <CPTreeSelect
                  label={`${intl.formatMessage({ id: "symbol" })}:`}
                  hasValidation
                  name={"symbolId"}
                  placeholder={intl.formatMessage({ id: "symbol" })}
                  allowClear
                  showSearch
                  optionFilterProp="children"
                  // treeDefaultExpandAll
                  dropdownStyle={{ maxHeight: 400, overflow: "auto" }}
                  treeData={symbolList}
                  multiple={false}
                  rules={[
                    {
                      required: true,
                      message: <FormattedMessage id="requiredMessage" />,
                    },
                  ]}
                />
              </Col>{" "}
              <Col xs={24} sm={12} md={8}>
                <CPSelect
                  hasValidation
                  name={"controlType"}
                  onChange={(e) => changeControlType(e)}
                  label={`${intl.formatMessage({ id: "controlType" })}:`}
                  placeholder={intl.formatMessage({ id: "controlType" })}
                  dataSource={comboDataSet.controlTypes}
                  rules={[
                    {
                      required: true,
                      message: <FormattedMessage id="requiredMessage" />,
                    },
                  ]}
                />
              </Col>


              {/* <Col xs={24} sm={12} md={8}>
                <CPSelect
                  hasValidation
                  name={"featureCategoryId"}
                  label={`${intl.formatMessage({ id: "listFeatureCategory" })}:`}
                  placeholder={intl.formatMessage({ id: "listFeatureCategory" })}
                  dataSource={featureCategoryData}
                  rules={[
                    {
                      required: true,
                      message: <FormattedMessage id="requiredMessage" />,
                    },
                  ]}
                />
              </Col> */}

              {

                controlType == 102 ?
                  <>
                    <Col xs={24} sm={12} md={8}>
                      <CPInputNumber
                        hasValidation
                        name={"min"}
                        label={`${intl.formatMessage({ id: "min" })}:`}
                        placeholder={intl.formatMessage({ id: "min" })}
                        rules={[
                          {
                            required: true,
                            message: <FormattedMessage id="requiredMessage" />,
                          },
                        ]}
                      />
                    </Col>
                    <Col xs={24} sm={12} md={8}>
                      <CPInputNumber
                        hasValidation
                        name={"max"}
                        label={`${intl.formatMessage({ id: "max" })}:`}
                        placeholder={intl.formatMessage({ id: "max" })}
                        rules={[
                          {
                            required: true,
                            message: <FormattedMessage id="requiredMessage" />,
                          },
                        ]}
                      />
                    </Col> </> : null
              }

              {

                controlType == 104 ?
                  <>
                    <Col xs={24} sm={24} md={16} style={{ marginTop: "3%" }}>
                      <Tags defalutOption={defalutOption} tags={getOptions} />
                    </Col> </> : null
              }
              <Col xs={24} sm={12} md={8}>
                <CPSwitch
                  key={20}
                  hasValidation
                  name={"showInFilter"}
                  label={`${intl.formatMessage({ id: "showInFilter" })}`}  ></CPSwitch>
              </Col>


              <Col xs={24} sm={12} md={24}>
                <CPTextArea
                  hasValidation
                  name={"remark"}
                  rows={3}
                  label={`${intl.formatMessage({ id: "description" })}:`}
                  placeholder={intl.formatMessage({ id: "description" })}
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
