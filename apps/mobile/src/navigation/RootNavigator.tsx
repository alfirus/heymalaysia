import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TabNavigator from './TabNavigator';

// Define the root stack param list
export type RootStackParamList = {
  Main: undefined;
  Auth: undefined;
  EventSubmission: undefined;
  AdSubmission: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function RootNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Main" component={TabNavigator} />
      <Stack.Screen name="EventSubmission" component={require('../screens/forms/EventSubmissionScreen').default} />
      <Stack.Screen name="AdSubmission" component={require('../screens/forms/AdSubmissionScreen').default} />
    </Stack.Navigator>
  );
}
