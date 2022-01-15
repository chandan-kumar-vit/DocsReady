// import { View, Text } from 'react-native'
// import React from 'react'
import React from 'react';
import {
    View,
} from 'react-native';
import { Button, Colors } from 'react-native-paper';
const AddDoc = ({ navigation }) => {

    const openCamera = () => {
        navigation.navigate('Camera')
    }

    return (
        <View>
            <Button mode="contained" onPress={openCamera} color={Colors.blue800}>
                Camera
            </Button>
        </View>
    )
}


export default AddDoc
