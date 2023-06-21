import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';


import MyProfileScreen from './MyProfile';
import PaymentMethod from './PaymentMethod/PaymentMethod';
import PaymentMethodView from './PaymentMethod/PaymentMethodView';
import PaymentMethodUpdate from './PaymentMethod/PaymentMethodUpdate';

const Stack = createStackNavigator();

function MyProfileIndex() {
  return (
    <Stack.Navigator>
      {/* <Stack.Screen
        name="MyProfile"
        component={MyProfileScreen}
        options={{headerShown: false}}
      /> */}
      <Stack.Screen
        name="PaymentMethod"
        component={PaymentMethod}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="PaymentMethodView"
        component={PaymentMethodView}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="PaymentMethodUpdate"
        component={PaymentMethodUpdate}
        options={{headerShown: false}}
      />
      {/* <Stack.Screen
        name="Filter"
        component={Filter}
        options={{headerShown: false}}
      /> */}
    </Stack.Navigator>
  );
}

export default MyProfileIndex;
