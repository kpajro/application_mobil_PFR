import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

export default function Footer() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <View style={styles.links}>
        <TouchableOpacity onPress={() => router.push('/(tabs)/about')}>
          <Text style={styles.link}>À propos</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push('/(tabs)/cgu')}>
        <Text style={styles.link}>CGU</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push('/(tabs)/legal')}>
          <Text style={styles.link}>Mentions légales</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push('/(tabs)/faq')}>
        <Text style={styles.link}>FAQ</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push('/(tabs)/support')}>
        <Text style={styles.link}>Support</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.copy}>© 2025 Cyna</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    backgroundColor: '#e0e7ff',
    alignItems: 'center',
  },
  links: {
    flexDirection: 'row',
    gap: 20,
    marginBottom: 4,
  },
  link: {
    color: '#2563eb',
    fontWeight: '500',
  },
  copy: {
    fontSize: 12,
    color: '#6b7280',
  },
});
