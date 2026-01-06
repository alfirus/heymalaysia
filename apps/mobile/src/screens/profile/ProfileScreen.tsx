import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image, ScrollView, FlatList, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { User, MessageSquare, PlusCircle, Megaphone, Settings, Heart, MapPin, ChevronRight, Moon, Sun } from 'lucide-react-native';

// Mock Favorites Data
const MOCK_FAVORITES = [
  {
    id: '1',
    title: 'Kellie\'s Castle',
    state: 'Perak',
    image: 'https://images.unsplash.com/photo-1628045600463-548c26372c05?auto=format&fit=crop&q=80&w=2600&ixlib=rb-4.0.3',
  },
  {
    id: '2',
    title: 'A Famosa',
    state: 'Melaka',
    image: 'https://images.unsplash.com/photo-1596422846543-75c6fc197f07?auto=format&fit=crop&q=80&w=2600&ixlib=rb-4.0.3',
  },
];

export default function ProfileScreen({ navigation }: any) {
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Mock User
  const user = {
    name: 'Ahmad Albab',
    email: 'ahmad@example.com',
    avatar: null, // use placeholder
  };

  const renderFavoriteItem = ({ item }: { item: typeof MOCK_FAVORITES[0] }) => (
    <TouchableOpacity 
      style={styles.favCard}
      onPress={() => navigation.navigate('PlaceDetail', { placeId: item.id })}
    >
      <Image source={{ uri: item.image }} style={styles.favImage} />
      <View style={styles.favContent}>
        <Text style={styles.favTitle} numberOfLines={1}>{item.title}</Text>
        <View style={styles.favLocation}>
          <MapPin size={12} color="#64748b" />
          <Text style={styles.favState}>{item.state}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.avatarContainer}>
             {user.avatar ? (
                <Image source={{ uri: user.avatar }} style={styles.avatar} />
             ) : (
                <View style={styles.avatarPlaceholder}>
                  <User size={32} color="#64748b" />
                </View>
             )}
          </View>
          <Text style={styles.userName}>{user.name}</Text>
          <Text style={styles.userEmail}>{user.email}</Text>
        </View>

        {/* Quick Actions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.actionsGrid}>
            <TouchableOpacity 
              style={styles.actionButton}
              onPress={() => navigation.navigate('EventSubmission')}
            >
              <View style={[styles.iconBox, { backgroundColor: '#dbeafe' }]}>
                <PlusCircle size={24} color="#2563eb" />
              </View>
              <Text style={styles.actionText}>Submit Event</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.actionButton}
              onPress={() => navigation.navigate('AdSubmission')}
            >
               <View style={[styles.iconBox, { backgroundColor: '#fef3c7' }]}>
                <Megaphone size={24} color="#d97706" />
              </View>
              <Text style={styles.actionText}>Advertise</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.actionButton}
              onPress={() => navigation.navigate('ChatList')}
            >
               <View style={[styles.iconBox, { backgroundColor: '#dcfce7' }]}>
                <MessageSquare size={24} color="#16a34a" />
              </View>
              <Text style={styles.actionText}>Messages</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Favorites */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>My Favorites</Text>
            <TouchableOpacity onPress={() => Alert.alert('View all favorites')}>
              <Text style={styles.seeAll}>See All</Text>
            </TouchableOpacity>
          </View>
          <FlatList
             horizontal
             data={MOCK_FAVORITES}
             renderItem={renderFavoriteItem}
             keyExtractor={item => item.id}
             showsHorizontalScrollIndicator={false}
             contentContainerStyle={styles.favList}
          />
        </View>

        {/* Settings */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Settings</Text>
          <View style={styles.settingsItem}>
            <View style={styles.settingRow}>
                <View style={styles.settingIcon}>
                    {isDarkMode ? <Moon size={20} color="#64748b" /> : <Sun size={20} color="#64748b" />}
                </View>
                <Text style={styles.settingText}>Dark Mode</Text>
            </View>
            <TouchableOpacity onPress={() => setIsDarkMode(!isDarkMode)}>
                <View style={[styles.toggle, isDarkMode && styles.toggleActive]}>
                    <View style={[styles.toggleKnob, isDarkMode && styles.toggleKnobActive]} />
                </View>
            </TouchableOpacity>
          </View>
           <TouchableOpacity style={styles.settingsItem}>
            <View style={styles.settingRow}>
                <View style={styles.settingIcon}>
                    <Settings size={20} color="#64748b" />
                </View>
                <Text style={styles.settingText}>Account Settings</Text>
            </View>
            <ChevronRight size={20} color="#cbd5e1" />
           </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.logoutButton}>
            <Text style={styles.logoutText}>Log Out</Text>
        </TouchableOpacity>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  scrollContent: {
    paddingBottom: 40,
  },
  header: {
    backgroundColor: '#fff',
    padding: 24,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
  },
  avatarContainer: {
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  avatarPlaceholder: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#f1f5f9',
    alignItems: 'center',
    justifyContent: 'center',
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#0f172a',
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 16,
    color: '#64748b',
  },
  section: {
    marginTop: 24,
    paddingHorizontal: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#0f172a',
    marginBottom: 16,
  },
  seeAll: {
    fontSize: 14,
    color: '#2563eb',
    fontWeight: '500',
  },
  actionsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  actionButton: {
    alignItems: 'center',
    flex: 1,
  },
  iconBox: {
    width: 56,
    height: 56,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  actionText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#334155',
  },
  favList: {
    paddingRight: 16,
  },
  favCard: {
    width: 160,
    backgroundColor: '#fff',
    borderRadius: 12,
    marginRight: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
    marginBottom: 4, // for shadow
  },
  favImage: {
    width: '100%',
    height: 100,
  },
  favContent: {
    padding: 12,
  },
  favTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#0f172a',
    marginBottom: 4,
  },
  favLocation: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  favState: {
    fontSize: 12,
    color: '#64748b',
  },
  settingsItem: {
      backgroundColor: '#fff',
      padding: 16,
      borderRadius: 12,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: 12,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.05,
      shadowRadius: 2,
      elevation: 1,
  },
  settingRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 12,
  },
  settingIcon: {
      width: 32,
      height: 32,
      borderRadius: 8,
      backgroundColor: '#f1f5f9',
      alignItems: 'center',
      justifyContent: 'center',
  },
  settingText: {
      fontSize: 16,
      color: '#334155',
      fontWeight: '500',
  },
  toggle: {
      width: 48,
      height: 28,
      borderRadius: 14,
      backgroundColor: '#cbd5e1',
      padding: 2,
  },
  toggleActive: {
      backgroundColor: '#2563eb',
  },
  toggleKnob: {
      width: 24,
      height: 24,
      borderRadius: 12,
      backgroundColor: '#fff',
  },
  toggleKnobActive: {
      transform: [{ translateX: 20 }],
  },
  logoutButton: {
      marginHorizontal: 20,
      marginTop: 12,
      padding: 16,
      alignItems: 'center',
  },
  logoutText: {
      color: '#ef4444',
      fontSize: 16,
      fontWeight: '600',
  },
});
