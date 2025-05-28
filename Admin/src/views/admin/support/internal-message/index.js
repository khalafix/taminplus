import React, { useState } from "react";
// API

// import { currencyService } from "services/base-Info/currencyService";
import { userMessageService } from "services/userMessage/userMessageService";
// UI Components
import { CPModal, CPCard } from "components/CP";
import AdvanceTable from "components/AdvanceTable";
import ToolbarInit from "./initial/ToolbarInit";
import FiltersInit from "./initial/FiltersInit";
import TableInit from "./initial/TableInit";

// Message
import { useIntl } from "react-intl";

// Handle Error
import PageContainer from "components/PageContainer/PageContainer";
import { ShowMessage } from "views/company-views/company-dashboard/company-messages/ShowMessage";

const OutboxInternalMessage = () => {
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
    return(
      <ShowMessage messageData={currentRow.body} />
    )
  };

  const renderTitleModal = (type) => {
    return intl.formatMessage({ id: "show" })+' '+intl.formatMessage({ id: "message" });
  };

  const handleOpenModal = (type, row) => {
    setTypeAction(type);
    setOpenModal(true);
    setCurrentRow(row);
  };

  const sizeModal = (typeAction) => {
    if (typeAction === "delete" || typeAction === "reset-password") {
      return 300;
    } else {
      return 1200;
    }
  };

  return (
    <PageContainer title={`${intl.formatMessage({ id: "outboxInternalMessage" })}`}>
      <CPCard bodyStyle={{ padding: 10 }}>
        <AdvanceTable
          filters={FiltersInit()}
          columnsTable={TableInit({
            onChangeAction: handleOpenModal,
            parentLoading: loading,
          })}
          apiBuilder={userMessageService.getOutbox}
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

export default OutboxInternalMessage;
