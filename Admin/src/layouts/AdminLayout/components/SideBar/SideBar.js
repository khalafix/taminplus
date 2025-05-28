import React, { useEffect, useState } from "react";
import { Menu, Layout } from "antd";
import { FormattedMessage, useIntl } from "react-intl";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useHistory } from "react-router-dom";
import logo from "assets/images/eied-logo.png";
import { addTag } from "redux/reducers/tagView";

// API
import { authenticationServices } from "services/authenticationServices";
import { applicationService } from "services/applicationService";

//util
import iconMap from "utils/iconMap";
import { CPTooltip } from "components/CP";
import { useLocale } from "components/IntelProvider/IntelProvider";
import { removeTag } from "redux/reducers/tagView";

const { Item, SubMenu } = Menu;
const { Sider } = Layout;

const Sidebar = ({ collapsed }) => {
  const { tags, activeTagId } = useSelector((state) => state.tagsView);
  const intl = useIntl();
  const { locale } = useLocale();
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const history = useHistory();
  const [userInfo, setUserInfo] = useState();
  const [loadingConfig, setLoadingConfig] = useState(false);
  const [appConfigData, setAppConfigData] = useState({});

  const getUserInfo = async () => {
    let user = await authenticationServices.userInfo();
    setUserInfo(user);
  };

  const getConfig = async () => {
    setLoadingConfig(true);
    const result = await applicationService.getAppConfig();
    if (result) {
      setAppConfigData(result);
      setLoadingConfig(false);
    }
  };

  const onMenuClick = (menuItem) => {
    if (menuItem?.path === pathname) return;
    const { path, enTitle } = menuItem;
    if (enTitle !== "logout") {
      let name = `${intl.formatMessage({ id: enTitle })}`;
       
      dispatch(
        addTag({
          id: enTitle,
          label: name,
          path: path,
          closable: true,
           isSidebar:true
        })
      );
    } else {
      history.push(path);
    }
  };

  const renderItemMenu = (item) => {
    return (
      <Item key={item.id} onClick={() => onMenuClick(item)}>
        <CPTooltip
          placement={locale === "en" ? "right" : "left"}
          title={`${intl.formatMessage({ id: item.enTitle })}`}
        >
          {iconMap[item.icon]}
          <span>{`${intl.formatMessage({ id: item.enTitle })}`}</span>
        </CPTooltip>
      </Item>
    );
  };

  useEffect(() => {
    getUserInfo();
    getConfig();
  }, []);
  return (
    <div className="sideBar">
      <Sider
        width={280}
        collapsedWidth={0}
        breakpoint="lg"
        trigger={null}
        mode="inline"
        collapsible
        collapsed={collapsed}
      >
        <div className="logo">
          <img
            src={`data:images/png;base64,${appConfigData?.sidebarLogoBase64}`}
            alt=""
          />

          {!collapsed && <b>{appConfigData?.applicationTitle}</b>}
        </div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["1"]}
          defaultOpenKeys={["sub1"]}
        >
          {userInfo?.permissions?.map((m) => {
            if (m.path) {
              return renderItemMenu(m);
            } else {
              return (
                <SubMenu
                  key={m.id}
                  title={
                    <span>
                      {iconMap[m.icon]}
                      <span>
                        <FormattedMessage
                          id={m.enTitle}
                          defaultMessage={m.enTitle}
                        />
                      </span>
                    </span>
                  }
                >
                  {m?.children?.map((item) => renderItemMenu(item))}
                </SubMenu>
              );
            }
          })}

          <Item
            key={userInfo?.permissions?.length + 9}
            onClick={() =>
              onMenuClick({
                path: "/login",
                enTitle: "logout",
              })
            }
          >
            {iconMap["logout"]}
            <span>{`${intl.formatMessage({ id: "logout" })}`}</span>
          </Item>
        </Menu>
      </Sider>
    </div>
  );
};

export default Sidebar;
