import { settingsStorage } from "settings";
import * as messaging from "messaging";

console.log(settingsStorage.key(0));
console.log(settingsStorage.getItem("topLeft"));

settingsStorage.onchange = event => console.log(event.newValue);

// Settings have been changed
settingsStorage.onchange = evt => sendValue(evt.key, evt.newValue);

function sendValue(key, val) {
  if (val) {
    sendSettingData({
      key,
      value: JSON.parse(val).values[0].value
    });
  }
}
function sendSettingData(data) {
  if (messaging.peerSocket.readyState === messaging.peerSocket.OPEN) {
    messaging.peerSocket.send(data);
  } else {
    console.log("No peerSocket connection");
  }
}
