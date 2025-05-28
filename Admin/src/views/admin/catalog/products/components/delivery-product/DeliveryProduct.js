import React, { useState , useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";

// API

import { productServices } from "services/catalog/productServices";

// UI Components
import { message, Alert, Col, Row } from "antd";
import { CPModal, CPCard, CPEditor } from "components/CP";
import AdvanceTable from "components/AdvanceTable";
import ToolbarInit from "./initial/ToolbarInit";
import FiltersInit from "./initial/FiltersInit";
import TableInit from "./initial/TableInit";
import AddorEdit from "./components/AddorEdit";

// Message
import { useIntl } from "react-intl";

// Handle Error
import PageContainer from "components/PageContainer/PageContainer";


const DeliveryProduct = () => {
  const intl = useIntl();
  const [loading, setLoading] = useState(false);
  const [typeAction, setTypeAction] = useState("add");
  const [openModal, setOpenModal] = useState(false);
  const [currentRow, setCurrentRow] = useState({});
  const [againFetch, setAgainFetch] = useState(false);
  const [productId, setProductId] = useState();

  const location = useLocation();

  const onCloseModal = () => {
    setOpenModal(false);
  };



  const renderModalComponent = (type) => {
    switch (type) {
      case "add":
        return (
          <AddorEdit
            onCloseModal={onCloseModal}
            onSubmit={CreateDeliveryProduct}
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
            onSubmit={UpdateDeliveryProduct}
            typeAction={typeAction}
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

    }
  };

  const handleOpenModal = (type, row) => {

    switch (type) {
      case "add":
        setTypeAction(type);
        setOpenModal(true);
        break;
      case "edit":
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




  const CreateDeliveryProduct = async (values) => {
    setLoading(true);
    values.productId = location?.state?.productId;

    switch (values.countType) {
      case 1:
        values.smallerEqual = 0;
        values.greaterEqual = 0;
        break;

      case 2:
        values.count = 0;
        break;
    }
    const result = await productServices.addDeliveryProduct(values);
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

  const UpdateDeliveryProduct = async (values) => {
    setLoading(true);
    values.productId = location.state?.productId;
    const result = await productServices.updateDeliveryProduct(values);
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




  const DeleteDeliveryProduct = async (id) => {
    setLoading(true);
    const result = await productServices.deleteDeliveryProduct(id);
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

    else {
      return 1300;
    }


  }



  return (
    <PageContainer title={`${intl.formatMessage({ id: "deliveryProduct" })}`}>
      <CPCard bodyStyle={{ padding: 10 }}>
        <AdvanceTable
          filters={FiltersInit()}
          columnsTable={TableInit({
            onChangeAction: handleOpenModal,
            deleteDeliveryProduct: DeleteDeliveryProduct,
            parentLoading: loading,
          })}

          expandedRowRender={record => <div>
            <p style={{ margin: 0 }}>{
              record.remark  ?
                <Alert showIcon message={intl.formatMessage({ id: "remark" }) + " : "
                  + record.remark} type="info" />
                :
                <Alert showIcon message={`${intl.formatMessage({ id: "noMessage", })}`} type="warning" />
            }</p></div>}

          initialFilters={{ productId:  location?.state?.productId  }}
          apiBuilder={productServices.getDeliveryProduct}
          toolbar={ToolbarInit({
            onClickAdd: handleOpenModal,
            onClickDownload: () => console.log("----"),
          })}
          rowKey="id"
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

export default DeliveryProduct;
