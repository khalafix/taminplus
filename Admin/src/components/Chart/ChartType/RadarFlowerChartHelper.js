import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";

export default {
  config: (
    chart,
    data,
    option //object
  ) => {
    const categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
    categoryAxis.dataFields.category = "title";
    categoryAxis.renderer.labels.template.location = 0.5;
    categoryAxis.renderer.tooltipLocation = 0.5;
    categoryAxis.renderer.cellStartLocation = 0.2;
    categoryAxis.renderer.cellEndLocation = 0.8;
    categoryAxis.renderer.labels.template.fontSize = 10;

    const valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    if (valueAxis.tooltip) valueAxis.tooltip.disabled = true;
    valueAxis.renderer.labels.template.disabled = true;
    valueAxis.min = 0;

    const series = chart.series.push(new am4charts.RadarColumnSeries());

    series.dataFields.categoryX = "title";
    series.dataFields.valueY = "value";
    series.fillOpacity = 0.4;
    series.columns.template.width = am4core.percent(100);

    chart.seriesContainer.zIndex = -1;

    chart.data = data;
    chart.rtl = true;

    if (option.isDesktop) chart.padding(0, 100, 0, 100);
    else chart.padding(0, 50, 0, 50);

    return chart;
  },
};
