import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";

export default {
  config: (
    chart,
    data,
    option,
    handleClick //object
  ) => {
    // Populate data
    for (var i = 0; i < data.length - 1; i++) {
      let total = 0;
      for (let j = 0; j < option.columns?.length; j++) {
        total += data[i][option.columns[j].columnName];
      }
      data[i].valueNext = total;
      data[i].total = total;
    }

    // Create axes
    let categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
    categoryAxis.dataFields.category = "Title";
    categoryAxis.renderer.grid.template.location = 0;
    categoryAxis.renderer.minGridDistance = 30;

    let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.min = 0;

    // Create series
    function createSeries(value, name) {
      // Create series
      let series = chart.series.push(new am4charts.ColumnSeries());
      series.dataFields.valueY = value;
      series.dataFields.categoryX = "Title";

      // Add series for showing variance arrows
      let series2 = chart.series.push(new am4charts.ColumnSeries());
      series2.dataFields.valueY = "total";
      series2.dataFields.openValueY = value;
      series2.dataFields.categoryX = name;
      series2.columns.template.width = 1;
      series2.fill = am4core.color("#555");
      series2.stroke = am4core.color("#555");

      // Add a triangle for arrow tip
      let arrow = series2.bullets.push(new am4core.Triangle());
      arrow.width = 10;
      arrow.height = 10;
      arrow.horizontalCenter = "middle";
      arrow.verticalCenter = "top";
      arrow.dy = -1;

      // Set up a rotation adapter which would rotate the triangle if its a negative change
      arrow.adapter.add("rotation", function (rotation, target) {
        return getVariancePercent(target.dataItem) < 0 ? 180 : rotation;
      });

      // Set up a rotation adapter which adjusts Y position
      arrow.adapter.add("dy", function (dy, target) {
        return getVariancePercent(target.dataItem) < 0 ? 1 : dy;
      });

      // Add a label
      let label = series2.bullets.push(new am4core.Label());
      label.padding(10, 10, 10, 10);
      label.text = "";
      label.fill = am4core.color("#0c0");
      label.strokeWidth = 0;
      label.horizontalCenter = "middle";
      label.verticalCenter = "bottom";
      label.fontWeight = "bolder";

      // Adapter for label text which calculates change in percent
      label.adapter.add("textOutput", function (text, target) {
        let percent = getVariancePercent(target.dataItem);
        return percent ? percent + "%" : text;
      });

      // Adapter which shifts the label if it's below the variance column
      label.adapter.add("verticalCenter", function (center, target) {
        return getVariancePercent(target.dataItem) < 0 ? "top" : center;
      });

      // Adapter which changes color of label to red
      label.adapter.add("fill", function (fill, target) {
        return getVariancePercent(target.dataItem) < 0
          ? am4core.color("#c00")
          : fill;
      });

      function getVariancePercent(dataItem) {
        if (dataItem) {
          let value = dataItem.valueY;
          let openValue = dataItem.openValueY;
          let change = value - openValue;
          return Math.round((change / openValue) * 100);
        }
        return 0;
      }
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

    /*   option?.columns?.forEach((item) => {
      createSeries(item.columnName, item.title);
    }); */
    createSeries("total", "");
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
