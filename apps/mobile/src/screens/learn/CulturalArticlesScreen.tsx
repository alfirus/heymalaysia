import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';

const ARTICLES = [
    {
        id: '1',
        title: 'The Malays',
        summary: 'As the majority ethnic group, Malay culture heavily influences the national identity, from language to the Islamic faith.',
        color: '#FCD34D',
    },
    {
        id: '2',
        title: 'Chinese Community',
        summary: 'Known for vibrant festivals like Chinese New Year and a rich culinary heritage that blends with local flavors.',
        color: '#F87171',
    },
    {
        id: '3',
        title: 'Indian Heritage',
        summary: 'Bringing colorful traditions, Deepavali celebrations, and intricate temple architecture to the Malaysian mosaic.',
        color: '#818CF8',
    },
    {
        id: '4',
        title: 'Indigenous Tribes (Orang Asli/Asal)',
        summary: 'The original inhabitants of the peninsula and Borneo, possessing deep knowledge of the rainforest and unique craftsmanship.',
        color: '#34D399',
    }
];

const CulturalArticlesScreen = () => {
    return (
        <ScrollView style={styles.container}>
            <Text style={styles.header}>Cultural Mosaic</Text>
            <Text style={styles.intro}>Malaysia is a melting pot of races and religions.</Text>

            <View style={styles.list}>
                {ARTICLES.map((article) => (
                    <View key={article.id} style={[styles.card, { borderLeftColor: article.color }]}>
                        <Text style={styles.cardTitle}>{article.title}</Text>
                        <Text style={styles.cardSummary}>{article.summary}</Text>
                    </View>
                ))}
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ECFDF5', // Light green bg
    },
    header: {
        fontSize: 28,
        fontWeight: 'bold',
        padding: 20,
        paddingTop: 60,
        color: '#064E3B',
    },
    intro: {
        fontSize: 16,
        paddingHorizontal: 20,
        color: '#047857',
        marginBottom: 20,
    },
    list: {
        padding: 20,
        gap: 16,
    },
    card: {
        backgroundColor: '#FFF',
        borderRadius: 8,
        padding: 16,
        borderLeftWidth: 6,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 2,
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#1E293B',
        marginBottom: 6,
    },
    cardSummary: {
        fontSize: 14,
        color: '#475569',
        lineHeight: 20,
    },
});

export default CulturalArticlesScreen;
