import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  Button,
  Alert,
} from 'react-native';

export default function VegetableDetail({ route, navigation, addToFavorites, favorites = [] }) {
  const vegetable = route?.params?.vegetable;

  if (!vegetable) {
    useEffect(() => {
      navigation.goBack();
    }, []);
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>No data found. Redirecting...</Text>
      </View>
    );
  }

  const handleAddToFavorites = () => {
    if (typeof addToFavorites === 'function') {
      const isAlreadyFavorite = favorites.some(
        (fav) => fav.botname === vegetable.botname || fav.id === vegetable.id
      );

      if (isAlreadyFavorite) {
        Alert.alert('Already in Favorites', `${vegetable.botname} is already in your favorites.`);
      } else {
        addToFavorites(vegetable);
        Alert.alert('Added to Favorites', `${vegetable.botname} has been added to your favorites!`);
      }
    } else {
      Alert.alert('Error', 'Unable to add to favorites. Please try again later.');
    }
  };

  return (
    <View style={styles.wrapper}>
      <ScrollView style={styles.container}>
        {vegetable.imageurl ? (
          <Image source={{ uri: vegetable.imageurl }} style={styles.image} />
        ) : (
          <View style={styles.placeholder}>
            <Text style={styles.placeholderText}>Image not available</Text>
          </View>
        )}

        <Text style={styles.title}>
          {vegetable.botname || 'Unnamed Vegetable'}
        </Text>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Description:</Text>
          <Text style={styles.sectionContent}>
            {vegetable.description || 'No description available'}
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Uses:</Text>
          <Text style={styles.sectionContent}>
            {vegetable.uses || 'No uses specified'}
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Propagation:</Text>
          <Text style={styles.sectionContent}>
            {vegetable.propagation || 'No propagation details'}
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Soil:</Text>
          <Text style={styles.sectionContent}>
            {vegetable.soil || 'No soil details'}
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Climate:</Text>
          <Text style={styles.sectionContent}>
            {vegetable.climate || 'No climate information'}
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Health Benefits:</Text>
          <Text style={styles.sectionContent}>
            {vegetable.health || 'No health benefits mentioned'}
          </Text>
        </View>
      </ScrollView>

      {/* Button to add to favorites */}
      <View style={styles.buttonContainer}>
        <Button title="Add to Favorite" onPress={handleAddToFavorites} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: '#fff',
    marginBottom: 60,
  },
  image: {
    width: '100%',
    height: 250,
    resizeMode: 'cover',
    borderRadius: 10,
    marginBottom: 20,
  },
  placeholder: {
    width: '100%',
    height: 250,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    borderRadius: 10,
  },
  placeholderText: {
    color: '#888',
    fontSize: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
    color: '#333',
  },
  section: {
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#444',
  },
  sectionContent: {
    fontSize: 16,
    color: '#666',
    marginTop: 5,
    textAlign: 'justify',
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 10,
    left: 15,
    right: 15,
  },
  errorText: {
    fontSize: 18,
    color: 'red',
    textAlign: 'center',
  },
});