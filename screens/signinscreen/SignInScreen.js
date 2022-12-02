/** @format */

//* imports
import React, { useState } from 'react';
import { ImageBackground, View, Text, StyleSheet, TextInput, Alert } from 'react-native';
import { authentication } from '../../FireBaseConfig';
import { signInWithEmailAndPassword } from 'firebase/auth';

import Button from '../../components/Button';
import { Background } from '../../Background/Background';

//* sign in function
export default function SignInScreen({ navigation }) {
  const [emailAddress, setEmailAddress] = useState();
  const [password, setPassword] = useState();

  onEmailHandler = (value) => {
    setEmailAddress(value);
  };

  onPasswordHandler = (value) => {
    setPassword(value);
  };

  //* function fires when the user touches the sign in button
  const SignInUser = () => {
    //* checks firebase authentication to verify if the account exists
    signInWithEmailAndPassword(authentication, emailAddress, password)
      .then((userCredential) => {
        const user = userCredential.user;
        //* alert informing the user that their login attempt was successful and routes the user to their signed in page
        Alert.alert('Message', 'Successfully signed in', [
          {
            text: 'Continue',
            onPress: () => {
              {
                navigation.navigate('LoggedIn', { loggedInUser: user.uid });
              }
            },
          },
        ]);
      })
      .catch((e) => {
        const errorCode = e.code;
        const errorMessage = e.message;
        console.log(errorCode, errorMessage);
        Alert.alert('Error', 'Invalid email or password');
      });
  };

  //* sign in screen
  return (
    <ImageBackground
      style={{ flex: 1 }}
      blurRadius={1}
      source={{ uri: Background }}
    >
      <View style={styles.container}>
        <View style={styles.textContainer}>
          <Text style={styles.fontStyle}>Log In</Text>
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
        <Button
          style={styles.button}
          title='Sign In'
          onPress={SignInUser}
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

//* component styling
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  fontStyle: {
    color: 'white',
    fontSize: 24,
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
});
