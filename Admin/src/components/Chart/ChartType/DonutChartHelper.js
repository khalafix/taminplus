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
      let pieSeries = chart.series.push(new am4charts.PieSeries());
      pieSeries.dataFields.value = value;
      pieSeries.dataFields.category = "Title";
      pieSeries.innerRadius = am4core.percent(50);
      pieSeries.ticks.template.disabled = true;
      pieSeries.labels.template.disabled = true;

      let rgm = new am4core.RadialGradientModifier();
      rgm.brightnesses.push(-0.8, -0.8, -0.5, 0, -0.5);
      pieSeries.slices.template.fillModifier = rgm;
      pieSeries.slices.template.strokeModifier = rgm;
      pieSeries.slices.template.strokeOpacity = 0.4;
      pieSeries.slices.template.strokeWidth = 0;

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
    chart.legend = new am4charts.Legend();

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
