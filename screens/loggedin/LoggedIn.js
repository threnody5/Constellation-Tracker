import React from 'react';
import { ImageBackground } from 'react-native';

import Button from '../../components/Button';
import { Background } from '../../Background/Background';
import GalleryList from '../gallerylist/GalleryList';

export default function LoggedIn() {

    return (
        <ImageBackground style={ { flex: 1 } } blurRadius={ 1 } source={ { uri: Background } }>
            <GalleryList />
        </ImageBackground>
    )
}