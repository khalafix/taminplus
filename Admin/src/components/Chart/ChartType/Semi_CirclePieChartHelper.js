import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";

export default {
  config: (
    chart,
    data,
    option, //object
    handleClick
  ) => {
    // Add and configure Series
    function createSeries(value, name) {
      chart.radius = am4core.percent(70);
      chart.innerRadius = am4core.percent(40);
      chart.startAngle = 180;
      chart.endAngle = 360;

      let series = chart.series.push(new am4charts.PieSeries());
      series.dataFields.value = value;
      series.dataFields.category = "Title";

      series.slices.template.cornerRadius = 10;
      series.slices.template.innerCornerRadius = 7;
      series.slices.template.draggable = true;
      series.slices.template.inert = true;
      series.alignLabels = false;

      series.hiddenState.properties.startAngle = 90;
      series.hiddenState.properties.endAngle = 90;

      chart.legend = new am4charts.Legend();
      //click events
      series.slices.template.events.on(
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

    chart.cursor = new am4charts.XYCursor();
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
      chart.data = data;
      createSeries(option.columns[0].columnName, "");
    }

    return chart;
  },
};
