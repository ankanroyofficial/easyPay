import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView, SafeAreaView } from 'react-native';
import Header from '../../../../components/Header';
import styles from './Styles2';
import { withRtl, useRtlContext } from 'react-native-easy-localization-and-rtl';
import images from '../../../../constants/images';
import strings from '../../../../constants/lng/LocalizedStrings';
import axiosInstance from '../../../../constants/AxiosCallPage';
import LoaderPage from '../../../../components/LoaderPage';
import { backgroundColor } from 'styled-system';
import { Colors } from '../../../../constants/colors';
import HTMLView from 'react-native-htmlview';
import moment from 'moment';
import { questionPersianTimeShow } from '../../../../constants/DateShow';
import { axiosUrl, ImageLink } from '../../../../constants/LinkPage';
import { rowOrRowreverse } from '../../../../constants/RowOrRowreverse';
import CurveDesing_Component from '../../../../constants/CurveDesing_Component';
import globalstyles from '../../../../constants/globalStyles/Global_Styles';
// import { Normalize } from '../../../../helpers/Dimens';
function Blog({ navigation }) {
  const { RtlStyles, isRtl, language, setLanguage } = useRtlContext();
  const [loader, setLoader] = useState(false)
  const [data, setData] = useState([])


  useEffect(async () => {
    getData()
    return () => {
      getData()
    }
  }, []);

  const getData = async () => {
    try {
      const data = await axiosInstance.post("blog")

      if (data) {
        // console.log(data.data.result.blog)
        setData(data.data.result.blog)
      }
    } catch (error) {
      setLoader(false)
      console.log(error)
    }
  }
  const NewBlogCard = (item, index) => {
    return (
      <View key={index} style={{ height: Normalize(165), width: "99%", backgroundColor: Colors.white, marginVertical: Normalize(5), borderRadius: Normalize(5), elevation:Normalize(2), alignSelf: "center" }} >
        <View style={{ flex: 1.6, justifyContent: "center", alignItems: "center" }} >
          <View style={{ height: "92%", width: "95%", backgroundColor: "#f5f5f5", borderRadius: Normalize(5), overflow: "hidden" }} >
            <Image
              style={{ width: '100%', height: "100%", resizeMode: "stretch" }}
              source={{ uri: item.image == null ? ImageLink.BlankBlog : ImageLink.Blog + item.image }}
            />
          </View>
        </View>
        <View style={{ flex: 1, paddingHorizontal: Normalize(8), justifyContent: "space-around", marginVertical: 3 }} >
          {/* *********************auther name***************** */}
          <View style={{ flexDirection: rowOrRowreverse(language), width: "100%", alignItems: "center" }}>
            <View style={{
              height: Normalize(13),
              width: Normalize(13),
              borderRadius: Normalize(13) / 2,
              backgroundColor: Colors.green2,
              justifyContent: "center",
              alignItems: "center",
              marginRight: Normalize(5),
            }}>
              <Image
                style={{ width: "60%", height: "60%", resizeMode: "contain" }}
                source={images.wuser}
              />
            </View>
            <Text numberOfLines={1} style={{
              fontSize: Normalize(10), color: Colors.greyText,
              fontFamily: "Outfit-Medium",
              width: "80%",
            }}>Posted by : <Text numberOfLines={1} style={{ color: Colors.primary, fontSize: Normalize(11) }} >{item.blog_to_language_api.author_name}</Text></Text>
          </View>
          {/* ***************************Calender*************** */}
          <View style={{ flexDirection: language == "en" ? 'row' : "row-reverse" }}>
            <View style={{
              height: Normalize(13),
              width: Normalize(13),
              alignSelf: 'center',
              justifyContent: "center",
              alignItems: "center",
              marginRight: language == "en" ? Normalize(5) : 0,
              marginLeft: language == "pr" ? Normalize(5) : 0
            }}>
              <Image
                style={{ width: "80%", height: "80%", resizeMode: "contain" }}
                source={images.calander}
              />
            </View>
            <Text style={{
              fontSize: Normalize(10), color: Colors.greyText,
              alignSelf: 'center', fontFamily: "Outfit-Regular",
            }}>
              {language == "en" ? moment(item.blog_to_language_api.created_at, 'YYYY-MM-DD').format('Do MMMM, YYYY') : questionPersianTimeShow(item.blog_to_language_api.created_at)}
            </Text>
          </View>

          {/* *****************Title************ */}

          <Text numberOfLines={1} style={{
            fontSize: Normalize(11.5), color: '#444',
            fontFamily: "Outfit-Medium", textAlign: language == "en" ? "left" : "right"
          }}>{item.blog_to_language_api.title}</Text>
          <TouchableOpacity
            onPress={() => navigation.navigate('BlogDetails', { item: item })}
          // onPress={() => { console.log(item) }}
          >
            <Text style={{
              fontSize: Normalize(10), color: Colors.secondary,
              fontFamily: "Outfit-Medium", textAlign:"right",paddingRight:Normalize(3)
            }}>Read more...</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }



  return (
    <>
      {
        loader ?
          <LoaderPage />
          :
          <SafeAreaView style={{ backgroundColor: Colors.primary, flex: 1, flexDirection: 'column' }}>

            <View style={styles.container}>
              <Header navigation={navigation} back name={strings.HELPTOPICS.BLOG} />
              {/* <CustomTab onChangeTab={handleTabChange} /> */}
              <CurveDesing_Component  >
                <View style={globalstyles.container_only_padding} >
                  <ScrollView showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingBottom: Normalize(20) }}
                  >
                    <View style={{ flex: 1 }}>
                      {
                        data.map((item, index) => (
                          NewBlogCard(item, index)
                        ))}
                    </View>
                  </ScrollView>
                </View>
              </CurveDesing_Component>
            </View >

          </SafeAreaView>
      }
    </>
  );
}

export default withRtl(Blog);
