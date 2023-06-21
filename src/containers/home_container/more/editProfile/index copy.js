import React, { component } from 'react';
import { createStackNavigator } from '@react-navigation/stack';

// screens
import BasicInfoScreen from './basicInfo';
import PortfolioScreen from './portfolio';
import SkillsScreen from './skills';
import PhoneVerifyPage from './phoneVerify/PhoneVerifyPage';
import EmailVerifyPage from './emailverify/EmailVerifyPage';
import EditProfile from '../../more/editProfile';
import Extra from './portfolio/Extra';
import Dashboard from '../dashboard/Dashboard';

const Stack = createStackNavigator();

export default function GetitdoneScreenIndex() {
  return (
    <Stack.Navigator>
      {/* <Stack.Screen
        options={{ headerShown: false }}
        name="BasicInfo"
        component={BasicInfoScreen}
      /> */}
      <Stack.Screen
        name="EditProfile"
        component={EditProfile}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="Portfolio"
        component={PortfolioScreen}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="Skills"
        component={SkillsScreen}
      />
      {/* <Stack.Screen
        options={{ headerShown: false }}
        name="PhoneVerifyPage"
        component={PhoneVerifyPage}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="EmailVerifyPage"
        component={EmailVerifyPage}
      /> */}
      {/* <Stack.Screen
        options={{ headerShown: false }}
        name="Extra"
        component={Extra}
      /> */}
      {/* <Stack.Screen
        name="Dashboard"
        component={Dashboard}
        options={{ headerShown: false }}
      /> */}
    </Stack.Navigator>
  );
}
