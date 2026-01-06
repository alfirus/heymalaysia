import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface PostProps {
    username: string;
    content: string;
    timestamp: string;
    upvotes: number;
}

export const PostItem = ({ username, content, timestamp, upvotes }: PostProps) => {
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.username}>{username}</Text>
                <Text style={styles.time}>{timestamp}</Text>
            </View>
            <Text style={styles.content}>{content}</Text>
            <View style={styles.footer}>
                <Text style={styles.votes}>👍 {upvotes}</Text>
                {/* Add Reply button here later */}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#f1f5f9',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 8,
    },
    username: {
        fontWeight: 'bold',
        color: '#0f172a',
    },
    time: {
        fontSize: 12,
        color: '#94a3b8',
    },
    content: {
        fontSize: 15,
        color: '#334155',
        lineHeight: 22,
    },
    footer: {
        marginTop: 12,
        flexDirection: 'row',
    },
    votes: {
        fontSize: 12,
        color: '#64748b',
        fontWeight: '500',
    },
});
