function mySettings(props) {
  return (
    <Page>
      <Section
        title={
          <Text bold align="center">
            Nautilus Settings
          </Text>
        }
      />
    </Page>
  );
}

registerSettingsPage(mySettings);
