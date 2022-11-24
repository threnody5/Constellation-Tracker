import React, { useState, onEffect } from 'react';
import { ImageBackground, View, Text, StyleSheet, TextInput, Alert } from 'react-native';
import { authentication } from '../../FireBaseConfig';
import { signInWithEmailAndPassword } from 'firebase/auth';

import Button from '../../components/Button';
import { Background } from '../../Background/Background';
import { LoggedIn } from '../LoggedIn/LoggedIn';

export default function SignInScreen({ navigation }) {
    const [ emailAddress, setEmailAddress ] = useState();
    const [ password, setPassword ] = useState();

    onEmailHandler = (value) => {
        setEmailAddress(value);
    }

    onPasswordHandler = (value) => {
        setPassword(value);
    }

    const SignInUser = () => {
        signInWithEmailAndPassword(authentication, emailAddress, password)
            .then((userCredential) => {
                // signed in
                const user = userCredential.user;
                console.log(user);
                Alert.alert('Message',
                    'Successfully signed in',
                    [
                        {
                            text: 'Continue',
                            onPress: () => { { navigation.navigate('LoggedIn') } }
                        }
                    ]
                )

            })
            .catch((e) => {
                const errorCode = e.code;
                const errorMessage = e.message;
                console.log(errorCode, errorMessage);
                Alert.alert('Error', 'Invalid email or password');
            })
    }

    return (
        <ImageBackground style={ { flex: 1 } } source={ { uri: Background } }>
            <View style={ styles.container }>
                <View style={ styles.textContainer }>
                    <Text style={ styles.fontStyle }>Log In</Text>
                </View>
                <TextInput style={ styles.input }
                    placeholder='Email Address'
                    placeholderTextColor='white'
                    onChangeText={ onEmailHandler }
                />
                <TextInput style={ styles.input }
                    placeholder='Password'
                    placeholderTextColor='white'
                    secureTextEntry={ true }
                    onChangeText={ onPasswordHandler }
                />
                <Button style={ styles.button }
                    title='Sign In'
                    onPress={ SignInUser }
                />
                <Button style={ styles.button }
                    title='Go Back'
                    onPress={ () => { navigation.navigate('Home') } }
                />
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
    fontStyle: {
        color: 'white',
        fontSize: 24,
    },
    input: {
        backgroundColor: 'transparent',
        borderRadius: 5,
        borderLeftColor: 'white',
        borderLeftWidth: 2,
        borderTopColor: 'white',
        borderTopWidth: 2,
        borderRightColor: 'white',
        borderRightWidth: 2,
        borderBottomColor: 'white',
        borderBottomWidth: 2,
        marginLeft: 20,
        marginRight: 20,
        color: 'white',
        fontSize: 24,
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 10,
        marginTop: 20,
        marginBottom: 30
    },
    textContainer: {
        alignItems: 'center',
    }
});