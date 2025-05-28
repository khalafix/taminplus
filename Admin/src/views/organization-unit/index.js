import React, { useState, useEffect } from "react";

// UI
import { message } from "antd";
import { CPCard, CPModal } from "components/CP";
import AdvanceTable from "components/AdvanceTable";
import ToolbarInit from "./initial/ToolbarInit";
import FiltersInit from "./initial/FiltersInit";
import TableInit from "./initial/TableInit";
import AddorEdit from "./components/AddorEdit";

// Api
import { organizationUnitService } from "services/organizationUnitService";

// Message
import { useIntl } from "react-intl";
// Util
import PageContainer from "components/PageContainer/PageContainer";

const Index = () => {
  const intl = useIntl();

  const [typeAction, setTypeAction] = useState("add");
  const [openModal, setOpenModal] = useState(false);
  const [currentData, setCurrentData] = useState({});
  const [loading, setLoading] = useState(false);
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
            onSubmit={CreateProject}
            loading={loading}
            currentData={currentData}
            typeAction={type}
          />
        );
      case "edit":
        return (
          <AddorEdit
            onCloseModal={onCloseModal}
            onSubmit={UpdateProject}
            loading={loading}
            currentData={currentData}
            typeAction={type}
          />
        );
    }
  };

  const renderTitleModal = (type) => {
    switch (type) {
      case "add":
        return intl.formatMessage({ id: "add" });
      case "edit":
        return intl.formatMessage({ id: "edit" });
    }
  };

  const handleOpenModal = (type, row) => {
    switch (type) {
      case "add":
        setTypeAction(type);
        setOpenModal(true);
        setCurrentData({});
        break;
      case "edit":
        setTypeAction(type);
        setCurrentData(row);
        setOpenModal(true);
        break;
    }
  };

  const CreateProject = async (data) => {
    setLoading(true);
    const result = await organizationUnitService.insert(data);
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

  const UpdateProject = async (data) => {
    setLoading(true);
    const result = await organizationUnitService.update(data);
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

  const DeleteProject = async (id) => {
    setLoading(true);
    const result = await organizationUnitService.delete(id);
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

  return (
    <PageContainer
      title={`${intl.formatMessage({ id: "organizationUnitManagement" })}`}
    >
      <CPCard>
        <AdvanceTable
          filters={FiltersInit()}
          columnsTable={TableInit({
            onChangeAction: handleOpenModal,
            onDelete: DeleteProject,
            loading,
          })}
          apiBuilder={organizationUnitService.getAll}
          toolbar={ToolbarInit({
            onClickAdd: handleOpenModal,
            onClickDownload: () => console.log("__"),
          })}
          againFetch={againFetch}
          setAgainFetch={setAgainFetch}
          rowKey="id"
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

export default React.memo(Index);
