import React, {useContext} from 'react';
import {ThemeContext} from 'styled-components';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {StatusBar} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import AuthContext from '~/auth/Context';

import SplashScreen from '~/pages/SplashScreen';
import Sign from '~/pages/Sign';
import Profile from '~/pages/Profile';
import Deliveries from '~/pages/Deliveries';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function SignedRoutes() {
  const theme = useContext(ThemeContext);

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor={theme.light} />
      <Tab.Navigator
        tabBarOptions={{
          inactiveTintColor: theme.medium,
          activeTintColor: theme.main,
          style: {
            minHeight: 70,
            paddingTop: 16.5,
            paddingBottom: 12.5,
          },
          labelStyle: {
            fontSize: 14,
          },
        }}>
        <Tab.Screen
          name="Deliveries"
          component={Deliveries}
          options={{
            title: 'Entregas',
            // eslint-disable-next-line
          tabBarIcon: ({color}) => (
              <Icon name="reorder" size={20} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="Profile"
          component={Profile}
          options={{
            title: 'Meu Perfil',
            // eslint-disable-next-line
          tabBarIcon: ({color}) => (
              <Icon name="account-circle" size={20} color={color} />
            ),
          }}
        />
      </Tab.Navigator>
    </>
  );
}

export default function Routes() {
  const {isSigned, isLoading} = useContext(AuthContext);

  if (isLoading) {
    return <SplashScreen />;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        {isSigned ? (
          <Stack.Screen name="SignedRoutes" component={SignedRoutes} />
        ) : (
          <Stack.Screen name="Sign" component={Sign} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
