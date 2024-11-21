import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Linking } from 'react-native';

const Profile = () => {
  const [userProfile, setUserProfile] = useState({
    name: '',
    profileImage: '',
    kelompok: '',
  });

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await fetch('https://api.github.com/users/erutm');
        const data = await response.json();

        setUserProfile({
          name: 'Ery Utami',
          profileImage: data.avatar_url,
          kelompok: 'Kelompok 29',
        });
      } catch (error) {
        console.error('Error fetching profile data:', error);
      }
    };

    fetchProfileData();
  }, []);

  // GitHub profile URL
  const handleProfileRedirect = () => {
    Linking.openURL('https://github.com/erutm');
  };

  return (
    <View style={styles.container}>
      <Image source={{ uri: userProfile.profileImage }} style={styles.profileImage} />
      <Text style={styles.name}>{userProfile.name}</Text>
      <Text style={styles.kelompok}>{userProfile.kelompok}</Text>
      
      <TouchableOpacity style={styles.button} onPress={handleProfileRedirect}>
        <Text style={styles.buttonText}>View GitHub Profile</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#f0f4f8',
  },
  profileImage: {
    width: 140,
    height: 140,
    borderRadius: 70,
    marginBottom: 20,
    borderWidth: 5,
    borderColor: '#577e3b',
  },
  name: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  kelompok: {
    fontSize: 20,
    color: '#666',
    marginBottom: 12,
  },
  button: {
    backgroundColor: '#4CAF50',
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 25,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Profile;