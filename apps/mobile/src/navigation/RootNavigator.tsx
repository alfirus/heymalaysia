import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TabNavigator from './TabNavigator';

// Define the root stack param list
export type RootStackParamList = {
	Main: undefined;
	Auth: undefined;
	EventSubmission: undefined;
	AdSubmission: undefined;
	ChatList: undefined;
	Chat: undefined;
	PlaceDetail: { placeId: string };
	HistoryTimeline: undefined;
	CulturalArticles: undefined;
	EtiquetteGuide: undefined;
	LanguageBasics: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function RootNavigator() {
	return (
		<Stack.Navigator screenOptions={{ headerShown: false }}>
			<Stack.Screen name="Main" component={TabNavigator} />
			<Stack.Screen name="EventSubmission" component={require('../screens/forms/EventSubmissionScreen').default} />
			<Stack.Screen name="AdSubmission" component={require('../screens/forms/AdSubmissionScreen').default} />
			<Stack.Screen name="ChatList" component={require('../screens/chat/ChatListScreen').default} />
			<Stack.Screen name="Chat" component={require('../screens/chat/ChatScreen').default} />
			<Stack.Screen name="PlaceDetail" component={require('../screens/explore/PlaceDetailScreen').default} />

			{/* Learn Tab Screens */}
			<Stack.Screen name="HistoryTimeline" component={require('../screens/learn/HistoryTimelineScreen').default} />
			<Stack.Screen name="CulturalArticles" component={require('../screens/learn/CulturalArticlesScreen').default} />
			<Stack.Screen name="EtiquetteGuide" component={require('../screens/learn/EtiquetteGuideScreen').default} />
			<Stack.Screen name="LanguageBasics" component={require('../screens/learn/LanguageBasicsScreen').default} />
		</Stack.Navigator>
	);
}
