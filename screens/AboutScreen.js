import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';

export default function AboutScreen() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image
        source={require('../assets/vegefit.png')}
        style={styles.logo}
      />
      <Text style={styles.title}>Vegefit</Text>
      <Text style={styles.description}>
        Vegefit adalah aplikasi untuk membantu kamu mengenal sayur dan buah, serta memberikan informasi yang berguna.
      </Text>
      <Text style={styles.description}>
        Di aplikasi ini, kamu bisa menemukan informasi lengkap tentang manfaat kesehatan serta cara-cara merawat sayur dan buah yang dapat membantumu hidup lebih sehat.
      </Text>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Fitur Utama:</Text>
        <Text style={styles.cardDescription}>
          - Temukan berbagai jenis sayuran dan buah-buahan
        </Text>
        <Text style={styles.cardDescription}>
          - Simpan sayur dan buah favoritmu ke dalam daftar favorit
        </Text>
        <Text style={styles.cardDescription}>
          - Dapatkan informasi lengkap tentang manfaat kesehatan dari setiap jenis sayuran dan buah
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  logo: {
    width: 300,
    height: 300,
    borderRadius: 5,
    marginBottom: 5,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#4CAF50',
    marginBottom: 15,
  },
  description: {
    fontSize: 16,
    color: '#555',
    textAlign: 'center',
    marginBottom: 15,
  },
  card: {
    marginTop: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    width: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4CAF50',
    marginBottom: 10,
  },
  cardDescription: {
    fontSize: 16,
    color: '#666',
    marginBottom: 5,
  },
});