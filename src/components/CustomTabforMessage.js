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
import globalstyles from '../constants/globalStyles/Global_Styles';
export default function CustomTab({ onChangeTab, numberOfUnread }) {
  const { language } = useRtlContext();
  const [allOrunread, setAllOrunread] = useState("all")
  return (
    <View style={[styles.container, { flexDirection: rowOrRowreverse(language), }]}>
      <View style={styles.tabItem}>
        <TouchableOpacity
          onPress={() => {
            setAllOrunread('all')
            onChangeTab('all')
          }}
          style={[styles.tabBtn, {
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: allOrunread == "all" ? Colors.secondary : Colors.white,
            borderWidth: allOrunread == "all" ? 0 : Normalize(1),
            borderColor: Colors.borderColor

          }]}>
          <Text style={[globalstyles.plantext_roboto_regular, { color: allOrunread == "all" ? Colors.white : Colors.greyText, fontSize: Normalize(11.5) }]}>{strings.MESSAGE.ALLMESSAGES}</Text>
        </TouchableOpacity>
      </View>
      <View style={[styles.tabItem]}>
        <TouchableOpacity
          onPress={() => {
            setAllOrunread('unread')
            onChangeTab('unread')
          }}
          style={[styles.tabBtn, {
            flexDirection: rowOrRowreverse(language),
            backgroundColor: allOrunread == "unread" ? Colors.secondary : Colors.white,
            justifyContent: "center",
            alignItems: "center",
            borderWidth: allOrunread == "unread" ? 0 : Normalize(1),
            borderColor: Colors.borderColor
          }]}>
          <Text style={[globalstyles.plantext_roboto_regular, { color: allOrunread == "unread" ? Colors.white : Colors.greyText, fontSize: Normalize(11.5) }]}>{strings.MESSAGE.UNREADMESSAGES}</Text>
          {
            numberOfUnread > 0 &&
            <View style={{ height: Normalize(12), width: Normalize(12), borderRadius: Normalize(11) / 2, backgroundColor: allOrunread == "unread" ? Colors.white : Colors.secondary, marginHorizontal: "2%", justifyContent: "center", alignItems: "center" }} >
              <Text style={{ fontSize: Normalize(7), color: allOrunread == "unread" ? Colors.secondary : Colors.white, fontFamily: 'roboto-regular' }}>{addCommaAndTranslateInPersian(numberOfUnread, language)}</Text>
            </View>
          }
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignSelf: "center",
    marginTop: Normalize(8),
    height: Normalize(32),
    paddingHorizontal: Normalize(16)
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