import React, { useState, useEffect } from 'react';
import { View, StyleSheet, FlatList, TouchableOpacity, Text, RefreshControl, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import api from '../../utils/api';
import { PostItem } from '../../components/community/PostItem';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { MapPin } from 'lucide-react-native';

// Mock state list
const STATES = ['Selangor', 'Penang', 'Johor', 'Sabah', 'Sarawak', 'Kuala Lumpur'];

export default function CommunityScreen({ route }: any) {
    const initialTab = route?.params?.tab || 'global';
    const [activeTab, setActiveTab] = useState<'global' | 'local'>(initialTab);
    const [selectedState, setSelectedState] = useState('Kuala Lumpur');
    const [posts, setPosts] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    
    // New Post State
    const [newPostContent, setNewPostContent] = useState('');
    const [posting, setPosting] = useState(false);

    useEffect(() => {
        fetchPosts();
    }, [activeTab, selectedState]);

    const fetchPosts = async () => {
        setLoading(true);
        try {
            const entityId = activeTab === 'global' ? 'global' : selectedState;
            const entityType = 'Post'; // Generic post type
            
            const { data } = await api.get('/comments', {
                params: { entityId, entityType }
            });
            setPosts(data);
        } catch (error) {
            console.error('Failed to fetch posts', error);
        } finally {
            setLoading(false);
        }
    };

    const handlePost = async () => {
        if (!newPostContent.trim()) return;
        setPosting(true);
        try {
            const entityId = activeTab === 'global' ? 'global' : selectedState;
            
            await api.post('/comments', {
                entityId,
                entityType: 'Post',
                content: newPostContent,
                username: 'Me' // In real app, handled by backend/token
            });
            
            setNewPostContent('');
            fetchPosts(); // Refresh
        } catch (error) {
            alert('Failed to post');
        } finally {
            setPosting(false);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            {/* Header / Tabs */}
            <View style={styles.header}>
                <Text style={styles.title}>Community</Text>
                <View style={styles.tabs}>
                    <TouchableOpacity 
                        style={[styles.tab, activeTab === 'global' && styles.activeTab]}
                        onPress={() => setActiveTab('global')}
                    >
                        <Text style={[styles.tabText, activeTab === 'global' && styles.activeTabText]}>Global</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        style={[styles.tab, activeTab === 'local' && styles.activeTab]}
                        onPress={() => setActiveTab('local')}
                    >
                        <Text style={[styles.tabText, activeTab === 'local' && styles.activeTabText]}>Local</Text>
                    </TouchableOpacity>
                </View>

                {/* State Filter for Local Tab */}
                {activeTab === 'local' && (
                    <View style={styles.locationBar}>
                        <MapPin size={16} color="#64748b" />
                        <Text style={styles.locationText}>Viewing: {selectedState}</Text>
                        {/* Dropdown would go here in full version */}
                    </View>
                )}
            </View>

            {/* Post Input */}
            <View style={styles.inputContainer}>
                <Input 
                    value={newPostContent}
                    onChangeText={setNewPostContent}
                    placeholder={`Start a discussion in ${activeTab === 'global' ? 'Global' : selectedState}...`}
                    style={{ marginBottom: 8 }}
                />
                <Button 
                    title={posting ? "Posting..." : "Post"} 
                    onPress={handlePost} 
                    disabled={posting}
                />
            </View>

            {/* Feed */}
            {loading ? (
                <View style={styles.center}><ActivityIndicator /></View>
            ) : (
                <FlatList
                    data={posts}
                    keyExtractor={(item) => item._id}
                    renderItem={({ item }) => (
                        <PostItem
                            username={item.username}
                            content={item.content}
                            timestamp={new Date(item.createdAt).toLocaleDateString()}
                            upvotes={item.upvotes}
                        />
                    )}
                    refreshControl={<RefreshControl refreshing={loading} onRefresh={fetchPosts} />}
                    ListEmptyComponent={<Text style={styles.emptyText}>No discussions yet. Be the first!</Text>}
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
        padding: 16,
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#e2e8f0',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    tabs: {
        flexDirection: 'row',
        backgroundColor: '#f1f5f9',
        borderRadius: 8,
        padding: 4,
    },
    tab: {
        flex: 1,
        paddingVertical: 8,
        alignItems: 'center',
        borderRadius: 6,
    },
    activeTab: {
        backgroundColor: '#fff',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 1,
        elevation: 1,
    },
    tabText: {
        fontWeight: '500',
        color: '#64748b',
    },
    activeTabText: {
        color: '#0f172a',
        fontWeight: '600',
    },
    locationBar: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 12,
        gap: 6,
    },
    locationText: {
        color: '#475569',
        fontWeight: '500',
    },
    inputContainer: {
        padding: 16,
        backgroundColor: '#fff',
        marginBottom: 8,
    },
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    emptyText: {
        textAlign: 'center',
        marginTop: 40,
        color: '#94a3b8',
    },
});
