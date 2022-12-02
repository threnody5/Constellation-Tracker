/** @format */

//* imports
import { Text, Pressable, StyleSheet, View } from 'react-native';

import { LinearGradient } from 'expo-linear-gradient';

export default function Button(props) {
  const { onPress, title } = props;

  //* button component used throughout the app
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['rgba(0, 64, 128, .4)', 'rgba(115, 0, 153, .4)', 'rgba(191, 0, 255, .4)']}
        style={styles.gradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <Pressable
          style={styles.buttonContainer}
          onPress={onPress}
        >
          <Text style={styles.textDecoration}>{title}</Text>
        </Pressable>
      </LinearGradient>
    </View>
  );
}

//* component styling
const styles = StyleSheet.create({
  textDecoration: {
    color: 'white',
    textAlign: 'center',
    fontSize: 20,
    textTransform: 'uppercase',
    paddingTop: 21,
    paddingBottom: 23,
  },
  buttonContainer: {
    borderWidth: 1,
    borderColor: 'white',
  },
  gradient: {
    height: 70,
    width: 300,
    marginBottom: 25,
  },
  container: {
    alignItems: 'center',
  },
});
