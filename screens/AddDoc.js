import React from 'react';
import {
    View,
    Image,
    StyleSheet,
    ScrollView
} from 'react-native';
import { Button, Colors, TextInput, RadioButton, Text } from 'react-native-paper';
import RNFS from 'react-native-fs';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AddDoc = ({ navigation }) => {

    const [value, setValue] = React.useState('aadhar');
    const [other, setOther] = React.useState('');
    const [myFileId, setFileId] = React.useState('');
    const openCamera = () => {
        navigation.navigate('Camera')
    }

    const path = RNFS.ExternalDirectoryPath + '/newFile.jpg';
    const host = 'https://docsready-server.herokuapp.com';

    const handleUploadFile = async () => {
        const token = await AsyncStorage.getItem('authtoken')
        const base64File = await RNFS.readFile(path, "base64");

        let url = `${host}/api/docs/add?card=${value === 'other' ? other : value}&number=${myFileId}`;
        console.log(url);

        // let myHeaders = new Headers();
        // myHeaders.append("authtoken", token);

        // var formdata = new FormData();
        // formdata.append("file", base64File);

        // var requestOptions = {
        //     method: 'POST',
        //     headers: myHeaders,
        //     body: formdata,
        //     redirect: 'follow'
        // };

        // const output= await fetch(url, requestOptions)
        //     .then(response => response.text())
        //     .then(result => console.log(result))
        //     .catch(error => console.log('error', error));
        //const output = await response.json();
        // console.log(response);

        let files = [
            {
                name: "file",
                filename: "file.jpg",
                filepath: path,
                filetype: "image/jpg",
            },
        ];

        RNFS.uploadFiles({
            toUrl: url,
            files: files,
            method: "POST",
            headers: {
                'authtoken': token
            },
            // //invoked when the uploading starts.
            // begin: () => { },
            // // You can use this callback to show a progress indicator.
            // progress: ({ totalBytesSent, totalBytesExpectedToSend }) => { }
        });
    }


    return (
        <ScrollView style={styles.container}>
            <RadioButton.Group onValueChange={newValue => setValue(newValue)} value={value}>
                <View>
                    <Text>Aadhar</Text>
                    <RadioButton value="Aadhar" />
                </View>
                <View>
                    <Text>PAN</Text>
                    <RadioButton value="PAN" />
                </View>
                <View>
                    <Text>Driving License</Text>
                    <RadioButton value="DrivingLicense" />
                </View>
                <View>
                    <Text>Other</Text>
                    <RadioButton value="other" />
                </View>
            </RadioButton.Group>
            {value === 'other' &&
                <View style={styles.bottomPadding}>
                    <TextInput
                        mode='flat'
                        placeholder='enter file name eg: dob certificate'
                        value={other}
                        onChangeText={other => setOther(other)}
                    />
                </View>}

            <View style={styles.bottomPadding}>
                <TextInput
                    placeholder='enter file unique id'
                    value={myFileId}
                    onChangeText={myFileId => setFileId(myFileId)}
                />
            </View>

            <View>
                <Button mode="contained" onPress={openCamera} color={Colors.blue800}>
                    Camera
                </Button>
            </View>

            <View style={styles.bottomPadding}>
                <Button mode="contained" onPress={handleUploadFile} color={Colors.green800} disabled={myFileId === '' ? true : false}>
                    Upload File
                </Button>
            </View>


        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 10,
    },
    horizontal: {
        flex: 1,
        flexDirection: 'row'
    },
    bottomPadding: {
        paddingBottom: 10,
        paddingTop: 5
    },
});

export default AddDoc
