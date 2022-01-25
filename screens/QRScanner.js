import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import QRCodeScanner from 'react-native-qrcode-scanner';
import { RNCamera } from 'react-native-camera';

const QRScanner = ({ navigation }) => {
    const onSuccess = (e) => {
        //console.log(e.data);
        navigation.navigate('DocViewer', { url: e.data });
    };
    return (
        <View style={{ height: '100%' }}>
            <QRCodeScanner
                onRead={onSuccess}
                showMarker
            />
        </View>
    );
};


export default QRScanner;
