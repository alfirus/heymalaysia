import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { Lightbulb } from 'lucide-react-native';

const FACTS = [
  "Malaysia has 13 states and 3 federal territories.",
  "The Sarawak Chamber is the largest cave chamber in the world.",
  "Malaysia is home to the Rafflesia, the world's largest flower.",
  "The PETRONAS Twin Towers were the tallest buildings in the world from 1998 to 2004.",
  "Malaysia has a highway that is longer than the circumference of the earth.",
  "Kuala Lumpur means 'muddy confluence' in Malay.",
  "The national drink of Malaysia involves 'pulling' tea (Teh Tarik).",
  "Malaysia is one of 17 megadiverse countries on Earth.",
  "Borneo is the third largest island in the world, shared by Malaysia, Indonesia, and Brunei.",
  "Nasi Lemak is widely considered the national dish of Malaysia."
];

export function DidYouKnowCard() {
  const [fact, setFact] = useState('');

  useEffect(() => {
    // Pick a random fact on mount
    const randomFact = FACTS[Math.floor(Math.random() * FACTS.length)];
    setFact(randomFact);
  }, []);

  const handlePress = () => {
    // Pick a new random fact
    let newFact = fact;
    while (newFact === fact) {
      newFact = FACTS[Math.floor(Math.random() * FACTS.length)];
    }
    setFact(newFact);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Lightbulb color="#F59E0B" size={24} fill="#F59E0B" />
        <Text style={styles.title}>Did You Know?</Text>
      </View>
      <Text style={styles.content}>{fact}</Text>
      
      <TouchableOpacity onPress={handlePress} style={styles.button}>
        <Text style={styles.buttonText}>Tap for another fact</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    marginHorizontal: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#0f172a', // slate-900
    marginLeft: 8,
  },
  content: {
    fontSize: 15,
    color: '#334155', // slate-700
    lineHeight: 22,
    marginBottom: 12,
  },
  button: {
    alignSelf: 'flex-start',
  },
  buttonText: {
    fontSize: 14,
    color: '#2563eb', // blue-600
    fontWeight: '500',
  },
});
