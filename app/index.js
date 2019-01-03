import clock from "clock";
import document from "document";

clock.granularity = "minutes";
clock.ontick = evt => {
  let hours = evt.date.getHours();
  let minutes = evt.date.getMinutes();

  document.getElementById("clock").text = `${hours}:${minutes}`;
};
