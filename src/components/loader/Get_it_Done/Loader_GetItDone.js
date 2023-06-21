import React, { useContext, useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  FlatList,
  ImageBackground,
  Image,
  SafeAreaView,
  Modal,
  RefreshControl,
  LogBox,
  Dimensions,
} from 'react-native';
import Header2 from '../../../components/Header2';
import { withRtl, useRtlContext } from 'react-native-easy-localization-and-rtl';
import strings from './../../../constants/lng/LocalizedStrings';
import styles from './Styles';
import images from './../../../constants/images';
import Button from '../../../components/Button';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { Colors } from '../../../constants/colors';
import { leftOrRight, rowOrRowreverse } from '../../../constants/RowOrRowreverse';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

const { height, width } = Dimensions.get("window")

function Loader_GetItDone({ navigation }) {

  const { RtlStyles, isRtl, language, setLanguage } = useRtlContext();

  const sub_C_data = [1, 2, 3, 4, 5, 6, 7, 8]

  return (
    <View style={[styles.container, { backgroundColor: Colors.white }]}>
      <SkeletonPlaceholder
        direction={language == "en" ? 'right' : 'left'}
      >
        {/* top section */}
        <View style={{ height: Normalize(50), width: "100%", backgroundColor: "#f5f5f5", marginBottom: 1 }} />
        <View
          style={{
            backgroundColor: Colors.grayf5,
            height: Normalize(40),
            margin: Normalize(10),
            borderRadius: 50,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
          }}/>
        {/* middle section */}
        <View style={styles.postTaskContainer}>
          <View style={{}} >
            <View style={{ flexDirection: rowOrRowreverse(language), alignItems: "center", width: "97%", alignSelf: "center" }} >
              <View style={styles.image} />
              <View style={{ flex: 1 }} >
                <View style={[styles.h1, { alignSelf: language == "en" ? "flex-start" : "flex-end", width: Normalize(220), marginHorizontal:Normalize(8)}]} />
              </View>
            </View>
            <View style={{ flexDirection: language == "en" ? "row" : "row-reverse", flexWrap: "wrap" }} >
              {
                [0, 1, 2, 3, 4, 5, 6, 7, 8].map((item, index) => (
                  <View
                    style={styles.optionContainer2}
                    key={index}>
                    <View style={{ height: Normalize(45), width: Normalize(45), backgroundColor: "#555b78", borderRadius: 40, alignItems: 'center', justifyContent: 'center', backgroundColor: Colors.grayf5 }}>
                    </View>
                    <View style={styles.h8} />
                  </View>
                ))
              }
            </View>
          </View>
        </View>

        {/* bottom section */}
        {/* listing category */}
        <View>
          <View style={[styles.h1, { alignSelf: language == "en" ? "flex-start" : "flex-end" }]} />
          <View style={[styles.h1, { width: Normalize(150), alignSelf: language == "en" ? "flex-start" : "flex-end" }]} />
        </View>
        {/* subcategory */}
        <View style={{ marginBottom: Normalize(10), marginTop: Normalize(5) }} >
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
          >
            <View style={{ marginBottom: Normalize(10), marginTop: Normalize(5) }} >
              <View style={{ height: Normalize(27), flexDirection: "row" }} >
                {
                  sub_C_data.map((item, index) => (
                    <View
                      key={index} style={{ paddingHorizontal: Normalize(20), borderColor: Colors.grayf5, borderWidth: Normalize(1), borderRadius: 50, justifyContent: "center", marginHorizontal: Normalize(5), flexDirection: rowOrRowreverse(language), alignItems: "center" }} >
                      <View style={{ height: Normalize(11), width: Normalize(11), borderRadius: Normalize(11) / 2, backgroundColor: Colors.grayf5 }} />
                      <View style={{ width: Normalize(5) }} />
                      <View style={[styles.h1, { width: Normalize(45), backgroundColor: Colors.grayf5 }]} />
                    </View>
                  ))
                }
              </View>
              <View style={{ height: Normalize(27), flexDirection: "row", marginVertical: Normalize(8) }} >
                {
                  sub_C_data.map((item, index) => (
                    <View
                      key={index} style={{ paddingHorizontal: Normalize(20), borderColor: Colors.grayf5, borderWidth: Normalize(1), borderRadius: 50, justifyContent: "center", marginHorizontal: Normalize(5), flexDirection: rowOrRowreverse(language), alignItems: "center" }} >
                      <View style={{ height: Normalize(11), width: Normalize(11), borderRadius: Normalize(11) / 2, backgroundColor: Colors.grayf5 }} />
                      <View style={{ width: Normalize(5) }} />
                      <View style={[styles.h1, { width: Normalize(30), backgroundColor: Colors.grayf5 }]} />
                    </View>
                  ))
                }
              </View>
              <View style={{ height: Normalize(27), flexDirection: "row" }} >
                {
                  sub_C_data.map((item, index) => (
                    <View
                      key={index} style={{ paddingHorizontal: Normalize(20), borderColor: Colors.grayf5, borderWidth: Normalize(1), borderRadius: 50, justifyContent: "center", marginHorizontal: Normalize(5), flexDirection: rowOrRowreverse(language), alignItems: "center" }} >
                      <View style={{ height: Normalize(11), width: Normalize(11), borderRadius: Normalize(11) / 2, backgroundColor: Colors.grayf5 }} />
                      <View style={{ width: Normalize(5) }} />
                      <View style={[styles.h1, { width: Normalize(40), backgroundColor: Colors.grayf5 }]} />
                    </View>
                  ))
                }
              </View>
            </View>
          </ScrollView>
        </View>

        {/* category wise listing */}

        {
          [1, 2].map((item, index) => (
            <View key={index} >
              <View style={{ flexDirection: rowOrRowreverse(language), alignItems: "center", marginHorizontal: Normalize(11) }} >
                <View style={{
                  height: Normalize(11),
                  width: Normalize(50),
                  backgroundColor: Colors.grayf5,
                  marginHorizontal: Normalize(3),
                  alignSelf: language == "en" ? "flex-start" : 'flex-end'
                }} />
                <View style={{ height: Normalize(10), width: Normalize(10), marginHorizontal: Normalize(3), backgroundColor: Colors.grayf5 , marginVertical: Normalize(5)}} />
              </View>
              <View style={{ paddingHorizontal: Normalize(6) }}>
                <View style={{ flexDirection: rowOrRowreverse(language), flexWrap: "wrap" }} >
                  {
                    [1, 2].map((item, index) => (
                      <View
                        key={index}
                        style={{
                          width: width * 0.4,
                          height: Normalize(140),
                          borderRadius: Normalize(5),
                          marginVertical: width * 0.015,
                          marginHorizontal: width * 0.01,
                          borderColor: Colors.grayf5,
                          borderWidth: Normalize(1)

                        }}>
                        <View
                          style={{ flex: 1, margin: Normalize(4) }} >
                          <View style={{ height: width * 0.25, width: "100%", backgroundColor: "#f5f5f5", borderRadius: Normalize(5), overflow: "hidden" }} />
                          <View
                            style={{ flex: 1, marginTop: "3%", padding: Normalize(3), justifyContent: "space-evenly" }} >
                            <View style={{ flexDirection: rowOrRowreverse(language), alignItems: "center" }} >
                              <View style={{ height: Normalize(11), width: Normalize(11), backgroundColor: Colors.grayf5 }} />
                              {/* <Text style={{ fontSize: Normalize(11), color: Colors.greylightText, fontFamily: 'roboto-medium', textAlign: leftOrRight(language), marginHorizontal: "2%" }}></Text> */}
                            </View>
                            <View style={{ height: Normalize(10), width: width * 0.28, alignSelf: language == "en" ? "flex-start" : "flex-end" }} />
                            <View style={{ height: Normalize(10), width: width * 0.2, alignSelf: language == "en" ? "flex-start" : "flex-end" }} />
                          </View>
                        </View>
                      </View>
                    ))
                  }
                </View>
              </View>
            </View>
          ))
        }
      </SkeletonPlaceholder>
    </View>
  );
}
export default withRtl(Loader_GetItDone);
