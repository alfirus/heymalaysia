import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { CheckCircle, XCircle } from 'lucide-react-native';

const DOS = [
    "Smile! Malaysians are generally very friendly.",
    "Remove your shoes when entering a home or place of worship.",
    "Use your right hand when eating or passing objects.",
];

const DONTS = [
    "Don't touch someone's head, it's considered sacred.",
    "Don't show the soles of your feet or shoes.",
    "Avoid public displays of affection (PDA).",
];

const EtiquetteGuideScreen = () => {
    return (
        <ScrollView style={styles.container}>
            <Text style={styles.header}>Etiquette Guide</Text>
            
            <View style={styles.section}>
                <Text style={[styles.sectionHeader, { color: '#059669' }]}>Do's</Text>
                {DOS.map((item, index) => (
                    <View key={index} style={styles.row}>
                        <CheckCircle color="#059669" size={24} />
                        <Text style={styles.text}>{item}</Text>
                    </View>
                ))}
            </View>

            <View style={styles.section}>
                <Text style={[styles.sectionHeader, { color: '#DC2626' }]}>Don'ts</Text>
                {DONTS.map((item, index) => (
                    <View key={index} style={styles.row}>
                        <XCircle color="#DC2626" size={24} />
                        <Text style={styles.text}>{item}</Text>
                    </View>
                ))}
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F3FF', // Light violet
    },
    header: {
        fontSize: 28,
        fontWeight: 'bold',
        padding: 20,
        paddingTop: 60,
        color: '#4C1D95',
    },
    section: {
        backgroundColor: '#FFF',
        margin: 20,
        marginTop: 0,
        borderRadius: 16,
        padding: 20,
        elevation: 2,
    },
    sectionHeader: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
    },
    text: {
        fontSize: 16,
        color: '#334155',
        marginLeft: 12,
        flex: 1,
    },
});

export default EtiquetteGuideScreen;
