import React, { useState, useEffect } from 'react'
import ReactApexChart, { ApexChart } from "react-apexcharts";
import { Card, Typography } from "antd";
import { useIntl } from "react-intl";



function BrandProductChart({ data = [], seriesName = "تعداد محصولات" }) {
  const intl = useIntl();
  const { Title, Paragraph } = Typography;

  const chartData = {

    series: [{
      name: seriesName,
      data: data,
    }],
    options: {
      series: [{
      name: 'برندها',
      data: data.map(m=>m.x)
    }],
    
    chart: {
      height: 350,
      type: 'bar',
    },
    plotOptions: {
      bar: {
        borderRadius: 10,
        columnWidth: '80%',
      }
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      width: 2
    },
    
    grid: {
      row: {
        colors: ['#fff', '#f2f2f2']
      }
    },
    xaxis: {
      categories: data.map(m=>m.x),

      labels: {
        show: true,
        align: "center",
        minWidth: 0,
        maxWidth: 160,
        rotate: 45,      
      },
     
      tickPlacement: 'on'
    },
    // yaxis: {
    //   title: {
    //     text: "برندها",
    //   },
    // },
    
    fill: {
      type: 'gradient',
      gradient: {
        shade: 'light',
        type: "horizontal",
        shadeIntensity: 0.25,
        gradientToColors: undefined,
        inverseColors: true,
        opacityFrom: 0.85,
        opacityTo: 0.85,
        stops: [50, 0, 100]
      },
    }
    }
  };




  return (
    <>
      <Paragraph className="lastweek">
        تعداد برندها <span className="bnb2">{data.length?.toLocaleString()}</span>
      </Paragraph>
      <div id="chartPOCount">
        <ReactApexChart options={chartData.options} series={ chartData.series } type="bar" height={380} />
      </div>


    </>
  );
}


export default BrandProductChart;
