import React, { useState, useEffect } from "react";
import { Layout } from "antd";
import Navigation from "./components/Navigation/Navigation";
import Footer from "./components/Footer/Footer";

//API
import { applicationService } from "services/applicationService";

const { Content } = Layout;

const PublicLayout = ({ children }) => {
  const [visible, setVisible] = useState(false);
  const [appConfigData, setAppConfigData] = useState({});

  const toggleVisible = () => {
    setVisible(!visible);
  };

  const getConfig = async () => {
    const result = await applicationService.getAppConfig();
    if (result) {
      setAppConfigData(result);
    }
  };

  useEffect(() => {
    getConfig();
  }, []);


  return (
    <Layout className="adminLayout">
      <Layout className="site-layout">
        <Navigation
          visible={visible}
          onVisible={toggleVisible}
        />
        <Content>
          <div className="layout-tagView">
            {children}
          </div>
        </Content>
        {appConfigData?.footer ? <Footer data={appConfigData} /> : null}
      </Layout>
    </Layout>
  );
};

export default PublicLayout;
