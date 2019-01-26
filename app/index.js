import clock from "clock";
import document from "document";
import { preferences } from "user-settings";
import { stats } from "app/stats";
import Stats from "./stats";
import { themes } from "./themes";
import * as messaging from "messaging";
import * as fs from "fs";
import display from "display";

const filename = "nautilus.txt";

let elementIds = [
  "bg",
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

function getSettings() {
  try {
    return fs.readFileSync(filename, "json").settings;
  } catch (e) {
    console.log(e);
    return {
      topLeft: null,
      topRight: null,
      bottomLeft: null,
      bottomRight: null,
      theme: "blue"
    };
  }
}

function saveSettings(settings) {
  let data = { settings };
  fs.writeFileSync(filename, data, "json");
}

let settings = getSettings();

elementIds.forEach(element => {
  elements[element] = document.getElementById(element);
});

function setupColors() {
  const currentTheme = settings.theme.replace(/"/g, "");

  elements.clock.style.fill = themes[currentTheme].main;
  elements.topLeftText.style.fill = themes[currentTheme].main;
  elements.topLeftArc.style.fill = themes[currentTheme].main;
  elements.topLeftArcBG.style.fill = themes[currentTheme].secondary;
  elements.topRightText.style.fill = themes[currentTheme].main;
  elements.topRightArc.style.fill = themes[currentTheme].main;
  elements.topRightArcBG.style.fill = themes[currentTheme].secondary;
  elements.bottomRightText.style.fill = themes[currentTheme].main;
  elements.bottomRightArc.style.fill = themes[currentTheme].main;
  elements.bottomRightArcBG.style.fill = themes[currentTheme].secondary;
  elements.bottomLeftText.style.fill = themes[currentTheme].main;
  elements.bottomLeftArc.style.fill = themes[currentTheme].main;
  elements.bottomLeftArcBG.style.fill = themes[currentTheme].secondary;
  elements.bg.gradient.colors.c1 = themes[currentTheme].gradient;
}

let stats = new Stats();

function setupStats() {
  loadStats();
  setInterval(loadStats, 1000);
}

messaging.peerSocket.onmessage = function(evt) {
  settings[evt.data.key] = evt.data.value;
  saveSettings(settings);
  loadStats();
  setupColors();
};

function loadStats() {
  Object.keys(settings)
    .filter(key => key !== "theme")
    .forEach(key => {
      if (!settings[key]) {
        elements[`${key}ArcBG`].style.opacity = 0;
        elements[`${key}Arc`].style.opacity = 0;
        elements[`${key}Text`].style.opacity = 0;
      } else {
        elements[`${key}ArcBG`].style.opacity = 0.6;
        elements[`${key}Arc`].style.opacity = 0.6;
        elements[`${key}Text`].style.opacity = 0.6;

        let values = stats[settings[key]]();
        if (values.sweepAngle > 360) values.sweepAngle = 360;
        if (!values.sweepAngle) values.sweepAngle = 0;

        elements[`${key}Text`].text = values.text;
        elements[`${key}Arc`].sweepAngle = values.sweepAngle;
      }
    });
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

function runAnimations() {
  elements.topLeftArc.animate("enable");
  elements.topRightArc.animate("enable");
  elements.bottomLeftArc.animate("enable");
  elements.bottomRightArc.animate("enable");
  elements.bg.animate("enable");
}

display.onchange = () => {
  if (display.on) {
    runAnimations();
  }
};

setupClock();
setupStats();
setupColors();
runAnimations();
