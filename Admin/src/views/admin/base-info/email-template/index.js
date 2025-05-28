import React, { useState } from "react";
// API

import { emailTemplateService } from "services/base-Info/emailTemplateService";

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

const EmailTemplate = () => {
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
            onSubmit={CreateEmailTemplate}
            loading={loading}
            currentData={currentRow}
            typeAction={typeAction}
          />
        );
      case "edit":
        return (
          <AddorEdit
            currentData={currentRow}
            onCloseModal={onCloseModal}
            loading={loading}
            onSubmit={UpdateEmailTemplate}
            duplicateEmailRow={DuplicateEmailRow}
            typeAction={typeAction}
          />
        );
    }
  };

  const renderTitleModal = (type) => {
    switch (type) {
      case "add":
        return (
          intl.formatMessage({ id: "add" }) +
          " " +
          intl.formatMessage({ id: "emailTemplate" })
        );
      case "edit":
        return (
          intl.formatMessage({ id: "edit" }) +
          " " +
          intl.formatMessage({ id: "emailTemplate" })
        );
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
      case "reset":
        setCurrentRow(row);
        resetEmailTemplate(row);
        break;
    }
  };

  const resetEmailTemplate = async (row) => {
    setLoading(true);
    
    const result = await emailTemplateService.resetTemplate(row.id);
    if(result.isSuccess)
    {
      message.success(result.message);
      setLoading(false);
    } else {
      message.error(result.message);
      setLoading(false);
    }
  }

  const CreateEmailTemplate = async (data) => {
    setLoading(true);

    const result = await emailTemplateService.add(data);
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

  const UpdateEmailTemplate = async (data) => {
    setLoading(true);

    const result = await emailTemplateService.update(data);
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

  const DuplicateEmailRow = async (data) => {
    setLoading(true);
    const result = await emailTemplateService.add(data);
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

  const DeleteEmailTemplate = async (id) => {
    setLoading(true);
    const result = await emailTemplateService.delete(id);
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
      return 1200;
    }
  };

  return (
    <PageContainer title={`${intl.formatMessage({ id: "listEmail" })}`}>
      <CPCard bodyStyle={{ padding: 10 }}>
        <AdvanceTable
          filters={FiltersInit()}
          columnsTable={TableInit({
            onChangeAction: handleOpenModal,
            deleteFeature: DeleteEmailTemplate,
            parentLoading: loading,
          })}
          apiBuilder={emailTemplateService.getAll}
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

export default EmailTemplate;
