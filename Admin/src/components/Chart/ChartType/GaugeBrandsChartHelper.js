import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";

const bandsCount = 5;
const getLowScoreAt = (min = 0, max = 100, index) => {
  return ((max - min) / bandsCount) * index + min;
};
const getHighScoreAt = (min = 0, max = 100, index) => {
  return ((max - min) / bandsCount) * (index + 1) + min;
};

/**
Grading Lookup
 */
const lookUpGrade = (lookupScore, grades) => {
  for (let i = 0; i < grades.length; i++) {
    if (
      grades[i].lowScore < lookupScore &&
      grades[i].highScore >= lookupScore
    ) {
      return grades[i];
    }
  }
  return { color: "#000" };
};

export default {
  config: (chart, data, min, max) => {
    chart.innerRadius = -15;

    const chartMin = min ?? 0;
    const chartMax = max ?? 100;

    const cleanedData = {
      score: data[0].value,
      gradingData: [
        {
          color: "#ee1f25",
          lowScore: getLowScoreAt(min, max, 0),
          highScore: getHighScoreAt(min, max, 0),
        },
        {
          color: "#fdae19",
          lowScore: getLowScoreAt(min, max, 1),
          highScore: getHighScoreAt(min, max, 1),
        },
        {
          color: "#f3eb0c",
          lowScore: getLowScoreAt(min, max, 2),
          highScore: getHighScoreAt(min, max, 2),
        },
        {
          color: "#54b947",
          lowScore: getLowScoreAt(min, max, 3),
          highScore: getHighScoreAt(min, max, 3),
        },
        {
          color: "#0f9747",
          lowScore: getLowScoreAt(min, max, 4),
          highScore: getHighScoreAt(min, max, 4),
        },
      ],
    };

    chart.hiddenState.properties.opacity = 0;
    chart.fontSize = 11;
    chart.innerRadius = am4core.percent(80);
    chart.resizable = true;

    const axis = chart.xAxes.push(new am4charts.ValueAxis());
    axis.min = chartMin;
    axis.max = chartMax;
    axis.strictMinMax = true;
    axis.renderer.radius = am4core.percent(80);
    axis.renderer.inside = true;
    axis.renderer.line.strokeOpacity = 0.1;
    axis.renderer.ticks.template.disabled = true;
    axis.renderer.ticks.template.strokeOpacity = 1;
    axis.renderer.ticks.template.strokeWidth = 0.5;
    axis.renderer.ticks.template.length = 5;
    axis.renderer.grid.template.disabled = true;
    axis.renderer.labels.template.disabled = true;
    axis.renderer.labels.template.radius = am4core.percent(15);
    axis.renderer.labels.template.fontSize = "0.9em";

    const axis2 = chart.xAxes.push(new am4charts.ValueAxis());
    axis2.min = min ?? 0;
    axis2.max = max ?? 0;
    axis2.strictMinMax = true;
    axis2.renderer.labels.template.disabled = true;
    axis2.renderer.ticks.template.disabled = true;
    axis2.renderer.grid.template.disabled = false;
    axis2.renderer.grid.template.opacity = 0.5;
    axis2.renderer.labels.template.bent = false;
    axis2.renderer.labels.template.fill = am4core.color("#000");
    axis2.renderer.labels.template.fontWeight = "bold";
    axis2.renderer.labels.template.fillOpacity = 0.8;

    function createLabel(label, deg) {
      const range = axis2.axisRanges.create();
      range.value = deg;
      range.grid.disabled = true;
      range.label.text = label;
      range.label.inside = false;
    }

    createLabel(chartMin.toString(), chartMin);
    createLabel(chartMax.toString(), chartMax);

    for (const grading of cleanedData.gradingData) {
      const range = axis2.axisRanges.create();
      range.axisFill.fill = am4core.color(grading.color);
      range.axisFill.fillOpacity = 0.8;
      range.axisFill.zIndex = -1;
      range.value = grading.lowScore > chartMin ? grading.lowScore : chartMin;
      range.endValue =
        grading.highScore < chartMax ? grading.highScore : chartMax;
      range.grid.strokeOpacity = 0;
      range.label.inside = true;
      range.label.text = "";
      range.label.inside = true;
      range.label.location = 0.5;
      range.label.inside = true;
      range.label.paddingBottom = -5; // ~half font size
      range.label.fontSize = "0.9em";
    }

    const matchingGrade = lookUpGrade(
      cleanedData.score,
      cleanedData.gradingData
    );

    const label = chart.radarContainer.createChild(am4core.Label);
    label.isMeasured = false;
    label.fontSize = "1.5rem";
    label.x = am4core.percent(50);
    label.paddingBottom = 0;
    label.horizontalCenter = "middle";
    label.verticalCenter = "bottom";
    //label.dataItem = data;
    label.text = cleanedData.score;
    label.fill = am4core.color(matchingGrade.color);

    /**
     * Hand
     */

    const hand = chart.hands.push(new am4charts.ClockHand());
    hand.axis = axis2;
    hand.innerRadius = am4core.percent(55);
    hand.startWidth = 8;
    hand.pin.disabled = true;
    hand.value = cleanedData.score;
    hand.fill = am4core.color("#444");
    hand.stroke = am4core.color("#000");

    hand.events.on("positionchanged", function () {
      label.text = axis2.positionToValue(hand.currentPosition).toFixed(1);
      const matchingGrade = lookUpGrade(
        axis.positionToValue(hand.currentPosition),
        cleanedData.gradingData
      );
      label.fill = am4core.color(matchingGrade.color);
    });

    setTimeout(function () {
      const value = cleanedData.score;
      hand.showValue(value, 1000, am4core.ease.cubicOut);
    }, 1000);

    return chart;
  },
  reloadAnimation: (data, chart) => {
    const value = data[0].value;
    const hand = chart.hands.getIndex(0);

    const animation = new am4core.Animation(
      hand,
      {
        property: "value",
        to: value,
      },
      1000,
      am4core.ease.cubicOut
    );
    animation.start();
  },
};
