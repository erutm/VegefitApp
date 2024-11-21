import React, { useState, useLayoutEffect } from 'react';
import { View, TextInput, Button, FlatList, Text, StyleSheet, ActivityIndicator, Alert, TouchableOpacity } from 'react-native';
import searchVarieties from '../utils/api';
import { Ionicons } from '@expo/vector-icons';

export default function HomeScreen({ navigation }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  useLayoutEffect(() => {
    navigation.setOptions({ title: 'Home' });
  }, [navigation]);

  const searchForItems = async () => {
    if (!searchTerm.trim()) {
      Alert.alert('Error', 'Please enter a search term');
      return;
    }

    setLoading(true);
    try {
      const fetchedResults = await searchVarieties(searchTerm);
      if (fetchedResults.length === 0) {
        Alert.alert('No Results', 'No varieties found for your search');
      }
      setResults(fetchedResults.results);
    } catch (error) {
      Alert.alert('Error', 'An error occurred while searching');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const removeItem = (itemId) => {
    setResults((prevResults) => prevResults.filter(item => item.id !== itemId));
  };

  const clearSearch = () => {
    setSearchTerm('');
    setResults([]);
  };

  return (
    <View style={styles.container}>
      {/* Input pencarian */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Search Varieties"
          onChangeText={setSearchTerm}
          value={searchTerm}
        />
        {/* Clear icon inside the input field */}
        {searchTerm ? (
          <TouchableOpacity onPress={clearSearch} style={styles.clearIcon}>
            <Ionicons name="close-circle" size={24} color="gray" />
          </TouchableOpacity>
        ) : null}
      </View>
      <Button title="Search" onPress={searchForItems} color="#4CAF50" />

      {/* Loader */}
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" style={styles.loader} />
      ) : (
        <FlatList
          data={results}
          keyExtractor={(item, index) => item.id ? item.id.toString() : index.toString()}
          renderItem={({ item }) => (
            <View style={styles.itemContainer}>
              <Text
                style={styles.itemText}
                onPress={() => navigation.navigate('VegetableDetail', { vegetable: item })}
              >
                {item.botname} {/* Menampilkan nama varietas */}
              </Text>
              {/* Remove the delete icon here */}
            </View>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  input: {
    height: 40,
    flex: 1,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  clearIcon: {
    position: 'absolute',
    right: 10,
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  itemText: {
    fontSize: 16,
    padding: 10,
    color: '#4CAF50',
  },
  loader: {
    marginVertical: 20,
  },
});