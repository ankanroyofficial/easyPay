import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { color } from 'react-native-reanimated';
import Feather from 'react-native-vector-icons/Feather';
import { Colors } from '../constants/colors';
import Normalize from '../helpers/Dimens';
import strings from '../constants/lng/LocalizedStrings';
import { rowOrRowreverse } from '../constants/RowOrRowreverse';
import { withRtl, useRtlContext } from 'react-native-easy-localization-and-rtl';
import { addCommaAndTranslateInPersian } from '../constants/NumberWithCommaAndInPersian';
export default function CustomTab({ onChangeTab, numberOfUnread }) {
  const { RtlStyles, isRtl, language, setLanguage } = useRtlContext();
  const [unread, setUnread] = useState(99)
  return (
    <View style={[styles.container, { flexDirection: rowOrRowreverse(language), }]}>
      <View style={language == "en" ? styles.tabItem : styles.tabItem2}>
        <TouchableOpacity
          onPress={() => onChangeTab('details')}
          style={styles.tabBtn}>
          <Text style={styles.tabItemText}>Task Details</Text>
        </TouchableOpacity>
      </View>
      <View style={[styles.tabItem1]}>
        <TouchableOpacity
          onPress={() => onChangeTab('message')}
          style={[styles.tabBtn, { flexDirection: rowOrRowreverse(language), alignItems: "center", justifyContent: "center" }]}>
          <Text style={styles.tabItemText}>Message</Text>
          <View style={{ height: Normalize(12), width: Normalize(12), borderRadius: Normalize(11) / 2, backgroundColor: Colors.secondary, marginHorizontal: "2%", justifyContent: "center", alignItems: "center" }} >
            <Text style={{ fontSize: Normalize(7), color: Colors.white, fontFamily: 'roboto-regular' }}>{addCommaAndTranslateInPersian(unread, language)}</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.primary,
    borderTopWidth: 0.6,
    borderTopColor: Colors.white,
    paddingVertical: Normalize(10),
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  tabItem: {
    borderRightWidth: 0.6,
    borderRightColor: Colors.white,
    width: '50%',
  }, tabItem2: {
    borderLeftWidth: 0.6,
    borderLeftColor: Colors.white,
    width: '50%',
  },
  tabBtn: {
    width: '100%',
    alignItems: 'center',
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
