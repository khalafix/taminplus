import React, { useState } from "react";
import { useHistory, useLocation } from "react-router-dom";

// API

import { orderServices } from "services/catalog/orderServices";

// UI Components
import { message, Alert ,Col ,Row} from "antd";
import { CPModal, CPCard , CPEditor } from "components/CP";
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
import { downloadFile } from "utils/helpers";

const Orders = () => {
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
      // case "add":
      //   return (
      //     <AddorEdit
      //       onCloseModal={onCloseModal}
      //       onSubmit={Create}
      //       parentLoading={loading}
      //       currentData={currentRow}
      //       typeAction={typeAction}
      //     />
      //   );
      case "edit":
        return (
          <AddorEdit
            currentData={currentRow}
            onCloseModal={onCloseModal}
            parentLoading={loading}
            onSubmit={Update}
            typeAction={typeAction}
          />
        );
    }
  };

  const renderTitleModal = (type) => {
    switch (type) {
      // case "add":
      //   return intl.formatMessage({ id: "add" }) ;;
      case "edit":
        return intl.formatMessage({ id: "edit" }) ;
      // case "delete":
      //   return intl.formatMessage({ id: "delete" });

  
    }
  };

  const excelDownload = async () => {
    var result = await orderServices.exportToExcel();
    downloadFile(result);
  };


  const handleOpenModal = (type, row) => {
    switch (type) {
      // case "add":
      //   setTypeAction(type);
      //   setOpenModal(true);
      //   break;
      case "edit":
        setTypeAction(type);
        setCurrentRow(row);
        setOpenModal(true);
        break;
      // case "delete":
      //   setTypeAction(type);
      //   setCurrentRow(row);
      //   setOpenModal(true);
      //   break;
    }
  };

  // const Create = async (data) => {
  //   setLoading(true);

  //   const result = await orderServices.add(data);
  //   if (result.isSuccess) {
  //     message.success(result.message);
  //     setLoading(false);
  //     setOpenModal(false);
  //     setAgainFetch(true);
  //   } else {
  //     message.error(result.message);
  //     setLoading(false);
  //   }
  // };

  const Update = async (data) => {
    setLoading(true);

    const result = await orderServices.update(data);
    if (result.isSuccess) {
      message.success(result.message);
      setLoading(false);
      setOpenModal(false);
      setAgainFetch(true);
    } else {
      setLoading(false);
      message.error(result.message);
    }
  };

  // const Delete = async (id) => {
  //   setLoading(true);
  //   const result = await orderServices.delete(id);
  //   if (result.isSuccess) {
  //     message.success(result.message);
  //     setLoading(false);
  //     setOpenModal(false);
  //     setAgainFetch(true);
  //   } else {
  //     setLoading(false);
  //     message.error(result.message);
  //   }
  // };


  const handleOpenNewTab = (type, row) => {

    history.push({
      pathname: "/admin/catalog/order-details",
      state: {
        id: row.id,
      },
    });

  };


  const sizeModal = (typeAction) => {
    if (typeAction === "delete") {
      return 300;
    } else {
      return 1000;
    }
  };



  return (
    <PageContainer title={`${intl.formatMessage({ id: "customerOrder" })}`}>
      <CPCard bodyStyle={{ padding: 10 }}>
        <AdvanceTable
          filters={FiltersInit()}
          columnsTable={TableInit({
            // onChangeAction: handleOpenModal
            onChangeAction: handleOpenNewTab,
            parentLoading: loading,
            // deleteItem:Delete
          })}
          rowKey="id"
          // expandedRowRender={expandedRowRender}
          apiBuilder={orderServices.getAll}
          toolbar={ToolbarInit({
            onClickAdd: handleOpenModal,
            onClickDownload:  excelDownload,
          })}
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

export default Orders;
