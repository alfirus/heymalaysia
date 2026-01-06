import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Alert, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import api from '../../utils/api';

export default function EventSubmissionScreen({ navigation }: any) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '', // Simple text for MVP
    locationName: '',
    paymentReference: '',
  });

  const handleChange = (key: string, value: string) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async () => {
    if (!formData.title || !formData.date || !formData.paymentReference) {
      Alert.alert('Error', 'Please fill in technical fields');
      return;
    }

    setLoading(true);
    try {
      await api.post('/events', {
        title: formData.title,
        description: formData.description,
        date: new Date().toISOString(), // Mock date for MVP if text input is tricky
        location: {
          name: formData.locationName,
          lat: 0,
          lng: 0,
        },
        paymentReference: formData.paymentReference,
      });

      Alert.alert('Success', 'Event submitted for approval!');
      navigation.goBack();
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Failed to submit event');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.header}>
            <Text style={styles.title}>Submit Event</Text>
            <Text style={styles.subtitle}>Share your local event with the world.</Text>
          </View>

          <View style={styles.form}>
            <Input
              label="Event Title"
              placeholder="e.g. Penang Food Festival"
              value={formData.title}
              onChangeText={(t) => handleChange('title', t)}
            />
            
            <Input
              label="Description"
              placeholder="Describe what's happening..."
              multiline
              numberOfLines={4}
              style={{ height: 100, textAlignVertical: 'top' }}
              value={formData.description}
              onChangeText={(t) => handleChange('description', t)}
            />

            <Input
              label="Location Name"
              placeholder="e.g. Esplanade, Georgetown"
              value={formData.locationName}
              onChangeText={(t) => handleChange('locationName', t)}
            />

            <Input
              label="Date (YYYY-MM-DD)"
              placeholder="2023-12-25"
              value={formData.date}
              onChangeText={(t) => handleChange('date', t)}
            />

            <Input
              label="Payment Reference No."
              placeholder="Ref: 12345678"
              value={formData.paymentReference}
              onChangeText={(t) => handleChange('paymentReference', t)}
            />

            <Button
              title="Submit Event"
              onPress={handleSubmit}
              isLoading={loading}
              style={{ marginTop: 16 }}
            />
            
            <Button
              title="Cancel"
              variant="ghost"
              onPress={() => navigation.goBack()}
              style={{ marginTop: 8 }}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

import { Text } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    padding: 24,
  },
  header: {
    marginBottom: 32,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#0f172a',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#64748b',
  },
  form: {
    flex: 1,
  },
});
