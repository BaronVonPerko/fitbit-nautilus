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
