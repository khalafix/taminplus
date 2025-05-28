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

    let categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
    categoryAxis.dataFields.category = "Title";
    categoryAxis.renderer.labels.template.rotation = getRotation();
    categoryAxis.renderer.grid.template.location = 0;
    categoryAxis.renderer.minGridDistance = 40;
    categoryAxis.renderer.cellStartLocation = 0.1;
    categoryAxis.renderer.cellEndLocation = 0.9;
    categoryAxis.renderer.labels.template.verticalCenter = "center";
    categoryAxis.renderer.labels.template.horizontalCenter = "middle";

    let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.min = 0;

    // Create series
    function createSeries(field, name, stacked) {
      let series = chart.series.push(new am4charts.ColumnSeries());
      series.dataFields.valueY = field;
      series.dataFields.categoryX = "Title";
      series.name = name;
      series.columns.template.tooltipText = name
        ? `${name}: [bold]{valueY}[/]  ${option.symbol}`
        : ` [bold]{valueY}[/]  ${option.symbol}`;
      series.columns.template.maxWidth = 50;

      series.stacked = stacked;
      series.columns.template.width = am4core.percent(95);
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

    // Add legend
    chart.legend = new am4charts.Legend();
    chart.legend.position = "top";
    chart.legend.paddingBottom = 20;
    chart.legend.labels.template.maxWidth = 95;

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
        createSeries(item.columnName, item.title, true);
      });

      chart.data = data;
    }

    // Cursor
    chart.cursor = new am4charts.XYCursor();
    return chart;
  },
};
