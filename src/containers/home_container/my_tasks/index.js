import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import MyTaskScreen from './MyTasks';
import SingleBrowseMap from '../browse/single_BrowseMap/SingleBrowseMap';
import BasicInfoScreen from '../more/editProfile/basicInfo';
import PhoneVerifyPage from '../more/editProfile/phoneVerify/PhoneVerifyPage';
import EmailVerifyPage from '../more/editProfile/emailverify/EmailVerifyPage';
import PaymentWebPage from './make_an_offer/PaymentWebPage';
import PublicProfile from '../more/PublicProfile/PublicProfile';
import Howitworks from '../more/HelpTopics/Howitworks';
import Termsandcondition from '../more/HelpTopics/Termsandcondition';
import Messages2 from '../messages/Messages2/Messages2';
import ChatPage from '../messages/ChatPage';
import BrowseMap from '../browse/BrowseMap';
import BecomeTasker_Agree from '../more/editProfile/becomeATasker/BecomeTasker_Agree';
const Stack = createStackNavigator();

function MyTaskIndex() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="MyTasks"
        component={MyTaskScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="SingleBrowseMap"
        component={SingleBrowseMap}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="BasicInfo"
        component={BasicInfoScreen}
      />
      <Stack.Screen
        name="BecomeTasker_Agree"
        component={BecomeTasker_Agree}
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
      <Stack.Screen
        name="PaymentWebPage"
        component={PaymentWebPage}
        options={{ headerShown: false }}
      />
      {/* <Stack.Screen
        name="PublicProfile"
        component={PublicProfile}
        options={{ headerShown: false }}
      /> */}
      <Stack.Screen
        name="Howitworks"
        component={Howitworks}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Termsandcondition"
        component={Termsandcondition}
        options={{ headerShown: false }}
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
        name="BrowseMap"
        component={BrowseMap}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

export default MyTaskIndex;
