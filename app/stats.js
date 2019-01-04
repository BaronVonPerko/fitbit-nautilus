import { goals, today } from "user-activity";
import { HeartRateSensor } from "heart-rate";
import { me } from "appbit";

export default class Stats {
  constructor() {
    if (me.permissions.granted("access_heart_rate")) {
      this.hrm = new HeartRateSensor();
      this.hrm.start();

      this.heartRate = "--";

      this.hrm.onreading = () => {
        this.heartRate = this.hrm.heartRate;
      };
    }
  }

  getSteps() {
    return {
      text: today.local.steps,
      sweepAngle: (today.local.steps / goals.steps) * 360
    };
  }

  getHeartRate() {
    if (!this.hrm) return { text: "--", sweepAngle: 0 };
    else
      return {
        text: this.heartRate,
        sweepAngle: (this.heartRate / 180) * 360
      };
  }
}