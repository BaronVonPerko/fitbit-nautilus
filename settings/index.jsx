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
            { name: "Heart Rate", value: "getHeartRate" }
          ]}
        />
      </Section>
    </Page>
  );
}

registerSettingsPage(mySettings);
