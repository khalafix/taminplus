import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import { max } from "lodash";

const setResponsiveRules = (chart) => {
  chart.responsive.rules.push({
    relevant: am4core.ResponsiveBreakpoints.widthM,
    state: (target, stateId) => {
      if (target instanceof am4charts.XYChart) {
        const state = target.states.create(stateId);

        const labelState =
          target.yAxes
            .getIndex(0)
            ?.renderer.labels.template.states.create(stateId) ?? null;
        if (labelState) {
          labelState.properties.maxWidth = 100;
        }

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
    option, //object
    handleClick
  ) => {
    const categoryAxis = chart.yAxes.push(new am4charts.CategoryAxis());
    categoryAxis.renderer.grid.template.location = 0;
    categoryAxis.dataFields.category = "title";
    categoryAxis.renderer.minGridDistance = 1;
    categoryAxis.renderer.inversed = true;
    categoryAxis.renderer.grid.template.disabled = true;
    categoryAxis.renderer.labels.template.disabled = !option?.outsideLabels;
    categoryAxis.renderer.labels.template.minWidth = 150;
    categoryAxis.renderer.labels.template.align = "right";

    const valueAxis = chart.xAxes.push(new am4charts.ValueAxis());
    valueAxis.min = 0;
    valueAxis.max = max(data?.map((q) => q.value ?? []));
    valueAxis.renderer.minGridDistance = 50;

    const series = chart.series.push(new am4charts.ColumnSeries());
    series.dataFields.categoryY = "title";
    series.dataFields.valueX = "value";
    series.columns.template.strokeOpacity = 0;
    series.columns.template.column.cornerRadiusBottomRight = 5;
    series.columns.template.column.cornerRadiusTopRight = 5;
    series.columns.template.maxWidth = 50;
    //click events
    series.columns.template.events.on(
      "hit",
      function (ev) {
        handleClick({ ...ev.target.dataItem._dataContext });
      },
      this
    );

    if (!option?.outsideLabels) {
      const labelBullet = series.bullets.push(new am4charts.LabelBullet());
      labelBullet.label.horizontalCenter = "left";
      labelBullet.dx = 10;
      labelBullet.label.text = "{title}";
      labelBullet.isDynamic = true;
      // labelBullet.label.width = 200;
      // labelBullet.width = 200;

      labelBullet.locationX = 1;
      labelBullet.rtl = true;
      labelBullet.fill = am4core.color("#fff");
      // series.tooltipText = '{valueX.value}';
    }
    series.columns.template.adapter.add("fill", function (fill, target) {
      if (option?.fixedColor) return am4core.color(option?.fixedColor);
      return chart.colors.getIndex((target?.dataItem?.index ?? 0) * 2);
    });

    chart.data = data;

    chart.responsive.useDefault = false;

    return setResponsiveRules(chart);
  },
};
