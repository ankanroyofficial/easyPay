import React from 'react';
import { View, Text, Image, ScrollView, SafeAreaView } from 'react-native';
import styles from './Styles';
import { useRtlContext } from 'react-native-easy-localization-and-rtl';
import { Colors } from '../../../constants/colors';
import images from '../../../constants/images';
import { persianTimeShow_With_Date, questionEnglishTimeShow } from '../../../constants/DateShow';
import { nameShorting } from '../../../constants/NameShorting';
import { leftOrRight, rowOrRowreverse } from '../../../constants/RowOrRowreverse';
import { axiosUrl, ImageLink } from '../../../constants/LinkPage';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
export default function Loader_Message({ navigation }) {
  const { RtlStyles, isRtl, language, setLanguage } = useRtlContext();
  return (
    <SafeAreaView style={{ backgroundColor: Colors.white, flex: 1, flexDirection: 'column' }}>
      <View>
        {
          <ScrollView
          showsVerticalScrollIndicator={false}
          >
            <SkeletonPlaceholder direction={language == "en" ? 'right' : 'left'}  >
              <View style={{ marginBottom: Normalize(7) }}>
                {
                  [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14].map((item, index) => (
                    <View style={{
                      borderBottomWidth: 1.5,
                      borderBottomColor: "#f5f5f5",
                      width: '100%',
                      height: Normalize(80),
                      flexDirection: 'row',
                      marginBottom: Normalize(0)
                    }}
                      key={index}
                    >
                      <View style={{ flexDirection: rowOrRowreverse(language), alignSelf: 'center', marginHorizontal: 10 }}>
                        <View style={{ flexDirection: rowOrRowreverse(language), width: '100%', height: "100%" }}>
                          <View style={{ height: 60, width: 60, borderRadius: 30, backgroundColor: "#f5f5f5" }} />
                          <View style={{ flexDirection: 'column', marginHorizontal: 15, flex: 1, justifyContent: "center" }}>
                            <View style={{ flexDirection: rowOrRowreverse(language), justifyContent: 'space-between', }}>
                              <View style={{
                                marginHorizontal: 2,
                                width: Normalize(70),
                                height: Normalize(13),
                                marginRight: language === "en" ? 0 : Normalize(10),
                                backgroundColor: "#f5f5f5"
                              }} />
                              <View style={{ flexDirection: rowOrRowreverse(language), alignItems: "center" }}>
                                <View style={{ width: 15, height: Normalize(13), backgroundColor: "#f5f5f5", borderRadius: 50 }} />
                                <View style={{
                                  marginHorizontal: Normalize(8),
                                  height: Normalize(11),
                                  backgroundColor: "#f5f5f5",
                                  width: language==="en"? Normalize(110):Normalize(50)
                                }} />
                              </View>
                            </View>
                            <View style={{ flexDirection: rowOrRowreverse(language), justifyContent: "space-between" }} >
                              <View style={{
                                marginLeft: language === "en" ? 0 : 2,
                                height: Normalize(11),
                                marginTop: 14.5,
                                marginRight: language === "en" ? 0 : Normalize(5),
                                width: Normalize(130), backgroundColor: "#f5f5f5"
                              }} />
                            </View>
                          </View>
                        </View>
                      </View>
                    </View>
                  ))
                }
              </View>
            </SkeletonPlaceholder>
          </ScrollView>
        }
      </View>
    </SafeAreaView>
  );
}

