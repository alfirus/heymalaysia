import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import * as Location from 'expo-location';
import { Cloud, Sun, CloudRain } from 'lucide-react-native';
import api from '../../utils/api';

interface WeatherData {
  weather: [{ main: string; description: string; icon: string }];
  main: { temp: number; humidity: number };
  name: string;
}

export const WeatherWidget = () => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          setErrorMsg('Permission to access location was denied');
          setLoading(false);
          return;
        }

        let location = await Location.getCurrentPositionAsync({});
        const { latitude, longitude } = location.coords;

        fetchWeather(latitude, longitude);
      } catch (error) {
         // Fallback for emulator if location fails
         fetchWeather(3.140853, 101.693207); // KL Coordinates
      }
    })();
  }, []);

  const fetchWeather = async (lat: number, lon: number) => {
    try {
      const { data } = await api.get('/weather/current', {
        params: { lat, lon }
      });
      setWeather(data);
    } catch (error) {
      console.error('Weather fetch error', error);
      setErrorMsg('Failed to load weather');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <View style={styles.loadingContainer}><ActivityIndicator size="small" color="#2563eb" /></View>;
  if (errorMsg) return <View style={styles.errorContainer}><Text style={styles.errorText}>{errorMsg}</Text></View>;
  if (!weather) return null;

  const getIcon = (main: string) => {
    switch (main) {
      case 'Rain': return <CloudRain color="#fff" size={32} />;
      case 'Clouds': return <Cloud color="#fff" size={32} />;
      default: return <Sun color="#fff" size={32} />;
    }
  };

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.city}>{weather.name}</Text>
        <Text style={styles.desc}>{weather.weather[0].description}</Text>
      </View>
      <View style={styles.tempContainer}>
        {getIcon(weather.weather[0].main)}
        <Text style={styles.temp}>{Math.round(weather.main.temp)}°C</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#3b82f6', // blue-500
    borderRadius: 16,
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    shadowColor: '#2563eb',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  loadingContainer: {
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    padding: 16,
    backgroundColor: '#fee2e2',
    borderRadius: 12,
    marginBottom: 16,
  },
  errorText: {
    color: '#dc2626',
    fontSize: 12,
  },
  city: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  desc: {
    color: '#bfdbfe', // blue-200
    fontSize: 14,
    textTransform: 'capitalize',
    marginTop: 4,
  },
  tempContainer: {
    alignItems: 'center',
  },
  temp: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 4,
  },
});
