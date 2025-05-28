import React, { useState, useEffect } from "react";

//UI
import { Row, Col, Card, Calendar } from "antd";
import PageContainer from "components/PageContainer/PageContainer";
import NumberCard from "components/NumberCard/NumberCard";
import { useIntl } from "react-intl";
import { useHistory } from "react-router-dom";

import { CPCard } from "components/CP";
import ProductCategoryChart from "./product-category-chart";
import { productCategoryServices } from 'services/catalog/productCategoryServices';
import { brandServices } from 'services/catalog/brandServices';

import BrandProductChart from "./brand-product";
import { dashboardServices } from "services/dashboardServices";

const Dashboard = () => {
  const [productCategoryChartData, setProductCategoryChartData] = useState([]);
  const [brandProductChartData, setBrandProductChartData] = useState([]);
  const [dataCountCard, setDataCountCard] = useState([]);

  useEffect(() => {

    (async () => {
      await GetProductCategoryForDashboard();
      await GetBrandProductsForDashboard();
      await getCountData();

    })()

  }, []);

  const GetProductCategoryForDashboard = async () => {
    const result = await productCategoryServices.getProductCategoryForDashboard();
    setProductCategoryChartData(result.data);

  }

  
  const getCountData = async () => {
    const res = await dashboardServices.getCountData();
    setDataCountCard(res.data);
  }

  const GetBrandProductsForDashboard = async () => {
    const result = await brandServices.getBrandProductsForDashboard();
    setBrandProductChartData(result.data);

  }

  const itemCount = dataCountCard?.map((item, key) => (

    <Col key={key} xs={6} sm={6} md={6}>
      <NumberCard {...item} />
    </Col>
  ));


  return (
    <PageContainer title={"  تامین پلاس"}>
      <Card>
      <Row gutter={[24, 24]}>
        {itemCount}
      </Row>
        <Row gutter={[24, 24]}>

          <Col xs={24} sm={24} md={24} lg={24} xl={24} className="mb-24" >
            <Card bordered={false} className="criclebox h-full mb-24">
              <BrandProductChart data={brandProductChartData} />
            </Card>
          </Col>
        </Row>
        <Row gutter={[24, 0]}>

          <Col xs={24} sm={24} md={12} lg={12} xl={12} className="mb-24" >
            <Card bordered={false} className="criclebox h-full mb-24">
              <ProductCategoryChart data={productCategoryChartData} />
            </Card>
          </Col>

        </Row>
        
      </Card>

    </PageContainer>
  );
};

export default Dashboard;
