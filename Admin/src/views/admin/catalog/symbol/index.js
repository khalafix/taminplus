import React, { useState } from "react";
// API

import { symbolServices } from "services/catalog/symbolServices";

// // UI Components
import { message } from "antd";
import { CPModal, CPCard } from "components/CP";
import AdvanceTable from "components/AdvanceTable";
import ToolbarInit from "./initial/ToolbarInit";
import FiltersInit from "./initial/FiltersInit";
import TableInit from "./initial/TableInit";
import AddorEdit from "./components/AddorEdit";

// // Message
import { useIntl } from "react-intl";

// // Handle Error
import PageContainer from "components/PageContainer/PageContainer";

const Symbol = () => {
  const intl = useIntl();
  const [loading, setLoading] = useState(false);
  const [typeAction, setTypeAction] = useState("add");
  const [openModal, setOpenModal] = useState(false);
  const [currentRow, setCurrentRow] = useState({});
  const [againFetch, setAgainFetch] = useState(false);



  const onCloseModal = () => {
    setOpenModal(false);
  };

  const renderModalComponent = (type) => {
    switch (type) {
      case "add":
        return (
          <AddorEdit
            onCloseModal={onCloseModal}
            onSubmit={CreateSymbol}
            parentLoading={loading}
            currentData={currentRow}
            typeAction={typeAction}
          />
        );
      case "edit":
        return (
          <AddorEdit
            onCloseModal={onCloseModal}
            onSubmit={UpdateSymbol}
            parentLoading={loading}
            currentData={currentRow}
            typeAction={typeAction}
          />
        );
    }
  };

  const renderTitleModal = (type) => {
    switch (type) {
      case "add":
        return intl.formatMessage({ id: "add" })+' '+intl.formatMessage({id:"symbol"});
      case "edit":
        return intl.formatMessage({ id: "edit" })+' '+intl.formatMessage({id:"symbol"});
      case "delete":
        return intl.formatMessage({ id: "delete" });

      default:
        return "";
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

  const CreateSymbol = async (data) => {
    setLoading(true);
    
    data.isActive=data.status;
    const result = await symbolServices.add(data);
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

  const UpdateSymbol = async (data) => {
    setLoading(true);
    
    data.isActive=data.status;
    const result = await symbolServices.update(data);
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

  const DeleteSymbol = async (id) => {
    setLoading(true);
    const result = await symbolServices.delete(id);
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

  
  const sizeModal = (typeAction) => {
    if (typeAction === "delete" || typeAction === "reset-password") {
      return 300;
    } else {
      return 800;
    }
  };

 return(
  <PageContainer title={`${intl.formatMessage({ id: "symbol" })}`}>
   <CPCard bodyStyle={{ padding: 10 }}>
        <AdvanceTable
          filters={FiltersInit()}
          columnsTable={TableInit({
             onClickEdit: handleOpenModal,
            onClickDelete: DeleteSymbol,
            parentLoading: loading,
          })}
          apiBuilder={symbolServices.getAll}
          toolbar={ToolbarInit({
            onClickAdd: handleOpenModal,
            // onClickDownload: () => console.log("----"),
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
 )
};

export default Symbol;
