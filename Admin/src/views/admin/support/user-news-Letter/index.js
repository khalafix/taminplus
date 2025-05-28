import React, { useState } from "react";
// API

// UI Components
import { message, Alert, Col, Row } from "antd";
import { CPModal, CPCard, CPEditor } from "components/CP";
import AdvanceTable from "components/AdvanceTable";
import ToolbarInit from "./initial/ToolbarInit";
import FiltersInit from "./initial/FiltersInit";
import TableInit from "./initial/TableInit";

// Message
import { useIntl } from "react-intl";

// Handle Error
import PageContainer from "components/PageContainer/PageContainer";
import { pageServices } from "services/base-Info/pageServices";
import { socialMediaServices } from "services/base-Info/socialMediaServices";
import { cooperationFormServices } from "services/support/cooperationFormServices";
import { contactFormServices } from "services/support/contactFormServices";
import { newsLetterServices } from "services/base-Info/newsLetterServices";

const ContactUs = () => {
  const intl = useIntl();
  const [loading, setLoading] = useState(false);
  const [typeAction, setTypeAction] = useState("add");
  const [openModal, setOpenModal] = useState(false);
  const [currentRow, setCurrentRow] = useState({});
  const [againFetch, setAgainFetch] = useState(false);





  return (
    <PageContainer title={`${intl.formatMessage({ id: "userNewsletter" })}`}>
      <CPCard bodyStyle={{ padding: 10 }}>
        <AdvanceTable
          filters={FiltersInit()}
          columnsTable={TableInit({
            parentLoading: loading,
          })}
          apiBuilder={newsLetterServices.getUserRegisterNewsLetter}
   
          rowKey="id"
          againFetch={againFetch}
          setAgainFetch={setAgainFetch}
        />
      </CPCard>

    </PageContainer>
  );
};

export default ContactUs;
