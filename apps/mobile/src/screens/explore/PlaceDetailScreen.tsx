import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, ActivityIndicator, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MapPin, Calendar, Star, Heart } from 'lucide-react-native';
import api from '../../utils/api';
import { WeatherWidget } from '../../components/home/WeatherWidget';

export default function PlaceDetailScreen({ route, navigation }: any) {
    const { placeId } = route.params;
    const [place, setPlace] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [isFavorite, setIsFavorite] = useState(false);

    useEffect(() => {
        fetchPlaceDetails();
    }, [placeId]);

    const fetchPlaceDetails = async () => {
        try {
            const { data } = await api.get(`/places/${placeId}`);
            setPlace(data); // Assuming backend returns the place object
            
            // Set title in header
            navigation.setOptions({ title: data.title });
        } catch (error) {
            console.error('Failed to fetch place details', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <View style={styles.center}>
                <ActivityIndicator size="large" color="#2563eb" />
            </View>
        );
    }

    if (!place) {
        return (
            <View style={styles.center}>
                <Text>Place not found.</Text>
            </View>
        );
    }

    return (
        <ScrollView style={styles.container}>
            {/* Hero Image */}
            <Image 
                source={{ uri: place.images?.[0] || 'https://via.placeholder.com/400x200' }} 
                style={styles.heroImage} 
            />

            <View style={styles.content}>
                {/* Title & Category */}
                <View style={styles.header}>
                    <Text style={styles.title}>{place.title}</Text>
                    <View style={styles.badge}>
                        <Text style={styles.badgeText}>{place.category}</Text>
                    </View>
                </View>

                {/* Favorite Action */}
                <TouchableOpacity 
                    style={styles.favoriteButton}
                    onPress={() => setIsFavorite(!isFavorite)}
                >
                    <Heart 
                        size={24} 
                        color={isFavorite ? "#ef4444" : "#64748b"} 
                        fill={isFavorite ? "#ef4444" : "none"} 
                    />
                    <Text style={[styles.favText, isFavorite && styles.favTextActive]}>
                        {isFavorite ? 'Saved to Favorites' : 'Add to Favorites'}
                    </Text>
                </TouchableOpacity>

                {/* Location */}
                <View style={styles.row}>
                    <MapPin size={18} color="#64748b" />
                    <Text style={styles.location}>{place.location || 'Unknown Location'}, {place.state}</Text>
                </View>

                {/* Weather Integration - Passing place coordinates if available */}
                {/* For MVP, assuming we just show current user weather or a placeholder, 
                    but ideally update WeatherWidget to accept lat/lon props */}
                <View style={styles.weatherSection}>
                    <Text style={styles.sectionTitle}>Current Conditions</Text>
                     {/* NOTE: Updating WeatherWidget to accept optional lat/lon would be better, 
                         for now using the existing widget which defaults to user location. 
                         The implementation plan said "using WeatherWidget logic if applicable". */}
                    <WeatherWidget /> 
                </View>

                {/* Description */}
                <Text style={styles.sectionTitle}>About this place</Text>
                <Text style={styles.description}>{place.description}</Text>

                {/* Additional Info (Example) */}
                <View style={styles.infoGrid}>
                    <View style={styles.infoItem}>
                       <Star size={20} color="#eab308" />
                       <Text style={styles.infoLabel}>Rating</Text>
                       <Text style={styles.infoValue}>4.5</Text>
                    </View>
                     {/* Can add more details like specific era, etc */}
                </View>

                {/* Comments Section */}
                <View style={styles.commentsSection}>
                    <Text style={styles.sectionTitle}>Comments</Text>
                    {/* Mock Comments for MVP */}
                    <View style={styles.commentItem}>
                        <View style={styles.commentHeader}>
                           <View style={styles.avatarPlaceholder} />
                           <Text style={styles.commentUser}>Sarah J.</Text>
                           <Text style={styles.commentDate}>2 days ago</Text>
                        </View>
                        <Text style={styles.commentText}>Absolutely beautiful place! The history is fascinating.</Text>
                    </View>
                     <View style={styles.commentItem}>
                        <View style={styles.commentHeader}>
                           <View style={styles.avatarPlaceholder} />
                           <Text style={styles.commentUser}>Ahmad R.</Text>
                           <Text style={styles.commentDate}>1 week ago</Text>
                        </View>
                        <Text style={styles.commentText}>Best to visit in the morning to avoid the heat.</Text>
                    </View>
                </View>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    heroImage: {
        width: '100%',
        height: 250,
        resizeMode: 'cover',
    },
    content: {
        padding: 20,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8,
    },
    favoriteButton: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        marginBottom: 16,
        alignSelf: 'flex-start',
    },
    favText: {
        fontSize: 16,
        color: '#64748b',
        fontWeight: '500',
    },
    favTextActive: {
        color: '#ef4444',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#0f172a',
        flex: 1,
    },
    badge: {
        backgroundColor: '#e0f2fe',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 4,
    },
    badgeText: {
        color: '#0284c7',
        fontSize: 12,
        fontWeight: '600',
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 24,
        gap: 8,
    },
    location: {
        fontSize: 16,
        color: '#64748b',
    },
    weatherSection: {
        marginBottom: 24,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '600',
        marginBottom: 8,
        color: '#1e293b',
    },
    description: {
        fontSize: 16,
        color: '#334155',
        lineHeight: 24,
        marginBottom: 24,
    },
    infoGrid: {
        flexDirection: 'row',
        borderTopWidth: 1,
        borderTopColor: '#f1f5f9',
        paddingTop: 16,
    },
    infoItem: {
        alignItems: 'center',
        marginRight: 24,
    },
    infoLabel: {
        fontSize: 12,
        color: '#94a3b8',
        marginTop: 4,
    },
    infoValue: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#0f172a',
    },
    commentsSection: {
        marginTop: 24,
        paddingTop: 24,
        borderTopWidth: 1,
        borderTopColor: '#f1f5f9',
    },
    commentItem: {
        marginBottom: 16,
        backgroundColor: '#f8fafc',
        padding: 12,
        borderRadius: 12,
    },
    commentHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    avatarPlaceholder: {
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: '#cbd5e1',
        marginRight: 8,
    },
    commentUser: {
        fontWeight: '600',
        color: '#0f172a',
        marginRight: 8,
    },
    commentDate: {
        fontSize: 12,
        color: '#94a3b8',
    },
    commentText: {
        color: '#334155',
        lineHeight: 20,
    },
});
