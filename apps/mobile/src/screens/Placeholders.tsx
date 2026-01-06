import { View, Text, StyleSheet } from 'react-native';
import { Button } from '../components/ui/Button';

function createPlaceholderScreen(name: string) {
  return function Screen() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>{name}</Text>
        <Text style={styles.subtitle}>Coming Soon</Text>
      </View>
    );
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
  },
});

export const ExploreScreen = createPlaceholderScreen('Explore Places');
export const LearnScreen = createPlaceholderScreen('Learn Culture');
export const EventsScreen = createPlaceholderScreen('Events');
export const ProfileScreen = ({ navigation }: any) => (
	<View style={styles.container}>
		<Text style={styles.title}>My Profile</Text>
		<View style={{ marginTop: 20, width: '80%', gap: 10 }}>
			<Button title="Submit New Event" onPress={() => navigation.navigate('EventSubmission')} />
			<Button title="Advertise with Us" onPress={() => navigation.navigate('AdSubmission')} />
			<Button title="My Messages" variant="outline" onPress={() => navigation.navigate('ChatList')} />
		</View>
	</View>
);
