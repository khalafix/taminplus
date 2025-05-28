import React from "react";
import { Layout } from "antd";
import { useIntl } from "react-intl";
const { Footer: AntFooter } = Layout;

const Footer = ({ data }) => {
  const intl = useIntl();
  
  return (
    <AntFooter style={{fontFamily:"tahoma"}} className="footer">{`  ${data.currentYear}  ${data.footer} ©     `}</AntFooter>
  );
};

export default Footer;
