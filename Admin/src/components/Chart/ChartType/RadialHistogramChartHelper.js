import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";

export default {
  config: (
    chart,
    data,
    option,
    handleClick //object
  ) => {
    chart.scrollbarX = new am4core.Scrollbar();
    chart.radius = am4core.percent(100);
    chart.innerRadius = am4core.percent(50);
    // Create axes
    let categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
    categoryAxis.dataFields.category = "title";
    categoryAxis.renderer.grid.template.location = 0;
    categoryAxis.renderer.minGridDistance = 30;
    categoryAxis.tooltip.disabled = true;
    categoryAxis.renderer.minHeight = 110;
    categoryAxis.renderer.grid.template.disabled = true;
    categoryAxis.renderer.labels.template.fontSize = 10;
    //categoryAxis.renderer.labels.template.disabled = true;
    let labelTemplate = categoryAxis.renderer.labels.template;
    labelTemplate.radius = am4core.percent(-60);
    labelTemplate.location = 0.5;
    labelTemplate.relativeRotation = 90;

    let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.renderer.grid.template.disabled = true;
    valueAxis.renderer.labels.template.disabled = true;
    valueAxis.tooltip.disabled = true;

    // Create series
    let series = chart.series.push(new am4charts.RadarColumnSeries());
    series.sequencedInterpolation = true;
    series.dataFields.valueY = "value";
    series.dataFields.categoryX = "title";
    series.columns.template.strokeWidth = 0;
    series.tooltipText = "{valueY}";
    series.columns.template.radarColumn.cornerRadius = 10;
    series.columns.template.radarColumn.innerCornerRadius = 0;

    series.tooltip.pointerOrientation = "vertical";

    //click events
    series.columns.template.events.on(
      "hit",
      function (ev) {
        handleClick({
          id: ev.target.dataItem._dataContext.id,
          parentId: ev.target.dataItem._dataContext.parentId,
          title: ev.target.dataItem._dataContext.title,
        });
      },
      this
    );

    // on hover, make corner radiuses bigger
    let hoverState = series.columns.template.radarColumn.states.create("hover");
    hoverState.properties.cornerRadius = 0;
    hoverState.properties.fillOpacity = 1;

    series.columns.template.adapter.add("fill", function (fill, target) {
      return chart.colors.getIndex(target.dataItem.index);
    });

    // Cursor
    chart.cursor = new am4charts.RadarCursor();
    chart.cursor.innerRadius = am4core.percent(50);
    chart.cursor.lineY.disabled = true;

    chart.data = data;
    chart.rtl = true;

    return chart;
  },
};
