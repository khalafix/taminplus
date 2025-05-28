import React, { useState } from "react";
// API

import { bannerServices } from "services/media/bannerServices";

// UI Components
import { message, Alert ,Col ,Row} from "antd";
import { CPModal, CPCard , CPEditor } from "components/CP";
import AdvanceTable from "components/AdvanceTable";
import ToolbarInit from "./initial/ToolbarInit";
import FiltersInit from "./initial/FiltersInit";
import TableInit from "./initial/TableInit";
import AddorEdit from "./components/AddorEdit";

// Message
import { useIntl } from "react-intl";

// Handle Error
import PageContainer from "components/PageContainer/PageContainer";
import GenrateLinkUploader from "components/GenrateLinkUploader";
import { useMediaQuery } from 'react-responsive';

const Banner = () => {
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
            onSubmit={CreateBanner}
            parentLoading={loading}
            currentData={currentRow}
            typeAction={typeAction}
          />
        );
      case "edit":
        return (
          <AddorEdit
            currentData={currentRow}
            onCloseModal={onCloseModal}
            parentLoading={loading}
            onSubmit={UpdateBanner}
            typeAction={typeAction}
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



  const CreateBanner = async (values) => {
    setLoading(true);
    const result = await bannerServices.add(values);
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

  const UpdateBanner = async (values) => {
    setLoading(true);
    const result = await bannerServices.update(values);
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

  const DeleteBanner = async (id) => {
    setLoading(true);
    const result = await bannerServices.delete(id);
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

  const sizeModal = (typeAction) => {
    if (typeAction === "delete" ) {
      return 300;
    } else {
      return 1000;
    }
  };




  return (
    <PageContainer title={`${intl.formatMessage({ id: "Banner" })}`}>
      <CPCard bodyStyle={{ padding: 10 }}>
        <AdvanceTable
          filters={FiltersInit()}
          columnsTable={TableInit({
            onChangeAction: handleOpenModal,
            deleteBanner: DeleteBanner,
            parentLoading: loading,
          })}
          apiBuilder={bannerServices.getAll}
          toolbar={ToolbarInit({
            onClickAdd: handleOpenModal,
            onClickDownload: () => console.log("----"),
          })}
          rowKey="id"
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

export default Banner;
