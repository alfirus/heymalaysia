import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity,  Image, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Search, SlidersHorizontal, MapPin, Gem } from 'lucide-react-native';
import api from '../../utils/api';
import { Input } from '../../components/ui/Input';

const CATEGORIES = ['All', 'Hidden Gems', 'Nature', 'Historical', 'Food', 'Culture', 'Modern'];

export default function ExploreScreen({ navigation }: any) {
    const [places, setPlaces] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    
    // Filters
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        fetchPlaces();
    }, [selectedCategory]);

    const fetchPlaces = async () => {
        setLoading(true);
        try {
            const params: any = {};
            if (selectedCategory !== 'All') {
                params.category = selectedCategory;
            }
            // Add search logic if supported by backend, or client-side filter
            
            const response = await api.get('/places', { params });
            const data = response.data;

            // Mocking Hidden Gem property for MVP if not provided by backend
            const enhancedData = data.map((place: any, index: number) => ({
                ...place,
                isHiddenGem: place.isHiddenGem !== undefined ? place.isHiddenGem : (index % 3 === 0) 
            }));

            let filteredData = enhancedData;
            if (selectedCategory === 'Hidden Gems') {
                filteredData = enhancedData.filter((p: any) => p.isHiddenGem);
            }

            setPlaces(filteredData);
        } catch (error) {
            console.error('Failed to fetch places', error);
        } finally {
            setLoading(false);
        }
    };

    const renderPlaceItem = ({ item }: { item: any }) => (
        <TouchableOpacity 
            style={styles.card}
            onPress={() => navigation.navigate('PlaceDetail', { placeId: item._id })}
        >
            <Image 
                source={{ uri: item.images?.[0] || 'https://via.placeholder.com/150' }} 
                style={styles.cardImage} 
            />
            <View style={styles.cardContent}>
                <View style={styles.cardHeader}>
                    <Text style={styles.cardTitle}>{item.title}</Text>
                    <View style={styles.ratingBadge}>
                        <Text style={styles.ratingText}>★ 4.5</Text>
                    </View>
                </View>
                <View style={styles.locationRow}>
                    <MapPin size={14} color="#64748b" />
                    <Text style={styles.locationText}>{item.state}</Text>
                </View>
                <Text style={styles.categoryText}>{item.category}</Text>
                {item.isHiddenGem && (
                    <View style={styles.hiddenGemBadge}>
                        <Gem size={12} color="#7e22ce" />
                        <Text style={styles.hiddenGemText}>Hidden Gem</Text>
                    </View>
                )}
            </View>
        </TouchableOpacity>
    );

    return (
        <SafeAreaView style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <Text style={styles.title}>Explore</Text>
                {/* Search Bar Placeholder - Visual only for MVP unless backed by logic */}
                <View style={styles.searchBar}>
                     <Search size={20} color="#94a3b8" />
                     <Text style={styles.searchText}>Where do you want to go?</Text> 
                </View>
            </View>

            {/* Categories */}
            <View style={styles.categoriesContainer}>
                <FlatList
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    data={CATEGORIES}
                    keyExtractor={(item) => item}
                    contentContainerStyle={styles.categoriesList}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            style={[
                                styles.categoryChip,
                                selectedCategory === item && styles.activeCategoryChip
                            ]}
                            onPress={() => setSelectedCategory(item)}
                        >
                            <Text style={[
                                styles.categoryTextChip,
                                selectedCategory === item && styles.activeCategoryText
                            ]}>
                                {item}
                            </Text>
                        </TouchableOpacity>
                    )}
                />
            </View>

            {/* Places List */}
            {loading ? (
                <View style={styles.center}><ActivityIndicator /></View>
            ) : (
                <FlatList
                    data={places}
                    keyExtractor={(item) => item._id}
                    renderItem={renderPlaceItem}
                    contentContainerStyle={styles.listContent}
                    ListEmptyComponent={
                        <View style={styles.center}>
                            <Text style={styles.emptyText}>No places found.</Text>
                        </View>
                    }
                />
            )}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8fafc',
    },
    header: {
        padding: 20,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#0f172a',
        marginBottom: 16,
    },
    searchBar: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f1f5f9',
        padding: 12,
        borderRadius: 12,
        gap: 12,
    },
    searchText: {
        color: '#94a3b8',
    },
    categoriesContainer: {
        backgroundColor: '#fff',
        paddingBottom: 16,
    },
    categoriesList: {
        paddingHorizontal: 20,
        gap: 8,
    },
    categoryChip: {
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 20,
        backgroundColor: '#f1f5f9',
        borderWidth: 1,
        borderColor: '#e2e8f0',
    },
    activeCategoryChip: {
        backgroundColor: '#2563eb',
        borderColor: '#2563eb',
    },
    categoryTextChip: {
        color: '#64748b',
        fontWeight: '500',
    },
    activeCategoryText: {
        color: '#fff',
    },
    listContent: {
        padding: 20,
        gap: 16,
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: 16,
        overflow: 'hidden',
        marginBottom: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 8,
        elevation: 2,
    },
    cardImage: {
        width: '100%',
        height: 180,
        resizeMode: 'cover',
    },
    cardContent: {
        padding: 16,
    },
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8,
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#0f172a',
        flex: 1,
    },
    ratingBadge: {
        backgroundColor: '#fffbeb',
        paddingHorizontal: 6,
        paddingVertical: 2,
        borderRadius: 4,
    },
    ratingText: {
        fontSize: 12,
        fontWeight: 'bold',
        color: '#b45309',
    },
    locationRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
        marginBottom: 8,
    },
    locationText: {
        fontSize: 14,
        color: '#64748b',
    },
    categoryText: {
        fontSize: 12,
        color: '#2563eb',
        fontWeight: '500',
        textTransform: 'uppercase',
    },
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 40,
    },
    emptyText: {
        color: '#94a3b8',
    },
    hiddenGemBadge: {
        position: 'absolute',
        bottom: 16,
        right: 16,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f3e8ff',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 12,
        gap: 4,
    },
    hiddenGemText: {
        fontSize: 10,
        fontWeight: 'bold',
        color: '#7e22ce',
    },
});
