import React, { useState } from "react";
// API

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
import { pageServices } from "services/base-Info/pageServices";
import { socialMediaServices } from "services/base-Info/socialMediaServices";
import { cooperationFormServices } from "services/support/cooperationFormServices";
import { contactFormServices } from "services/support/contactFormServices";

const ContactUs = () => {
  const intl = useIntl();
  const [loading, setLoading] = useState(false);
  const [typeAction, setTypeAction] = useState("add");
  const [openModal, setOpenModal] = useState(false);
  const [currentRow, setCurrentRow] = useState({});
  const [againFetch, setAgainFetch] = useState(false);

  const onCloseModal = () => {
    setOpenModal(false);
    setAgainFetch(true);
  };
  const renderModalComponent = (type) => {

    return (
      <AddorEdit
        currentData={currentRow}
        onCloseModal={onCloseModal}
        parentLoading={loading}
        typeAction={typeAction}
      />
    );

  };

  const renderTitleModal = () => {
    return intl.formatMessage({ id: "details" });


  };

  const handleOpenModal = (row) => {

    setCurrentRow(row);
    setOpenModal(true);


  };



  const sizeModal = (typeAction) => {
    if (typeAction === "delete") {
      return 300;
    } else {
      return 1000;
    }
  };




  return (
    <PageContainer title={`${intl.formatMessage({ id: "contactUs" })}`}>
      <CPCard bodyStyle={{ padding: 10 }}>
        <AdvanceTable
          filters={FiltersInit()}
          columnsTable={TableInit({
            onChangeAction: handleOpenModal,
            parentLoading: loading,
          })}
          apiBuilder={contactFormServices.getAll}
   
          rowKey="id"
          againFetch={againFetch}
          setAgainFetch={setAgainFetch}
        />
      </CPCard>
      <CPModal
        title={renderTitleModal(typeAction)}
        visible={openModal}
        closable
        onCancel={() => onCloseModal()}
        footer={null}
        width={sizeModal(typeAction)}
      >
        {renderModalComponent(typeAction)}
      </CPModal>
    </PageContainer>
  );
};

export default ContactUs;
