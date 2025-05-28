import React, { useState, useEffect } from "react";
import { Layout, Space, message, Avatar, Badge ,Tooltip } from "antd";
import { FiAlignLeft, FiUser, FiAlignRight } from "react-icons/fi";
import { BellOutlined } from "@ant-design/icons";
import { authenticationServices } from "services/authenticationServices";
import {
  RiLockPasswordLine,
  RiLogoutCircleRLine,
  RiProfileLine,
} from "react-icons/ri";
import { MdOutlineContactMail } from "react-icons/md";
import { MdGTranslate } from "react-icons/md";
import ChangePassword from "./components/ChangePassword";
import ChangeEmailSignature from "./components/ChangeEmailSignature";
import Profile from "./components/Profile";
import {
  CPModal,
  CPDropDown,
  CPButton,
  CPDivider,
  CPPopover,
} from "components/CP";

// API
import { userService } from "services/userService";
import { useLocale } from "components/IntelProvider/IntelProvider";
import { FormattedMessage, useIntl } from "react-intl";
import { userMessageService } from "services/userMessage/userMessageService"

const { Header } = Layout;

const Navigation = ({ collapsed, onCollapse }) => {
  const intl = useIntl();
  const { setLocale } = useLocale();
  const [showLangPopOver, setShowLangPopOver] = useState(false);
  const [typeAction, setTypeAction] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [userInfo, setUserInfo] = useState("");
  const [messagee, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const getUserInfo = async () => {
    let user = await authenticationServices.userInfo();
    setUserInfo(user);
  };

  const ontShowLangPopOver = () => setShowLangPopOver(!showLangPopOver);

  const handleMessage = async () => {

    setLoading(true);
    const result = await userMessageService.getList();
    setMessage(result);
  };

  const logoutUser = async () => {
    await authenticationServices.logout();
    setUserInfo("");
  };

  const handleChangeUserDropDown = async (value) => {
    switch (value) {
      case "change_password":
      case "profile":
        setTypeAction(value);
        setOpenModal(true);
        break;
      case "logout":
        logoutUser();
        break;
    }
  };

  const renderModalComponent = (type) => {
    switch (type) {
      case "change_password":
        return (
          <ChangePassword
            loading={loading}
            onCloseModal={() => setOpenModal(false)}
            onSubmit={UpdateChangePasswordUser}
          />
        );
      case "profile":
        return (
          <Profile loading={loading} onCloseModal={() => setOpenModal(false)} />
        );
    }
  };

  const renderTitleModal = (type) => {
    switch (type) {
      case "change_password":
        return intl.formatMessage({ id: "changePassword" });
      case "profile":
        return intl.formatMessage({ id: "profile" });
    }
  };

  const UpdateChangePasswordUser = async (data) => {
    setLoading(true);
    const result = await userService.changePassword(data);
    if (result.isSuccess) {
      message.success(result.message);
      setLoading(false);
      setOpenModal(false);
    } else {
      message.error(result.message);
      setLoading(false);
    }
  };


  const UpdateChangeEmailSignuature = async (data) => {
    const result = await userService.changeEmailSignature(data);
    if (result.isSuccess) {
      message.success(result.message);
      setLoading(false);
      setOpenModal(false);
    } else {
      message.error(result.message);
      setLoading(false);
    }
  }


  useEffect(() => {
    getUserInfo();
    //handleMessage();
  }, []);

  const userInfoDropDown = [
    {
      name: <FormattedMessage id="profile" />,
      value: "profile",
      icon: <RiProfileLine />,
    },
    {
      name: <FormattedMessage id="changePassword" />,
      value: "change_password",
      icon: <RiLockPasswordLine />,
    },
    {
      name: <FormattedMessage id="logout" />,
      value: "logout",
      href: "/login",
      icon: <RiLogoutCircleRLine />,
    },
  ];


  const renderCollapseElement = () => {
    if (collapsed) {
      return <FiAlignRight className="navIcon" onClick={onCollapse} />;
    } else {
      return <FiAlignLeft className="navIcon" onClick={onCollapse} />;
    }
  };

  const renderCollapseMessage = () => {
    return <BellOutlined className="navIcon" />;
  };

  const changeLanguage = (value) => {
    setLocale(value);
    ontShowLangPopOver();
  };

  /**
   * Render language popover data
   */
  const languagePopOverContent = (
    <>
      <CPButton onClick={() => changeLanguage("fa")}>
        <FormattedMessage id="persian" />
      </CPButton>
      <CPDivider />
      <CPButton onClick={() => changeLanguage("en")}>
        <FormattedMessage id="english" />
      </CPButton>
    </>
  );

  return (
    <>
      <Header className="navigation">
        {/* popover and dropdown styles that has placed out of wrapper */}
        <Space size="small">{renderCollapseElement()}</Space>

        <Space size="small">
          {/* <Badge count={0}>
            <Avatar
              shape="circle"
              size="large"
              style={{ color: "black", backgroundColor: "#fff" }}
              icon={<BellOutlined />}
            ></Avatar>
          </Badge> */}
          {/* <CPPopover
          overlayClassName="languages"
          className="languages"
          visible={showLangPopOver}
          onVisibleChange={ontShowLangPopOver}
          placement="bottom"
          content={languagePopOverContent}
        >
          <MdGTranslate className="navIcon" />
        </CPPopover> */}
          <CPDropDown
            overlayCss="userInfo"
            menuList={userInfoDropDown}
            arrow
            placement="bottomLeft"
            onClick={(value) => handleChangeUserDropDown(value)}
            trigger={["click"]}
          >
            <span className="userInformation">
              <FiUser className="navIcon" />
              <small>{userInfo.fullName}</small>
              <Tooltip placement="top" title={"آخرین ورود"}>
                <small style={{ color: "red" }}>  {JSON.parse(localStorage.getItem("lastLoginDate"))}</small>
              </Tooltip>

            </span>

          </CPDropDown>
        </Space>
      </Header>
      <CPModal
        title={renderTitleModal(typeAction)}
        visible={openModal}
        closable
        onCancel={() => setOpenModal(false)}
        footer={null}
        width={typeAction === "change_password" ? 300 : 600}
      >
        {renderModalComponent(typeAction)}
      </CPModal>
    </>
  );
};

export default Navigation;
