import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import axios from 'axios';
import Constants from 'expo-constants';

// Fallback host if not configured
const API_URL = Constants.expoConfig?.extra?.apiUrl || 'http://localhost:5555/api'; // Adjust based on env

const HistoryTimelineScreen = () => {
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      // In a real app, use the proper configured axios instance with baseURL
      // For now, mocking logic or trying to hit endpoint:
      // const res = await axios.get(`${API_URL}/history`);
      // setEvents(res.data);
      
      // MOCK DATA for MVP as backend might be empty or local
      setTimeout(() => {
          setEvents([
              { id: '1', year: '1400', title: 'Founding of Malacca', description: 'Parameswara founds the Sultanate of Malacca.' },
              { id: '2', year: '1511', title: 'Portuguese Conquest', description: 'Alfonso de Albuquerque captures Malacca.' },
              { id: '3', year: '1641', title: 'Dutch Takeover', description: 'The Dutch capture Malacca from the Portuguese.' },
              { id: '4', year: '1786', title: 'British Establishment', description: 'Francis Light establishes a trading post in Penang.' },
              { id: '5', year: '1957', title: 'Merdeka (Independence)', description: 'Federation of Malaya gains independence from British rule.' },
              { id: '6', year: '1963', title: 'Formation of Malaysia', description: 'Malaya, Sabah, Sarawak, and Singapore merge.' },
          ]);
          setLoading(false);
      }, 1000);

    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  const renderItem = ({ item, index }: any) => (
    <View style={styles.itemContainer}>
        <View style={styles.dateBubble}>
            <Text style={styles.yearText}>{item.year}</Text>
        </View>
        <View style={styles.line} />
        <View style={styles.contentCard}>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.description}>{item.description}</Text>
        </View>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#EA580C" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Historical Timeline</Text>
      <FlatList
        data={events}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    padding: 20,
    paddingTop: 60,
    backgroundColor: '#FFF7ED',
    color: '#9A3412',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  listContent: {
    padding: 20,
  },
  itemContainer: {
    flexDirection: 'row',
    marginBottom: 24,
  },
  dateBubble: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#EA580C',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2,
  },
  yearText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 14,
  },
  line: {
    position: 'absolute',
    left: 29, // Half of width (30) - half of line (1)
    top: 60,
    bottom: -24,
    width: 2,
    backgroundColor: '#FFEDD5',
    zIndex: 1,
  },
  contentCard: {
    flex: 1,
    marginLeft: 16,
    backgroundColor: '#FAFAFA',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1E293B',
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    color: '#64748B',
    lineHeight: 20,
  },
});

export default HistoryTimelineScreen;
