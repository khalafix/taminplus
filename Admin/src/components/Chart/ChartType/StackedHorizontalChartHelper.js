import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";

export default {
  config: (
    chart,
    data,
    option, //object
    handleClick,
    operatorTitle
  ) => {
    // Create axes
    function getRotation() {
      return data.length > 10 ? 270 : 340;
    }

    chart.legend = new am4charts.Legend();
    chart.legend.position = "right";

    // Create axes
    let categoryAxis = chart.yAxes.push(new am4charts.CategoryAxis());
    categoryAxis.dataFields.category = "Title";
    categoryAxis.renderer.grid.template.opacity = 0;

    let valueAxis = chart.xAxes.push(new am4charts.ValueAxis());
    valueAxis.min = 0;
    valueAxis.renderer.grid.template.opacity = 0;
    valueAxis.renderer.ticks.template.strokeOpacity = 0.5;
    valueAxis.renderer.ticks.template.stroke = am4core.color("#495C43");
    valueAxis.renderer.ticks.template.length = 10;
    valueAxis.renderer.line.strokeOpacity = 0.5;
    valueAxis.renderer.baseGrid.disabled = true;
    valueAxis.renderer.minGridDistance = 40;

    // Create series
    function createSeries(field, name) {
      let series = chart.series.push(new am4charts.ColumnSeries());
      series.dataFields.valueX = field;
      series.dataFields.categoryY = "Title";
      series.stacked = true;
      series.name = name;
      series.columns.template.tooltipText = name
        ? `${name}: [bold]{valueY}[/]  ${option.symbol}`
        : ` [bold]{valueY}[/]  ${option.symbol}`;
      series.columns.template.maxWidth = 50;

      let labelBullet = series.bullets.push(new am4charts.LabelBullet());
      labelBullet.locationX = 0.5;
      labelBullet.label.text = "{valueX}";
      labelBullet.label.fill = am4core.color("#fff");

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
    }

    //data
    if (data.length === 1) {
      let newData = [];
      for (let i = 0; i < option.columns.length; i++) {
        const element = option.columns[i];

        newData.push({
          ...data[0],
          Title: element.title,
          Value: data[0][element.columnName],
        });
      }
      createSeries("Value", "");
      chart.data = newData;
    } else {
      option?.columns?.forEach((item) => {
        createSeries(item.columnName, item.title);
      });

      chart.data = data;
    }

    // Cursor
    chart.cursor = new am4charts.XYCursor();
    return chart;
  },
};
