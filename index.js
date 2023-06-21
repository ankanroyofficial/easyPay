/**
 * @format
 */
import React, { useContext, useEffect } from 'react';
import { AppRegistry, LogBox, View } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import rootReducer from './src/redux/reducers';
import { requestUserPermission } from './src/constants/push_notification/pushnotification_helper';
import messaging from '@react-native-firebase/messaging';
// LogBox.ignoreAllLogs();

const store = createStore(rootReducer);

const MainAppp = () => {
  useEffect(() => {
    requestUserPermission();
  }, [])
  messaging().setBackgroundMessageHandler(async (remoteMessage) => {
    console.log('Message handled in the background!', remoteMessage.data.message);
  });
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
};

AppRegistry.registerComponent(appName, () => MainAppp);
