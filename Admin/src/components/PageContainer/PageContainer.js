import React from "react";
import { Helmet } from "react-helmet";
const PageContainer = ({ title, children }) => {
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{title}</title>
      </Helmet>
      {children}
    </>
  );
};

export default PageContainer;
