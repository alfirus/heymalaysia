import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Globe, MapPin } from 'lucide-react-native';

import { useNavigation } from '@react-navigation/native';

export const CommunityWidget = () => {
    const navigation = useNavigation<any>();

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Community Feeds</Text>
            <View style={styles.grid}>
                <TouchableOpacity 
                    style={[styles.card, { backgroundColor: '#e0f2fe' }]}
                    onPress={() => navigation.navigate('Community', { tab: 'global' })}
                >
                    <Globe color="#0284c7" size={24} />
                    <View>
                        <Text style={[styles.cardTitle, { color: '#0369a1' }]}>Global</Text>
                        <Text style={[styles.cardDesc, { color: '#075985' }]}>Travelers Worldwide</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity 
                    style={[styles.card, { backgroundColor: '#f0fdf4' }]}
                    onPress={() => navigation.navigate('Community', { tab: 'local' })}
                >
                    <MapPin color="#16a34a" size={24} />
                    <View>
                        <Text style={[styles.cardTitle, { color: '#15803d' }]}>Local</Text>
                        <Text style={[styles.cardDesc, { color: '#14532d' }]}>Near You</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginBottom: 24,
        paddingHorizontal: 16,
    },
    title: {
        fontSize: 20,
        fontWeight: '700',
        color: '#0f172a',
        marginBottom: 12,
    },
    grid: {
        flexDirection: 'row',
        gap: 12,
    },
    card: {
        flex: 1,
        padding: 16,
        borderRadius: 16,
        gap: 12,
        // justifyContent: 'space-between', 
        // alignItems: 'flex-start',
    },
    cardTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginTop: 8,
    },
    cardDesc: {
        fontSize: 12,
        opacity: 0.8,
    },
});
