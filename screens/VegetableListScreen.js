import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const VegetableListScreen = ({ navigation, vegetables, addToFavorites }) => {
  const handleItemPress = (vegetableId) => {
    navigation.navigate('VegetableDetail', { id: vegetableId });
  };

  const handleAddFavorite = (vegetable) => {
    addToFavorites(vegetable);
  };

  return (
    <View style={styles.container}>
      {vegetables.map((vegetable) => (
        <View key={vegetable.id} style={styles.vegetableItem}>
          <TouchableOpacity onPress={() => handleItemPress(vegetable.id)}>
            <Text>{vegetable.name}</Text> {/* The clickable title */}
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleAddFavorite(vegetable)}>
            <Text style={styles.favoriteText}>Add to Favorites</Text>
          </TouchableOpacity>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  vegetableItem: {
    marginBottom: 20,
  },
  favoriteText: {
    color: 'blue',
    marginTop: 5,
  },
});

export default VegetableListScreen;