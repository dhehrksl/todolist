import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './todotoday';
import Joinmembers from './joinmembers';
import Inpage from './inpage';
import LoginScreen from './loginScreen';
import ProfileScreen from './profileScreen';
import { Image } from 'react-native';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const AppContainer = () => {
  const [userEmailState, setUserEmailState] = useState('');
  const [tasks, setTasks] = useState([]);

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name='Inpage' component={Inpage} />
        <Stack.Screen name="Login">
          {(props) => <LoginScreen {...props} setEmailState={setUserEmailState} setTasks={setTasks} />}
        </Stack.Screen>
        <Stack.Screen name="Todo" options={{ title: '할 일 목록' }}>
          {() => (
            <Tab.Navigator screenOptions={{ headerShown: false }}>
              <Tab.Screen name="Home" options={{ tabBarLabel: '할 일 목록', tabBarIcon: ({ color, size }) => (
                    <Image
                      source={require('../src/image/edit.png')}
                      style={{ width: size, height: size, tintColor: color }}
                    />
                  )}}>
                {() => <HomeScreen userEmailState={userEmailState} />}
              </Tab.Screen>
              <Tab.Screen name="Profiles" options={{tabBarLabel: '내 정보', tabBarIcon: ({ color, size }) => (
                    <Image
                      source={require('../src/image/profile.png')}
                      style={{ width: size, height: size, tintColor: color }}
                    />
                  ) }}>
                {() => <ProfileScreen userEmailState={userEmailState} />}
              </Tab.Screen>
            </Tab.Navigator>
          )}
        </Stack.Screen>
        <Stack.Screen name="Join" component={Joinmembers} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppContainer;
