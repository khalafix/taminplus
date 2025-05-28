import React, { useState } from "react";
// API

import { userService } from "services/userService";

// UI Components
import { message } from "antd";
import { CPModal, CPCard } from "components/CP";
import AdvanceTable from "components/AdvanceTable";
import ToolbarInit from "./initial/ToolbarInit";
import FiltersInit from "./initial/FiltersInit";
import TableInit from "./initial/TableInit";
import AddorEdit from "./components/AddorEdit";
import ResetPassword from "./components/reset-password";

import { Badge, Table, Space } from "antd";

// Message
import { useIntl } from "react-intl";

// Handle Error
import HandleError from "utils/handleError";
import PageContainer from "components/PageContainer/PageContainer";



const Users = () => {
  const intl = useIntl();
  const [loading, setLoading] = useState(false);
  const [typeAction, setTypeAction] = useState("add"); //  < "add") | "edit" | "reset-password" | ("delete" >
  const [openModal, setOpenModal] = useState(false);
  const [currentRow, setCurrentRow] = useState({});
  const [againFetch, setAgainFetch] = useState(false);


  const sampleColumns = [
    {
      title: `${intl.formatMessage({
        id: "date",
      })}`,
      dataIndex: "date",
      key: "date",
    },
    {
      title: `${intl.formatMessage({
        id: "name",
      })}`,
      dataIndex: "name",
      key: "name",
    },
  ];
  
  const sampleData = [];
  for (let i = 0; i < 3; ++i) {
    sampleData.push({
      key: i,
      date: "2014-12-24 23:12:00",
      name: "This is production name",
      upgradeNum: "Upgraded: 56",
    });
  }


  const onCloseModal = () => {
    setOpenModal(false);
  };
  const renderModalComponent = (type) => {
    switch (type) {
      case "add":
        return (
          <AddorEdit
            onCloseModal={onCloseModal}
            onSubmit={CreateUser}
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
            onSubmit={UpdateUser}
            typeAction={typeAction}
          />
        );
      case "reset-password":
        return (
          <ResetPassword
            currentData={currentRow}
            onCloseModal={onCloseModal}
            loading={loading}
            onSubmit={ResetPasswordUser}
          />
        );
    }
  };

  const renderTitleModal = (type) => {
    switch (type) {
      case "add":
        return intl.formatMessage({ id: "add" })+' '+intl.formatMessage({id:"users"});
      case "edit":
        return intl.formatMessage({ id: "edit" })+' '+intl.formatMessage({id:"users"});
      case "delete":
        return intl.formatMessage({ id: "delete" });
      case "reset-password":
        return intl.formatMessage({ id: "resetPassword" })+' '+intl.formatMessage({id:"users"});
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
      case "reset-password":
        setTypeAction(type);
        setCurrentRow(row);
        setOpenModal(true);
        break;
    }
  };

  const CreateUser = async (data) => {
    setLoading(true);
    const result = await userService.addUser(data);
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

  const UpdateUser = async (data) => {
    setLoading(true);
    const result = await userService.updateUser(data);
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

  const ChangeStatusUser = async (id, body) => {};

  const DeleteUser = async (id) => {
    setLoading(true);
    const result = await userService.deleteUser(id);
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

  const ResetPasswordUser = async (data) => {
    setLoading(true);
    const result = await userService.updatePassword(data);
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
    if (typeAction === "delete" || typeAction === "reset-password") {
      return 300;
    } else {
      return 800;
    }
  };

  return (
    <PageContainer title={`${intl.formatMessage({ id: "users" })}`}>
      <CPCard bodyStyle={{ padding: 10 }}>
        <AdvanceTable
          // isExpandRowGrid={true}
          // expandRowColumns={sampleColumns}
          // expandRowData={sampleData}
          filters={FiltersInit()}
          columnsTable={TableInit({
            onChangeAction: handleOpenModal,
            changeStatusUser: ChangeStatusUser,
            deleteItem: DeleteUser,
            loading,
          })}
          apiBuilder={userService.getUsers}
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

export default Users;
