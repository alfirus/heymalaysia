import React from 'react';
import { StyleSheet, ScrollView, View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { WeatherWidget } from '../../components/home/WeatherWidget';
import { AdBanner } from '../../components/home/AdBanner';
import { DailyHighlights } from '../../components/home/DailyHighlights';

import { CommunityWidget } from '../../components/home/CommunityWidget';
import { DidYouKnowCard } from '../../components/home/DidYouKnowCard';

export default function HomeScreen({ navigation }: any) {
	return (
		<SafeAreaView style={styles.container}>
			<ScrollView contentContainerStyle={styles.scrollContent}>
				{/* Header */}
				<View style={styles.header}>
					<View>
						<Text style={styles.greeting}>Selamat Datang,</Text>
						<Text style={styles.appName}>Hey Malaysia</Text>
					</View>
					<View style={styles.avatar} />
				</View>

				{/* Ad Banner - Top Placement */}
				<View style={styles.section}>
					<AdBanner />
				</View>

				{/* Weather Widget */}
				<View style={styles.section}>
					<WeatherWidget />
				</View>

				{/* Daily Highlights */}
				<DailyHighlights />

				{/* Did You Know? */}
				<DidYouKnowCard />

				{/* Community Feeds */}
				<CommunityWidget />
			</ScrollView>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
	},
	scrollContent: {
		paddingBottom: 20,
	},
	header: {
		padding: 20,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		marginBottom: 8,
	},
	greeting: {
		fontSize: 16,
		color: '#64748b',
	},
	appName: {
		fontSize: 28,
		fontWeight: 'bold',
		color: '#0f172a',
	},
	avatar: {
		width: 48,
		height: 48,
		borderRadius: 24,
		backgroundColor: '#cbd5e1',
	},
	section: {
		paddingHorizontal: 16,
		marginBottom: 8,
	},
});
