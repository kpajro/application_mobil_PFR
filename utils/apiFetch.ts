// utils/api.js
import AsyncStorage from '@react-native-async-storage/async-storage';
import Constants from 'expo-constants';

const extra = Constants.expoConfig?.extra || {};
const API_BASE_URL = extra.API_BASE_URL;



export async function apiFetch(endpoint, options = {}, headers = {}, body = {}) {
  let token = await AsyncStorage.getItem('token');

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  let response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    ...headers,
    ...body
  });

  // If expired, try refreshing
  if (response.status === 401) {
    await AsyncStorage.removeItem('token');
  }

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`HTTP ${response.status}: ${errorText}`);
  }

  return response.json();
}
