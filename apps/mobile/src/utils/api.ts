import axios from 'axios';
import { Platform } from 'react-native';

// For Android Emulator, use 10.0.2.2. For iOS Simulator, use localhost.
// Replace with your machine's local IP if testing on physical device (e.g., http://192.168.1.5:5000)
const API_URL = Platform.select({
	android: 'http://10.0.2.2:5555/api',
	ios: 'http://localhost:5555/api',
	default: 'http://localhost:5555/api',
});

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
