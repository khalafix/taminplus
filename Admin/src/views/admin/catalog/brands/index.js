import React, { useState } from "react";
// API

import { brandServices } from "services/catalog/brandServices";

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

const Brands = () => {
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
            onSubmit={CreateBrand}
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
            onSubmit={UpdateBrand}
            typeAction={typeAction}
          />
        );
    }
  };

  const renderTitleModal = (type) => {
    switch (type) {
      case "add":
        return intl.formatMessage({ id: "add" }) + ' ' + intl.formatMessage({ id: "brand" });
      case "edit":
        return intl.formatMessage({ id: "edit" }) + ' ' + intl.formatMessage({ id: "brand" });
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

  const CreateBrand = async (data) => {
    setLoading(true);

    const result = await brandServices.add(data);
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

  const UpdateBrand = async (data) => {
    setLoading(true);

    const result = await brandServices.update(data);
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

  const DeleteBrand = async (id) => {
    setLoading(true);
    const result = await brandServices.delete(id);
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

  const expandedRowRender = (record) => {

    return (
      <>
        <Row>
          <Col xs={24} sm={12} md={24} className="mb-20 mt-20">
            <Alert showIcon message={`${intl.formatMessage({ id: "remark", })}`  } 
             description={ <CPEditor rows={15} withOutForm={false} hasBorder={false}  readonly={true} initialValue={record?.description} name="description">
            </CPEditor>} type="info" />
          </Col>
        </Row>
        <Row>
          {
            record?.file?.length > 0 ?
              <Col xs={11} sm={11} md={11} style={{ margin: '0 1%' }}>
                <GenrateLinkUploader
                  items={
                    record?.file
                  }
                  label={intl.formatMessage({
                    id: "uploadedFiles",
                  })}
                />
              </Col>
              : null
          }

        </Row>
      </>
    )



  };

  return (
    <PageContainer title={`${intl.formatMessage({ id: "brands" })}`}>
      <CPCard bodyStyle={{ padding: 10 }}>
        <AdvanceTable
          filters={FiltersInit()}
          columnsTable={TableInit({
            onChangeAction: handleOpenModal,
            deleteFeature: DeleteBrand,
            parentLoading: loading,
          })}
          rowKey="id"
          // expandedRowRender={expandedRowRender}
          apiBuilder={brandServices.getAll}
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

export default Brands;
