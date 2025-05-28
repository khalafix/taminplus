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

import { letMeKnowsServices } from "services/support/letMeKnowsServices";
import { downloadFile } from "utils/helpers";

const ContactUs = () => {
  const intl = useIntl();
  const [loading, setLoading] = useState(false);
  const [typeAction, setTypeAction] = useState("add");
  const [openModal, setOpenModal] = useState(false);
  const [currentRow, setCurrentRow] = useState({});
  const [againFetch, setAgainFetch] = useState(false);



  const excelDownload = async () => {
    var result = await letMeKnowsServices.exportToExcel();
    downloadFile(result);
  };

  return (
    <PageContainer title={`${intl.formatMessage({ id: "userLetMeKnow" })}`}>
      <CPCard bodyStyle={{ padding: 10 }}>
        <AdvanceTable
          filters={FiltersInit()}
          columnsTable={TableInit({
            parentLoading: loading,
          })}
          apiBuilder={letMeKnowsServices.getAll}
          toolbar={ToolbarInit({
            onClickDownload: excelDownload,
          })}
          rowKey="id"
          againFetch={againFetch}
          setAgainFetch={setAgainFetch}
        />
      </CPCard>

    </PageContainer>
  );
};

export default ContactUs;
