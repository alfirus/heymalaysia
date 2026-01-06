import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';

const HIGHLIGHTS = [
  { id: '1', name: 'Mount Kinabalu', category: 'Nature', image: 'https://images.unsplash.com/photo-1549490349-8643362247b5?w=500&q=80' },
  { id: '2', name: 'Petronas Towers', category: 'Urban', image: 'https://images.unsplash.com/photo-1563806935833-2af475bd29cc?w=500&q=80' },
  { id: '3', name: 'Melaka City', category: 'Heritage', image: 'https://images.unsplash.com/photo-1596422846543-75c6fc197f07?w=500&q=80' },
];

export const DailyHighlights = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Daily Highlights</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {HIGHLIGHTS.map((item) => (
          <TouchableOpacity key={item.id} style={styles.card}>
            <Image source={{ uri: item.image }} style={styles.image} />
            <View style={styles.info}>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.category}>{item.category}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 24,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: '#0f172a',
    marginBottom: 12,
    paddingHorizontal: 16,
  },
  scrollContent: {
    paddingHorizontal: 16,
    gap: 16,
  },
  card: {
    width: 200,
    height: 140,
    borderRadius: 12,
    backgroundColor: '#fff',
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  image: {
    width: '100%',
    height: 90,
  },
  info: {
    padding: 8,
  },
  name: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1e293b',
  },
  category: {
    fontSize: 12,
    color: '#64748b',
  },
});
