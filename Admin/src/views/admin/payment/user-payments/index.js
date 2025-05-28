import React, { useState, useEffect } from "react";
import { useLocation, useHistory } from "react-router-dom";
// API
// import { companyRequestServices } from "services/companyRequestServices";
import { Alert } from "antd";

// UI Components
import AdvanceTable from "components/AdvanceTable";
import TableInit from "./initial/TableInit";

// Message
import { useIntl } from "react-intl";
import { CPCard } from "components/CP";
import { userPaymentServices } from "services/payment/userPaymentServices";
import PageContainer from "components/PageContainer/PageContainer";
import FiltersInit from "./initial/FiltersInit";

const UserPayments = ({}) => {
  const intl = useIntl();
  const history = useHistory();
  const location = useLocation();
  const [currentRow, setCurrentRow] = useState({});
  const [againFetch, setAgainFetch] = useState(false);

  const onShowDetails = (row) => {
    history.push({
      pathname: "/admin/person/person-details",
      state: {
        id: row.id,
      },
    });
  };

  return (
    <>
      <PageContainer title={`${intl.formatMessage({ id: "userPayments" })}`}>
        <CPCard bodyStyle={{ padding: 10 }}>
          <>
            <AdvanceTable
              filters={FiltersInit()}
              expandedRowRender={(record) => <p>
                
                <Alert showIcon message={ record.bankConfirmResult} type="info" /> 
                 </p>}
              columnsTable={TableInit({
                onShowDetails: onShowDetails,
              })}
              apiBuilder={userPaymentServices.getUserAllPayments}
              rowKey="token"
              againFetch={againFetch}
              setAgainFetch={setAgainFetch}
            />
          </>
        </CPCard>
      </PageContainer>
    </>
  );
};

export default UserPayments;
