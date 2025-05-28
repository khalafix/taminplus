import React, { useState, useEffect } from "react";
import { Row, Col, Space, Form, Spin, Alert, message, Button } from "antd";
import dayjs from "dayjs";
import { CPButton, CPDivider, CPCard, CPTab, CPModal, CPUpload } from "components/CP";
// Message
import { FormattedMessage, useIntl } from "react-intl";

// Api
import { productServices } from "services/catalog/productServices";

// Helpers
import { removeEmptyValueObject } from "utils/helpers";
import { useLocale } from "components/IntelProvider/IntelProvider";
import OrginalFile from "./OrginalFile";
import OtherFiles from "./OtherFiles";
import IntroductionVideo from "./IntroductionVideo";
import Catalog from "./Catalog";
import { ProductAttachmentType } from 'utils/productAttachmentType'
import GenrateLinkUploader from "components/GenrateLinkUploader";
//Component

const { useForm } = Form;

const FileAttachment = ({
  onCloseModal,
  parentLoading,
  onSubmit,
  // comboDataSet,
  currentData,
  logFromCompanyReq = false

}) => {
  const intl = useIntl();
  const [form] = useForm();
  const [tab, setTab] = useState("1");
  const { locale } = useLocale();
  const [data, setData] = useState([]);
  const [errorForms, setErrorForms] = useState([]);
  const handleTab = (value) => setTab(value);

  const [loading, setLoading] = useState(false);
  const [openModalErrors, setOpenModalErrors] = useState(false);
  const [comboDataSet, setComboDataSet] = useState({});
  const [coverAttachmentData, setCoverAttachmentData] = useState([]);

  // If you want to all new instanses of dayjs use jalali calendar, you can set default calendar
  dayjs.calendar("");

  const GetCompanyData = async () => {
    setLoading(true);

    const result = await productServices.getProductAttachment(currentData.id);

    if (result.isSuccess) {

      setData(result.data);
      form.setFieldsValue({
        ...result.data,
      });
      debugger
      let tempcoverAttachmentData=[];
      tempcoverAttachmentData.push(result.data.coverAttachment);
      setCoverAttachmentData(tempcoverAttachmentData)
      setLoading(false);
    }
    else {
      message.error(result.message);
      setLoading(false);
    }
  };



  useEffect(() => {
    GetCompanyData();

  }, []);


  const ConvertData = (values) => {


    const bodyFormData = new FormData();

    bodyFormData.append("productId", currentData.id);

    values?.listVideoProductAttachmentModel?.forEach((item, index) => {
      bodyFormData.append(`listVideoProductAttachmentModel[${index}].videoTitle`, item.videoTitle);
      bodyFormData.append(`listVideoProductAttachmentModel[${index}].videoLink`, item.videoLink);
      bodyFormData.append(`listVideoProductAttachmentModel[${index}].id`, item.id ? item.id : 0);


      item.file?.fileList?.forEach((attachmentItem) => {
        bodyFormData.append(
          `listVideoProductAttachmentModel[${index}].file`,
          attachmentItem.originFileObj
        );
      })


    });

    for (let o = 0; o < values.orginalFiles?.fileList?.length; o++) {
      const element = values.orginalFiles?.fileList[o];
      bodyFormData.append("orginalFiles", element.originFileObj);
    }

    for (let ot = 0; ot < values.otherFiles?.fileList?.length; ot++) {
      const element = values.otherFiles?.fileList[ot];
      bodyFormData.append("otherFiles", element.originFileObj);
    }

    for (let c = 0; c < values.catalogFiles?.fileList?.length; c++) {
      const element = values.catalogFiles?.fileList[c];
      bodyFormData.append("catalogFiles", element.originFileObj);
    }

    for (let k = 0; k < values.coverFiles?.fileList?.length; k++) {
      const element = values.coverFiles?.fileList[k];
      bodyFormData.append("coverFiles", element.originFileObj);
    }



    return bodyFormData;
  };

  const onFinish = (data) => {

    let dataForm = ConvertData(data);

    onSubmit(dataForm);

  };

  const renderTabs = () => {
    const tabs = [];
    tabs.push(


      {
        tab: (
          <>
            <span>
              {intl.formatMessage({
                id: "coverFile",
              })}
            </span>
          </>
        ),
        key: 1,
        children: (
          <CPCard bordered >

            <Row style={{ marginTop: "2%" }}>
              <Col xs={10} sm={10} md={10}>
                <CPUpload
                  hasValidation
                  showUploadList={false}
                  label={intl.formatMessage({
                    id: "coverFile",
                  })}
                  name={"coverFiles"}
                  size={100}
                  accept={".png,.jpg,.webp,.jpeg,.svg"}
                  multiple={false}
                  maxCount={1}
                  sizeType="mb"
                  placeholder={intl.formatMessage({
                    id: "coverFile",
                  })}
                />
              </Col>
              {
                data?.coverAttachment && data?.coverAttachment.filePath ?
                  <Col xs={12} sm={12} md={12} style={{ margin: '0 1%' }}>


                    <GenrateLinkUploader
                      items={
                        coverAttachmentData
                      }
                      label={intl.formatMessage({
                        id: "coverFileUploded",
                      })}
                    />

                  </Col>
                  : null
              }



            </Row>
          </CPCard>
        ),
      },

      // {
      //   tab: (
      //     <>
      //       <span>
      //         {intl.formatMessage({
      //           id: "orginalFile",
      //         })}
      //       </span>
      //     </>
      //   ),
      //   key: 1,
      //   children: (
      //     <OrginalFile
      //       currentData={data.listProductAttachment?.find(f => f.productAttachmentType == ProductAttachmentType.Orginal)}
      //     />
      //   ),
      // },
      {
        tab: (
          <>
            <span>
              {intl.formatMessage({
                id: "otherFiles",
              })}
            </span>
          </>
        ),
        key: 2,
        children: (
          <OtherFiles
            currentData={data.listProductAttachment?.find(f => f.productAttachmentType == ProductAttachmentType.Other)}
          />
        ),
      },
      {
        tab: (
          <>
            <span>
              {intl.formatMessage({
                id: "introductionVideo",
              })}
            </span>
          </>
        ),
        key: 3,
        children: (
          <IntroductionVideo
            currentData={data.listVideoProductAttachmentModel}
          />
        ),
      },
      {
        tab: (
          <>
            <span>
              {intl.formatMessage({
                id: "catalogFile",
              })}
            </span>
          </>
        ),
        key: 4,
        children: (
          <Catalog
            currentData={data.listProductAttachment?.find(f => f.productAttachmentType == ProductAttachmentType.CatalogAndBrochure)}
          />
        ),
      },
      // {
      //   tab: (
      //     <>
      //       <span>
      //         {intl.formatMessage({
      //           id: "coverFile",
      //         })}
      //       </span>
      //     </>
      //   ),
      //   key: 5,
      //   children: (
      //     <CPCard bordered >

      //       <Row style={{ marginTop: "2%" }}>
      //         <Col xs={10} sm={10} md={10}>
      //           <CPUpload
      //             hasValidation
      //             showUploadList={false}
      //             label={intl.formatMessage({
      //               id: "coverFile",
      //             })}
      //             name={"coverFiles"}
      //             size={100}
      //             accept={".png,.jpg,.webp,.jpeg,.svg"}
      //             multiple={false}
      //             maxCount={1}
      //             sizeType="mb"
      //             placeholder={intl.formatMessage({
      //               id: "coverFile",
      //             })}
      //           />
      //         </Col>
      //         {
      //           data?.coverAttachment ?
      //             <Col xs={12} sm={12} md={12} style={{ margin: '0 1%' }}>


      //               <GenrateLinkUploader
      //                 items={
      //                   [data?.coverAttachment] 
      //                 }
      //                 label={intl.formatMessage({
      //                   id: "coverFileUploded",
      //                 })}
      //               />

      //             </Col>
      //             : null
      //         }



      //       </Row>
      //     </CPCard>
      //   ),
      // },
    );


    return tabs;
  };

  return (
    <>
      <CPCard bodyStyle={{ padding: "0px" }}>
        {loading ? (
          <Spin className="spin-custom" />
        ) : (
          <Form
            form={form}
            name="files"
            onFinish={onFinish}
            layout="vertical"
          >
            <>
              <Row gutter={[8, 8]}>
                <Col xs={24} sm={12} md={24}>
                  <CPTab
                    tabPane={renderTabs()}
                    activeKey={tab}
                    type="card"
                    onTabClick={handleTab}
                    forceRender={true}
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
          </Form>
        )}
      </CPCard>

      <CPModal
        title={intl.formatMessage({ id: "infoListErrors" })}
        visible={openModalErrors}
        closable
        onCancel={() => setOpenModalErrors(false)}
        footer={null}
        width={"100%"}
        bodyStyle={{ pading: "0px", minHeight: "600px" }}
      >
        {form.getFieldsError().map((item) => {
          <Alert message={item} type="error" showIcon />;
        })}
      </CPModal>
    </>
  );
};

export default FileAttachment;
