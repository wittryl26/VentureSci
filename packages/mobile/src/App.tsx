import React from 'react';
import { SafeAreaView, Text, View } from 'react-native';

export const App = (): JSX.Element => {
  return (
    <SafeAreaView>
      <View>
        <Text accessibilityRole="header">VentureSci Mobile</Text>
        <Text>Welcome to the VentureSci mobile experience.</Text>
      </View>
    </SafeAreaView>
  );
};

export default App;
