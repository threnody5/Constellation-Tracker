/** @format */

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Pressable,
  Modal,
  ImageBackground,
} from 'react-native';

import Button from '../../components/Button';
import { ScrollView } from 'react-native-gesture-handler';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons } from '@expo/vector-icons';
import { Background } from '../../Background/Background';

const constellationData = require('../../constellation.json');

export default function GalleryList() {
  const [modalDisplay, setModalDisplay] = useState(false);
  const [selectedConstellationData, setSelectedConstellationData] = useState();

  //? event handler may not be required for this, useState may be enough
  onSelectedConstellationDataHandler = (value) => {
    setSelectedConstellationData(value);
    console.log(value);
  };

  return (
    <View>
      {/* <Modal visible={ modalDisplay } animationType='fade'>
            <ImageBackground style={ { flex: 1 } } blurRadius={ 1 } source={ { uri: Background } }>
                <View>
                    <MaterialIcons
                    name='close'
                    size={ 35 }
                    onPress={ () => { setModalDisplay(false) } }
                    style={ styles.modalToggle } />
                    <Text>{ item.name }</Text>
                </View>
                </ImageBackground>
            </Modal> */}
      <SafeAreaView>
        <ScrollView>
          <View style={styles.container}>
            {constellationData.map((item, key) => (
              <LinearGradient
                colors={['rgba(191, 0, 255, .2)', 'rgba(115, 0, 153, .2)', 'rgba(0, 64, 128, .2)']}
                style={styles.gradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              >
                <Pressable
                  style={styles.pressableContainer}
                  key={constellationData[key].id}
                  onPress={() => {
                    setModalDisplay(true);
                    onSelectedConstellationDataHandler(constellationData[key]);
                    // console.log(constellationData[key]);
                  }}
                >
                  <Text style={styles.textFormat}>{item.name}</Text>
                </Pressable>
              </LinearGradient>
            ))}
            <Modal
              visible={modalDisplay}
              animationType='fade'
            >
              <ImageBackground
                style={{ flex: 1 }}
                blurRadius={1}
                source={{ uri: Background }}
              >
                <View>
                  <MaterialIcons
                    name='close'
                    size={35}
                    onPress={() => {
                      setModalDisplay(false);
                    }}
                    style={styles.modalToggle}
                  />
                  //! second map not required since only returning 1 object //TODO look up object
                  //TODO deconstruction for values
                  {/* <Text>{ selectedConstellationData.id }</Text> */}
                  {
                    // selectedConstellationData.map((item, key) => {
                    // <Text>{ item[key].id }</Text>
                    // })
                  }
                </View>
              </ImageBackground>
            </Modal>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
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
    //rgb(191, 0, 255)
  },
});
