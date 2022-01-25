import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { Button, Colors } from 'react-native-paper'
import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Profile = ({ navigation }) => {

    const handleLogOut = async () => {
        await AsyncStorage.removeItem('authtoken');
        navigation.navigate('DocsReady')
    }

    const handleQRScanner = () => {
        navigation.navigate('QRScan')
    }

    return (
        <ScrollView style={styles.container}>
            <View style={{ paddingBottom: 15 }}>
                <Button mode='contained' color={Colors.blue800} onPress={handleQRScanner}>QR Scan</Button>
            </View>
            <View>
                <Button mode='contained' color={Colors.red800} onPress={handleLogOut}>Log Out</Button>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20
    }
})

export default Profile;
