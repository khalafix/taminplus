import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";

export default {
  config: (
    chart,
    data,
    option,
    handleClick //object
  ) => {
    chart.paddingRight = 25;

    var categoryAxis = chart.yAxes.push(new am4charts.CategoryAxis());
    categoryAxis.dataFields.category = "Title";
    categoryAxis.renderer.minGridDistance = 30;
    categoryAxis.renderer.grid.template.disabled = true;

    data.sort(function (a, b) {
      return b.Value - a.Value;
    });
    let max = data[0].Value;
    max = max > 100 ? max + 10 : 100;

    var valueAxis = chart.xAxes.push(new am4charts.ValueAxis());
    valueAxis.renderer.minGridDistance = 30;
    valueAxis.renderer.grid.template.disabled = true;
    valueAxis.min = 0;
    valueAxis.max = max;
    valueAxis.strictMinMax = true;
    valueAxis.renderer.labels.template.adapter.add("text", function (text) {
      return text + "%";
    });

    /* Create ranges */
    function createRange(axis, from, to, color) {
      var range = axis.axisRanges.create();
      range.value = from;
      range.endValue = to;
      range.axisFill.fill = color;
      range.axisFill.fillOpacity = 0.8;
      range.label.disabled = true;
    }
    var colors = ["#fb7116", "#f6d32b", "#f4fb16", "#b4dd1e", "#19d228"];

    var gradient = new am4core.LinearGradient();
    for (var i = 0; i < 5; ++i) {
      // add each color that makes up the gradient
      gradient.addColor(am4core.color(colors[i]));
    }

    createRange(valueAxis, 0, max, gradient);

    /* Create series */
    let series = chart.series.push(new am4charts.ColumnSeries());
    series.dataFields.valueX = "Value";
    series.dataFields.categoryY = "Title";
    series.columns.template.fill = am4core.color("#000");
    series.columns.template.stroke = am4core.color("#fff");
    series.columns.template.strokeWidth = 1;
    series.columns.template.strokeOpacity = 0.5;
    series.columns.template.height = am4core.percent(25);
    series.tooltipText = `{Value} ${option.symbol}`;

    var series2 = chart.series.push(new am4charts.StepLineSeries());
    series2.dataFields.valueX = "Target";
    series2.dataFields.categoryY = "Title";
    series2.strokeWidth = 3;
    series2.noRisers = true;
    series2.startLocation = 0.15;
    series2.endLocation = 0.85;
    series2.tooltipText = `{valueX} ${option.symbol}`;
    series2.stroke = am4core.color("#000");

    let bullet = series2.bullets.push(new am4charts.Bullet());

    //click events
    bullet.events.on(
      "hit",
      function (ev) {
        handleClick({
          ...ev.target.dataItem._dataContext,
          isClickable: option.isClickable,
        });
      },
      this
    );

    chart.cursor = new am4charts.XYCursor();
    chart.cursor.lineX.disabled = true;
    chart.cursor.lineY.disabled = true;

    chart.data = data;
    chart.rtl = true;

    return chart;
  },
};
