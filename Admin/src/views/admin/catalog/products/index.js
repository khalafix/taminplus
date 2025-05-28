import React, { useState } from "react";
import { useHistory, useLocation } from "react-router-dom";

// API

import { productServices } from "services/catalog/productServices";

// UI Components
import { message, Alert, Col, Row, notification } from "antd";
import { CPModal, CPCard } from "components/CP";
import AdvanceTable from "components/AdvanceTable";
import ToolbarInit from "./initial/ToolbarInit";
import FiltersInit from "./initial/FiltersInit";
import TableInit from "./initial/TableInit";
import AddorEdit from "./components/AddorEdit";

// Message
import { useIntl } from "react-intl";

// Handle Error
import PageContainer from "components/PageContainer/PageContainer";
import GenrateLinkUploader from "components/GenrateLinkUploader";
import FileAttachment from "./components/file-attachments/FileAttachment";
import ArticleProduct from "./components/similar-product-items/ArticleProduct";
import VideoProduct from "./components/similar-product-items/VideoProduct";
import SimilarProduct from "./components/similar-product-items/SimilarProduct";
import Financial from "./components/financial/Financial";
import FinancialList from "./components/financial/financial-list/FinancialList";
import CPAntEditor from "components/CP/CPEditor/CPAntEditor";
import { downloadFile } from "utils/helpers";
import ImportExcel from "./components/import-excel/ImportExcel";

const Product = () => {
  const intl = useIntl();
  const [loading, setLoading] = useState(false);
  const [typeAction, setTypeAction] = useState("add");
  const [openModal, setOpenModal] = useState(false);
  const [currentRow, setCurrentRow] = useState({});
  const [againFetch, setAgainFetch] = useState(false);
  const history = useHistory();
  const onCloseModal = () => {
    setOpenModal(false);
  };
  const renderModalComponent = (type) => {
    switch (type) {
      case "add":
        return (
          <AddorEdit
            onCloseModal={onCloseModal}
            onSubmit={CreateProduct}
            parentLoading={loading}
            currentData={currentRow}
            typeAction={typeAction}
          />
        );
      case "edit":
        return (
          <AddorEdit
            currentData={currentRow}
            onCloseModal={onCloseModal}
            parentLoading={loading}
            onSubmit={UpdateProduct}
            typeAction={typeAction}
          />
        );

      case "file":
        return (
          <FileAttachment
            currentData={currentRow}
            onCloseModal={onCloseModal}
            parentLoading={loading}
            onSubmit={UpdateProductAttachment}
            typeAction={typeAction}
          />
        );

      case "articleProduct":
        return (
          <ArticleProduct
            currentData={currentRow}
            onCloseModal={onCloseModal}
            parentLoading={loading}
            onSubmit={AddArticleProduct}
            typeAction={typeAction}
          />
        );

      case "videoProduct":
        return (
          <VideoProduct
            currentData={currentRow}
            onCloseModal={onCloseModal}
            parentLoading={loading}
            onSubmit={AddVideoProduct}
            typeAction={typeAction}
          />
        );

      case "similarProduct":
        return (
          <SimilarProduct
            currentData={currentRow}
            onCloseModal={onCloseModal}
            parentLoading={loading}
            onSubmit={AddSimilarProduct}
            typeAction={typeAction}
          />
        );
      case "financial":
        return (
          <Financial
            currentData={currentRow}
            onCloseModal={onCloseModal}
            parentLoading={loading}
            onSubmit={UpdateFinancialProduct}
            typeAction={typeAction}
          />
        );
      case "financialList":
        return (
          <FinancialList
            currentData={currentRow}
            onCloseModal={onCloseModal}
            parentLoading={loading}
            typeAction={typeAction}
          />
        );
        case "importExcel":
          return (
            <ImportExcel
            currentData={currentRow}
            onCloseModal={onCloseModal}
            loading={loading}
            onSubmit={ImportExcelFun}

          />
          );
    }
  };

  const renderTitleModal = (type) => {
    switch (type) {
      case "add":
        return intl.formatMessage({ id: "add" });
      case "edit":
        return intl.formatMessage({ id: "edit" });
      case "delete":
        return intl.formatMessage({ id: "delete" });
      case "file":
        return intl.formatMessage({ id: "files" });
      case "articleProduct":
        return intl.formatMessage({ id: "articleProduct" });
      case "videoProduct":
        return intl.formatMessage({ id: "videoProduct" });
      case "similarProduct":
        return intl.formatMessage({ id: "similarProducts" });
      case "financial":
        return intl.formatMessage({ id: "financial" });
      case "financialList":
        return intl.formatMessage({ id: "financialList" });
        case "importExcel":
          return intl.formatMessage({ id: "importExcel" });
    }
  };

  const excelDownload = async () => {
    var result = await productServices.exportToExcel();
    downloadFile(result);
  };

  const handleOpenModal = (type, row) => {
    switch (type) {
      case "importExcel":
        setTypeAction(type);
        setOpenModal(true);
        break;
      case "add":
        setTypeAction(type);
        setOpenModal(true);
        break;
      case "edit":
        setTypeAction(type);
        setCurrentRow(row);
        setOpenModal(true);
        break;
      case "file":
        setTypeAction(type);
        setCurrentRow(row);
        setOpenModal(true);
        break;
      case "articleProduct":
        setTypeAction(type);
        setCurrentRow(row);
        setOpenModal(true);
        break;
      case "videoProduct":
        setTypeAction(type);
        setCurrentRow(row);
        setOpenModal(true);
        break;
      case "similarProduct":
        setTypeAction(type);
        setCurrentRow(row);
        setOpenModal(true);
        break;
      case "financial":
        setTypeAction(type);
        setCurrentRow(row);
        setOpenModal(true);
        break;
      case "financialList":
        setTypeAction(type);
        setCurrentRow(row);
        setOpenModal(true);
        break;
      case "delete":
        setTypeAction(type);
        setCurrentRow(row);
        setOpenModal(true);
        break;
    }
  };

  const UpdateFinancialProduct = async (values) => {
    setLoading(true);
    values.discountedPrice = values.discountedPrice
      ? values.discountedPrice
      : 0;
    const result = await productServices.updateFinancialProduct(values);
    if (result.isSuccess) {
      message.success(result.message);
      setLoading(false);
      setOpenModal(false);
      setAgainFetch(true);
    } else {
      message.error(result.message);
      setLoading(false);
    }
  };

  const AddVideoProduct = async (values) => {
    setLoading(true);
    const result = await productServices.addVideoProduct(values);
    if (result.isSuccess) {
      message.success(result.message);
      setLoading(false);
      setOpenModal(false);
      setAgainFetch(true);
    } else {
      message.error(result.message);
      setLoading(false);
    }
  };

  const AddSimilarProduct = async (values) => {
    setLoading(true);
    const result = await productServices.addSimilarProduct(values);
    if (result.isSuccess) {
      message.success(result.message);
      setLoading(false);
      setOpenModal(false);
      setAgainFetch(true);
    } else {
      message.error(result.message);
      setLoading(false);
    }
  };

  const AddArticleProduct = async (values) => {
    setLoading(true);
    const result = await productServices.addArticleProduct(values);
    if (result.isSuccess) {
      message.success(result.message);
      setLoading(false);
      setOpenModal(false);
      setAgainFetch(true);
    } else {
      message.error(result.message);
      setLoading(false);
    }
  };

  const CreateProduct = async (values) => {
    setLoading(true);
    const result = await productServices.add(values);
    if (result.isSuccess) {
      message.success(result.message);
      setLoading(false);
      setOpenModal(false);
      setAgainFetch(true);
    } else {
      message.error(result.message);
      setLoading(false);
    }
  };

  const UpdateProduct = async (values) => {
    setLoading(true);

    const result = await productServices.update(values);
    if (result.isSuccess) {
      message.success(result.message);
      setLoading(false);
      setOpenModal(false);
      setAgainFetch(true);
    } else {
      message.error(result.message);
      setLoading(false);
    }
  };

  const UpdateProductAttachment = async (values) => {
    setLoading(true);
    const result = await productServices.updateProductAttachment(values);
    if (result.isSuccess) {
      message.success(result.message);
      setLoading(false);
      setOpenModal(false);
      setAgainFetch(true);
    } else {
      message.error(result.message);
      setLoading(false);
    }
  };


  
  const ImportExcelFun = async (data) => {
    setLoading(true);

    let bodyFormData = new FormData();

    bodyFormData.append("file", data.file.fileList[0]?.originFileObj);

    const result = await productServices.importPriceListWithExcel(bodyFormData);
    if (result.isSuccess) {
      message.success(result.message);
      notification.success({
        message: `تعداد رکورد های بروزرسانی شده: ${result.data}`,
        placement: 'topRight',
        duration: 0
      });
      setLoading(false);
      setOpenModal(false);
      setAgainFetch(true);
    } else {
      setLoading(false);
      message.error(result.message);
    }
  };

  const DeleteProduct = async (id) => {
    setLoading(true);
    const result = await productServices.delete(id);
    if (result.isSuccess) {
      message.success(result.message);
      setLoading(false);
      setOpenModal(false);
      setAgainFetch(true);
    } else {
      message.error(result.message);
      setLoading(false);
    }
  };

  const sizeModal = (typeAction) => {
    if (typeAction === "delete") {
      return 300;
    }
    if (typeAction === "articleProduct") {
      return 900;
    }
    if (typeAction === "videoProduct") {
      return 900;
    }
    if (typeAction === "similarProduct") {
      return 900;
    }
    if (typeAction === "financial") {
      return 900;
    } else {
      return 1300;
    }
  };

  const expandedRowRender = (record) => {
    return (
      <>
        <Row>
          <Col xs={24} sm={12} md={24} className="mb-20 mt-20">
            <Alert
              showIcon
              message={`${intl.formatMessage({ id: "remark" })}`}
              description={
                <div
                  dangerouslySetInnerHTML={{ __html: record?.remark }}
                  name="description"
                ></div>
              }
              type="info"
            />
          </Col>
        </Row>
        <Row>
          {record?.productAttachments?.length > 0 ? (
            <Col xs={11} sm={11} md={11} style={{ margin: "0 1%" }}>
              <GenrateLinkUploader
                items={record?.productAttachments}
                label={intl.formatMessage({
                  id: "uploadedFiles",
                })}
              />
            </Col>
          ) : null}
        </Row>
      </>
    );
  };

  const handleOpenNewTab = (type, row) => {
    history.push({
      pathname: "/admin/catalog/delivery-product",
      state: {
        productId: row.id,
        typeAction: "new",
      },
    });
  };

  return (
    <PageContainer title={`${intl.formatMessage({ id: "products" })}`}>
      <CPCard bodyStyle={{ padding: 10 }}>
        <AdvanceTable
          filters={FiltersInit()}
          columnsTable={TableInit({
            onChangeAction: handleOpenModal,
            onChangeFile: handleOpenModal,
            onChangeArticleProduct: handleOpenModal,
            onChangeVideoProduct: handleOpenModal,
            onChangeSimilarProduct: handleOpenModal,
            onChangeFinancialProduct: handleOpenModal,
            onChangeFinancialProductList: handleOpenModal,
            onChangeDeliveryProduct: handleOpenNewTab,
            deleteProduct: DeleteProduct,
            parentLoading: loading,
          })}
          apiBuilder={productServices.getAll}
          toolbar={ToolbarInit({
            onClickAdd: handleOpenModal,
            onClickDownload: excelDownload,
            onClickImportExcel: handleOpenModal,

          })}
          rowKey="id"
          expandedRowRender={expandedRowRender}
          againFetch={againFetch}
          setAgainFetch={setAgainFetch}
        />
      </CPCard>
      <CPModal
        title={renderTitleModal(typeAction)}
        visible={openModal}
        closable
        onCancel={() => setOpenModal(false)}
        footer={null}
        width={sizeModal(typeAction)}
      >
        {renderModalComponent(typeAction)}
      </CPModal>
    </PageContainer>
  );
};

export default Product;
