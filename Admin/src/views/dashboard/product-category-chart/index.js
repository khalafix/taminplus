import React from 'react'
import ReactApexChart from "react-apexcharts";
import { Row, Col, Typography } from "antd";


function ProductCategoryChart({data}) {
  const { Title, Paragraph } = Typography;

  let values = data?.items != null ? data?.items?.map(q => q.value) : [];
  
  let titles = data?.items != null ? data?.items?.map(q => q.title) : [];


  const chartData = {
    series: [
      {
        name: "تعداد قطعات",
        data: [...values],
        color: "#fff",
      },
    ],
  
    options: {
      chart: {
        type: "bar",
        width: "100%",
        height: "auto",
  
        toolbar: {
          show: false,
        },
      },
      plotOptions: {
        // bar: {
        //   horizontal: false,
        //   columnWidth: "55%",
        //   borderRadius: 5,
        // },
        bar: {
          dataLabels: {
            orientation: 'vertical',
            position: 'center' // bottom/center/top
          }
        }
      },
      dataLabels: {
        // enabled: false,
    style: {
      colors: ['#000000']
    },
      },
      stroke: {
        show: true,
        width: 10,
        colors: ["transparent"],
      },
      grid: {
        show: true,
        borderColor: "#ccc",
        strokeDashArray: 2,
      },
      xaxis: {
        categories: [...titles],
        labels: {
          show: true,
          align: "center",
          minWidth: 0,
          maxWidth: 160,
          rotate: 90,

          style: {
            colors: [
              "#fff",
              "#fff",
              "#fff",
              "#fff",
              "#fff",
              "#fff",
              "#fff",
              "#fff",
              "#fff",
              "#fff",
            ],
          },
        },
      },
      yaxis: {
        labels: {
          show: true,
          align: "center",
          minWidth: 0,
          maxWidth: 160,
          style: {
            colors: [
              "#fff",
              "#fff",
              "#fff",
              "#fff",
              "#fff",
              "#fff",
              "#fff",
              "#fff",
              "#fff",
              "#fff",
            ],
          },
        },
      },
  
      tooltip: {
        y: {
          formatter: function (val) {
            return  val ;
          },
        },
      },
    },
  };

  // const items = [
  //   {
  //     Title: data.featureCount,
  //     user: "Features",
  //   },
  //   {
  //     Title: data.manufactureCompanyCount,
  //     user: "Manufactures",
  //   },
  //   {
  //     Title: data.supplierCompanyCount,
  //     user: "Suppliers",
  //   },
  //   {
  //     Title: data.mrCount,
  //     user: "MRs",
  //   },
  // ];

  return (
    <>
      <div id="chart">
      {/* <Title level={5}>    دسته بندی محصولات</Title> */}
        <Paragraph className="lastweek">
          تعداد کل دسته بندی محصولات <span className="bnb2">{data.productCategoryCount?.toLocaleString()}</span>
        </Paragraph>
        <ReactApexChart
          className="bar-chart"
          options={chartData.options}
          series={chartData.series}
          type="bar"
          height={320}
        />
      </div>
      {/* <div className="chart-vistior">
 
        <Paragraph className="lastweek">
        Material Elements used statistics in :
        </Paragraph>
        <Row gutter>
          {items.map((v, index) => (
            <Col xs={6} xl={6} sm={6} md={6} key={index}>
              <div className="chart-visitor-count text-center">
                <Title level={4}>{v.Title?.toLocaleString()}</Title>
                <span>{v.user}</span>
              </div>
            </Col>
          ))}
        </Row>
      </div> */}
    </>
  );
}

export default ProductCategoryChart;
