import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, SafeAreaView, Platform, StatusBar } from 'react-native';
import { Plus, List, Calendar as CalendarIcon } from 'lucide-react-native';
import { EventList } from '../../components/events/EventList';

export default function EventsScreen({ navigation }: any) {
  const [viewMode, setViewMode] = useState<'list' | 'calendar'>('list');
  const [showNearby, setShowNearby] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>Events</Text>
          <Text style={styles.subtitle}>Discover what's happening nearby</Text>
        </View>
        
        {/* View Switcher */}
        <View style={styles.viewSwitcher}>
          <TouchableOpacity 
             style={[styles.filterChip, showNearby && styles.activeFilterChip]}
             onPress={() => setShowNearby(!showNearby)}
          >
             <Text style={[styles.filterText, showNearby && styles.activeFilterText]}>Nearby</Text>
          </TouchableOpacity>
          <View style={styles.divider} />
          <TouchableOpacity 
            style={[styles.switchButton, viewMode === 'list' && styles.activeSwitch]} 
            onPress={() => setViewMode('list')}
          >
            <List size={20} color={viewMode === 'list' && !showNearby ? '#fff' : '#64748b'} />
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.switchButton, viewMode === 'calendar' && styles.activeSwitch]} 
            onPress={() => setViewMode('calendar')}
          >
            <CalendarIcon size={20} color={viewMode === 'calendar' ? '#fff' : '#64748b'} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Content */}
      <View style={styles.content}>
        {viewMode === 'list' ? (
          <EventList onlyNearby={showNearby} />
        ) : (
          <View style={styles.calendarContainer}>
             <View style={styles.calendarHeader}>
                <Text style={styles.monthTitle}>October 2023</Text>
             </View>
             <View style={styles.daysHeader}>
                {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, i) => (
                    <Text key={i} style={styles.dayLabel}>{day}</Text>
                ))}
             </View>
             <View style={styles.daysGrid}>
                {/* Mock Calendar Grid for Oct 2023 - Starting Sunday Oct 1 */}
                {Array.from({ length: 31 }, (_, i) => i + 1).map((day) => (
                    <TouchableOpacity key={day} style={[styles.dayCell, day === 12 && styles.activeDayCell]}>
                        <Text style={[styles.dayText, day === 12 && styles.activeDayText]}>{day}</Text>
                        {/* Dot for event */}
                        {[5, 12, 18, 24].includes(day) && (
                            <View style={styles.eventDot} />
                        )}
                    </TouchableOpacity>
                ))}
             </View>
             <View style={styles.calendarEvents}>
                <Text style={styles.calendarEventsTitle}>Events on Oct 12</Text>
                <EventList /> 
             </View>
          </View>
        )}
      </View>

      {/* FAB: Submit Event */}
      <TouchableOpacity 
        style={styles.fab}
        onPress={() => navigation.navigate('EventSubmission')}
      >
        <Plus color="#fff" size={24} />
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  header: {
    padding: 20,
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#0f172a',
  },
  subtitle: {
    fontSize: 14,
    color: '#64748b',
    marginTop: 2,
  },
  viewSwitcher: {
    flexDirection: 'row',
    backgroundColor: '#f1f5f9', // slate-100
    borderRadius: 8,
    padding: 4,
  },
  switchButton: {
    padding: 8,
    borderRadius: 6,
  },
  activeSwitch: {
    backgroundColor: '#2563eb', // blue-600
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
    elevation: 1,
    shadowOpacity: 0.1,
    shadowRadius: 1,
    elevation: 1,
  },
  filterChip: {
      paddingHorizontal: 12,
      justifyContent: 'center',
      borderRadius: 6,
      marginRight: 4,
  },
  activeFilterChip: {
      backgroundColor: '#dbeafe',
  },
  filterText: {
      fontSize: 12,
      fontWeight: '600',
      color: '#64748b',
  },
  activeFilterText: {
      color: '#2563eb',
  },
  divider: {
      width: 1,
      height: '60%',
      backgroundColor: '#e2e8f0',
      alignSelf: 'center',
      marginHorizontal: 4,
  },
  content: {
    flex: 1,
  },
  fab: {
    position: 'absolute',
    bottom: 24,
    right: 24,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#2563eb',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#2563eb',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  placeholderContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 32,
  },
  placeholderText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#334155',
    marginTop: 16,
  },
  placeholderSubtext: {
    fontSize: 14,
    color: '#64748b',
    textAlign: 'center',
    marginTop: 8,
  },
  calendarContainer: {
    padding: 20,
    flex: 1,
  },
  calendarHeader: {
    marginBottom: 16,
    alignItems: 'center',
  },
  monthTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#0f172a',
  },
  daysHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  dayLabel: {
    width: 40,
    textAlign: 'center',
    color: '#94a3b8',
    fontWeight: '600',
    fontSize: 12,
  },
  daysGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    gap: 8,
  },
  dayCell: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    marginBottom: 4,
  },
  activeDayCell: {
    backgroundColor: '#2563eb',
  },
  dayText: {
    color: '#334155',
  },
  activeDayText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  eventDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#ef4444',
    position: 'absolute',
    bottom: 6,
  },
  calendarEvents: {
    marginTop: 24,
    flex: 1,
  },
  calendarEventsTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#0f172a',
    marginBottom: 12,
  },
});
