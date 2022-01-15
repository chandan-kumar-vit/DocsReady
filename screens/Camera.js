import React from 'react';
import {
    View,
    StyleSheet,
} from 'react-native';
import { RNCamera } from 'react-native-camera';
import { useCamera } from 'react-native-camera-hooks';
import { Button } from 'react-native-paper';
import RNFS from 'react-native-fs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const Camera = ({ navigation }) => {
    const [{ cameraRef }, { takePicture }] = useCamera(null);

    const captureHandle = async () => {
        try {
            const data = await takePicture();
            const filePath = data.uri;
            const newFilePath = RNFS.ExternalDirectoryPath + '/newFile.jpg';
            RNFS.moveFile(filePath, newFilePath)
                .then(() => {
                    console.log('IMAGE MOVED', filePath, '-- to --', newFilePath);
                })
                .catch(error => {
                    console.log(error);
                })
        } catch (error) {
            console.log(error);
        }
    }


    return (
        <View style={styles.body}>
            <RNCamera
                ref={cameraRef}
                type={RNCamera.Constants.Type.back}
                style={styles.preview}
            >
                <Button mode="text" onPress={() => captureHandle()} icon={() => <MaterialCommunityIcons name="camera" color='black' size={100} />}></Button>
            </RNCamera>
        </View>
    )
}

const styles = StyleSheet.create({
    body: {
        flex: 1,
    },
    preview: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-end',
    }
});

export default Camera
