import React, { useState } from "react";

// UI Components
import { Alert, message } from "antd";
import { CPModal, CPCard } from "components/CP";
import AdvanceTable from "components/AdvanceTable";
import ToolbarInit from "./initial/ToolbarInit";
import FiltersInit from "./initial/FiltersInit";
import TableInit from "./initial/TableInit";

// Message
import { useIntl } from "react-intl";

// Handle Error
import PageContainer from "components/PageContainer/PageContainer";
import { smsServices } from "services/sms/smsServices";

const UserSms = () => {
  const intl = useIntl();
  const [loading, setLoading] = useState(false);
  const [typeAction, setTypeAction] = useState("add");
  const [openModal, setOpenModal] = useState(false);
  const [currentRow, setCurrentRow] = useState({});
  const [againFetch, setAgainFetch] = useState(false);




  return (
    <PageContainer title={`${intl.formatMessage({ id: "smsPanel" })}`}>
      <CPCard bodyStyle={{ padding: 10 }}>
        <AdvanceTable
          filters={FiltersInit()}
          columnsTable={TableInit({
            parentLoading: loading,
          })}
          apiBuilder={smsServices.getList}
          toolbar={ToolbarInit({
            onClickDownload: () => console.log("----"),
          })}
          rowKey={"id"}
          expandedRowRender={(record) => <p>
            <Alert showIcon message={record.message} type="info" />
          </p>}
          againFetch={againFetch}
          setAgainFetch={setAgainFetch}
        />
      </CPCard>

    </PageContainer>
  );
};

export default UserSms;
