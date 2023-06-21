import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Colors } from '../constants/colors';
import Normalize from '../helpers/Dimens';
import {  useRtlContext } from 'react-native-easy-localization-and-rtl';
import { rowOrRowreverse } from '../constants/RowOrRowreverse';
import { fontfmliy } from './WhichFontFamily';

export default function CustomTab({ onChangeTab, activeTab }) {
  const { language } = useRtlContext();
  const [taskerOrPoster, setTaskerOrPoster] = useState(activeTab)

  return (
    <View style={[styles.container, { flexDirection: rowOrRowreverse(language), }]}>
      <View style={{borderBottomColor:Colors.grey,borderBottomWidth:Normalize(1),flexDirection:"row"}} >
      <TouchableOpacity
        onPress={() => {
          setTaskerOrPoster('tasker')
          onChangeTab('tasker')
        }}
        style={[styles.tabItem, { borderBottomColor: taskerOrPoster == "tasker" ? Colors.secondary : Colors.white,borderBottomWidth:Normalize(2) }]}>
        <Text style={[styles.tabItemText, {fontFamily:taskerOrPoster == "tasker"?fontfmliy.bold:fontfmliy.regular, color: taskerOrPoster == "tasker" ?Colors.secondary: Colors.primary  }]}>As a Eazypayer</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          setTaskerOrPoster('poster')
          onChangeTab('poster')
        }}
        style={[styles.tabItem, { borderBottomColor: taskerOrPoster == "poster" ? Colors.secondary : Colors.white,borderBottomWidth:Normalize(2) }]}>
        <Text style={[styles.tabItemText, {fontFamily:taskerOrPoster == "poster"?fontfmliy.bold:fontfmliy.regular,color: taskerOrPoster == "poster" ?Colors.secondary: Colors.primary }]}>As a Client</Text>
      </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: Normalize(32),
    marginTop: Normalize(4),
    marginBottom: Normalize(8),
  },
  tabItem: {
    borderLeftColor: Colors.white,
    width: '50%',
    justifyContent: "center",
    alignItems: "center",
  },
  tabItemText: {
    fontSize: Normalize(13),
    color: Colors.white,
    fontFamily:fontfmliy.bold,
    letterSpacing:0.5
  },
});
