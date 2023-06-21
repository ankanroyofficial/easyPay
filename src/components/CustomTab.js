import React, { useContext, useState } from 'react';
import { View, Text, StyleSheet, Pres, Pressable } from 'react-native';
import { color } from 'react-native-reanimated';
import Feather from 'react-native-vector-icons/Feather';
import { Colors } from './../constants/colors';
import Normalize from './../helpers/Dimens';
import strings from './../constants/lng/LocalizedStrings';
import globalstyles from '../constants/globalStyles/Global_Styles';
import { myContext } from '../constants/ContextApi';

export default function CustomTab({ onChangeTab, language }) {
  const {
    isDefaultMytask_asposter, setIsDefaultMytask_asposter,
     setWhichSection,whichSection,
     whichSection2, setWhichSection2,
    isDefaultMytask_astasker, setIsDefaultMytask_astasker
  } = useContext(myContext)
  const [taskOrBooking, setTaskOrBooking] = useState("asTasker")

  return (
    <View style={[styles.container, {}]}>

      <View style={{ height: "100%", width: "100%", flexDirection: 'row', borderRadius: 50, overflow: "hidden" }} >
        <View
          style={styles.tabItem}>
          <Pressable
            onPress={() => {
              setTaskOrBooking("asPoster")
              onChangeTab('asPoster')
              if (!isDefaultMytask_asposter) {
                setWhichSection2({
                  tab: "poster",
                  section: "Offer&Question",
                  active: true
                })
              }
            }}
            style={[styles.tabBtn, {
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: taskOrBooking == "asPoster" ? Colors.secondary : Colors.grayf5,
              borderRadius: taskOrBooking == "asPoster" ? Normalize(50) : 0
            }]}>
            <Text style={[globalstyles.plantext_outfit_semibold, { color: taskOrBooking == "asPoster" ? Colors.white : Colors.grey, fontSize: Normalize(12) }]}>As a EazyPayer</Text>
          </Pressable>
        </View>
        <View style={styles.tabItem}>
          <Pressable
            onPress={() => {
              setTaskOrBooking("asTasker")
              onChangeTab('asTasker')
              if (!isDefaultMytask_astasker) {
                setWhichSection({
                  tab: "tasker",
                  section: "Posted",
                  active: true
                })
              }
            }
            }
            style={[styles.tabBtn, {
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: taskOrBooking == "asTasker" ? Colors.secondary : Colors.grayf5,
              borderRadius: taskOrBooking == "asTasker" ? Normalize(50) : 0
            }]}>
            <Text style={[globalstyles.plantext_outfit_semibold, { color: taskOrBooking == "asTasker" ? Colors.white : Colors.grey, fontSize: Normalize(12) }]}>As a Client</Text>
          </Pressable>
        </View >
      </View>
    </View >
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: Normalize(15),
    height: Normalize(38),
    borderRadius: Normalize(50),
    overflow: "hidden",

  },
  tabItem: {
    width: '50%',
    backgroundColor: Colors.grayf5


  },
  tabBtn: {
    width: '100%',
    height: "100%",
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
