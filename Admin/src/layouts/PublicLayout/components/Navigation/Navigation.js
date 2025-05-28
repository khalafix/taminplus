import React, { useState, useEffect } from "react";
import { Layout, Space } from "antd";
import { FiUser } from "react-icons/fi";
import { applicationService } from "services/applicationService";

import { MdGTranslate } from "react-icons/md";
import {
  CPDropDown,
  CPButton,
  CPDivider,
  CPPopover,
} from "components/CP";
import { useHistory } from "react-router-dom";

// API
import { useLocale } from "components/IntelProvider/IntelProvider";
import { FormattedMessage, useIntl } from "react-intl";

const { Header } = Layout;

const Navigation = ({ collapsed, onCollapse }) => {
  const intl = useIntl();
  const { setLocale } = useLocale();
  const [showLangPopOver, setShowLangPopOver] = useState(false);
  const [userInfo, setUserInfo] = useState("");
  const [appConfigData, setAppConfigData] = useState({});
  const history = useHistory();

  const ontShowLangPopOver = () => setShowLangPopOver(!showLangPopOver);

  const getConfig = async () => {
    const result = await applicationService.getAppConfig();
    if (result) {
      setAppConfigData(result);
    }
  };

  const handleClick = () => {
    history.push("/login");
  };

  useEffect(() => {
    getConfig();
  }, []);


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
          {/* <CPPopover
            overlayClassName="languages"
            className="languages"
            visible={showLangPopOver}
            onVisibleChange={ontShowLangPopOver}
            placement="bottom"
            content={languagePopOverContent}
          >
            <MdGTranslate className="navIcon" />
          </CPPopover>
          */}
            <span  onClick={() => (history.push("/login"))} className="userInformation">
           
            <FiUser className="navIcon" />
            </span>
         
        </Space>
      </Header>
    </>
  );
};

export default Navigation;
