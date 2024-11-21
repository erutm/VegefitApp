import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

export default function VegetableCard({ vegetable, onPress }) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.card}>
      <Image source={{ uri: vegetable.image_url }} style={styles.image} />
      <View style={styles.info}>
        <Text style={styles.name}>{vegetable.product_name}</Text>
        <Text style={styles.brand}>{vegetable.brands}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    padding: 10,
    marginVertical: 5,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 3,
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 10,
  },
  info: {
    marginLeft: 10,
    justifyContent: 'center',
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  brand: {
    fontSize: 14,
    color: '#888',
  },
});