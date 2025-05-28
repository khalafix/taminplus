import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";

const setResponsiveRules = (chart) => {
  chart.responsive.rules.push({
    relevant: am4core.ResponsiveBreakpoints.isS,
    state: (target, stateId) => {
      if (target instanceof am4charts.XYChart) {
        const state = target.states.create(stateId);

        const labelState =
          target.yAxes
            .getIndex(0)
            ?.renderer.labels.template.states.create(stateId) ?? null;
        if (labelState) labelState.properties.disabled = true;

        return state;
      }
    },
  });
  return chart;
};
export default {
  config: (
    chart,
    data,
    option //object
  ) => {
    const categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
    categoryAxis.dataFields.category = "title";

    categoryAxis.renderer.labels.template.wrap = true;
    categoryAxis.renderer.labels.template.maxWidth = 200;
    categoryAxis.renderer.labels.template.truncate = true;
    categoryAxis.renderer.labels.template.tooltipText = "{category}";
    if (option?.textColor)
      categoryAxis.renderer.labels.template.fill = am4core.color(
        option?.textColor
      );

    categoryAxis.renderer.minGridDistance = 30;
    categoryAxis.renderer.grid.template.disabled = true;

    const valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    if (valueAxis.tooltip) valueAxis.tooltip.disabled = true;
    valueAxis.renderer.labels.template.disabled = true;
    valueAxis.renderer.grid.template.disabled = true;
    valueAxis.renderer.paddingTop = 30;

    const series = chart.series.push(new am4charts.LineSeries());
    series.dataFields.categoryX = "title";
    series.dataFields.openValueY = "zeroValue";
    series.dataFields.valueY = "value";

    series.tooltipText = "open: {openValueY.value} close: {valueY.value}";
    series.fillOpacity = 0.3;
    series.defaultState.transitionDuration = 1000;

    const series2 = chart.series.push(new am4charts.LineSeries());
    series2.dataFields.categoryX = "title";
    series2.dataFields.valueY = "zeroValue";
    series2.sequencedInterpolation = true;
    series2.defaultState.transitionDuration = 1500;
    series2.stroke = chart.colors.getIndex(6);
    series2.tensionX = 0.8;

    const circleBullet = series.bullets.push(new am4charts.CircleBullet());
    circleBullet.circle.fill = am4core.color("#fff");
    circleBullet.circle.strokeWidth = 2;
    circleBullet.setStateOnChildren = true;

    const valueLabel = series.bullets.push(new am4charts.LabelBullet());
    valueLabel.label.text = "{value}";
    valueLabel.label.fontSize = 12;
    valueLabel.label.fontWeight = "bold";
    valueLabel.label.verticalCenter = "top";
    valueLabel.label.dy = 5;
    if (option?.textColor)
      valueLabel.label.fill = am4core.color(option?.textColor);

    chart.data = data;

    chart.padding(16, 16, 16, 16);
    chart.margin(0, 0, 0, 0);

    return setResponsiveRules(chart);
  },
};
