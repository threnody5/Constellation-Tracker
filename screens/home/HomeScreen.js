import React from 'react';
import { ImageBackground, View, Text, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Header from '../../header/Header';
import Button from '../../components/Button';
import SignInScreen from '../signinscreen/SignInScreen';
import SignUpScreen from '../signupscreen/SignUpScreen';
import LoggedIn, { loggedIn } from '../LoggedIn/LoggedIn';
import { Background } from '../../Background/Background';

export default function HomeScreen() {
  // Initialize Firebase authentication and get a reference to the service

  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name='Home'
          component={ HomeScreenStack }
          options={ { headerShown: false } }
        />
        <Stack.Screen
          name='SignIn'
          component={ SignInScreen }
          options={ { headerShown: false } }
        />
        <Stack.Screen
          name='SignUp'
          component={ SignUpScreen }
          options={ { headerShown: false } }
        />
        <Stack.Screen
        name='LoggedIn'
        component={ LoggedIn }
        options={ { headerShown: false } }
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

const HomeScreenStack = ({ navigation }) => {
  return (
    <ImageBackground style={ { flex: 1 } } source={ { uri: Background } }>
      <View style={ styles.container }>
        <Header />
        <View style={ styles.container }>
          <Button style={ styles.button }
            title='Log-In'
            onPress={ () => { navigation.navigate('SignIn') } }
          />
          <View style={ styles.fontContainer }>
            <Text style={ styles.fontStyle }>Don't have an Account?</Text>
          </View>
          <Button style={ styles.button }
            title='Sign-up'
            onPress={ () => { navigation.navigate('SignUp') } }
          />
        </View>
      </View>
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  button: {
    backgroundColor: '#33bbff',
    paddingTop: 10,
    paddingBottom: 10,
    marginLeft: 30,
    marginRight: 30,
    borderRadius: 5,
    marginBottom: 40
  },
  fontContainer: {
    marginTop: 50,
    marginBottom: 30,
    alignItems: 'center',
  },
  fontStyle: {
    color: 'white',
    fontSize: 22,
  }
});
