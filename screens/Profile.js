import { View, Text } from 'react-native';
import { Button, Colors } from 'react-native-paper'
import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Profile = ({ navigation }) => {

    const handleLogOut = async() => {
        await AsyncStorage.removeItem('authtoken');
        navigation.navigate('DocsReady')
    }

    return (
        <View>
            <Button mode='contained' color={Colors.red800} onPress={handleLogOut}>Log Out</Button>
        </View>
    );
};

export default Profile;
