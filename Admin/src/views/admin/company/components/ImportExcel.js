import React, { useState, useEffect } from "react";
import { Form, Button, Row, Col, Space, message, Spin, Image, Alert, Card } from "antd";
import {
  CPButton,
  CPSelect,
  CPTooltip,
  CPInput,
  CPCard,
  CPUpload,
  CPTreeSelect,
  CPSwitch,
  CPDivider,
} from "components/CP";

// Message
import { FormattedMessage, useIntl } from "react-intl";

// Api
import { originServices } from "services/originServices";

import CompanyNewTemplate from 'assets/files/CompanyNewTemplate.xlsx'


import iconMap from "utils/iconMap";
import { SERVER_FileADDRESS } from "constants/configs";
import { downloadWithLinkFile } from "utils/helpers";

const { useForm } = Form;

const ImportExcel = ({
  onCloseModal,
  parentLoading,
  onSubmit,
  loading
}) => {
  const intl = useIntl();
  const [form] = useForm();
  // const [loading, setLoading] = useState(false);


  const onFinish = (data) => {

    onSubmit(data);

  };

  const handleDownloadFile = () => {
    window.open(CompanyNewTemplate, '_blank');
  };

  return (
    <div>
      <Form form={form} name="addoredit" onFinish={onFinish} layout="vertical">
        {/* {loading ? (
          <Spin className="spin-custom" />
        ) : ( */}

        <>


          <Row gutter={[8, 8]}>
            <Col xs={24} sm={12} md={8}>
              <CPUpload
                hasValidation
                showUploadList={false}
                label={intl.formatMessage({
                  id: "selectFile",
                })}
                accept=".xls,.xlsx"
                name={"file"}
                size={5000000}
                sizeType="mb"
                placeholder={intl.formatMessage({
                  id: "selectFile",
                })}
              />

            </Col>



            <Col xs={24} sm={12} md={10} className="pt-30">
              <CPTooltip title={<FormattedMessage id="downloadSampleFile" />} key={1}>
                <span>
                  <CPButton
                    shape="jam"
                    type="primary"
                    onClick={() => handleDownloadFile()}
                    icon={<>
                      <span className="icon-box">{iconMap["downloadIcon"]}</span>
                    </>
                    }>
                    <FormattedMessage id="downloadSampleFile" />

                  </CPButton>
                </span>
              </CPTooltip>
            </Col>


          </Row>

          {loading ?
            (
              <Spin className="spin-custom"  tip={<FormattedMessage id="processingInformation" />} />

            ) : null}


          <CPDivider />
          <div className="footer-modal">
            <Row>
              <Col span={12}>
                <Space>
                  <CPButton
                    type="primary"
                    htmlType="submit"
                    disabled={loading}
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
        {/* )} */}
      </Form>
    </div>
  );
};

export default ImportExcel;
