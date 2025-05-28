import React, { useState } from "react";
// API

import { videoServices } from "services/media/videoServices";

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

const Video = () => {
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
            onSubmit={CreateVideo}
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
            onSubmit={UpdateVideo}
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



  const CreateVideo = async (values) => {
    setLoading(true);
    const result = await videoServices.add(values);
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

  const UpdateVideo = async (values) => {
    setLoading(true);
    const result = await videoServices.update(values);
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

  const DeleteVideo = async (id) => {
    setLoading(true);
    const result = await videoServices.delete(id);
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


  const expandedRowRender = (record) => {

    return (
      <>
        <Row>
          <Col xs={24} sm={12} md={24} className="mb-20 mt-20">
            <Alert showIcon message={`${intl.formatMessage({ id: "remark", })}`+`: ${record.remark}`} type="info" />
          </Col>
        </Row>
      </>
    )
  };

  return (
    <PageContainer title={`${intl.formatMessage({ id: "videos" })}`}>
      <CPCard bodyStyle={{ padding: 10 }}>
        <AdvanceTable
          filters={FiltersInit()}
          columnsTable={TableInit({
            onChangeAction: handleOpenModal,
            deleteVideo: DeleteVideo,
            parentLoading: loading,
          })}
          apiBuilder={videoServices.getAll}
          toolbar={ToolbarInit({
            onClickAdd: handleOpenModal,
            onClickDownload: () => console.log("----"),
          })}
          rowKey="id"
          expandedRowRender={expandedRowRender}
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

export default Video;
