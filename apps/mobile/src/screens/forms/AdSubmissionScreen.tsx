import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Alert, KeyboardAvoidingView, Platform, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import api from '../../utils/api';

export default function AdSubmissionScreen({ navigation }: any) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    imageUrl: '',
    targetUrl: '',
    duration: '',
    paymentReference: '',
  });

  const handleChange = (key: string, value: string) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async () => {
    if (!formData.title || !formData.imageUrl || !formData.paymentReference) {
      Alert.alert('Error', 'Please fill in required fields');
      return;
    }

    setLoading(true);
    try {
      await api.post('/ads', {
        title: formData.title,
        imageUrl: formData.imageUrl,
        targetUrl: formData.targetUrl,
        duration: parseInt(formData.duration) || 7,
        paymentReference: formData.paymentReference,
        status: 'pending',
      });

      Alert.alert('Success', 'Ad campaign submitted for review!');
      navigation.goBack();
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Failed to submit ad');
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
            <Text style={styles.title}>Advertise with Us</Text>
            <Text style={styles.subtitle}>Promote your business on Hey Malaysia.</Text>
          </View>

          <View style={styles.form}>
            <Input
              label="Campaign Title"
              placeholder="e.g. Summer Sale 2024"
              value={formData.title}
              onChangeText={(t) => handleChange('title', t)}
            />
            
            <Input
              label="Banner Image URL"
              placeholder="https://..."
              value={formData.imageUrl}
              onChangeText={(t) => handleChange('imageUrl', t)}
            />

            <Input
              label="Target Website URL"
              placeholder="https://yourbusiness.com"
              value={formData.targetUrl}
              onChangeText={(t) => handleChange('targetUrl', t)}
            />

            <Input
              label="Duration (Days)"
              placeholder="7"
              keyboardType="numeric"
              value={formData.duration}
              onChangeText={(t) => handleChange('duration', t)}
            />

            <Input
              label="Payment Reference No."
              placeholder="Ref: 12345678"
              value={formData.paymentReference}
              onChangeText={(t) => handleChange('paymentReference', t)}
            />

            <Button
              title="Submit Campaign"
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
