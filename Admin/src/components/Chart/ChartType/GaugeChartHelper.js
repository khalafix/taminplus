import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";

export default {
  config: (
    chart,
    data,
    option,
    //object
    handleClick
  ) => {
    //click events
    chart.clickable = true;
    chart.events.on("hit", function (ev) {
      handleClick({ ...data, isClickable: option.isClickable });
    });

    let axis = chart.xAxes.push(new am4charts.ValueAxis());
    axis.min = 0;
    axis.max = 100;
    axis.strictMinMax = true;
    /*  axis.renderer.radius = am4core.percent(80);
    axis.renderer.inside = true;
    axis.renderer.line.strokeOpacity = 1;
    axis.renderer.ticks.template.disabled = false;
    axis.renderer.ticks.template.strokeOpacity = 1;
    axis.renderer.ticks.template.length = 10;
    axis.renderer.grid.template.disabled = true;
    axis.renderer.labels.template.radius = 40; */
    axis.renderer.labels.template.adapter.add("text", function (text) {
      return text;
    });

    let gradient = new am4core.LinearGradient();
    gradient.stops.push({ color: am4core.color("red") });
    gradient.stops.push({ color: am4core.color("yellow") });
    gradient.stops.push({ color: am4core.color("green") });

    axis.renderer.line.stroke = gradient;
    axis.renderer.line.strokeWidth = 15;
    axis.renderer.line.strokeOpacity = 1;

    let label = chart.radarContainer.createChild(am4core.Label);
    label.isMeasured = false;
    label.fontSize = 13;
    label.x = am4core.percent(50);
    label.y = 30;
    label.horizontalCenter = "middle";
    label.verticalCenter = "bottom";
    label.text = `${data.Value} ${option.symbol}`;

    /**
     * Hand
     */

    var hand = chart.hands.push(new am4charts.ClockHand());
    hand.showValue(data.Value > 100 ? 100 : data.Value, am4core.ease.cubicOut);

    chart.innerRadius = am4core.percent(82);
    chart.rtl = true;

    return chart;
  },
};
