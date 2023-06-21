import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import GetItDone from './GetItDone';
import PhoneVerifyPage from '../more/editProfile/phoneVerify/PhoneVerifyPage';
import EmailVerifyPage from '../more/editProfile/emailverify/EmailVerifyPage';
import SingleBrowseMap from '../browse/single_BrowseMap';
import MyTaskScreen from '../my_tasks';
import ChatPage from '../messages/ChatPage';
import Messages2 from '../messages/Messages2';
import PublicProfile from '../more/PublicProfile/PublicProfile';
import DocumentUpload from '../more/editProfile/documentUpload/DocumentUpload';
import BothEmailPhoneVerify from '../more/editProfile/bothEmailPhoneVerify/BothEmailPhoneVerify';
import BecomeTasker_Agree from '../more/editProfile/becomeATasker/BecomeTasker_Agree';
const Stack = createStackNavigator();

export default function GetitdoneScreenIndex() {
  return (
    <Stack.Navigator initialRouteName="GetItDone">
      <Stack.Screen
        options={{headerShown: false}}
        name="GetItDone"
        component={GetItDone}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name="PhoneVerifyPage"
        component={PhoneVerifyPage}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name="EmailVerifyPage"
        component={EmailVerifyPage}
      />
      <Stack.Screen
        name="SingleBrowseMap"
        component={SingleBrowseMap}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="MyTasks"
        component={MyTaskScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="BecomeTasker_Agree"
        component={BecomeTasker_Agree}
        options={{headerShown: false}}
      />
      {/* <Stack.Screen
        name="ChatPage"
        component={ChatPage}
        options={{headerShown: false}}
      /> */}
      <Stack.Screen
        name="Messages2"
        component={Messages2}
        options={{headerShown: false}}
      />
      {/* <Stack.Screen
        name="PublicProfile"
        component={PublicProfile}
        options={{headerShown: false}}
      /> */}
      <Stack.Screen
        options={{headerShown: false}}
        name="DocumentUpload"
        component={DocumentUpload}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name="BothEmailPhoneVerify"
        component={BothEmailPhoneVerify}
      />
    </Stack.Navigator>
  );
}
