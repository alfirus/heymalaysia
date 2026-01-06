import React from 'react';
import { StyleSheet, View, Text, ScrollView, Image, TouchableOpacity } from 'react-native';
import { Calendar, Clock, MapPin, Share2 } from 'lucide-react-native';
import { WeatherWidget } from '../../components/home/WeatherWidget';

export default function EventDetailScreen({ route, navigation }: any) {
  // Mock data usage if param not fully passed
  // In real app, fetch by ID
  const { event } = route.params || { event: {
      title: 'Penang Food Festival',
      date: '2024-04-12',
      time: '10:00 AM - 10:00 PM',
      location: 'George Town, Penang',
      image: 'https://images.unsplash.com/photo-1554695886-c3cc2926725e?auto=format&fit=crop&q=80&w=2600&ixlib=rb-4.0.3', 
      category: 'Cultural',
      description: 'Join us for the ultimate food experience in Penang, featuring best street food from all over Malaysia.'
  }};

  return (
    <ScrollView style={styles.container}>
      <Image source={{ uri: event.image }} style={styles.image} />
      
      <View style={styles.content}>
        <View style={styles.header}>
            <View style={styles.badge}>
                <Text style={styles.badgeText}>{event.category}</Text>
            </View>
            <TouchableOpacity>
                <Share2 size={24} color="#64748b" />
            </TouchableOpacity>
        </View>

        <Text style={styles.title}>{event.title}</Text>

        <View style={styles.infoRow}>
            <Calendar size={18} color="#2563eb" />
            <Text style={styles.infoText}>{event.date}</Text>
        </View>
        <View style={styles.infoRow}>
            <Clock size={18} color="#2563eb" />
            <Text style={styles.infoText}>{event.time}</Text>
        </View>
        <View style={styles.infoRow}>
            <MapPin size={18} color="#2563eb" />
            <Text style={styles.infoText}>{event.location}</Text>
        </View>

        <View style={styles.section}>
            <Text style={styles.sectionTitle}>About Event</Text>
            <Text style={styles.description}>{event.description}</Text>
        </View>

        <View style={styles.section}>
            <Text style={styles.sectionTitle}>Weather Forecast</Text>
            <Text style={styles.sectionSubtitle}>Predicted weather for {event.date}</Text>
            <WeatherWidget />
        </View>
        
        <TouchableOpacity style={styles.registerButton}>
            <Text style={styles.registerButtonText}>Register Now</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  image: {
    width: '100%',
    height: 250,
  },
  content: {
    padding: 20,
    marginTop: -20,
    backgroundColor: '#fff',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  badge: {
    backgroundColor: '#eff6ff',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  badgeText: {
    color: '#2563eb',
    fontWeight: '600',
    fontSize: 14,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#0f172a',
    marginBottom: 20,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    gap: 12,
  },
  infoText: {
    fontSize: 16,
    color: '#334155',
  },
  section: {
    marginTop: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#0f172a',
    marginBottom: 8,
  },
  sectionSubtitle: {
      fontSize: 14,
      color: '#64748b',
      marginBottom: 12,
  },
  description: {
    fontSize: 16,
    color: '#64748b',
    lineHeight: 24,
  },
  registerButton: {
      backgroundColor: '#2563eb',
      padding: 16,
      borderRadius: 12,
      alignItems: 'center',
      marginTop: 32,
  },
  registerButtonText: {
      color: '#fff',
      fontWeight: 'bold',
      fontSize: 16,
  }
});
