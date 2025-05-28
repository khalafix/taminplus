import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";

export default {
  config: (
    chart,
    data,
    option,
    handleClick //object
  ) => {
    chart.hiddenState.properties.opacity = 0; // this makes initial fade in effect

    let categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
    categoryAxis.renderer.grid.template.location = 0;
    categoryAxis.dataFields.category = "Title";
    categoryAxis.renderer.minGridDistance = 40;
    categoryAxis.renderer.labels.template.fontSize = 10;

    let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());

    // Create series
    function createSeries(field, name) {
      let series = chart.series.push(new am4charts.CurvedColumnSeries());
      series.dataFields.categoryX = "Title";
      series.dataFields.valueY = field;
      /*       series.tooltipText = "{valueY.value}"; */
      series.tooltipText = name
        ? `{name}: [bold]{valueY}[/]  ${option.symbol}`
        : ` [bold]{valueY}[/]  ${option.symbol}`;
      series.columns.template.strokeOpacity = 0;
      series.name = name;
      series.columns.template.fillOpacity = 0.75;
      series.columns.template.maxWidth = 50;
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

      let hoverState = series.columns.template.states.create("hover");
      hoverState.properties.fillOpacity = 1;
      hoverState.properties.tension = 0.4;

      /*  series.columns.template.adapter.add("fill", function (fill, target) {
         return chart.colors.getIndex(target.dataItem.index);
       });
     } */
    }
    chart.cursor = new am4charts.XYCursor();

    // Create series
    option?.columns?.forEach((item) => {
      createSeries(item.columnName, item.title);
    });

    //legend
    if (option?.columns.length <= 4) {
      chart.legend = new am4charts.Legend();
      chart.legend.position = "top";
      chart.legend.paddingBottom = 20;
      chart.legend.labels.template.maxWidth = 95;
    }

    //zome
    /*     chart.scrollbarX = new am4core.Scrollbar(); */

    chart.data = data;
    chart.rtl = true;

    return chart;
  },
};
