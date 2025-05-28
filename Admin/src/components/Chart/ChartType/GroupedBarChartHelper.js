import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import { max, groupBy } from "lodash";

const setResponsiveRules = (chart) => {
  return chart;
};
export default {
  config: (chart, data) => {
    chart.data = data;

    const grouped = groupBy(data, (q) => q.group);
    const result = [];
    for (const key in grouped) {
      if (Object.hasOwnProperty.call(grouped, key)) result.push(key);
    }

    const getGroupedColor = (groupText) =>
      chart.colors.getIndex(result.findIndex((q) => q == groupText) * 2);
    // Create axes
    const yAxis = chart.yAxes.push(new am4charts.CategoryAxis());
    yAxis.dataFields.category = "title";
    yAxis.renderer.grid.template.location = 0;
    yAxis.renderer.labels.template.fontSize = 10;
    yAxis.renderer.minGridDistance = 10;

    const xAxis = chart.xAxes.push(new am4charts.ValueAxis());
    xAxis.min = 0;
    xAxis.max = max(data?.map((q) => q.value ?? []));
    xAxis.renderer.minGridDistance = 30;

    // Create series
    const series = chart.series.push(new am4charts.ColumnSeries());
    series.dataFields.valueX = "value";
    series.dataFields.categoryY = "title";
    series.columns.template.tooltipText = "{categoryY}: [bold]{valueX}[/]";
    series.columns.template.strokeWidth = 0;
    series.columns.template.adapter.add("fill", function (fill, target) {
      if (target.dataItem) {
        const myData = target.dataItem.dataContext;
        return getGroupedColor(myData.group);
      }
      return fill;
    });

    const axisBreaks = {};
    const legendData = [];

    // Add ranges
    function addRange(label, color) {
      legendData.push({ name: label, fill: color });
    }

    let index = 0;
    for (const key in grouped) {
      const color = chart.colors.getIndex(index * 2);
      legendData.push({ name: key, fill: color });
      index++;
    }

    const legend = new am4charts.Legend();
    legend.position = "bottom";
    legend.scrollable = true;
    legend.valign = "bottom";
    legend.reverseOrder = true;
    legend.labels.template.fontSize = 12;
    legend.interactionsEnabled = false;

    legend.labels.template.align = "center";

    chart.legend = legend;
    legend.data = legendData;

    chart.responsive.enabled = false;

    return setResponsiveRules(chart);
  },
};
