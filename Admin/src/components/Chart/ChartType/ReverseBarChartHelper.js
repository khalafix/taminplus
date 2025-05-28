import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";

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
    // Create axes
    let categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
    categoryAxis.dataFields.category = "title";
    categoryAxis.renderer.grid.template.location = 0;
    categoryAxis.renderer.minGridDistance = 30;
    categoryAxis.renderer.labels.template.horizontalCenter = "right";
    categoryAxis.renderer.labels.template.verticalCenter = "middle";
    categoryAxis.renderer.labels.template.rotation = 320;
    categoryAxis.tooltip.disabled = true;
    categoryAxis.renderer.minHeight = 0;
    categoryAxis.renderer.labels.template.fontSize = 10;

    let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.renderer.minWidth = 0;

    // Create series
    let series = chart.series.push(new am4charts.ColumnSeries());
    //click events
    series.columns.template.events.on(
      "hit",
      function (ev) {
        handleClick({
          ...ev.target.dataItem._dataContext,
          isClickable: option.isClickable,
        });
      },
      this
    );
    series.sequencedInterpolation = true;
    series.dataFields.valueY = "value";
    series.dataFields.categoryX = "title";

    series.tooltipText = "[{categoryX}: bold]{valueY}[/]";
    series.columns.template.strokeWidth = 0;

    series.tooltip.pointerOrientation = "vertical";

    series.columns.template.column.cornerRadiusTopLeft = 10;
    series.columns.template.column.cornerRadiusTopRight = 10;
    series.columns.template.column.fillOpacity = 0.8;
    series.columns.template.width = am4core.percent(20);

    // on hover, make corner radiuses bigger
    let hoverState = series.columns.template.column.states.create("hover");
    hoverState.properties.cornerRadiusTopLeft = 0;
    hoverState.properties.cornerRadiusTopRight = 0;
    hoverState.properties.fillOpacity = 1;

    series.columns.template.adapter.add("fill", function (fill, target) {
      return chart.colors.getIndex(target.dataItem.index);
    });

    // Cursor
    chart.cursor = new am4charts.XYCursor();

    chart.data = data;

    chart.responsive.useDefault = false;

    return setResponsiveRules(chart);
  },
};
