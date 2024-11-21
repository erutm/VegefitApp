import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';

export default function FavoriteScreen({ favorites, navigation, removeFromFavorites, addToFavorites }) {
  const [favoriteList, setFavoriteList] = useState([]);

  useEffect(() => {
    const uniqueFavorites = Array.from(new Set(favorites.map(item => item.botname || item.id)))
      .map(identifier => favorites.find(item => item.botname === identifier || item.id === identifier));
      
    setFavoriteList(uniqueFavorites);
  }, [favorites]);
  
  const handleAddToFavorites = (item) => {
    if (!favoriteList.some(fav => fav.id === item.id)) {
      addToFavorites(item);
    }
  };

  return (
    <View style={styles.container}>
      {favoriteList.length > 0 ? (
        <FlatList
          data={favoriteList}
          renderItem={({ item }) => (
            <View style={styles.favoriteItem}>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('VegetableDetail', { vegetable: item, addToFavorites: handleAddToFavorites });
                }}
              >
                <Text style={styles.itemText}>{item.botname || 'Unnamed Vegetable'}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.removeButton}
                onPress={() => removeFromFavorites(item.id)}
              >
                <Text style={styles.removeText}>Remove</Text>
              </TouchableOpacity>
            </View>
          )}
          keyExtractor={(item) => item.id?.toString() || item.botname || Math.random().toString()}
        />
      ) : (
        <Text style={styles.text}>Your favorite vegetables will appear here.</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f9f9f9',
  },
  text: {
    fontSize: 18,
    color: '#888',
    textAlign: 'center',
  },
  favoriteItem: {
    padding: 15,
    marginVertical: 8,
    backgroundColor: '#e2e2e2',
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  itemText: {
    fontSize: 16,
    color: '#333',
  },
  removeButton: {
    backgroundColor: '#ff6347',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  removeText: {
    color: '#fff',
    fontSize: 14,
  },
});