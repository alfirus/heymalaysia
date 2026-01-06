import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ChatListScreen({ navigation }: any) {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Messages</Text>
      
      {/* Mock Chat Item */}
      <TouchableOpacity 
        style={styles.chatItem}
        onPress={() => navigation.navigate('Chat')}
      >
        <View style={styles.avatar} />
        <View style={styles.info}>
          <Text style={styles.name}>Admin Support</Text>
          <Text style={styles.lastMessage}>How can we help you today?</Text>
        </View>
        <Text style={styles.date}>Now</Text>
      </TouchableOpacity>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 24,
  },
  chatItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#cbd5e1',
    marginRight: 12,
  },
  info: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  lastMessage: {
    fontSize: 14,
    color: '#64748b',
  },
  date: {
    fontSize: 12,
    color: '#94a3b8',
  },
});
