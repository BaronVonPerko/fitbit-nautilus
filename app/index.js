import clock from "clock";
import document from "document";
import { preferences } from "user-settings";
import { stats } from "app/stats";
import Stats from "./stats";

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

let themes = {
  blue: {
    main: "#0099ff",
    secondary: "#0040bb",
    gradient: "#000972"
  },
  red: {
    main: "#ff1a1a",
    secondary: "#cc1a1a",
    gradient: "#661a1a"
  }
};
let currentTheme = "blue";

let settings = {
  topLeft: "getSteps",
  topRight: "getPower",
  bottomLeft: "getCalories",
  bottomRight: "getFloors"
};

elementIds.forEach(element => {
  elements[element] = document.getElementById(element);
});

function setupColors() {
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
setupColors();
