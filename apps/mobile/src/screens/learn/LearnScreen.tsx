import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { BookOpen, Clock, Users, MessageCircle } from 'lucide-react-native';

const LearnScreen = () => {
  const navigation = useNavigation<any>();

  const menuItems = [
    {
      title: 'History Timeline',
      description: 'Journey through Malaysia\'s rich past',
      icon: <Clock size={32} color="#FFF" />,
      route: 'HistoryTimeline',
      color: '#EA580C', // Orange
    },
    {
      title: 'Cultural Mosaic',
      description: 'Explore the diverse people and traditions',
      icon: <Users size={32} color="#FFF" />,
      route: 'CulturalArticles',
      color: '#059669', // Emerald
    },
    {
      title: 'Etiquette Guide',
      description: 'Do\'s and Don\'ts for a respectful visit',
      icon: <BookOpen size={32} color="#FFF" />,
      route: 'EtiquetteGuide',
      color: '#7C3AED', // Violet
    },
    {
      title: 'Language Basics',
      description: 'Learn simple Bahasa Malaysia phrases',
      icon: <MessageCircle size={32} color="#FFF" />,
      route: 'LanguageBasics',
      color: '#2563EB', // Blue
    },
  ];

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.header}>Learn Malaysia</Text>
      <Text style={styles.subHeader}>Discover the soul of the nation</Text>

      <View style={styles.grid}>
        {menuItems.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={[styles.card, { backgroundColor: item.color }]}
            onPress={() => navigation.navigate(item.route as any)}
          >
            <View style={styles.iconContainer}>{item.icon}</View>
            <Text style={styles.cardTitle}>{item.title}</Text>
            <Text style={styles.cardDesc}>{item.description}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  content: {
    padding: 20,
    paddingTop: 60,
  },
  header: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#1E293B',
    marginBottom: 8,
  },
  subHeader: {
    fontSize: 16,
    color: '#64748B',
    marginBottom: 32,
  },
  grid: {
    gap: 16,
  },
  card: {
    borderRadius: 16,
    padding: 24,
    minHeight: 140,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    justifyContent: 'center',
  },
  iconContainer: {
    marginBottom: 12,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFF',
    marginBottom: 4,
  },
  cardDesc: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.9)',
  },
});

export default LearnScreen;
