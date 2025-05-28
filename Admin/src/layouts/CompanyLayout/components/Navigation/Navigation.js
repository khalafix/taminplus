import React, { useState, useEffect } from "react";
import { Layout, Space, Collapse, Spin, message } from "antd";
import { FiAlignLeft, FiBell, FiUser, FiAlignRight } from "react-icons/fi";
import { authenticationServices } from "services/authenticationServices";
import { applicationService } from "services/applicationService";
import {
  RiLockPasswordLine,
  RiLogoutCircleRLine,
  RiProfileLine,
  RiMenuLine,
  RiTimeLine,
} from "react-icons/ri";
import { MdGTranslate } from "react-icons/md";
import ChangePassword from "./components/ChangePassword";
import Profile from "./components/Profile";
import {
  CPModal,
  CPDropDown,
  CPButton,
  CPDivider,
  CPPopover,
} from "components/CP";
import { useLocation, useHistory } from "react-router-dom";

// API
import { userService } from "services/userService";
import { useLocale } from "components/IntelProvider/IntelProvider";
import { FormattedMessage, useIntl } from "react-intl";

const { Header } = Layout;

const Navigation = ({ collapsed, onCollapse }) => {
  const intl = useIntl();
  const { setLocale } = useLocale();
  const [showLangPopOver, setShowLangPopOver] = useState(false);
  const [typeAction, setTypeAction] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [userInfo, setUserInfo] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingConfig, setLoadingConfig] = useState(false);
  const [appConfigData, setAppConfigData] = useState({});
  const history = useHistory();

  const getUserInfo = async () => {
    let user = await authenticationServices.userInfo();
    setUserInfo(user);
  };

  const ontShowLangPopOver = () => setShowLangPopOver(!showLangPopOver);

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

  const getConfig = async () => {
    setLoadingConfig(true);
    const result = await applicationService.getAppConfig();
    if (result) {
      setAppConfigData(result);
      setLoadingConfig(false);
    }
  };

  const handleClick = () => {
    
    history.push("/user-dashboard");
  };

  useEffect(() => {
    getUserInfo();
    getConfig();
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
    /*   if (collapsed) {
      return <FiAlignRight className="navIcon" onClick={onCollapse} />;
    } else {
      return <FiAlignLeft className="navIcon" onClick={onCollapse} />;
    } */
    return (
      <div onClick={handleClick} style={{cursor:"pointer"}}>
        <img
          src={`data:images/png;base64,${appConfigData?.sidebarLogoBase64}`}
          alt="logo-eied"
          width={50}
          height={50}
        />{" "}
        <strong>{appConfigData.applicationTitle}</strong>
      </div>
    );
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
          <CPPopover
            overlayClassName="languages"
            className="languages"
            visible={showLangPopOver}
            onVisibleChange={ontShowLangPopOver}
            placement="bottom"
            content={languagePopOverContent}
          >
            <MdGTranslate className="navIcon" />
          </CPPopover>
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
