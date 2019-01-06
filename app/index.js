import clock from "clock";
import document from "document";
import { preferences } from "user-settings";
import { stats } from "app/stats";
import Stats from "./stats";

let elementIds = [
  "clock",
  "topLeftText",
  "topLeftArc",
  "topLeftArcBG",
  "topRightText",
  "topRightArc",
  "topRightArcBG",
  "bottomRightText",
  "bottomRightArc",
  "bottomRightArcBG",
  "bottomLeftText",
  "bottomLeftArc",
  "bottomLeftArcBG"
];
let elements = {};

let settings = {
  topLeft: "getSteps",
  topRight: "getPower",
  bottomLeft: "getCalories",
  bottomRight: "getFloors"
};

elementIds.forEach(element => {
  elements[element] = document.getElementById(element);
});

let stats = new Stats();

function setupStats() {
  setInterval(() => {
    Object.keys(settings).forEach(key => {
      if (!settings[key]) {
        elements[`${key}ArcBG`].style.opacity = 0;
        elements[`${key}Arc`].style.opacity = 0;
        elements[`${key}Text`].style.opacity = 0;
      } else {
        elements[`${key}ArcBG`].style.opacity = 0.6;
        elements[`${key}Arc`].style.opacity = 0.6;
        elements[`${key}Text`].style.opacity = 0.6;

        let values = stats[settings[key]]();

        elements[`${key}Text`].text = values.text;
        elements[`${key}Arc`].sweepAngle = values.sweepAngle;
      }
    });
  }, 1000);
}

function setupClock() {
  clock.granularity = "minutes";
  clock.ontick = evt => {
    let hours = evt.date.getHours();
    if (preferences.clockDisplay === "12h") {
      hours > 12 ? (hours -= 12) : hours;
    }

    hours = ("0" + hours).slice(-2);
    let minutes = ("0" + evt.date.getMinutes()).slice(-2);

    elements.clock.text = `${hours}:${minutes}`;
  };
}

setupClock();
setupStats();
