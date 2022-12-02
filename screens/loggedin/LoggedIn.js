/** @format */

//* imports
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Pressable,
  Modal,
  ImageBackground,
  Image,
  Alert,
} from 'react-native';

import Button from '../../components/Button';
import { ScrollView } from 'react-native-gesture-handler';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons } from '@expo/vector-icons';
import { Background } from '../../Background/Background';
import { database } from '../../FireBaseConfig';
import { ref, set, onValue } from 'firebase/database';
import SignOutUser from '../../components/signoutuser/SignOutUser';

import { Audio } from 'expo-av';

import Checkbox from 'expo-checkbox';

export default function LoggedIn({ route }) {
  let constellationDatabaseInfo = null;
  let constellationDatabaseUpdatedInfo = [];

  let colorsForSeenOrNot = [];
  let textFormat = {};

  const [modalDisplay, setModalDisplay] = useState(false);
  const [selectedConstellationDataKey, setSelectedConstellationDataKey] = useState();
  const [selectedConstellationDataID, setSelectedConstellationDataID] = useState(null);
  const [selectedConstellationDataName, setSelectedConstellationDataName] = useState(null);
  const [selectedConstellationDataInfo, setSelectedConstellationDataInfo] = useState(null);
  const [selectedConstellationDataUrl, setSelectedConstellationDataUrl] = useState(null);
  const [haveSeenBefore, setHaveSeenBefore] = useState(null);
  const [databaseList, setDatabaseList] = useState(null);
  const [serverData, setServerData] = useState([]);
  const [haveSeen, setHaveSeen] = useState(false);
  const [sound, setSound] = useState();

  //* function that is called on page load, that plays the sound file
  async function playSound() {
    console.log('Loading Sound');
    const { sound } = await Audio.Sound.createAsync(
      require('../../components/audio/industrial-pulse-drone-27456.mp3')
    );
    setSound(sound);

    console.log('Playing Sound');
    await sound.playAsync();
  }

  //* unloads sound file after playback
  useEffect(() => {
    return sound
      ? () => {
          console.log('Unloading Sound');
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  onSelectedConstellationDataKeyHandler = (value) => {
    setSelectedConstellationDataKey(value);
  };

  onSelectedConstellationDataIDHandler = (value) => {
    setSelectedConstellationDataID(value);
  };

  onSelectedConstellationDataNameHandler = (value) => {
    setSelectedConstellationDataName(value);
  };

  onSelectedConstellationDataInfoHandler = (value) => {
    setSelectedConstellationDataInfo(value);
  };

  onSelectedConstellationDataUrlHandler = (value) => {
    setSelectedConstellationDataUrl(value);
  };

  onHaveSeenChangeHandler = (value) => {
    setHaveSeen(value);
  };

  onHaveSeenBeforeHandler = (value) => {
    setHaveSeenBefore(value);
  };

  //* passed in uid from the sign in screen
  const { loggedInUser } = route.params;

  //* data retrieval from firebase under their account
  retrieveData = () => {
    constellationDatabaseInfo = ref(database, 'users/' + loggedInUser);
    onValue(constellationDatabaseInfo, (snapshot) => {
      constellationDatabaseUpdatedInfo = snapshot.val();
      setServerData(constellationDatabaseUpdatedInfo.constellationData);
      setDatabaseList(true);
    });
  };

  //* useEffect calling data from database, and playing sound file on page load
  useEffect(() => {
    retrieveData();
    playSound();
  }, []);

  //* function that writes updated data to the database
  function writeUserData() {
    //* check if the data has not been updated, alerting the user of no changes
    if (haveSeen === haveSeenBefore) {
      Alert.alert('Update', 'No changes have been made', [
        {
          text: 'Okay',
        },
      ]);
      return;
      //* if the data has been updated, writes the updated data to the database under their uid
    } else {
      set(
        ref(
          database,
          'users/' + loggedInUser + '/constellationData/' + selectedConstellationDataKey
        ),
        {
          haveSeen: haveSeen,
          id: selectedConstellationDataID,
          information: selectedConstellationDataInfo,
          name: selectedConstellationDataName,
          url: selectedConstellationDataUrl,
        }
      );
      //* informing the user that their changes were successfully saved to the database
      Alert.alert('Update', 'Changes saved successfully', [
        {
          text: 'Okay',
        },
      ]);

      //* retrieves updated data from the database
      retrieveData();
    }
  }

  //* renders loading screen until data is loaded from the database
  //* if the value haveSeen from the database is false, the constellation object box and name are rendered with purple colors, if haveSeen is true, constellation object boxes are rendered with blue colors
  //* these colors and values are updated on each login, and each time the user updates a constellation object
  return (
    <ImageBackground
      style={{ flex: 1 }}
      blurRadius={1}
      source={{ uri: Background }}
    >
      <View>
        <SignOutUser />
        <Modal
          visible={modalDisplay}
          animationType='fade'
        >
          <ImageBackground
            style={{ flex: 1 }}
            blurRadius={1}
            source={{ uri: Background }}
          >
            <ScrollView>
              <View>
                <MaterialIcons
                  name='close'
                  size={35}
                  onPress={() => {
                    setModalDisplay(false);
                  }}
                  style={styles.modalToggle}
                />
                <View style={styles.modalContainer}>
                  <Text style={styles.modalTitle}>{selectedConstellationDataName}</Text>
                  <Image
                    style={styles.image}
                    source={{ uri: selectedConstellationDataUrl }}
                  />
                  <Text style={styles.modalText}>{selectedConstellationDataInfo}</Text>
                </View>
                <View style={styles.checkBoxContainer}>
                  <Checkbox
                    value={haveSeen}
                    onValueChange={onHaveSeenChangeHandler}
                    color={haveSeen ? 'rgb(191, 0, 255)' : undefined}
                  />
                  <Text style={styles.checkBoxText}>I have Seen this in the sky!</Text>
                </View>
                <Button
                  title='Update'
                  onPress={writeUserData}
                />
              </View>
            </ScrollView>
          </ImageBackground>
        </Modal>
        <SafeAreaView>
          <ScrollView>
            <View style={styles.container}>
              {!databaseList && <Text style={styles.textFormat}>LOADING</Text>}
              {databaseList &&
                serverData.map((item, key) => (
                  <LinearGradient
                    {...(item.haveSeen
                      ? (colorsForSeenOrNot = [
                          'rgba(17, 161, 238, 0.2)',
                          'rgba(17, 51, 238, 0.2)',
                          'rgba(17, 238, 204, 0.2)',
                        ])
                      : (colorsForSeenOrNot = [
                          'rgba(191, 0, 255, 0.2)',
                          'rgba(115, 0, 153, 0.2)',
                          'rgba(0, 64, 128, 0.2)',
                        ]))}
                    colors={colorsForSeenOrNot}
                    style={styles.gradient}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                  >
                    <Pressable
                      style={styles.pressableContainer}
                      key={key}
                      onPress={() => {
                        setHaveSeenBefore(item.haveSeen);
                        setModalDisplay(true);
                        setHaveSeen(item.haveSeen);
                        onSelectedConstellationDataKeyHandler(key);
                        onSelectedConstellationDataNameHandler(item.id);
                        onSelectedConstellationDataNameHandler(item.name);
                        onSelectedConstellationDataInfoHandler(item.information);
                        onSelectedConstellationDataUrlHandler(item.url);
                      }}
                    >
                      <Text
                        {...(item.haveSeen
                          ? (textFormat = styles.seenTextFormat)
                          : (textFormat = styles.unseenTextFormat))}
                        style={textFormat}
                      >
                        {item.name}
                      </Text>
                    </Pressable>
                  </LinearGradient>
                ))}
            </View>
          </ScrollView>
        </SafeAreaView>
      </View>
    </ImageBackground>
  );
}

//* component styling
const styles = StyleSheet.create({
  seenTextFormat: {
    color: '#11a1ee',
    fontSize: 24,
  },
  unseenTextFormat: {
    color: '#aa80ff',
    fontSize: 24,
  },
  container: {
    alignItems: 'center',
    flex: 1,
    marginTop: 50,
    marginBottom: 150,
  },
  pressableContainer: {
    alignItems: 'center',
    paddingTop: 5,
    paddingBottom: 5,
    width: 300,
    marginTop: 10,
    marginBottom: 10,
  },
  gradient: {
    height: 60,
    width: 300,
    marginBottom: 20,
  },
  modalToggle: {
    marginBottom: 20,
    color: 'white',
    borderWidth: 1,
    borderColor: 'white',
    textAlign: 'right',
    marginLeft: 345,
    marginRight: 30,
  },
  image: {
    width: 370,
    height: 370,
    resizeMode: 'contain',
  },
  modalText: {
    color: 'white',
    fontSize: 22,
    marginBottom: 20,
  },
  modalContainer: {
    alignItems: 'center',
    marginLeft: 20,
    marginRight: 20,
  },
  modalTitle: {
    color: 'white',
    fontSize: 36,
  },
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
