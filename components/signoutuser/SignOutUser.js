/** @format */

//* imports
import { Text, Pressable, StyleSheet, View, Alert } from 'react-native';

import { getAuth, signOut } from 'firebase/auth';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';

export default function SignOutUser() {
  const navigation = useNavigation();
  //* function that signs out the user, navigating them back to the home screen
  signOutFunction = () => {
    const signOutAuthentication = getAuth();
    signOut(signOutAuthentication).then(() => {
      Alert.alert('Message', 'Successfully Signed Out', [
        {
          text: 'Go back to main page',
          onPress: () => {
            {
              navigation.navigate('Home');
            }
          },
        },
      ]);
    });
  };

  //* sign out button
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['rgba(37, 150, 190, 0.3)', 'rgba(46, 157, 209, 0.3)', 'rgba(46, 209, 98, 0.3)']}
        style={styles.gradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <Pressable
          style={styles.buttonContainer}
          onPress={signOutFunction}
        >
          <Text style={styles.textDecoration}>Sign Out</Text>
        </Pressable>
      </LinearGradient>
    </View>
  );
}

//* component styling
const styles = StyleSheet.create({
  textDecoration: {
    color: '#2ED1B3',
    textAlign: 'center',
    fontSize: 16,
    textTransform: 'uppercase',
    paddingTop: 13,
    paddingBottom: 13,
  },
  buttonContainer: {
    borderWidth: 1,
    borderColor: '#2ED1B3',
  },
  gradient: {
    height: 50,
    width: 200,
  },
  container: {
    alignItems: 'center',
    marginTop: 25,
  },
});
