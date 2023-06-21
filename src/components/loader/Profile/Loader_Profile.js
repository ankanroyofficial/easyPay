import React from 'react';
import { View, Text, Image, SafeAreaView, ScrollView, FlatList } from 'react-native';
import { withRtl, useRtlContext } from 'react-native-easy-localization-and-rtl';
import { Colors } from './../../../constants/colors';
import images from './../../../constants/images';
import Normalize from '../../../helpers/Dimens';
import styles from './Styles';
import SkeletonPlaceholder from "react-native-skeleton-placeholder";
import Header from '../../ProfileHeader';
import { rowOrRowreverse } from '../../../constants/RowOrRowreverse';
import { lastStar, reviewShowinGraystar, reviewShowinStar } from '../../../constants/RatingCount';
function Loader_Profile() {
  const { RtlStyles, isRtl, language, setLanguage } = useRtlContext();
  return (
    <View style={[styles.container, { backgroundColor: Colors.white }]}>
      <SkeletonPlaceholder direction={language == "en" ? 'right' : 'left'}  >
        {/* <ScrollView showsVerticalScrollIndicator={false} > */}
        {/* cover pic and profile pic */}
        <View style={{ height: Normalize(50), width: "100%", backgroundColor: "#f5f5f5", marginBottom: 1 }} />
        <View style={{
          width: '100%',
          height: Normalize(60),
          backgroundColor: "#f5f5f5"
        }}>

          {/* cover pic */}

          {/* profile pic */}
          <View style={{

            alignItems: 'center',
            justifyContent: 'center',
            width: Normalize(75),
            height: Normalize(75),
            borderRadius: Normalize(75) / 2,
            position: 'absolute',
            top: '42%',
            alignSelf: 'center', overflow: "hidden", backgroundColor: "#f5f5f5",
          }}>
            <View style={{ height: "100%", width: "100%", resizeMode: "cover" }}
            />
          </View>
        </View>
        {/* name and address */}
        <View style={[styles.nameAddContainer, { marginTop: Normalize(47) }]}>
          <View style={{ height: Normalize(14), width: Normalize(70), backgroundColor: "#f5f5f5", borderRadius: 3 }} />
          <View style={{ height: Normalize(12), width: Normalize(50), backgroundColor: "#f5f5f5", borderRadius: 3, marginTop: Normalize(5), }} />
          {/* Address */}
          <View style={{ marginHorizontal: Normalize(12) }} >
            <View style={{ padding: Normalize(5), flexDirection: "row", alignItems: "center" }}>
              <View style={{ height: Normalize(12), width: Normalize(12), marginHorizontal: Normalize(2), marginTop: Normalize(2), borderRadius: 3, backgroundColor: "#f5f5f5" }}>
                <View style={{ height: "100%", width: "100%" }} />
              </View>
              <View style={{ height: Normalize(12), width: Normalize(150), backgroundColor: "#f5f5f5", borderRadius: 3, marginTop: Normalize(2), }} />
            </View>
          </View>
          <View style={{ height: Normalize(11), width: Normalize(150), backgroundColor: "#f5f5f5", borderRadius: 3, marginTop: Normalize(5), }} />


        </View>
        {/* line break */}
        <View style={styles.lineStyle} />

        {/* custom tab tasker and poster */}
        <View style={{
          width: '75%',
          height: Normalize(35),
          alignSelf: 'center',
          borderWidth: Normalize(1),
          borderColor: "#f5f5f5",
          borderRadius: Normalize(6),
        }}>
          <View style={{ width: "50%", height: "100%", backgroundColor: "red" }} />
        </View>
        {/* reviews */}

        <View style={{ justifyContent: "center", alignItems: "center", paddingVertical: Normalize(10) }} >
          <View style={{ flexDirection: language == "pr" ? 'row-reverse' : "row", alignItems: "center" }}>

          </View>
          <View style={{ height: Normalize(11), width: Normalize(100), marginLeft: 2, backgroundColor: "red", paddingVertical: Normalize(4) }} />
          <View style={{ height: Normalize(11), width: Normalize(65), marginLeft: 2, backgroundColor: "red", marginVertical: Normalize(5) }} />
          <View style={{ height: Normalize(11), width: Normalize(90), marginLeft: 2, backgroundColor: "red" }} />
        </View>
        {/* About section */}
        <View
          style={[
            styles.aboutSection,
            language == 'pr'
              ? { ...RtlStyles.containerColumnInverse }
              : { ...RtlStyles.containerColumn },
          ]}>
          <View style={{ height: Normalize(14), width: Normalize(100), backgroundColor: "#f5f5f5", borderRadius: 3, marginTop: Normalize(8), }} />


        </View>
        {/* Listings */}
        <View style={{ marginVertical: Normalize(10), }} >
          <View style={{ height: Normalize(14), width: Normalize(100), backgroundColor: "#f5f5f5", borderRadius: 3, marginTop: Normalize(8), marginLeft: 20, marginHorizontal: Normalize(15), alignSelf: language == "en" ? "flex-start" : "flex-end" }} />
          <View style={{ flexDirection: rowOrRowreverse(language) }} >
            {
              [0, 1, 2].map((item, index) => (
                // renderItem(item, index)
                <View key={index} style={{
                  width: Normalize(155),
                  borderRadius: Normalize(6),
                  marginLeft: language == "pr" ? Normalize(10) : 2,
                  marginRight: language == "en" ? Normalize(10) : 2,
                  marginBottom: Normalize(15),
                  marginTop: Normalize(15),
                  padding: 5,
                  borderColor: "#f5f5f5",
                  borderWidth: Normalize(1)
                }}>
                  <View style={{ width: "100%", height: Normalize(80), overflow: "hidden", borderRadius: Normalize(6), backgroundColor: "#f5f5f5" }} >
                    <View style={{ width: "100%", height: "100%" }} />
                  </View>
                  <View
                    style={{ marginTop: 7 }} >
                    {/* <Text numberOfLines={1} style={{ fontFamily: 'roboto-medium', fontSize: 14, textAlign: leftOrRight(language) }}>smdknskns</Text> */}
                    <View style={{ height: 14, width: Normalize(65), backgroundColor: "#f5f5f5", borderRadius: 3, }} />
                    <View style={{ height: Normalize(11), width: Normalize(55), backgroundColor: "#f5f5f5", borderRadius: 3, marginVertical: Normalize(3) }} />
                    <View style={{ height: 13, width: Normalize(75), backgroundColor: "#f5f5f5", borderRadius: 3, }} />
                  </View>
                </View>
              ))
            }
          </View>
        </View>
        {/* Portfolio section */}
        <View
          style={[
            styles.aboutSection,
            language == 'pr'
              ? { ...RtlStyles.containerColumnInverse }
              : { ...RtlStyles.containerColumn },
          ]}>
          <View style={{ height: Normalize(14), width: Normalize(100), backgroundColor: "#f5f5f5", borderRadius: 3, marginTop: Normalize(0), }} />
        </View>
        {/* Transportation */}
        <View
          style={[
            styles.aboutSection,
            language == 'pr'
              ? { ...RtlStyles.containerColumnInverse }
              : { ...RtlStyles.containerColumn },
          ]}>
          <View style={{ height: Normalize(14), width: Normalize(100), backgroundColor: "#f5f5f5", borderRadius: 3, marginTop: Normalize(8), }} />
        </View>
        {/* Langauge */}
        <View
          style={[
            styles.aboutSection,
            language == 'pr'
              ? { ...RtlStyles.containerColumnInverse }
              : { ...RtlStyles.containerColumn },
          ]}>
          <View style={{ height: Normalize(14), width: Normalize(100), backgroundColor: "#f5f5f5", borderRadius: 3, marginTop: Normalize(8), }} />
        </View>
        {/* Skills section */}
        <View
          style={[
            styles.aboutSection,
            language == 'pr'
              ? { ...RtlStyles.containerColumnInverse }
              : { ...RtlStyles.containerColumn },
          ]}>
          <View style={{ height: Normalize(14), width: Normalize(100), backgroundColor: "#f5f5f5", borderRadius: 3, marginTop: Normalize(8), }} />

        </View>
        {/* Badges section */}
        <View
          style={[
            styles.aboutSection,
            language == 'pr'
              ? { ...RtlStyles.containerColumnInverse }
              : { ...RtlStyles.containerColumn },
          ]}>
          <View style={{ height: Normalize(14), width: Normalize(100), backgroundColor: "#f5f5f5", borderRadius: 3, marginVertical: Normalize(11), }} />

          <View style={{ flexDirection: rowOrRowreverse(language) }}>
            <View style={[styles.iconStyle, { backgroundColor: "#f5f5f5" }]}
            />
            <View style={{ flexDirection: 'column', alignSelf: 'center', marginHorizontal: 30 }}>
              <View style={{ flexDirection: rowOrRowreverse(language), }} >
                <View style={{ height: Normalize(12), width: Normalize(12), backgroundColor: "#f5f5f5" }} />
                <View style={{ height: Normalize(12), width: Normalize(60), backgroundColor: "#f5f5f5", borderRadius: 3, marginHorizontal: 10, }} />
              </View>
              <View style={{ flexDirection: rowOrRowreverse(language), marginTop: 20, }}>
                <View style={{ height: Normalize(12), width: Normalize(12), backgroundColor: "#f5f5f5" }} />
                <View style={{ height: Normalize(12), width: Normalize(60), backgroundColor: "#f5f5f5", borderRadius: 3, marginHorizontal: 10, }} />
              </View>
            </View>
          </View>
        </View>
        {/* *******review headline****** */}
        <View style={styles.reviewView}>
          <View style={styles.lineStyle2} />
          <View style={{ paddingRight: 15 }}>
            <View style={{ height: Normalize(14), width: Normalize(80), backgroundColor: "#f5f5f5", borderRadius: 3, marginLeft: Normalize(15), marginTop: Normalize(15), }} />
          </View>
          {/* ************ bottom two review button *********** */}
          <View style={[styles.customTab2, { flexDirection: rowOrRowreverse(language), alignSelf: language == "en" ? "flex-start" : "flex-end" }]}>

            {/* tab for tasker */}
            <View
              style={[
                styles.tab1Style2,
                {
                  borderBottomColor: "#f5f5f5",
                },
              ]}>
              <View style={{ height: Normalize(11), width: Normalize(50), backgroundColor: "#f5f5f5", borderRadius: 3, }} />
            </View>
            {/* tab for poster */}
            <View
              style={[
                styles.tab2Style2,
                {
                  borderColor: "#f5f5f5",
                },
              ]}>
              <View style={{ height: Normalize(11), width: Normalize(50), backgroundColor: "#f5f5f5", borderRadius: 3, }} />
            </View>
          </View>
          {/* **************review lists*********** */}

          <View style={{}}>
            {
              [0, 1, 2].map((item, index) => (
                <View key={index} style={{ flexDirection: 'column', padding: Normalize(15), paddingBottom: Normalize(30), paddingTop: Normalize(15), borderBottomColor: Colors.lightGrey, borderBottomWidth: 0.2 }}>
                  <View style={{ flexDirection: language == "pr" ? "row-reverse" : "row" }}>
                    <View style={{ flexDirection: language == "pr" ? "row-reverse" : "row" }}>
                      <View style={{ width: 50, height: 50, backgroundColor: "#f5f5f5", borderRadius: 25, overflow: "hidden" }}>
                        <View style={{ height: "100%", width: "100%", backgroundColor: "#f5f5f5" }} />
                      </View>
                      {/* ***************as a tasker********** */}
                      <View style={{ flexDirection: 'column', marginHorizontal: 15 }}>
                        {/* <Text style={{ color: Colors.primary, fontFamily: 'roboto-bold', fontSize: Normalize(12), textAlign: leftOrRight(language) }}>rtyjuhfgdfs</Text> */}
                        <View style={{ height: Normalize(12), width: Normalize(50), backgroundColor: "#f5f5f5", borderRadius: 3, }} />
                        <View style={{ flexDirection: language == "pr" ? 'row-reverse' : "row", alignItems: "center", marginTop: Normalize(5) }}>
                          {
                            [0, 1, 2, 3, 4].map((item, index) => (
                              <Image key={index} source={images.stargray} style={{ height: Normalize(11), width: Normalize(11), marginHorizontal: Normalize(1.5) }} />
                            ))
                          }
                        </View>
                      </View>
                    </View>
                  </View>
                  <View style={{ height: Normalize(12), width: Normalize(60), backgroundColor: "#f5f5f5", marginTop: 10, borderRadius: 3 }} />
                  <View style={{ height: 11, width: Normalize(50), backgroundColor: "#f5f5f5", marginTop: Normalize(5), borderRadius: 3 }} />
                </View>
              ))
            }
          </View>
        </View>
        {/* </ScrollView> */}
      </SkeletonPlaceholder>
    </View>
  );
}

export default withRtl(Loader_Profile);
