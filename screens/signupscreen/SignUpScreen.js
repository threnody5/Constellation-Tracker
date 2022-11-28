/** @format */

import React, { useState } from 'react';
import { ImageBackground, View, Text, StyleSheet, TextInput, Alert } from 'react-native';
import { authentication } from '../../FireBaseConfig';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { database } from '../../FireBaseConfig';
import { ref, set } from 'firebase/database';

import Button from '../../components/Button';
import { Background } from '../../Background/Background';

import constellationData from '../../constellation.json';

export default function SignUpScreen({ navigation }) {
  const [emailAddress, setEmailAddress] = useState();
  const [password, setPassword] = useState();
  const [reenteredPassword, setReenteredPassword] = useState();

  onEmailHandler = (value) => {
    setEmailAddress(value);
  };

  onPasswordHandler = (value) => {
    setPassword(value);
  };

  onReenteredPasswordHandler = (value) => {
    setReenteredPassword(value);
  };

  const RegisterUser = () => {
    if (password !== reenteredPassword) {
      Alert.alert('Passwords do not match');
      return;
    }
    if (password.length < 6) {
      Alert.alert('Password must be at least 6 characters');
      return;
    }

    createUserWithEmailAndPassword(authentication, emailAddress, password)
      .then((userCredential) => {
        // user account created
        const userID = userCredential.user.uid;

        function writeUserData() {
          set(ref(database, 'users/' + userID), {
            constellationData,
          });
        }

        Alert.alert('Message', 'Account successfully created', [
          {
            text: 'Go back to main page',
            onPress: () => {
              {
                navigation.navigate('Home'), writeUserData();
              }
            },
          },
        ]);
      })
      .catch((e) => {
        const errorCode = e.code;
        const errorMessage = e.message;
        console.log(errorCode, errorMessage);
      });
  };

  return (
    <ImageBackground
      style={{ flex: 1 }}
      blurRadius={1}
      source={{ uri: Background }}
    >
      <View style={styles.container}>
        <View style={styles.textContainer}>
          <Text style={styles.fontStyle}>Create Account</Text>
        </View>
        <TextInput
          style={styles.input}
          placeholder='Email Address'
          placeholderTextColor='white'
          onChangeText={onEmailHandler}
        />
        <TextInput
          style={styles.input}
          placeholder='Password'
          placeholderTextColor='white'
          secureTextEntry={true}
          onChangeText={onPasswordHandler}
        />
        <TextInput
          style={styles.input}
          placeholder='Repeat Password'
          placeholderTextColor='white'
          secureTextEntry={true}
          onChangeText={onReenteredPasswordHandler}
        />
        <Button
          style={styles.button}
          title='Sign Up'
          onPress={RegisterUser}
        />
        <Button
          style={styles.button}
          title='Go Back'
          onPress={() => {
            navigation.navigate('Home');
          }}
        />
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  fontContainer: {
    marginTop: 50,
    marginBottom: 30,
    alignItems: 'center',
  },
  input: {
    backgroundColor: 'transparent',
    borderRadius: 5,
    borderBottomColor: 'white',
    borderBottomWidth: 1,
    marginLeft: 20,
    marginRight: 20,
    color: 'white',
    fontSize: 18,
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 10,
    marginTop: 20,
    marginBottom: 30,
  },
  textContainer: {
    alignItems: 'center',
  },
  fontStyle: {
    color: 'white',
    fontSize: 24,
  },
});
