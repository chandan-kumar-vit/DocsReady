import { View, Text } from 'react-native';
import React from 'react';
import QRCode from 'react-native-qrcode-svg';

const QRCodeGen = ({ route, navigation }) => {

    const { url } = route.params;
    return (
        <View style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
        }}>
            <QRCode
                value={url}
                size={250}
                logo={require('./docsreadyIcon.jpg')}
                enableLinearGradient
                linearGradient={['rgb(255,0,0)', 'rgb(0,0,255)']}
            />
        </View>
    );
};

export default QRCodeGen;
