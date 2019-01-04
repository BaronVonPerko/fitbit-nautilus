import { goals, today } from "user-activity";

export default class Stats {
  getSteps() {
    return {
      text: today.local.steps,
      sweepAngle: (today.local.steps / goals.steps) * 360
    };
  }
}
