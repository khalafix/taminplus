import React, { useState, useEffect } from "react";
// UI
import { Row, Col, Tree, Input, message, Spin } from "antd";
import { CPCard, CPModal } from "components/CP";
import { flattenDeep } from "lodash";
// Components
import AddorEdit from "./components/AddorEdit";
import Permissions from "./components/Permissions";
import PermissionsDashboard from "./components/PermissionsDashboard";
import Delete from "./components/Delete";
import Toolbar from "components/Toolbar";
// Initial
import ToolbarInit from "./initial/ToolbarInit";
import { generateList, getParentKey, dataList } from "./initial/treeInit";

// Message
import { useIntl, FormattedMessage } from "react-intl";

// Api
import { userService } from "services/userService";

const Index = () => {
  const intl = useIntl();
  const [openModal, setOpenModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [roles, setRoles] = useState([]);
  const [expandedKeys, setExpandedKeys] = useState(["1"]);
  const [searchValue, setSearchValue] = useState("");
  const [autoExpandParent, setAutoExpandParent] = useState(true);
  const [typeAction, setTypeAction] = useState(""); // "add" | "edit" | "delete"
  const [currentData, setCurrentData] = useState({});
  const [againFetch, setAgainFetch] = useState(false);
  useEffect(() => {
    if (againFetch) {
      getRoles();
    }
  }, [againFetch]);

  useEffect(() => {
    getRoles();
  }, []);

  const renderTitleModal = (type) => {
    switch (type) {
      case "add":
        return intl.formatMessage({ id: "add" })+' '+intl.formatMessage({id:"organizationChart"});
      case "edit":
        return intl.formatMessage({ id: "edit" })+' '+intl.formatMessage({id:"organizationChart"});
      case "permissions":
        return intl.formatMessage({ id: "managementPermissions" });
      case "permission-dashboards":
        return intl.formatMessage({ id: "permissionDashboards" });
      default:
        return "";
    }
  };

  const CreateRole = async (data) => {
    setLoading(true);
    const result = await userService.addRole(data);
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

  const UpdateRole = async (data) => {
    setLoading(true);
    const result = await userService.updateRole(data);
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

  const DeleteRole = async (id) => {
    setLoading(true);
    const result = await userService.deleteRole(id);
    if (result.isSuccess) {
      message.success(result.message);
      setLoading(false);
      setOpenModal(false);
      setAgainFetch(true);
    } else {
      message.error(result.message);
      setLoading(false);
      setOpenModal(false);
    }
  };

  const UpdatePermissions = async (data) => {
    setLoading(true);
    const result = await userService.updateRolePermissions(data);
    if (result.isSuccess) {
      message.success(result.message);
      setLoading(false);
      setOpenModal(false);
      setAgainFetch(true);
    } else {
      message.error(result.message);
      setLoading(false);
      setOpenModal(false);
    }
  };
  const UpdateDashboards = async (data) => {
    setLoading(true);
    const result = await userService.updateRoleDashboards(data);
    if (result.isSuccess) {
      message.success(result.message);
      setLoading(false);
      setOpenModal(false);
      setAgainFetch(true);
    } else {
      message.error(result.message);
      setLoading(false);
      setOpenModal(false);
    }
  };

  const getRoles = async () => {
    setLoading(true);
    const result = await userService.getRoles();
    if (result.isSuccess) {
      setAgainFetch(false);
      setRoles(result.data);
      generateList(result.data);
      setExpandedKeys(getAllKeys(result.data));
      setLoading(false);
      setOpenModal(false);
    } else {
      message.error(result.message);
      setLoading(false);
    }
  };

  const getAllKeys = (data) => {
    // This function makes an array of keys, this is specific for this example, you would have to adopt for your case. If your list is dynamic, also make sure that you call this function everytime data changes.
    const nestedKeys = data.map((node) => {
      let childKeys = [];
      if (node.children) {
        childKeys = getAllKeys(node.children);
      }
      return [node.key];
    });
    return flattenDeep(nestedKeys);
  };

  const onChange = (e) => {
    const { value } = e.target;
    const expandedKeys = dataList
      .map((item) => {
        if (item.title.indexOf(value) > -1) {
          return getParentKey(item.key, roles);
        }
        return null;
      })
      .filter((item, i, self) => item && self.indexOf(item) === i);

    setExpandedKeys(expandedKeys);
    setSearchValue(value);
    setAutoExpandParent(true);
  };

  const onExpand = (expandedKeys) => {
    setExpandedKeys(expandedKeys);
    setAutoExpandParent(false);
  };

  const onSelect = (selectedKeys, info) => {
    if (selectedKeys.length > 0) {
      setCurrentData({
        key: selectedKeys[0],
        title: info.node.titleView,
        isActive: info.node.isActive,
      });
    } else {
      setCurrentData({});
    }
  };

  const onCloseModal = () => {
    setOpenModal(false);
  };

  const handleOpenModal = (type, row) => {
    if (currentData.key) {
      switch (type) {
        case "add":
          setTypeAction(type);
          setOpenModal(true);
          break;
        case "edit":
          setTypeAction(type);
          setOpenModal(true);
          break;
        case "delete":
          setTypeAction(type);
          setOpenModal(true);
          break;
        case "permissions":
          setTypeAction(type);
          setOpenModal(true);
          break;
        case "permission-dashboards":
          setTypeAction(type);
          setOpenModal(true);
          break;
      }
    } else {
      message.error(
        `${intl.formatMessage({ id: "errorUnSelectMessageRole" })}`
      );
    }
  };

  const renderModalComponent = (type) => {
    switch (type) {
      case "add":
        return (
          <AddorEdit
            onCloseModal={onCloseModal}
            currentData={currentData}
            onSubmit={CreateRole}
            parentLoading={loading}
            typeAction={typeAction}
          />
        );
      case "edit":
        return (
          <AddorEdit
            data={currentData}
            onCloseModal={onCloseModal}
            currentData={currentData}
            onSubmit={UpdateRole}
            parentLoading={loading}
            typeAction={typeAction}
          />
        );

      case "delete":
        return (
          <Delete
            currentData={currentData}
            onCloseModal={onCloseModal}
            onClickDelete={DeleteRole}
            parentLoading={loading}
          />
        );
      case "permissions":
        return (
          <Permissions
            currentData={currentData}
            onCloseModal={onCloseModal}
            onSubmit={UpdatePermissions}
            parentLoading={loading}
          />
        );
      case "permission-dashboards":
        return (
          <PermissionsDashboard
            currentData={currentData}
            onCloseModal={onCloseModal}
            onSubmit={UpdateDashboards}
            parentLoading={loading}
          />
        );
    }
  };

  const renderStatusGroups = (status) => {
    if (status === "ACTIVE") {
      return <span> </span>;
    } else if (status === "DEACTIVATED") {
      return (
        <span className="tree-deactivate">
          <FormattedMessage id="deactivate" />{" "}
        </span>
      );
    } else if (status === "DELETED") {
      return (
        <span className="tree-deleted">
          <FormattedMessage id="delete" />{" "}
        </span>
      );
    }
  };

  const loop = (data) =>
    data?.map((item) => {
      const index = item.title?.indexOf(searchValue);
      const beforeStr = item.title?.substr(0, index);
      const afterStr = item.title?.substr(index + searchValue.length);

      const title =
        index > -1 ? (
          <span>
            {beforeStr}
            <span className="tree-search-value">{searchValue}</span>
            {afterStr} {renderStatusGroups(item.isActive)}
          </span>
        ) : (
          <span>
            {item.title} {renderStatusGroups(item.isActive)}
          </span>
        );
      if (item.children) {
        return {
          title,
          titleView: item.title,
          key: item.key,
          isActive: item.isActive,
          children: loop(item.children),
        };
      }

      return {
        title,
        titleView: item.title,
        key: item.key,
        isActive: item.isActive,
      };
    });

  return (
    <>
      <CPCard bodyStyle={{ padding: 10, minHeight: "600px" }}>
        <Row gutter={[8, 8]}>
          <Col xs={24}>
            <Toolbar
              items={ToolbarInit({
                onClick: handleOpenModal,
                onClickDownload: () => console.log("__"),
              })}
            />
          </Col>
          <Col xs={24}>
            <Input
              style={{ marginBottom: 8 }}
              placeholder={`${intl.formatMessage({ id: "search" })}`}
              onChange={onChange}
            />

            <Spin spinning={loading}>
              <Tree
                size="small"
                showLine
                bordered
                showIcon={true}
                showLeafIcon
                onSelect={onSelect}
                onExpand={onExpand}
                expandedKeys={expandedKeys}
                autoExpandParent={autoExpandParent}
                treeData={loop(roles)}
                /*  draggable
                onDragEnter={onDragEnter}
                onDrop={onDrop} */
                defaultExpandAll={true}
              />
            </Spin>
          </Col>
        </Row>
      </CPCard>
      <CPModal
        title={renderTitleModal(typeAction)}
        visible={openModal}
        closable
        onCancel={() => setOpenModal(false)}
        footer={null}
        width={
          typeAction === "permissions" || typeAction === "permission-dashboards"
            ? "80%"
            : 400
        }
      >
        {renderModalComponent(typeAction)}
      </CPModal>
    </>
  );
};

export default Index;
