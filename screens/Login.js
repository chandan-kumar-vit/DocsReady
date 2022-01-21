import React, { useState } from 'react'
import { Text, StyleSheet, Dimensions, ScrollView, View } from 'react-native'
import { Button, Avatar, TextInput, Colors, ActivityIndicator } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
const Login = ({ navigation }) => {

    const [myUsername, setUsername] = useState('');
    const [myPassword, setPassword] = useState('');
    const [myState, setState] = useState({
        loading: false
    })

    const host = 'https://docsready-server.herokuapp.com';

    const handleLogin = async () => {

        setState({ loading: true });
        let url = `${host}/api/auth/login`;

        const response = await fetch(url, {
            method: 'POST',
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ aadharNumber: myUsername, password: myPassword })
        });
        const logDetails = await response.json();

        if (logDetails.success) {

            await AsyncStorage.setItem('authtoken', logDetails.authtoken)
            navigation.navigate('Home')
        }

        else {
            setState({ loading: false });
            alert("Please Enter Valid Credentials!");
        }
    }

    return (

        <ScrollView style={styles.items}>

            {myState.loading && (
                <View style={styles.atCenter}>
                    <ActivityIndicator animating={true} color={Colors.red800} size={100} />
                </View>
            )}

            {!myState.loading && (<View>
                <View style={styles.avatar}>
                    <Avatar.Image size={110} source={require('./docsreadyIcon.jpg')} />
                </View>
                <View style={styles.bottomPadding}>
                    <TextInput
                        mode="outlined"
                        label="Username/email"
                        placeholder="email"
                        value={myUsername}
                        onChangeText={myUsername => setUsername(myUsername)}
                    />
                </View>
                <View style={styles.bottomPadding}>
                    <TextInput
                        mode="outlined"
                        label="Password"
                        secureTextEntry
                        value={myPassword}
                        onChangeText={myPassword => setPassword(myPassword)}
                        right={<TextInput.Icon name="eye" />}
                    />
                </View>
                <View style={styles.bottomPadding}>
                    <Button mode="contained" onPress={handleLogin} color={Colors.blue800}>
                        Sign In
                    </Button>
                </View>
                <View style={styles.bottomPadding}>
                    <Button mode="contained" onPress={() => console.log('Pressed')} color={Colors.red600}>
                        Sign Up
                    </Button>
                </View>
            </View>)}

        </ScrollView>
    )

}

const styles = StyleSheet.create({
    items: {
        padding: 15,
    },
    avatar: {
        paddingTop: 60,
        paddingBottom: 30,
        alignItems: 'center'
    },
    bottomPadding: {
        paddingBottom: 10
    },
    atCenter: {
        textAlignVertical: "center",
        justifyContent: 'center',
        textAlign: 'center',
        paddingTop: Dimensions.get('window').height / 3.5
    }
});

export default Login
