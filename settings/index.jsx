function mySettings(props) {
  return (
    <Page>
      <Section
        title={
          <Text bold align="center">
            Nautilus Settings
          </Text>
        }
      >
        <Select
          label="Top Left"
          selectViewTitle="Top Left Metric"
          settingsKey="topLeft"
          options={[
            { name: "--None--", value: null },
            { name: "Steps", value: "getSteps" },
            { name: "Heart Rate", value: "getHeartRate" },
            { name: "Floors", value: "getFloors" },
            { name: "Active Minutes", value: "getActiveMinutes" },
            { name: "Calories", value: "getCalories" },
            { name: "Distance", value: "getDistance" },
            { name: "Battery", value: "getPower" }
          ]}
        />
        <Select
          label="Top Right"
          selectViewTitle="Top Right Metric"
          settingsKey="topRight"
          options={[
            { name: "--None--", value: null },
            { name: "Steps", value: "getSteps" },
            { name: "Heart Rate", value: "getHeartRate" },
            { name: "Floors", value: "getFloors" },
            { name: "Active Minutes", value: "getActiveMinutes" },
            { name: "Calories", value: "getCalories" },
            { name: "Distance", value: "getDistance" },
            { name: "Battery", value: "getPower" }
          ]}
        />
        <Select
          label="Bottom Left"
          selectViewTitle="Bottom Left Metric"
          settingsKey="bottomLeft"
          options={[
            { name: "--None--", value: null },
            { name: "Steps", value: "getSteps" },
            { name: "Heart Rate", value: "getHeartRate" },
            { name: "Floors", value: "getFloors" },
            { name: "Active Minutes", value: "getActiveMinutes" },
            { name: "Calories", value: "getCalories" },
            { name: "Distance", value: "getDistance" },
            { name: "Battery", value: "getPower" }
          ]}
        />
        <Select
          label="Bottom Right"
          selectViewTitle="Bottom Right Metric"
          settingsKey="bottomRight"
          options={[
            { name: "--None--", value: null },
            { name: "Steps", value: "getSteps" },
            { name: "Heart Rate", value: "getHeartRate" },
            { name: "Floors", value: "getFloors" },
            { name: "Active Minutes", value: "getActiveMinutes" },
            { name: "Calories", value: "getCalories" },
            { name: "Distance", value: "getDistance" },
            { name: "Battery", value: "getPower" }
          ]}
        />
      </Section>
    </Page>
  );
}

registerSettingsPage(mySettings);
