import React, { useState, useEffect } from "react";
import { useLocation, useHistory } from "react-router-dom";

import {  Col, Row, Spin , message } from "antd";
import dayjs from "dayjs";
import { CPCard,  } from "components/CP";
// Message
import {  useIntl } from "react-intl";
import PageContainer from "components/PageContainer/PageContainer";

// Api
import { companyServices } from "services/companyServices";

// Helpers
import CompanyInfo from "components/Company/CompanyInfo";
import CompanyDetails from "./components/CompanyDetails";



const Index = () => {
  const intl = useIntl();
  const location = useLocation();
  const [data, setData] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  // If you want to all new instanses of dayjs use jalali calendar, you can set default calendar
  dayjs.calendar("jalali");


  const GetCompanyData = async () => {
      setLoading(true);
     let result = await companyServices.getCompanyInfoById(
        location?.state?.id
      )
        
    if (result.isSuccess) {
      setData(result.data);
      setLoading(false);
    }else{
      message.error(result.message);
      setLoading(false);
    }
  };

  useEffect(() => {
  
    GetCompanyData();
  }, []);

  
  return (
    <PageContainer
      title={`${intl.formatMessage({ id: "searchCompanyDetails" })}`}
    >
      <CPCard>
        {loading ? (
          <Spin className="spin-custom" />
        ) : (
          <>
            <Row gutter={[8, 8]} className="mt-10">
              <Col xs={24} sm={12} md={24}>
             
                <CompanyInfo showCard={true} info={data?.companyInfo} />
              </Col>
              <Col xs={24} sm={12} md={24}>
                <CompanyDetails info={data} companyId={location?.state?.id} />
              </Col>
            </Row>
          </>
        )}
      </CPCard>
    </PageContainer>
  );
};

export default Index;
