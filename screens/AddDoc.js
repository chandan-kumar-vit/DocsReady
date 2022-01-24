import React from 'react';
import {
    View,
    Image,
    StyleSheet,
    ScrollView
} from 'react-native';
import { Button, Colors, TextInput, RadioButton, Text, ActivityIndicator } from 'react-native-paper';
import RNFS from 'react-native-fs';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AddDoc = ({ navigation }) => {

    const [value, setValue] = React.useState('aadhar');
    const [other, setOther] = React.useState('');
    const [myFileId, setFileId] = React.useState('');
    const [loading, setLoading] = React.useState(false);

    const openCamera = () => {
        navigation.navigate('Camera')
    }

    const path = RNFS.ExternalDirectoryPath + '/newFile.jpg';
    const host = 'https://docsready-server.herokuapp.com';

    const handleUploadFile = async () => {

        setLoading(true);
        const token = await AsyncStorage.getItem('authtoken')
        //const base64File = await RNFS.readFile(path, "base64");

        let url = `${host}/api/docs/add?card=${value === 'other' ? other : value}&number=${myFileId}`;
        //console.log(url);
        let files = [
            {
                name: "file",
                filename: "file.jpg",
                filepath: path,
                filetype: "image/jpg",
            },
        ];

        const fileDetails = await RNFS.uploadFiles({
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
        //console.log(fileDetails);
        setValue('aadhar');
        setOther('')
        setFileId('')
        setLoading(false);
        alert("File Uploaded Successfully! You may refresh My Documents to to view your file.");
    }


    return (
        <ScrollView style={styles.container}>

            {loading ? <ActivityIndicator /> : <View>

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
            </View>
            }

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
