import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView, SafeAreaView, StyleSheet } from 'react-native';
import Header from '../../../../components/Header';
import styles from './Styles2';
import { withRtl, useRtlContext } from 'react-native-easy-localization-and-rtl';
import images from '../../../../constants/images';
import axios from 'axios';
import LoaderPage from '../../../../components/LoaderPage';
import { backgroundColor } from 'styled-system';
import { Colors } from '../../../../constants/colors';
import HTMLView from 'react-native-htmlview';
import strings from '../../../../constants/lng/LocalizedStrings';
import { ImageBackground } from 'react-native';
import { width } from 'styled-system';
import CurveDesing_Component from '../../../../constants/CurveDesing_Component';
import Normalize from '../../../../helpers/Dimens';
export default function Help({ navigation, route }) {
  const { RtlStyles, isRtl, language, setLanguage } = useRtlContext();
  const { value } = route.params;
  const webViewStyle = StyleSheet.create({ div: { textAlign: "justify", fontSize: Normalize(12), color: "#444", fontFamily: "roboto-medium", } });
  return (
    <SafeAreaView style={{ backgroundColor: Colors.primary, flex: 1, flexDirection: 'column' }}>

      <View style={styles.container}>
        <Header navigation={navigation} back name={strings.HELP.HEADER} />
        <CurveDesing_Component  >
          <ScrollView
            showsVerticalScrollIndicator={false}
          >
            <View style={{ flex: 1 }}>

              <View style={{
                flexDirection: 'column', alignSelf: 'center', width: '90%',
              }}>
                <Text style={{
                  fontSize: Normalize(18), color: Colors.primary, fontFamily: "Outfit-Medium", marginVertical: Normalize(8),
                }}>{value.title}</Text>
                {value.description == null ? null :
                  <HTMLView
                    addLineBreaks={false}
                    value={"<div>" + value.description + "</div>"}
                    stylesheet={webViewStyle}
                  />}

              </View>
            </View>
          </ScrollView>
        </CurveDesing_Component>
      </View>
    </SafeAreaView>
  );
}




