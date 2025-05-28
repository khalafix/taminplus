import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";

export default {
  config: (
    chart,
    data,
    option, //object
    handleClick,
    typeAction
  ) => {
    // Add and configure Series
    function createSeries(value, name) {
      let pieSeries = chart.series.push(new am4charts.PieSeries());
      pieSeries.dataFields.value = value;
      pieSeries.dataFields.category = "Title";
      pieSeries.slices.template.stroke = am4core.color("#fff");
      pieSeries.slices.template.strokeOpacity = 1;

      // This creates initial animation
      pieSeries.hiddenState.properties.opacity = 1;
      pieSeries.hiddenState.properties.endAngle = -90;
      pieSeries.hiddenState.properties.startAngle = -90;

      //click events
      pieSeries.slices.template.events.on(
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

    chart.hiddenState.properties.radius = am4core.percent(0);
    // Add a legend
    if (typeAction === "chart") {
      chart.legend = new am4charts.Legend();
      chart.legend.position = "bottom";
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

    chart.rtl = true;
    chart.padding(10, 100, 10, 100);
    return chart;
  },
};
