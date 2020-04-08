import React, {useContext} from 'react';
import {TouchableOpacity} from 'react-native';
import {ThemeContext} from 'styled-components';
import Icon from 'react-native-vector-icons/MaterialIcons';

import {
  createStackNavigator,
  CardStyleInterpolators,
} from '@react-navigation/stack';

import Dashboard from './Dashboard';
import OrderDetails from './OrderDetails';
import ReportProblem from './ReportProblem';
import ViewProblem from './ViewProblem';
import ConfirmDelivery from './ConfirmDelivery';

const Stack = createStackNavigator();

export default function Deliveries() {
  const theme = useContext(ThemeContext);

  return (
    <Stack.Navigator
      screenOptions={({navigation}) => ({
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        cardStyle: {
          backgroundColor: theme.light,
        },
        headerTitleAlign: 'center',
        headerTintColor: theme.light,
        headerStyle: {
          backgroundColor: theme.main,
          height: 155,
        },
        headerTitleContainerStyle: {
          paddingBottom: 100,
        },
        headerTitleStyle: {
          fontSize: 16,
          fontWeight: 'bold',
        },
        headerLeftContainerStyle: {
          marginLeft: 10,
          paddingBottom: 100,
        },
        // eslint-disable-next-line react/display-name
        headerLeft: () => (
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon name="chevron-left" color={theme.light} size={20} />
          </TouchableOpacity>
        ),
      })}>
      <Stack.Screen
        options={{headerShown: false}}
        name="Dashboard"
        component={Dashboard}
      />
      <Stack.Screen
        name="OrderDetails"
        component={OrderDetails}
        options={{title: 'Detalhes da encomenda'}}
      />
      <Stack.Screen
        name="ReportProblem"
        component={ReportProblem}
        options={{title: 'Informar problema'}}
      />
      <Stack.Screen
        name="ViewProblem"
        component={ViewProblem}
        options={{title: 'Visualizar problemas'}}
      />
      <Stack.Screen
        name="ConfirmDelivery"
        component={ConfirmDelivery}
        options={{title: 'Confirmar entrega'}}
      />
    </Stack.Navigator>
  );
}
