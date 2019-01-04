import clock from "clock";
import document from "document";
import { preferences } from "user-settings";
import { goals, today } from "user-activity";

let elementIds = [
  "clock",
  "topLeftText",
  "topLeftArc",
  "topRightText",
  "topRightArc",
  "bottomRightText",
  "bottomRightArc",
  "bottomLeftText",
  "bottomLeftArc"
];
let elements = {};

elementIds.forEach(element => {
  elements[element] = document.getElementById(element);
});

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

elements.topLeftText.text = today.local.steps;
elements.topLeftArc.sweepAngle = (today.local.steps / goals.steps) * 360;
