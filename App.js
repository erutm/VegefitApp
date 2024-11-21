import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen';
import VegetableListScreen from './screens/VegetableListScreen';
import VegetableDetailScreen from './screens/VegetableDetailScreen';
import FavoriteScreen from './screens/FavoriteScreen';
import AboutScreen from './screens/AboutScreen';
import Profile from './screens/Profile';
import { Ionicons } from '@expo/vector-icons';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

export default function App() {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const loadFavorites = async () => {
      try {
        const storedFavorites = await AsyncStorage.getItem('favorites');
        if (storedFavorites) {
          setFavorites(JSON.parse(storedFavorites));
        }
      } catch (error) {
        console.error('Failed to load favorites data:', error);
      }
    };
    loadFavorites();
  }, []);
  
  useEffect(() => {
    const saveFavorites = async () => {
      try {
        await AsyncStorage.setItem('favorites', JSON.stringify(favorites));
      } catch (error) {
        console.error('Failed to save favorites data:', error);
      }
    };
    saveFavorites();
  }, [favorites]);
  
  const addToFavorites = (vegetable) => {
    setFavorites((prevFavorites) => {
      const itemWithId = { ...vegetable, id: vegetable.id || new Date().getTime() };
      const exists = prevFavorites.some((fav) => fav.id === itemWithId.id);
      if (!exists) {
        return [...prevFavorites, itemWithId];
      }
      return prevFavorites;
    });
  };
  
  const removeFromFavorites = (vegetableId) => {
    setFavorites((prevFavorites) => {
      const updatedFavorites = prevFavorites.filter((fav) => fav.id !== vegetableId);
      return updatedFavorites;
    });
  };

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            let iconName;
            if (route.name === 'Home') iconName = 'home';
            else if (route.name === 'Favorites') iconName = 'heart';
            else if (route.name === 'About') iconName = 'information-circle';
            else if (route.name === 'Profile') iconName = 'person';
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: 'tomato',
          tabBarInactiveTintColor: 'gray',
        })}
      >
        <Tab.Screen name="Home">
          {(props) => <HomeStack {...props} addToFavorites={addToFavorites} />}
        </Tab.Screen>
        <Tab.Screen name="Favorites">
          {(props) => (
            <FavoriteStack
              {...props}
              favorites={favorites}
              removeFromFavorites={removeFromFavorites}
              addToFavorites={addToFavorites} // Pass addToFavorites here
            />
          )}
        </Tab.Screen>
        <Tab.Screen name="About" component={AboutScreen} />
        <Tab.Screen name="Profile" component={Profile} />
      </Tab.Navigator>
      <StatusBar style="auto" />
    </NavigationContainer>
  );
}

function HomeStack({ addToFavorites }) {
  return (
    <Stack.Navigator>
      <Stack.Screen name="HomeScreen" component={HomeScreen} options={{ headerShown: false }} />
      <Stack.Screen
        name="VegetableList"
        children={(props) => (
          <VegetableListScreen {...props} addToFavorites={addToFavorites} />
        )}
        options={{ title: 'Vegetable List' }}
      />
      <Stack.Screen
        name="VegetableDetail"
        children={(props) => (
          <VegetableDetailScreen {...props} addToFavorites={addToFavorites} />
        )}
        options={{ title: 'Vegetable Detail' }}
      />
    </Stack.Navigator>
  );
}

function FavoriteStack({ favorites, removeFromFavorites, addToFavorites }) {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="FavoriteScreen"
        children={(props) => (
          <FavoriteScreen
            {...props}
            favorites={favorites}
            removeFromFavorites={removeFromFavorites}
            addToFavorites={addToFavorites} // Pass addToFavorites to FavoriteScreen if necessary
          />
        )}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="VegetableDetail"
        children={(props) => (
          <VegetableDetailScreen {...props} addToFavorites={addToFavorites} />
        )}
        options={{ title: 'Vegetable Detail' }}
      />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
});