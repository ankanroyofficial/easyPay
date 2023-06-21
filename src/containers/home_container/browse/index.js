import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import BrowseScreen from './Browse';
import BrowseMap from './BrowseMap';
import SingleBrowseMap from './single_BrowseMap';
import PhoneVerifyPage from '../more/editProfile/phoneVerify/PhoneVerifyPage';
import EmailVerifyPage from '../more/editProfile/emailverify/EmailVerifyPage';
import PublicProfile from '../more/PublicProfile/PublicProfile';
import ChatPage from '../messages/ChatPage';
import Messages2 from '../messages/Messages2/Messages2';
import DocumentUpload from '../more/editProfile/documentUpload/DocumentUpload';
import EditProfile from '../more/editProfile';
import Extra from '../more/editProfile/portfolio/Extra';
import BothEmailPhoneVerify from '../more/editProfile/bothEmailPhoneVerify/BothEmailPhoneVerify';
import BecomeTasker_Agree from '../more/editProfile/becomeATasker/BecomeTasker_Agree';
import MyTasks from '../my_tasks/MyTasks';

const Stack = createStackNavigator();

function BrowseIndex() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Browse"
        component={BrowseScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="BrowseMap"
        component={BrowseMap}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="SingleBrowseMap"
        component={SingleBrowseMap}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="MyTasks"
        component={MyTasks}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="BecomeTasker_Agree"
        component={BecomeTasker_Agree}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="EditProfile"
        component={EditProfile}
        options={{ headerShown: false }}
      />
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
      {/* <Stack.Screen
        name="PublicProfile"
        component={PublicProfile}
        options={{ headerShown: false }}
      /> */}
      {/* <Stack.Screen
        name="ChatPage"
        component={ChatPage}
        options={{ headerShown: false }}
      /> */}
      <Stack.Screen
        name="Messages2"
        component={Messages2}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        options={{ headerShown: false }}
        name="DocumentUpload"
        component={DocumentUpload}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="Extra"
        component={Extra}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="BothEmailPhoneVerify"
        component={BothEmailPhoneVerify}
      />
    </Stack.Navigator>
  );
}

export default BrowseIndex;
