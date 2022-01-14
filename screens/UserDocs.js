import { View, Text, ScrollView, Image } from 'react-native'
import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setDocs } from '../redux/action'
import { Card, Title, Paragraph } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/Ionicons';

const UserDocs = ({ navigation }) => {

    const host = 'https://docsready-server.herokuapp.com';
    const { docs } = useSelector(state => state.dataReducer);
    const dispatch = useDispatch();

    const callapi = async () => {
        try {
            const url = `${host}/api/docs/fetchalldocs`;
            const value = await AsyncStorage.getItem('authtoken')

            const response = await fetch(url, {
                method: 'GET',
                mode: 'cors',
                cache: 'no-cache',
                credentials: 'same-origin',
                headers: {
                    'Content-Type': 'application/json',
                    'authtoken': value
                },
            });

            const docDetails = await response.json();
            dispatch(setDocs(docDetails));

        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        callapi();
    }, []);

    return (

        <ScrollView>
            {docs.map((element) => {
                return (
                    <Card key={element.id}>
                        <Card.Content>
                            <Title>{element.card}</Title>
                            <Paragraph>{element.number}</Paragraph>
                            <Image
                                source={{
                                    uri: element.fireBaseRef,
                                }}
                                style={{ width: 380, height: 200 }}
                            />
                        </Card.Content>
                    </Card>
                )
            })}
        
        </ScrollView>
    )
}

export default UserDocs
