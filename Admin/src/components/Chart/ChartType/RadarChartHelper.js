import * as am4charts from "@amcharts/amcharts4/charts";

export default {
  config: (
    chart,
    data,
    option,
    handleClick //object
  ) => {
    const categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
    categoryAxis.dataFields.category = "Title";
    categoryAxis.renderer.labels.template.fontSize = 10;
    categoryAxis.renderer.labels.template.tooltipText = "{Title}";
    categoryAxis.renderer.labels.template.fontSize = 10;
    categoryAxis.renderer.minGridDistance = 30;

    categoryAxis.events.on("sizechanged", function (ev) {
      const axis = ev.target;
      const cellWidth = axis.pixelWidth / (axis.endIndex - axis.startIndex);
      axis.renderer.labels.template.maxWidth = cellWidth;
    });

    const valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.renderer.gridType = "polygons";
    valueAxis.renderer.labels.template.disabled = true;

    function createSeries(value, name) {
      const series = chart.series.push(new am4charts.RadarSeries());

      series.dataFields.categoryX = "Title";
      series.dataFields.valueY = value;
      series.fillOpacity = 0.4;
      //click events

      const circleBullet = series.bullets.push(new am4charts.CircleBullet());
      circleBullet.circle.strokeWidth = 1;
      circleBullet.circle.radius = 2;
      circleBullet.tooltipText = `{categoryX} {name}: [bold]{valueY}[/]  ${option.symbol}`;
      //click events
      circleBullet.events.on(
        "hit",
        function (ev) {
          handleClick({
            ...ev.target.dataItem._dataContext,
            isClickable: option.isClickable,
          });
        },
        this
      );
    }

    createSeries(option.columns[0].columnName, "");

    chart.data = data;
    chart.rtl = true;

    chart.padding(0, 50, 0, 50);

    return chart;
  },
};
