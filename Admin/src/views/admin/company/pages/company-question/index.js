import React, { useState,useEffect } from "react";
import { useLocation , useHistory} from "react-router-dom";
// API

import { companyQuestionServices } from "services/companyQuestionServices";

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

const CompanyQuestion = () => {
  const intl = useIntl();
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [typeAction, setTypeAction] = useState("add");
  const [openModal, setOpenModal] = useState(false);
  const [currentRow, setCurrentRow] = useState({});
  const [againFetch, setAgainFetch] = useState(false);
  const history = useHistory();

  const onCloseModal = () => {
    setOpenModal(false);
  };
  const renderModalComponent = (type) => {
    switch (type) {
      case "edit":
        return (
          <AddorEdit
            onCloseModal={onCloseModal}
            onSubmit={CreateCompanyQuestion}
            loading={loading}
            currentData={currentRow}
            typeAction={typeAction}
            handleDeleteAnswer={DeleteAnswer}
          />
        );
    }
  };

  const renderTitleModal = (type) => {
    switch (type) {
      case "add":
        return intl.formatMessage({ id: "add" });
      case "edit":
        return intl.formatMessage({ id: "answer" });
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

  const CreateCompanyQuestion = async (data) => {
    setLoading(true);

    data.isActive = data.status;
    const result = await companyQuestionServices.add(data);
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

  const DeleteAnswer = async (id) => {
    setLoading(true);
    const result = await companyQuestionServices.delete(id);
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

  useEffect(() => {

    return()=>{
      
      if(location.state?.companyQuestionStatus){
        history?.replace({
          pathname: '/admin/company/company-question',
          state: {}
      });
      }
    }
  }, []);

  return (
    <PageContainer
      title={`${intl.formatMessage({ id: "listCompanyQuestion" })}`}
    >
      <CPCard bodyStyle={{ padding: 10 }}>
        <AdvanceTable
          filters={FiltersInit()}
          initialFilters={{companyQuestionStatus:location.state?.companyQuestionStatus}}

          columnsTable={TableInit({
            onChangeAction: handleOpenModal,

            parentLoading: loading,
          })}
          apiBuilder={companyQuestionServices.getAll}
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
        width={"60%"}
      >
        {renderModalComponent(typeAction)}
      </CPModal>
    </PageContainer>
  );
};

export default CompanyQuestion;
