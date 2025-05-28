import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Layout } from "antd";
import TagsView from "./components/tagView";
import Sidebar from "./components/SideBar/SideBar";
import Navigation from "./components/Navigation/Navigation";
import Footer from "./components/Footer/Footer";
import * as am4core from "@amcharts/amcharts4/core";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import am4themes_kelly from "@amcharts/amcharts4/themes/kelly";
import am4themes_dataviz from "@amcharts/amcharts4/themes/dataviz";
import am4themes_material from "@amcharts/amcharts4/themes/material";
import am4themes_frozen from "@amcharts/amcharts4/themes/frozen";
import am4themes_moonrisekingdom from "@amcharts/amcharts4/themes/moonrisekingdom";
import am4themes_spiritedaway from "@amcharts/amcharts4/themes/spiritedaway";
import am4themes_dark from "@amcharts/amcharts4/themes/dark";

//API
import { applicationService } from "services/applicationService";

const { Content } = Layout;

const AdminLayout = ({ children }) => {
  const collapsed = useSelector((state) => state.setting.sidebarCollapsed);
  const theme = useSelector((state) => state.setting.chartTheme);
  /* const [collapsed, setCollapsed] = useState(false); */
  const [visible, setVisible] = useState(false);
  const dispatch = useDispatch();
  const [loadingConfig, setLoadingConfig] = useState(false);
  const [appConfigData, setAppConfigData] = useState({});

  const toggle = () => {
    dispatch({ type: "sidebar", sidebarCollapsed: !collapsed });
  };
  const toggleVisible = () => {
    setVisible(!visible);
  };

  const getConfig = async () => {
    setLoadingConfig(true);
    const result = await applicationService.getAppConfig();
    if (result) {
      setAppConfigData(result);
      setLoadingConfig(false);
    }
  };

  const getChartTheme = (theme) => {
    let chartTheme = am4themes_kelly;

    switch (theme) {
      case "animated":
        chartTheme = am4themes_animated;
        break;
      case "material":
        chartTheme = am4themes_material;
        break;
      case "dataviz":
        chartTheme = am4themes_dataviz;
        break;
      case "kelly":
        chartTheme = am4themes_kelly;
        break;
      case "frozen":
        chartTheme = am4themes_frozen;
        break;
      case "moonrisekingdom":
        chartTheme = am4themes_moonrisekingdom;
        break;
      case "spiritedaway":
        chartTheme = am4themes_spiritedaway;
        break;
      case "dark":
        chartTheme = am4themes_dark;
        break;
    }

    return chartTheme;
  };

  useEffect(() => {
    getConfig();
  }, []);

  useEffect(() => {
    am4core.unuseAllThemes();
    am4core.useTheme(getChartTheme(theme));
  }, [theme]);
  return (
    <Layout className="adminLayout">
      <Sidebar collapsed={collapsed} onVisible={toggleVisible} />
      <Layout className="site-layout">
        <Navigation
          collapsed={collapsed}
          onCollapse={toggle}
          visible={visible}
          onVisible={toggleVisible}
        />
        <Content>
          <div className="layout-tagView">
            <TagsView />
            {children}
          </div>
        </Content>
        {appConfigData?.footer ? <Footer data={appConfigData} /> : null}
      </Layout>
    </Layout>
  );
};

export default AdminLayout;
