import React, { useState } from "react";
// API

import { videoCategoryServices } from "services/media/videoCategoryServices";

// UI Components
import { message } from "antd";
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

const ArticleCategory = () => {
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
            onSubmit={CreateVideoCategory}
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
            onSubmit={UpdateVideoCategory}
            typeAction={typeAction}
          />
        );
    }
  };

  const renderTitleModal = (type) => {
    switch (type) {
      case "add":
        return intl.formatMessage({ id: "add" })+' '+intl.formatMessage({id:"videoCategory"});
      case "edit":
        return intl.formatMessage({ id: "edit" })+' '+intl.formatMessage({id:"videoCategory"});
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

  const CreateVideoCategory = async (data) => {
    setLoading(true);

    data.isActive = data.status;
    const result = await videoCategoryServices.add(data);
    if (result.isSuccess) {
      message.success(result.message);
      setLoading(false);
      setOpenModal(false);
      setAgainFetch(true);
    }
    else {
      message.error(result.message);
      setLoading(false);
    }
  };

  const UpdateVideoCategory = async (data) => {
    setLoading(true);

    data.isActive = data.status;
    const result = await videoCategoryServices.update(data);
    if (result.isSuccess) {
      message.success(result.message);
      setLoading(false);
      setOpenModal(false);
      setAgainFetch(true);
    }
    else{
      message.error(result.message);
      setLoading(false);
    }
  };

  const DeleteVideoCategory = async (id) => {
    setLoading(true);
    const result = await videoCategoryServices.delete(id);
    if (result.isSuccess) {
      message.success(result.message);
      setLoading(false);
      setOpenModal(false);
      setAgainFetch(true);
    } 
    else{
      message.error(result.message);
      setLoading(false);
    }
  };

  const sizeModal = (typeAction) => {
    if (typeAction === "delete" ) {
      return 300;
    } else {
      return 800;
    }
  };

  return (
    <PageContainer title={`${intl.formatMessage({ id: "videoCategory" })}`}>
      <CPCard bodyStyle={{ padding: 10 }}>
        <AdvanceTable
          filters={FiltersInit()}
          columnsTable={TableInit({
            onChangeAction: handleOpenModal,
            deleteVideoCategory: DeleteVideoCategory,
            parentLoading: loading,
          })}
          apiBuilder={videoCategoryServices.getAll}
          toolbar={ToolbarInit({
            onClickAdd: handleOpenModal,
            onClickDownload: () => console.log("----"),
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

export default ArticleCategory;
