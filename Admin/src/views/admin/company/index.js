import React, { useState, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
// import { browserHistory } from "react-router";
import { useDispatch } from "react-redux";
// API
import { companyDataServices } from "services/companyDataServices";
import { companyServices } from "services/companyServices";

// UI Components
import { message, notification } from "antd";
import { CPModal, CPCard } from "components/CP";
import AdvanceTable from "components/AdvanceTable";
import ToolbarInit from "./initial/ToolbarInit";
import ToolbarInitForFilter from "./initial/ToolbarInitForFilter";
import TableInitForFilter from "./initial/TableInitForFilter";

import FiltersInit from "./initial/FiltersInit";
import TableInit from "./initial/TableInit";
import ImportExcel from "./components/ImportExcel"
// Message
import { useIntl } from "react-intl";

// Handle Error
import PageContainer from "components/PageContainer/PageContainer";
import { removeTag } from "redux/reducers/tagView";
import SetCompanyOwner from "./components/SetCompanyOwner";

const Company = () => {
  const intl = useIntl();
  const history = useHistory();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [typeAction, setTypeAction] = useState("add"); //  < "add") | "edit" | "reset-password" | ("delete" >
  const [openModal, setOpenModal] = useState(false);
  const [currentRow, setCurrentRow] = useState({});
  const [againFetch, setAgainFetch] = useState(false);
  const location = useLocation();

  const onCloseModal = () => {
    setOpenModal(false);
  };

  const UpdateCompanyOwner = async (data) => {
    setLoading(true);
    const result = await companyServices.updateCompanyOwner(data);
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

  const renderModalComponent = () => {
    switch (typeAction) {
      case "setCompanyOwner":
        return (
          <SetCompanyOwner
            currentData={currentRow}
            onCloseModal={onCloseModal}
            loading={loading}
            onSubmit={UpdateCompanyOwner}

          />
        );
        break;

      default:
        return (
          <ImportExcel
            currentData={currentRow}
            onCloseModal={onCloseModal}
            loading={loading}
            onSubmit={ImportExcelFun}

          />
        );
        break;
    }

  };

  const renderTitleModal = (type) => {
    switch (type) {
      case "setCompanyOwner":
        return intl.formatMessage({ id: "setCompanyOwner" });
        break;

      default:
        return intl.formatMessage({ id: "importExcel" });
        break;
    }

  };

  const handleOpenNewTab = (type, row) => {
    switch (type) {
      case "add":
        history.push({
          pathname: "/company",
          state: {
            id: 0,
            typeAction: "new",
          },
        });
        break;

      case "edit":
        history.push({
          pathname: "/company",
          state: {
            id: row.id,
            typeAction: "edit",
          },
        });
        break;
    }
  };

  const handleExcelModal = (type) => {
    setTypeAction(type)
    setOpenModal(true);
  };



  const handelModal = (data) => {
    setTypeAction("setCompanyOwner")
    setOpenModal(true);
    setCurrentRow(data)
  };


  const ImportExcelFun = async (data) => {
    setLoading(true);

    let bodyFormData = new FormData();

    bodyFormData.append("file", data.file.fileList[0]?.originFileObj);

    const result = await companyDataServices.uploadFile(bodyFormData);
    if (result.isSuccess) {
      message.success(result.message);
      notification.success({
        message: `Company Inserted Record Count : ${result.data}`,
        placement: 'topRight',
        duration: 0
      });
      setLoading(false);
      setOpenModal(false);
      setAgainFetch(true);
    } else {
      setLoading(false);
      message.error(result.message);
    }
  };


  const DeleteCompany = async (id) => {
    setLoading(true);

    const result = await companyServices.deleteCompany(id);
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
    if (typeAction === "delete") {
      return 300;
    } else {
      return 1000;
    }
  };

  useEffect(() => {

    dispatch(removeTag("company"));
    return () => {

      // if(location.state?.companyType){
      //   history?.replace({
      //     pathname: '/admin/company',
      //     state: {}
      // });
      // }


      // if(location.state?.companyType==0){
      //   history?.replace({
      //     pathname: '/admin/company',
      //     state: {}
      // });
      // }
    }
  }, []);
  const getMoreInformationData = (compnayId) => {
    history.push({
      pathname: "/admin/company/company-details",
      state: {
        id: compnayId,
      },
    }
    )

  }

  return (
    <PageContainer
      title={`${intl.formatMessage({ id: "managementCompanies" })}`}>
      <CPCard bodyStyle={{ padding: 10 }}>
        <AdvanceTable
          filters={FiltersInit()}

          columnsTable={
            (location.state?.companyType !== undefined) ?
              TableInitForFilter({ show: getMoreInformationData })
              : TableInit({
                onChangeAction: handleOpenNewTab,
                loading: loading,
                deleteItem: DeleteCompany,
                show: getMoreInformationData,
                setCompanyOwner: handelModal
              })
          }
          initialFilters={{ companyType: location.state?.companyType, isFilter: location.state?.isFilter ? location.state?.isFilter : 0 }}
          apiBuilder={companyDataServices.getAll}
          toolbar={
            (location.state?.companyType == undefined) ?
              ToolbarInit({ onClickAdd: handleOpenNewTab, onClickExcel: handleExcelModal, hasSate: location.state?.companyType, isFilter: location.state?.isFilter })
              :
              ToolbarInitForFilter({})
          }
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

export default Company;
