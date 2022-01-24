import { View, Text, ScrollView, Image, RefreshControl } from 'react-native'
import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setDocs } from '../redux/action'
import { Card, Title, Paragraph, ActivityIndicator } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';

const UserDocs = ({ navigation }) => {

    const host = 'https://docsready-server.herokuapp.com';
    const { docs } = useSelector(state => state.dataReducer);
    const dispatch = useDispatch();
    const [refreshing, setRefreshing] = React.useState(true);

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
            setRefreshing(false);
            dispatch(setDocs(docDetails));

        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        callapi();
    }, []);

    return (

        <ScrollView refreshControl={
            <RefreshControl
                refreshing={refreshing}
                onRefresh={callapi}
            />
        }>
            {refreshing ? <ActivityIndicator /> : null}
            {docs.map((element) => {
                return (
                    <View key={element.id}>
                        <Card >
                            <Card.Content>
                                <Title>{element.card}</Title>
                                <Paragraph>{element.number}</Paragraph>
                                <Image
                                    source={{
                                        uri: element.fireBaseRef,
                                    }}
                                    style={{ width: "100%", height: 200 }}
                                />
                            </Card.Content>
                        </Card>
                    </View>
                )
            })}

        </ScrollView>
    )
}

export default UserDocs
