import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, Pressable, Modal, ImageBackground } from 'react-native';

import Button from '../../components/Button';
import { ScrollView } from 'react-native-gesture-handler';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons } from '@expo/vector-icons';
import { Background } from '../../Background/Background';

const constellationData = require('../../constellation.json');

export default function GalleryList() {
    const [ detailedInformation, setDetailedInformation ] = useState(false);

    return (
        <View>
            <Modal visible={ detailedInformation } animationType='fade'>
            <ImageBackground style={ { flex: 1 } } blurRadius={ 1 } source={ { uri: Background } }>
                <View>
                    <MaterialIcons
                    name='close'
                    size={ 35 }
                    onPress={ () => { setDetailedInformation(false) } }
                    style={ styles.modalToggle } />
                </View>
                </ImageBackground>
            </Modal>
            <SafeAreaView>
                <ScrollView>
                    <View style={ styles.container }>
                        {
                            constellationData.map((item, key) => (
                                <LinearGradient
                                    colors={ [
                                        'rgba(0, 64, 128, .2)',
                                        'rgba(115, 0, 153, .2)',
                                        'rgba(191, 0, 255, .2)' ] }
                                    style={ styles.gradient }
                                    start={ { x: 0, y: 0 } }
                                    end={ { x: 1, y: 1 } }
                                >
                                    <Pressable style={ styles.pressableContainer } key={ constellationData[ key ].id } onPress={ () => { setDetailedInformation(true) } }>
                                        <Text style={ styles.textFormat }>{ item.name }</Text>
                                    </Pressable>
                                </LinearGradient>
                            ))
                        }
                    </View>
                </ScrollView>
            </SafeAreaView>
        </View>
    )
}

const styles = StyleSheet.create({
    textFormat: {
        color: '#aa80ff',
        fontSize: 24,
    },
    container: {
        alignItems: 'center',
        flex: 1,
        marginTop: 50
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
        color: '#aa80ff',
        borderWidth: 1,
        borderColor: 'rgb(191, 0, 255)',
        textAlign: 'right',
        marginLeft: 345,
        marginRight: 30
    }
})