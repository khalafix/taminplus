import React from "react";
import { PlusOutlined } from "@ant-design/icons";
import { Form, Button, Row, Col } from "antd";
import { CPButton, CPTooltip, CPInput, CPCard, CPTextArea, CPUpload } from "components/CP";

// Message
import { FormattedMessage, useIntl } from "react-intl";
import { RiDeleteBinLine } from "react-icons/ri";
import GenrateLinkUploader from "components/GenrateLinkUploader";

const OrginalFile = ({ currentData }) => {
  const intl = useIntl();
  debugger
  return (
    <div>
      <CPCard bordered >

        <Row style={{ marginTop: "2%" }}>
          <Col xs={10} sm={10} md={10}>
            <CPUpload
              hasValidation
              showUploadList={false}
              label={intl.formatMessage({
                id: "selectFile",
              })}
              name={"orginalFiles"}
              size={100}
             accept={".png,.jpg,.webp,.jpeg,.svg"}
              multiple={true}
              maxCount={10}
              sizeType="mb"
              placeholder={intl.formatMessage({
                id: "selectFile",
              })}
            />
          </Col>
          {
            currentData?.fileAttachments?.length > 0 ?
              <Col xs={12} sm={12} md={12} style={{ margin: '0 1%' }}>


                <GenrateLinkUploader
                  items={
                    currentData?.fileAttachments
                  }
                  label={intl.formatMessage({
                    id: "uploadedFiles",
                  })}
                />

              </Col>
              : null
          }



        </Row>
      </CPCard>
    </div>
  )
}



export default OrginalFile
