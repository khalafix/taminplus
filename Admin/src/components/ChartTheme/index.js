import React from "react";
import { useDispatch } from "react-redux";
import { Dropdown, Menu, Button } from "antd";
import { DownOutlined } from "@ant-design/icons";
// Message
import { FormattedMessage } from "react-intl";

const Index = () => {
  const dispatch = useDispatch();
  const menu = (
    <Menu onClick={(e) => handleMenuClick(e)}>
      <Menu.Item key="kelly">
        <div className="chart-theme-kelly">Kelly</div>
      </Menu.Item>
      <Menu.Item key="animated">
        <div className="chart-theme-animated">Asnimated</div>
      </Menu.Item>
      <Menu.Item key="dataviz">
        <div className="chart-theme-dataviz">Dataviz</div>
      </Menu.Item>
      <Menu.Item key="material">
        <div className="chart-theme-material">Material</div>
      </Menu.Item>
      <Menu.Item key="dark">
        <div className="chart-theme-dark">Dark</div>
      </Menu.Item>
      <Menu.Item key="frozen5">
        <div className="chart-theme-frozen">Frozen</div>
      </Menu.Item>
      <Menu.Item key="moonrisekingdom">
        <div className="chart-theme-moonrise_kingdom">Moonrise Kingdom</div>
      </Menu.Item>
      <Menu.Item key="spiritedaway">
        <div className="chart-theme-spirited_away">Spirited Away</div>
      </Menu.Item>
    </Menu>
  );

  function handleMenuClick(e) {
    dispatch({ type: "chartTheme", payload: e.key });
    setTimeout(() => {
      window.location.reload();
    }, 500);
  }

  return (
    <Dropdown overlay={menu}>
      <Button>
        <FormattedMessage id="selectColor" /> <DownOutlined />
      </Button>
    </Dropdown>
  );
};

export default Index;
