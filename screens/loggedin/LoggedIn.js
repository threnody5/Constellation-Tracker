/** @format */

import React, { useState, useEffect, useLayoutEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Pressable,
  Modal,
  ImageBackground,
  Image,
} from 'react-native';

import Button from '../../components/Button';
import { ScrollView } from 'react-native-gesture-handler';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons } from '@expo/vector-icons';
import { Background } from '../../Background/Background';
import SetLocation from '../../components/location/SetLocation';
import { database } from '../../FireBaseConfig';
import { getDatabase, ref, set, get, child, onValue } from 'firebase/database';

import Checkbox from 'expo-checkbox';

export default function LoggedIn({ route }) {
  const constellationData = require('../../constellation.json');

  const databaseReference = ref(getDatabase());

  let userData = null;
  let constellationDatabaseInfo = null;
  let constellationDatabaseUpdatedInfo = null;
  let loadedData = null;

  const [modalDisplay, setModalDisplay] = useState(false);
  // const [selectedConstellationDataID, setSelectedConstellationDataID] = useState(null);
  const [selectedConstellationDataName, setSelectedConstellationDataName] = useState(null);
  const [selectedConstellationDataInfo, setSelectedConstellationDataInfo] = useState(null);
  const [selectedConstellationDataUrl, setSelectedConstellationDataUrl] = useState(null);
  const [databaseList, setDatabaseList] = useState(null);

  const [haveSeen, setHaveSeen] = useState(false);

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

  const { loggedInUser } = route.params;

  const retrieveData = () => {
    constellationDatabaseInfo = ref(database, 'users/' + loggedInUser);
    onValue(constellationDatabaseInfo, (snapshot) => {
      // setReturnedUserData(snapshot.val());
      constellationDatabaseUpdatedInfo = snapshot.val();
      // console.log(constellationDatabaseUpdatedInfo);
    });
  };

  useEffect(() => {
    setTimeout(() => {
      retrieveData();
    }, 500);
    setTimeout(() => {
      setDatabaseList(true);
    }, 1000);
  }, []);

  useLayoutEffect(() => {
      setTimeout(() => {
      {
        databaseList &&
        constellationDatabaseUpdatedInfo.map((item, key) => (
            <LinearGradient
              colors={['rgba(191, 0, 255, .2)', 'rgba(115, 0, 153, .2)', 'rgba(0, 64, 128, .2)']}
              style={styles.gradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <Pressable
                style={styles.pressableContainer}
                key={key}
                onPress={() => {
                  setModalDisplay(true);
                  // onSelectedConstellationDataIDHandler(item.id);
                  onSelectedConstellationDataNameHandler(item.name);
                  onSelectedConstellationDataInfoHandler(item.information);
                  onSelectedConstellationDataUrlHandler(item.url);
                }}
              >
                <Text style={styles.textFormat}>{item.name}</Text>
              </Pressable>
            </LinearGradient>
          ));
      }
      console.log('useLayoutEffect fires!')
      console.log('----- NEW LINE -----');
      console.log(constellationDatabaseUpdatedInfo);
    }, 2000);
    }, []);

  function writeUserData() {
    set(ref(database, 'users/' + loggedInUser), {
      constellationData,
    });
  }

  return (
    <ImageBackground
      style={{ flex: 1 }}
      blurRadius={1}
      source={{ uri: Background }}
    >
      <View>
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
                    onValueChange={setHaveSeen}
                    color={haveSeen ? 'rgb(191, 0, 255)' : undefined}
                  />
                  <Text style={styles.checkBoxText}>I have Seen this in the sky!</Text>
                </View>
                <SetLocation />
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
              {/* {databaseList &&
                constellationData.map((item, key) => (
                  <LinearGradient
                    colors={[
                      'rgba(191, 0, 255, .2)',
                      'rgba(115, 0, 153, .2)',
                      'rgba(0, 64, 128, .2)',
                    ]}
                    style={styles.gradient}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                  >
                    <Pressable
                      style={styles.pressableContainer}
                      key={key}
                      onPress={() => {
                        setModalDisplay(true);
                        // onSelectedConstellationDataIDHandler(item.id);
                        onSelectedConstellationDataNameHandler(item.name);
                        onSelectedConstellationDataInfoHandler(item.information);
                        onSelectedConstellationDataUrlHandler(item.url);
                      }}
                    >
                      <Text style={styles.textFormat}>{item.name}</Text>
                    </Pressable>
                  </LinearGradient>
                ))} */}
            </View>
          </ScrollView>
        </SafeAreaView>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  textFormat: {
    color: '#aa80ff',
    fontSize: 24,
  },
  container: {
    alignItems: 'center',
    flex: 1,
    marginTop: 50,
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
