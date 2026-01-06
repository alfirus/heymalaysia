import React from 'react';
import { StyleSheet, View, Text, FlatList, TouchableOpacity, Image } from 'react-native';
import { Calendar, MapPin, Clock } from 'lucide-react-native';

// Mock Data for MVP
const MOCK_EVENTS = [
  {
    id: '1',
    title: 'Penang Food Festival',
    date: '2024-04-12',
    time: '10:00 AM - 10:00 PM',
    location: 'George Town, Penang',
    image: 'https://images.unsplash.com/photo-1554695886-c3cc2926725e?auto=format&fit=crop&q=80&w=2600&ixlib=rb-4.0.3', // Generic food festival image
    category: 'Cultural'
  },
  {
    id: '2',
    title: 'KL Marathon 2024',
    date: '2024-05-05',
    time: '4:00 AM - 12:00 PM',
    location: 'Dataran Merdeka, KL',
    image: 'https://images.unsplash.com/photo-1532444458054-0188dd1e5cf4?auto=format&fit=crop&q=80&w=2600&ixlib=rb-4.0.3', // Generic marathon image
    category: 'Sports'
  },
  {
    id: '3',
    title: 'Rainforest World Music Festival',
    date: '2024-06-28',
    time: '2:00 PM - 12:00 AM',
    location: 'Sarawak Cultural Village',
    image: 'https://images.unsplash.com/photo-1549646439-fb3d6411ab1b?auto=format&fit=crop&q=80&w=2600&ixlib=rb-4.0.3', 
    category: 'Music'
  }
];

export function EventList({ onlyNearby = false }: { onlyNearby?: boolean }) {
  const filteredEvents = onlyNearby 
    ? MOCK_EVENTS.filter(e => e.location.includes('Penang')) // Mock GPS logic
    : MOCK_EVENTS;

  const renderItem = ({ item }: { item: typeof MOCK_EVENTS[0] }) => (
    <TouchableOpacity style={styles.card}>
      <Image source={{ uri: item.image }} style={styles.image} resizeMode="cover" />
      <View style={styles.content}>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{item.category}</Text>
        </View>
        <Text style={styles.title}>{item.title}</Text>
        
        <View style={styles.row}>
          <Calendar size={14} color="#64748b" />
          <Text style={styles.infoText}>{item.date}</Text>
        </View>

        <View style={styles.row}>
          <Clock size={14} color="#64748b" />
          <Text style={styles.infoText}>{item.time}</Text>
        </View>
        
        <View style={styles.row}>
          <MapPin size={14} color="#64748b" />
          <Text style={styles.infoText}>{item.location}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <FlatList
      data={filteredEvents}
      renderItem={renderItem}
      keyExtractor={item => item.id}
      contentContainerStyle={styles.listContent}
      showsVerticalScrollIndicator={false}
    />
  );
}

const styles = StyleSheet.create({
  listContent: {
    padding: 16,
    paddingBottom: 80, // Space for FAB
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  image: {
    width: '100%',
    height: 150,
  },
  content: {
    padding: 16,
  },
  badge: {
    position: 'absolute',
    top: 12,
    right: 12,
    backgroundColor: 'rgba(0,0,0,0.6)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    zIndex: 1,
  },
  // Re-define badge to overlay image
  // Actually, let's keep it simple.
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#0f172a',
    marginBottom: 8,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  infoText: {
    marginLeft: 6,
    fontSize: 14,
    color: '#64748b',
  },
  badgeText: {
      fontSize: 12,
      fontWeight: 'bold',
      color: '#fff',
  }
});
