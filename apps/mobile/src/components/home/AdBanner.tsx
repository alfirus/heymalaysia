import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Linking } from 'react-native';

export const AdBanner = () => {
    // Mock Ad Data - Later fetch from /api/ads
    const ad = {
        title: "Visit Langkawi",
        imageUrl: "https://images.unsplash.com/photo-1549490349-8643362247b5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        targetUrl: "https://langkawi.com",
        description: "Experience the Jewel of Kedah"
    };

    const handlePress = () => {
        if (ad.targetUrl) {
            Linking.openURL(ad.targetUrl);
        }
    };

    return (
        <TouchableOpacity style={styles.container} onPress={handlePress}>
            <Image source={{ uri: ad.imageUrl }} style={styles.image} />
            <View style={styles.overlay}>
                <View style={styles.tag}>
                    <Text style={styles.tagText}>Featured</Text>
                </View>
                <Text style={styles.title}>{ad.title}</Text>
                <Text style={styles.desc}>{ad.description}</Text>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        height: 160,
        borderRadius: 16,
        overflow: 'hidden',
        marginBottom: 24,
        backgroundColor: '#e2e8f0',
    },
    image: {
        width: '100%',
        height: '100%',
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0,0,0,0.3)', // Darken image
        padding: 16,
        justifyContent: 'flex-end',
    },
    tag: {
        position: 'absolute',
        top: 12,
        right: 12,
        backgroundColor: '#f59e0b', // amber-500
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 4,
    },
    tagText: {
        color: '#fff',
        fontSize: 10,
        fontWeight: 'bold',
        textTransform: 'uppercase',
    },
    title: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 4,
    },
    desc: {
        color: '#e2e8f0',
        fontSize: 13,
    },
});
