import React, { useState } from "react";
// API

import { productServices } from "services/catalog/productServices";

// // UI Components
import { message } from "antd";
import { CPModal, CPCard } from "components/CP";
import AdvanceTable from "components/AdvanceTable";
import ToolbarInit from "./initial/ToolbarInit";
import FiltersInit from "./initial/FiltersInit";
import TableInit from "./initial/TableInit";

// // Message
import { useIntl } from "react-intl";

// // Handle Error
import PageContainer from "components/PageContainer/PageContainer";
import { downloadFile } from "utils/helpers";

const UserLogSearch = () => {
  const intl = useIntl();
  const [loading, setLoading] = useState(false);
  const [typeAction, setTypeAction] = useState("add");
  const [openModal, setOpenModal] = useState(false);
  const [currentRow, setCurrentRow] = useState({});
  const [againFetch, setAgainFetch] = useState(false);

  const excelDownload = async () => {
    var result = await productServices.exportToExcelForUserLogSearch();
    downloadFile(result);
  };

 return(
  <PageContainer title={`${intl.formatMessage({ id: "userlogSearch" })}`}>
   <CPCard bodyStyle={{ padding: 10 }}>
        <AdvanceTable
          filters={FiltersInit()}
          columnsTable={TableInit({

            parentLoading: loading,
          })}
          apiBuilder={productServices.getListUserLogSearchForProduct}
          toolbar={ToolbarInit({
            onClickDownload:excelDownload
            // onClickDownload: () => console.log("----"),
          })}
          againFetch={againFetch}
          setAgainFetch={setAgainFetch}
        />
      </CPCard>

   </PageContainer>
 )
};

export default UserLogSearch;
