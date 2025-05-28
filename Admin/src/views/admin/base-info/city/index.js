import React, { useState } from "react";
// API

import { cityServices } from "services/base-Info/cityServices";

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

const City = () => {
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
    switch (type) {
      case "add":
        return (
          <AddorEdit
            onCloseModal={onCloseModal}
            onSubmit={CreateCity}
            loading={loading}
            currentData={currentRow}
            typeAction={typeAction}
          />
        );
      case "edit":
        return (
          <AddorEdit
            currentData={currentRow}
            onCloseModal={onCloseModal}
            loading={loading}
            onSubmit={UpdateCity}
            typeAction={typeAction}
          />
        );
    }
  };

  const renderTitleModal = (type) => {
    switch (type) {
      case "add":
        return intl.formatMessage({ id: "add" }) + ' ' + intl.formatMessage({ id: "city" });
      case "edit":
        return intl.formatMessage({ id: "edit" }) + ' ' + intl.formatMessage({ id: "city" });
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

  const CreateCity = async (data) => {
    setLoading(true);

    data.isActive = data.status;
    const result = await cityServices.add(data);
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

  const UpdateCity = async (data) => {
    setLoading(true);

    data.isActive = data.status;
    const result = await cityServices.update(data);
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

  const DeleteCity = async (id) => {
    setLoading(true);
    const result = await cityServices.delete(id);
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
    if (typeAction === "delete" || typeAction === "reset-password") {
      return 300;
    } else {
      return 800;
    }
  };

  return (
    <PageContainer title={`${intl.formatMessage({ id: "city" })}`}>
      <CPCard bodyStyle={{ padding: 10 }}>
        <AdvanceTable
          filters={FiltersInit()}
          columnsTable={TableInit({
            onChangeAction: handleOpenModal,
            deleteFeature: DeleteCity,
            parentLoading: loading,
          })}
          apiBuilder={cityServices.getAll}
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

export default City;
