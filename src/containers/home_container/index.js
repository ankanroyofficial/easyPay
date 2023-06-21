import React, { useContext } from 'react';
import { Image, View, Text, Dimensions, Pressable } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Normalize from '../../helpers/Dimens';
import { Colors } from '../../constants/colors';
import Icons from '../../constants/images';
// screens
import GetInTouchScreen from './get_it_done';
import MyTaskScreen from './my_tasks';
import BrowseScreen from './browse';
import MessagesScreen from './messages';
import strings from '../../constants/lng/LocalizedStrings';
import Toast from 'react-native-simple-toast';
import NotificationsScreen from './more/notifications';
import { myContext } from '../../constants/ContextApi';

const Tab = createBottomTabNavigator();

const { height, width } = Dimensions.get('window')
export default function HomeIndex() {
  const { drawerTabNaviData } = useContext(myContext)


  function MyTabBar({ state, descriptors, navigation }) {
    return (
      <View style={{ height: Normalize(50), width: width, flexDirection: 'row' }} >
        <View style={{ flexDirection: 'row' }} >
          {state.routes.map((route, index) => {
            const { options } = descriptors[route.key];
            const label =
              options.tabBarLabel !== undefined
                ? options.tabBarLabel
                : options.title !== undefined
                  ? options.title
                  : route.name;
            const isFocused = state.index === index;
            const onPress = () => {
              const event = navigation.emit({
                type: 'tabPress',
                target: route.key,
              });
              if (!isFocused && !event.defaultPrevented && label == "Notification") {
                navigation.navigate(route.name);
              } else if (!isFocused && !event.defaultPrevented) {
                navigation.navigate(route.name);
              }
            };
            const onLongPress = () => {
              Toast.show(label)
            };
            return (
              <View
                activeOpacity={1}
                accessibilityRole="button"
                accessibilityState={isFocused ? { selected: true } : {}}
                accessibilityLabel={options.tabBarAccessibilityLabel}
                testID={options.tabBarTestID}

                style={{
                  height: Normalize(50),
                  backgroundColor: Colors.white,
                  borderTopWidth: 1,
                  borderTopColor: Colors.lightGrey
                }}
                key={index}
              >
                <View style={{ height: Normalize(50), width: width / 5 }} >
                  {
                    label == "Get it done" ?
                      <View style={{ flex: 1, alignItems: "center" }} >
                        <Pressable
                          onPressIn={onPress}
                          onLongPress={onLongPress}
                          style={{
                            height: "100%",
                            width: "100%",
                            backgroundColor: isFocused ? Colors.primary : Colors.white,
                            borderRadius: Normalize(100),
                            justifyContent: "center",
                            alignItems: "center",
                            borderWidth: 1,
                            borderColor: isFocused ? Colors.secondary : Colors.lightGrey,
                            height: Normalize(45),
                            width: Normalize(45),
                            marginTop: -Normalize(12),
                          }} >
                          <Image source={whichIcon(label, isFocused)} style={{ height: "50%", width: "50%", resizeMode: "contain" }} />
                        </Pressable>
                      </View>
                      :
                      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }} >
                        <Pressable
                          onPressIn={onPress}
                          onLongPress={onLongPress}
                          style={{ alignItems: "center" }}
                        >
                          <View style={{ height: Normalize(22), width: Normalize(22) }} >
                            <Image source={whichIcon(label, isFocused)} style={{ height: "100%", width: "100%", resizeMode: "contain" }} />
                          </View>
                        </Pressable>
                        {label == "Notification" && drawerTabNaviData.notification_count > 0 &&
                          (
                            <View
                              style={{
                                height: Normalize(11.5),
                                width: Normalize(11.5),
                                borderRadius: Normalize(11.5) / 2,
                                backgroundColor: Colors.red_old,
                                position: 'absolute',
                                right: Normalize(20),
                                top: Normalize(10),
                                justifyContent: 'center',
                                alignItems: 'center',
                              }}>
                              <Text
                                style={{
                                  color: Colors.white,
                                  fontSize: Normalize(7),
                                  fontFamily: 'Outfit-SemiBold',
                                }}>
                                {drawerTabNaviData.notification_count > 99 ? '99' : drawerTabNaviData.notification_count}
                              </Text>
                            </View>
                          )}
                      </View>
                  }
                </View>
              </View>
            );
          })}
        </View>
      </View>
    );
  }
  const whichIcon = (val, isFocused) => {
    if (val == strings.TABNAVIGATION.GETITDONE) {
      if (isFocused) {
        return Icons.logo_secondary;
      } else {
        return Icons.logo_grey;
      }
    } else if (val == strings.TABNAVIGATION.MYTASK) {
      if (isFocused) {
        return Icons.mytaskTabbarActive;
      } else {
        return Icons.mytaskTabbarDisable;
      }
    } else if (val == strings.TABNAVIGATION.BROWSER) {
      if (isFocused) {
        return Icons.searchTabbarActive;
      } else {
        return Icons.searchTabbarDisable;
      }
    } else if (val == strings.TABNAVIGATION.MESSAGE) {
      if (isFocused) {
        return Icons.msgTabbarActive;
      } else {
        return Icons.msgTabbarDisable;
      }
    } else if (val == strings.TABNAVIGATION.NOTIFICATIONS) {
      if (isFocused) {
        return Icons.notificationTabbarActive;
      } else {
        return Icons.notificationTabbarDisable;
      }
    } else {
      return Icons.tabbar_more;
    }
  }
  return (
    <Tab.Navigator
      initialRouteName={strings.TABNAVIGATION.GETITDONE}
      // defaultScreenOptions={}
      tabBar={({ state, descriptors, navigation }) => {
        return (
          <View style={{
            position: "absolute",
            left: 0,
            bottom: 0,
            right: 0,
            // paddingTop: Normalize(12),
            justifyContent: "flex-end",
            height: Normalize(62),
            backgroundColor: "rgba(0,0,0,0)"
          }} >

            <View style={{ height: Normalize(50), width: width, flexDirection: 'row' }} >
              <View style={{ flexDirection: 'row' }} >
                {state.routes.map((route, index) => {
                  const { options } = descriptors[route.key];
                  const label =
                    options.tabBarLabel !== undefined
                      ? options.tabBarLabel
                      : options.title !== undefined
                        ? options.title
                        : route.name;
                  const isFocused = state.index === index;
                  const onPress = () => {
                    const event = navigation.emit({
                      type: 'tabPress',
                      target: route.key,
                    });
                    if (!isFocused && !event.defaultPrevented && label == "Notification") {
                      navigation.navigate(route.name);
                    } else if (!isFocused && !event.defaultPrevented) {
                      navigation.navigate(route.name);
                    }
                  };
                  return (
                    <View
                      activeOpacity={1}
                      accessibilityRole='none'
                      // accessibilityState={isFocused ? { selected: true } : {}}
                      // accessibilityLabel={options.tabBarAccessibilityLabel}
                      testID={options.tabBarTestID}

                      style={{
                        height: Normalize(50),
                        backgroundColor: Colors.white,
                        borderTopWidth: 1,
                        borderTopColor: Colors.lightGrey
                      }}
                      key={index}
                    >
                      <View style={{ height: Normalize(50), width: width / 5 }} >
                        {
                          label == "Get it done" ?
                            <View style={{ flex: 1, alignItems: "center" }} >
                              <Pressable
                                onPressIn={onPress}
                                style={{
                                  height: "100%",
                                  width: "100%",
                                  backgroundColor: isFocused ? Colors.primary : Colors.white,
                                  borderRadius: Normalize(100),
                                  justifyContent: "center",
                                  alignItems: "center",
                                  borderWidth: 1,
                                  borderColor: isFocused ? Colors.secondary : Colors.lightGrey,
                                  height: Normalize(45),
                                  width: Normalize(45),
                                  marginTop: -Normalize(12),
                                }} >
                                <Image source={whichIcon(label, isFocused)} style={{ height: "50%", width: "50%", resizeMode: "contain" }} />
                              </Pressable>
                            </View>
                            :
                            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }} >
                              <Pressable
                                onPressIn={onPress}
                                style={{ alignItems: "center" }}
                              >
                                <View style={{ height: Normalize(22), width: Normalize(22) }} >
                                  <Image source={whichIcon(label, isFocused)} style={{ height: "100%", width: "100%", resizeMode: "contain" }} />
                                </View>
                              </Pressable>
                              {label == "Notification" && drawerTabNaviData.notification_count > 0 &&
                                (
                                  <View
                                    style={{
                                      height: Normalize(11.5),
                                      width: Normalize(11.5),
                                      borderRadius: Normalize(11.5) / 2,
                                      backgroundColor: Colors.red_old,
                                      position: 'absolute',
                                      right: Normalize(20),
                                      top: Normalize(10),
                                      justifyContent: 'center',
                                      alignItems: 'center',
                                    }}>
                                    <Text
                                      style={{
                                        color: Colors.white,
                                        fontSize: Normalize(7),
                                        fontFamily: 'Outfit-SemiBold',
                                      }}>
                                      {drawerTabNaviData.notification_count > 99 ? '99' : drawerTabNaviData.notification_count}
                                    </Text>
                                  </View>
                                )}
                            </View>
                        }
                      </View>
                    </View>
                  );
                })}
              </View>
            </View>
          </View>
        )
      }}>
      <Tab.Screen name={strings.TABNAVIGATION.MYTASK} component={MyTaskScreen} options={{ tabBarLabel: strings.TABNAVIGATION.MYTASK, unmountOnBlur: true, }} />
      <Tab.Screen name={strings.TABNAVIGATION.MESSAGE} component={MessagesScreen} options={{ tabBarLabel: strings.TABNAVIGATION.MESSAGE, unmountOnBlur: true }} />
      <Tab.Screen name={strings.TABNAVIGATION.GETITDONE} component={GetInTouchScreen} options={{ tabBarLabel: strings.TABNAVIGATION.GETITDONE, unmountOnBlur: true, }} />
      <Tab.Screen name={strings.TABNAVIGATION.NOTIFICATIONS} component={NotificationsScreen} options={{ tabBarLabel: strings.TABNAVIGATION.NOTIFICATIONS, unmountOnBlur: true }} />
      {/* <Tab.Screen name={strings.TABNAVIGATION.NOTIFICATIONS} component={MoreScreen} options={{ tabBarLabel: strings.TABNAVIGATION.NOTIFICATIONS, unmountOnBlur: true }} /> */}
      <Tab.Screen name={strings.TABNAVIGATION.BROWSER} component={BrowseScreen} options={{ tabBarLabel: strings.TABNAVIGATION.BROWSER, unmountOnBlur: true }} />
    </Tab.Navigator>

  )
}



