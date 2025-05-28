import React, { useState, useEffect } from "react";
import {
  Row,
  Col,
  Space,
  Form,
  Spin,
  List,
  Typography,
  Checkbox,
  Input,
  InputNumber,
  message,
} from "antd";
import {
  CPButton,
  CPInput,
  CPDivider,
  CPSelect,
  CPUploadImage,
  CPUpload,
  CPTextArea,
  CPCard,
  CPCA,
  CPTooltip,
} from "components/CP";
// Message
import { FormattedMessage, useIntl } from "react-intl";

// Api
import { companyEvalutionQuestionsServices } from "services/companyEvalutionQuestionsServices";
import { companyRequestEvalutionServices } from "services/companyRequestEvalutionServices";
import { downloadWithLinkFile } from "utils/helpers";

import { SERVER_ADDRESS } from "constants/configs";
import { SERVER_FileADDRESS } from "constants/configs";
import { ServerFileIdentifier } from "constants/configs";
import iconMap from "utils/iconMap";
import GenrateLinkUploader from "components/GenrateLinkUploader";

const { useForm } = Form;

const EvalutionDetails = ({ onCloseModal, currentData }) => {
  const intl = useIntl();
  const [form] = useForm();
  const [loading, setLoading] = useState(false);
  const [dataSet, setDataSet] = useState([]);
  const [index, setIndex] = useState([]);
  const [valueSet, setValueSet] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [ValueInputNumber, setValueInputNumber] = useState();
  const [modifyDate, setModifyDate] = useState("");
  const [filePath, setFilePath] = useState([]);

  const getbyId = async () => {
    let id = currentData.id;
    let userId = currentData.userId;

    const result =
      await companyRequestEvalutionServices.getListForEvalutionDetails(
        id,
        userId
      );

    let temp = [];

    for (let y = 0; y < result.data?.length; y++) {
      const el = result.data[y];
      temp = [
        ...temp,
        {
          companyEvalutionQuestionId: el.companyEvalutionQuestionId,
          score: el.score,
          scoreTitle: el.scoreTitle,
          remark: el.remark,
        },
      ];

      let model = {};
      temp.map((x) => {
        model["score" + x.companyEvalutionQuestionId] = `${x.score}`;
      });
      temp.map((x) => {
        model["scoreTitle" + x.companyEvalutionQuestionId] = `${x.scoreTitle}`;
      });
      temp.map((x) => {
        model["remark"] = x.remark;
      });
      setFilePath(result.data[0].filePath);
      form.setFieldsValue(model);
      // setSelectedItems([...temp]);
    }
  };

  const getData = async () => {
    setLoading(true);
    let companyType = currentData.companyType;
    let companyRequestId = currentData.companyRequestId;

    const result = await companyEvalutionQuestionsServices.getListWithCategory(
      companyType,
      companyRequestId
    );
    if (result.isSuccess) {
      let temp = [];

      let indexItem = 0;
      for (let index = 0; index < result.data.length; index++) {
        const element = result.data[index];
        for (let y = 0; y < element.childern.length; y++) {
          const item = element.childern[y];
          indexItem++;
          temp = [
            ...temp,
            { id: item.id, title: item.title, index: indexItem },
          ];
          setIndex(temp);
        }
      }
      setDataSet([...result.data]);
      setLoading(false);
    } else {
      message.error(result.message);
      setLoading(false);
    }
  };
  useEffect(() => {
    (async () => {
      await getData();
      await getbyId();
    })();
  }, []);

  const getinitialValues = () => {
    let model = {};
    selectedItems.map((x) => {
      model["score" + x.id] = `${x.score}`;
    });

    selectedItems.map((x) => {
      model["scoreTitle" + x.id] = `${x.scoreTitle}`;
    });

    // selectedItems.map(x => { model["remark"] = `${x.remark}` })
    return model;
  };
  return (
    <div>
      <Form
        form={form}
        name="addoredit"
        initialValues={getinitialValues()}
        layout="vertical"
      >
        {loading ? (
          <Spin className="spin-custom" />
        ) : (
          <>
            <Row gutter={[24, 24]}>
              {dataSet.map((value) => (
                <>
                  <Col xs={24} sm={24} md={24}>
                    <List
                      header={<div>{value.title}</div>}
                      // footer={<div>Footer</div>}
                      bordered
                      dataSource={value.childern}
                      renderItem={(item) => (
                        <List.Item
                          rules={[
                            {
                              max: item.maxScore,
                              message: `Value should be less than ${item.maxScore} `,
                            },
                          ]}
                        >
                          <Col xs={14} sm={14} md={14}>
                            {/* <Checkbox checked={selectedItems?.find(i => i.id == item.id && i.selected == true)} onChange={(e) => changeItems(e.target.checked, item.id)} /> */}

                            {/* <span >{index?.find(f => f.title == item.title)?.index} - {item.title}</span> */}
                            <span>{item.title}</span>
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
                                  name={"maxScore" + item.id}
                                  id={"maxScore" + item.id}
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

                                  name={"score" + item.id}
                                  id={"score" + item.id}
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
                          ) : (
                            <>
                              <Col xs={10} sm={10} md={10}>
                                <label style={{ marginRight: "30%" }}>
                                  <FormattedMessage id="scoreTitle" />
                                </label>
                                <CPInput
                                  type={"text"}
                                  hasValidation
                                  disabled={true}

                                  name={"scoreTitle" + item.id}
                                  id={"scoreTitle" + item.id}
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
                  </Col>
                </>
              ))}
            </Row>
            <Row gutter={[24, 24]} style={{ marginTop: "1%" }}>
              <Col xs={24} sm={24} md={24}>
                <CPTextArea
                  label={`${intl.formatMessage({
                    id: "remark",
                  })}:`}
                  hasValidation
                  initialValue={""}
                  rows={4}
                  name={"remark"}
                  /*className="ant-custom-input" */
                  placeholder={intl.formatMessage({
                    id: "remark",
                  })}
                  disabled={true}
                  rules={[
                    {
                      required: false,
                    },
                  ]}
                />
              </Col>
            </Row>
            <Row gutter={[24, 24]} style={{ marginTop: "1%" }}>
              <Col xs={24} sm={12} md={8}>
                <GenrateLinkUploader
                  items={filePath}
                  title={intl.formatMessage({ id: "files" })}
                />
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
          </>
        )}
      </Form>
    </div>
  );
};

export default EvalutionDetails;
