import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";

export default {
  config: (
    chart,
    data,
    option,
    handleClick //object
  ) => {
    // Create axes
    let categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
    categoryAxis.dataFields.category = "Title";
    categoryAxis.renderer.grid.template.location = 0;
    categoryAxis.renderer.cellStartLocation = 0;
    categoryAxis.renderer.cellEndLocation = 0.7;
    categoryAxis.renderer.minGridDistance = 5;
    categoryAxis.renderer.labels.template.rotation = 350;
    categoryAxis.renderer.labels.template.verticalCenter = "center";
    categoryAxis.renderer.labels.template.horizontalCenter = "center";
    categoryAxis.renderer.labels.template.fontSize = 10;
    categoryAxis.renderer.ticks.template.disabled = true;
    categoryAxis.renderer.grid.template.location = 0;
    categoryAxis.renderer.ticks.template.disabled = true;
    categoryAxis.renderer.line.opacity = 0;
    categoryAxis.renderer.grid.template.disabled = true;
    categoryAxis.startLocation = 0.4;
    categoryAxis.endLocation = 0.6;

    let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.renderer.opposite = false;
    valueAxis.renderer.labels.template.disabled = false;
    valueAxis.min = 0;

    // Create series
    function createSeries(field, name) {
      //create line
      var lineSeries = chart.series.push(new am4charts.LineSeries());
      lineSeries.dataFields.categoryX = "Title";
      lineSeries.dataFields.valueY = field;
      lineSeries.name = name;

      //Anatomy of an XY Chart //
      lineSeries.smoothing = "monotoneX";
      lineSeries.tensionX = "0.8";
      lineSeries.tensionY = "1";
      // Anatomy of an XY Chart //

      field !== "Target" && (lineSeries.fillOpacity = 0.5);
      field === "Target" && (lineSeries.stroke = "red");
      lineSeries.strokeWidth = 3;
      lineSeries.tooltipText =
        name === "" ? "" : `{name}: [bold]{valueY}[/]  ${option.symbol}`;

      //add bullets
      if (field !== "Target") {
        let bullet = lineSeries.bullets.push(new am4charts.CircleBullet());
        bullet.circle.radius = 6;
        bullet.circle.fill = am4core.color("#fff");
        bullet.circle.strokeWidth = 1;
        bullet.tooltipText = name
          ? `{name}: [bold]{valueY}[/]  ${option.symbol}`
          : ` [bold]{valueY}[/]  ${option.symbol}`;

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
      }
    }
    option?.columns?.forEach((item) => {
      createSeries(item.columnName, item.title);
    });

    //legend
    /*  if (option?.columns.length <= 4) { */
    chart.legend = new am4charts.Legend();
    chart.legend.position = "top";
    chart.legend.paddingBottom = 20;
    chart.legend.labels.template.maxWidth = 95;
    /*  } */

    chart.cursor = new am4charts.XYCursor();
    chart.cursor.behavior = "panX";
    chart.cursor.lineX.opacity = 0;
    chart.cursor.lineY.opacity = 0;

    chart.data = data;
    chart.rtl = true;

    return chart;
  },
};
