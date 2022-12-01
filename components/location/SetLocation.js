/** @format */
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';

import Checkbox from 'expo-checkbox';
import * as Location from 'expo-location';

export default function SetLocation() {
  const [location, setLocation] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    async () => {
      console.log('this fires');

      let status = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMessage('Permission for location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);

      let text = 'Waiting...';
      if (errorMessage) {
        text = errorMessage;
      } else if (location) {
        text = JSON.stringify(location);
        console.log(text);
      }
    };
  });

  return (
    <View style={styles.checkBoxContainer}>
      <Checkbox
        value={location}
        onValueChange={setLocation}
        color={location ? 'rgb(191, 0, 255)' : undefined}
      />
      <Text style={styles.checkBoxText}>Enable Location</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  checkBoxText: {
    color: 'white',
    fontSize: 18,
    marginLeft: 20,
  },
  checkBoxContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    marginLeft: 20,
    marginBottom: 20,
  },
});
