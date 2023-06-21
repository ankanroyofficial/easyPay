import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
// screens
import MoreScreen from './More';
import PublicProfile from './PublicProfile/PublicProfile';
import PhoneVerifyPage from './editProfile/phoneVerify/PhoneVerifyPage';
import EmailVerifyPage from './editProfile/emailverify/EmailVerifyPage';
import ChatPage from '../messages/ChatPage';
import Messages2 from '../messages/Messages2';
import SubCategoriesListingPage from '../get_it_done/SubCategoriesListingPage';
import BothEmailPhoneVerify from './editProfile/bothEmailPhoneVerify/BothEmailPhoneVerify';
const Stack = createStackNavigator();

function MoreIndex() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="More"
        component={MoreScreen}
        options={{ headerShown: false }}
      />
      {/* <Stack.Screen
        name="PublicProfile"
        component={PublicProfile}
        options={{ headerShown: false }}
      /> */}
      <Stack.Screen
        options={{ headerShown: false }}
        name="PhoneVerifyPage"
        component={PhoneVerifyPage}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="EmailVerifyPage"
        component={EmailVerifyPage}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="BothEmailPhoneVerify"
        component={BothEmailPhoneVerify}
      />
      <Stack.Screen
        name="Messages2"
        component={Messages2}
        options={{ headerShown: false }}
      />
      {/* <Stack.Screen
        name="ChatPage"
        component={ChatPage}
        options={{ headerShown: false }}
      /> */}

      <Stack.Screen
        options={{ headerShown: false }}
        name="SubCategoriesListingPage"
        component={SubCategoriesListingPage}
      />
    </Stack.Navigator>
  );
}

export default MoreIndex;
