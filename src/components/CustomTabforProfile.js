import React, { useState } from 'react';
import { View, Text, StyleSheet, Pres, Pressable } from 'react-native';
import { color } from 'react-native-reanimated';
import Feather from 'react-native-vector-icons/Feather';
import { Colors } from '../constants/colors';
import Normalize from '../helpers/Dimens';
import strings from '../constants/lng/LocalizedStrings';
import globalstyles from '../constants/globalStyles/Global_Styles';

export default function CustomTabforProfile({ onChangeTab, language, activeTab }) {

  const [taskOrBooking, setTaskOrBooking] = useState(activeTab)
  return (
    <View style={[styles.container, { flexDirection: language == "en" ? 'row' : "row-reverse", }]}>
      <View
        style={language == "en" ? styles.tabItem : styles.tabItem2}>
        <Pressable
          onPress={() => {
            setTaskOrBooking("Edit")
            onChangeTab('Edit')
          }}
          style={[styles.tabBtn, {
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: taskOrBooking == "Edit" ? Colors.secondary : Colors.white,
            borderWidth: taskOrBooking == "Edit" ? 0 : Normalize(1),
            borderColor: Colors.borderColor
          }]}>
          <Text style={[globalstyles.plantext_roboto_regular, { color: taskOrBooking == "Edit" ? Colors.white : Colors.greyText, fontSize: Normalize(11.5) }]}>Edit Profile</Text>
        </Pressable>
      </View>
      <View style={styles.tabItem1}>
        <Pressable
          onPress={() => {
            setTaskOrBooking("Fixer")
            onChangeTab('Fixer')
          }
          }
          style={[styles.tabBtn, {
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: taskOrBooking == "Fixer" ? Colors.secondary : Colors.white,
            borderWidth: taskOrBooking == "Fixer" ? 0 : Normalize(1),
            borderColor: Colors.borderColor
          }]}>
          <Text style={[globalstyles.plantext_roboto_regular, { color: taskOrBooking == "Fixer" ? Colors.white : Colors.greyText, fontSize: Normalize(11.5) }]}>Be a Fixer</Text>
        </Pressable>
      </View >
    </View >
  );
}

const styles = StyleSheet.create({
  container: {
    margin: Normalize(15),
    height: Normalize(32),
  },
  tabItem: {
    borderLeftColor: Colors.white,
    width: '50%',
  },
  tabItem2: {
    borderLeftColor: Colors.white,
    width: '50%',
  },
  tabBtn: {
    width: '97%',
    height: "100%",
    borderRadius: Normalize(5)
  },
  tabItem1: {
    width: '50%',
    alignItems: 'center',
  },
  tabItemText: {
    fontSize: Normalize(11),
    color: Colors.white,
    fontFamily: 'roboto-regular',
  },
});
