import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { Audio } from 'expo-av';
import { PlayCircle, PauseCircle } from 'lucide-react-native';

interface Phrase {
    id: string;
    malay: string;
    english: string;
    audioUrl?: string; // in real app, remote URL or require('./assets/...')
}

const PHRASES: Phrase[] = [
    { id: '1', malay: 'Apa khabar?', english: 'How are you?' },
    { id: '2', malay: 'Terima kasih', english: 'Thank you' },
    { id: '3', malay: 'Selamat pagi', english: 'Good morning' },
    { id: '4', malay: 'Sama-sama', english: 'You are welcome' },
    { id: '5', malay: 'Berapa harga ini?', english: 'How much is this?' },
];

const LanguageBasicsScreen = () => {
    const [sound, setSound] = useState<Audio.Sound | null>(null);
    const [playingId, setPlayingId] = useState<string | null>(null);

    async function playSound(phrase: Phrase) {
        // Stop currently playing
        if (sound) {
            await sound.unloadAsync();
            setSound(null);
            setPlayingId(null);
        }

        // Logic for playing audio
        // For MVP without assets, we'll just simulate it or alert
        console.log(`Playing: ${phrase.malay}`);
        
        // Mock active state
        setPlayingId(phrase.id);
        setTimeout(() => setPlayingId(null), 2000); 

        // Actual implementation example:
        /*
        const { sound } = await Audio.Sound.createAsync(
            { uri: phrase.audioUrl } 
        );
        setSound(sound);
        await sound.playAsync(); 
        */
    }

    useEffect(() => {
        return sound
            ? () => {
                console.log('Unloading Sound');
                sound.unloadAsync();
            }
            : undefined;
    }, [sound]);

    const renderItem = ({ item }: { item: Phrase }) => (
        <View style={styles.card}>
            <TouchableOpacity onPress={() => playSound(item)}>
                {playingId === item.id ? (
                    <PauseCircle size={40} color="#3B82F6" />
                ) : (
                    <PlayCircle size={40} color="#3B82F6" />
                )}
            </TouchableOpacity>
            <View style={styles.textContainer}>
                <Text style={styles.malayText}>{item.malay}</Text>
                <Text style={styles.englishText}>{item.english}</Text>
            </View>
        </View>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Language Basics</Text>
            <Text style={styles.sub}>Master these simple phrases.</Text>

            <FlatList
                data={PHRASES}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.list}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#EFF6FF',
    },
    header: {
        fontSize: 28,
        fontWeight: 'bold',
        padding: 20,
        paddingTop: 60,
        color: '#1E40AF',
        paddingBottom: 4,
    },
    sub: {
        paddingHorizontal: 20,
        color: '#60A5FA',
        marginBottom: 20,
    },
    list: {
        padding: 20,
    },
    card: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFF',
        marginBottom: 16,
        padding: 20,
        borderRadius: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 2,
    },
    textContainer: {
        marginLeft: 20,
    },
    malayText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#1E293B',
    },
    englishText: {
        fontSize: 16,
        color: '#94A3B8',
    },
});

export default LanguageBasicsScreen;
