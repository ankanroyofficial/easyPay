import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { color } from 'react-native-reanimated';
import Feather from 'react-native-vector-icons/Feather';
import { Colors } from '../constants/colors';
import Normalize from '../helpers/Dimens';
import strings from '../constants/lng/LocalizedStrings';
import { rowOrRowreverse } from '../constants/RowOrRowreverse';
import { withRtl, useRtlContext } from 'react-native-easy-localization-and-rtl';
import globalstyles from '../constants/globalStyles/Global_Styles';
export default function CustomTab({ onChangeTab }) {

  const { RtlStyles, isRtl, language, setLanguage } = useRtlContext();
  const [tasksOrBooking, setTasksOrBooking] = useState("Tasks")
  return (
    <View style={[styles.container, { flexDirection: rowOrRowreverse(language) }]}>
      <View style={language == "en" ? styles.tabItem : styles.tabItem2}>
        <TouchableOpacity
          onPress={() => {
            setTasksOrBooking('Tasks')
            onChangeTab('Tasks')
          }}
          style={[styles.tabBtn, {
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: tasksOrBooking == 'Tasks' ? Colors.secondary : Colors.white,
            borderWidth: tasksOrBooking == "Tasks" ? 0 : Normalize(1),
            borderColor: Colors.borderColor
          }]}>
          <Text style={[globalstyles.plantext_roboto_regular, { color: tasksOrBooking == "Tasks" ? Colors.white : Colors.greyText, fontSize: Normalize(11.5) }]}>{strings.DISPUTE.ACTIVE}</Text>
        </TouchableOpacity>
      </View>
      <View style={{ height: "100%", width: 0.6, backgroundColor: Colors.white }} />
      <View style={styles.tabItem1}>
        <TouchableOpacity
          onPress={() => {
            setTasksOrBooking('Booking')
            onChangeTab('Booking')
          }}
          style={[styles.tabBtn, {
            flexDirection: rowOrRowreverse(language),
            backgroundColor: tasksOrBooking == 'Booking' ? Colors.secondary : Colors.white,
            justifyContent: "center",
            alignItems: "center",
            borderWidth: tasksOrBooking == "Booking" ? 0 : Normalize(1),
            borderColor: Colors.borderColor
          }]}>
          <Text style={[globalstyles.plantext_roboto_regular, { color: tasksOrBooking == "Booking" ? Colors.white : Colors.greyText, fontSize: Normalize(11.5) }]}>{strings.DISPUTE.CLOSED}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    marginVertical: Normalize(15),
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

