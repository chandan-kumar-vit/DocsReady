
import React from 'react'

import { Provider as PaperProvider } from 'react-native-paper';
import Login from './screens/Login'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AddDoc from './screens/AddDoc';
import UserDocs from './screens/UserDocs';
import { Provider as StoreProvider } from 'react-redux';
import { Store } from './redux/store';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const App = () => {

  return (

    <StoreProvider store={Store}>
      <PaperProvider>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="DocsReady" component={Login} options={{
              title: 'DocsReady',
              headerStyle: {
                backgroundColor: '#fff',
              },
              headerTintColor: 'black',
              headerTitleStyle: {
                fontWeight: 'bold',
              },
            }} />
            <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
          </Stack.Navigator>
        </NavigationContainer>
      </PaperProvider>
    </StoreProvider>

  );
};

const Home = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="userDocs" component={UserDocs} options={{
        title: 'My Documents',
        headerStyle: {
          backgroundColor: '#fff',
        },
        headerTintColor: 'black',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
        tabBarActiveTintColor: 'tomato',
        tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons name="home" color={color} size={size} />
        ),
      }} />
      <Tab.Screen name="addDoc" component={AddDoc} options={{
        title: 'Add Document',
        headerStyle: {
          backgroundColor: '#fff',
        },
        headerTintColor: 'black',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
        tabBarActiveTintColor: 'tomato',
        tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons name="upload" color={color} size={size} />
        ),
      }} />
    </Tab.Navigator>

  )
}

export default App;
