import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import MessagesScreen from './Messages';
import Messages2 from './Messages2';
import ChatPage from './ChatPage';
import PublicProfile from '../more/PublicProfile/PublicProfile';
import Extra from '../more/editProfile/portfolio/Extra';
const Stack = createStackNavigator();

function MessagesIndex() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Messages"
        component={MessagesScreen}
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
      {/* <Stack.Screen
        name="PublicProfile"
        component={PublicProfile}
        options={{ headerShown: false }}
      /> */}
      <Stack.Screen
        options={{ headerShown: false }}
        name="Extra"
        component={Extra}
      />
    </Stack.Navigator>
  );
}

export default MessagesIndex;
