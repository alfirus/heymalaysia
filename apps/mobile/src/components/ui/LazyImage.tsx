import React, { useState } from 'react';
import { Image, View, ActivityIndicator, StyleSheet, ImageStyle, StyleProp } from 'react-native';

interface LazyImageProps {
    source: { uri: string };
    style?: StyleProp<ImageStyle>;
    placeholderColor?: string;
}

export const LazyImage: React.FC<LazyImageProps> = ({ source, style, placeholderColor = '#e2e8f0' }) => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    return (
        <View style={[styles.container, style]}>
            {loading && !error && (
                <View style={[styles.placeholder, { backgroundColor: placeholderColor }]}>
                    <ActivityIndicator size="small" color="#94a3b8" />
                </View>
            )}
            {!error ? (
                <Image
                    source={source}
                    style={[styles.image, style]}
                    onLoadEnd={() => setLoading(false)}
                    onError={() => {
                        setLoading(false);
                        setError(true);
                    }}
                />
            ) : (
                <View style={[styles.placeholder, styles.errorPlaceholder, { backgroundColor: placeholderColor }]}>
                    {/* You could put an icon here */}
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        overflow: 'hidden',
    },
    image: {
        width: '100%',
        height: '100%',
        position: 'absolute',
    },
    placeholder: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    errorPlaceholder: {
        justifyContent: 'center',
        alignItems: 'center',
    },
});
