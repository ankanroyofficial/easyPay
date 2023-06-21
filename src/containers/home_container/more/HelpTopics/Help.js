import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView, TextInput, SafeAreaView, Dimensions, Pressable, FlatList, KeyboardAvoidingView, Platform, BackHandler } from 'react-native';
import Header from '../../../../components/Header';
import styles from './Styles2';
import { useRtlContext } from 'react-native-easy-localization-and-rtl';
import images from '../../../../constants/images';
import axios from 'axios';
import axiosInstance from '../../../../constants/AxiosCallPage';
import { Colors } from '../../../../constants/colors';
import strings from '../../../../constants/lng/LocalizedStrings';
import { ImageBackground } from 'react-native';
import { rowOrRowreverse } from '../../../../constants/RowOrRowreverse';
import Normalize from './../../../../helpers/Dimens';
import CurveDesing_Component from '../../../../constants/CurveDesing_Component';
import globalstyles from '../../../../constants/globalStyles/Global_Styles';


export default function Help({ navigation }) {
  const [catdata, setcatdata] = useState([]);
  const { RtlStyles, isRtl, language, setLanguage } = useRtlContext();
  const [items, setItems] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState("");

  useEffect(() => {
    getData()
  }, []);


  const getData = async () => {
    try {
      setcatdata([])
      const data = {
        "params": {
          "help_search_keyword": "help"
        }
      }
      const res = await axiosInstance.post("help", data)
      setcatdata(res.data.result.help_categories)
    } catch (error) {
      console.log("----", error)
    }
  }
  const getData2 = async (text) => {
    // console.log(text)
    try {
      if (text != "") {
        const res = await axios({
          method: 'post',
          url: "https://changicourt.com/dev/api/keyword-help-data",
          headers: {
            "X-localization": language == "pr" ? "fa" : "en"
          },
          data: {
            "params": {
              "keyword": text
            }
          }
        });
        // console.log("-------------------",text)
        // console.log(res.data)
        if (res.data.result) {
          setItems(res.data.result.help)
        }
      } else {
        setItems([])
      }
    } catch (error) {
      console.log("----", error)
    }
  }

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', handleBackButtonClick);
    };
  }, []);
  const handleBackButtonClick = () => {
    navigation.goBack(null);
    return true;
  }

  return (
    <SafeAreaView style={{ backgroundColor: Colors.primary, flex: 1, flexDirection: 'column' }}>

      <KeyboardAvoidingView
        behavior={(Platform.OS === 'ios') ? "padding" : null} style={styles.container}>
        <Header navigation={navigation} back name={strings.HELPTOPICS.HELP} backFunc={handleBackButtonClick} />
        <CurveDesing_Component>
          <View style={{ flex: 1 }}>
            <ImageBackground
              resizeMode="cover"
              style={{ width: '100%', height: Normalize(160), alignSelf: 'center', }}
              source={images.helpban}
            >
              <Text style={{
                fontSize: Normalize(15), color: '#fff', marginTop: Normalize(35), marginBottom: Normalize(5), fontFamily: "Outfit-Medium",
                alignSelf: 'center'
              }}>{language == "en" ? "How can we help?" : "چطور میتوانیم کمک کنیم؟"}</Text>

              <View style={{ flexDirection: rowOrRowreverse(language), alignItems: "center", justifyContent: "center" }} >
                <View style={{
                  flexDirection: rowOrRowreverse(language), justifyContent: 'space-between', alignSelf: 'center', width: '70%', height: Normalize(35),
                  backgroundColor: '#f2f3f4', borderRadius: Normalize(5), paddingRight: 10,
                }}>
                  <View style={{ width: "70%" }} >
                    <TextInput
                      value={searchKeyword}
                      keyboardType="default"
                      autoCapitalize="none"
                      placeholder={strings.POSTTASK.SEARCH}
                      placeholderTextColor={Colors.textinput_inner_text}
                      onChangeText={(e) => {
                        getData2(e)
                        setSearchKeyword(e)
                      }}
                      style={globalstyles.textinput_onlyText_Style}
                    />
                  </View>
                  {
                    searchKeyword.length > 0 ?
                      <Pressable onPress={() => navigation.navigate('HelpSearch', { value: searchKeyword })} style={{ paddingVertical: Normalize(2), paddingHorizontal: Normalize(4), alignSelf: 'center', backgroundColor: Colors.secondary, justifyContent: "center", alignItems: "center", borderRadius: Normalize(10) }}>
                        <Text style={{ fontSize: Normalize(7.5), color: Colors.white, }} >{strings.HELP.SEARCH}</Text>
                      </Pressable>
                      :
                      <Image
                        resizeMode="contain"
                        style={{ width: '10%', height: Normalize(15), alignSelf: 'center' }}
                        source={images.search}
                      />
                  }
                </View>
                {searchKeyword.length > 0 ?
                  <Pressable onPressIn={() => {
                    setSearchKeyword("")
                    setItems([])
                  }} >
                    < Image
                      resizeMode="contain"
                      style={{ width: Normalize(10), height: Normalize(10), marginHorizontal: Normalize(5), marginTop: 10 }}
                      source={images.cross}
                    />
                  </Pressable>
                  :
                  <View style={{ width: Normalize(10), height: Normalize(10), marginHorizontal: Normalize(5), marginTop: 10 }} />
                }
              </View>
              <ScrollView
                contentContainerStyle={{ height: 1000, marginTop: Normalize(5) }}
                showsVerticalScrollIndicator={false}
              >
                {
                  items.map((item, index) => (
                    <TouchableOpacity key={index}
                      onPress={() => navigation.navigate("HelpArticleDetails", { value: item.help_articles_to_language_api })}
                      style={{
                        justifyContent: "center",
                        alignSelf: 'center',
                        padding: Normalize(3),
                        width: "70%",
                        backgroundColor: '#f2f3f4',
                      }}>
                      <Text style={{ color: Colors.black, alignSelf: "center", fontSize: Normalize(11), fontFamily: "Outfit-Regular" }}>{item.help_articles_to_language_api.title}</Text>
                    </TouchableOpacity>
                  ))
                }
              </ScrollView>
            </ImageBackground>
            <View style={{ flex: 1 }} >
              <View style={{ marginHorizontal: Normalize(16), }} >
                <ScrollView
                  showsVerticalScrollIndicator={false}
                  contentContainerStyle={{ paddingBottom: Normalize(20) }}
                >
                  <View style={{
                    flexDirection: rowOrRowreverse(language),
                    justifyContent: 'space-between',
                    alignSelf: 'center',
                    flex: 1,
                    marginTop: Normalize(5),
                    padding: 5,
                    flexWrap: "wrap",
                  }}>
                    {
                      catdata.map((item, index) => (
                        <TouchableOpacity key={index} onPress={() => navigation.navigate("HelpSections", { value: item })}
                          style={{
                            alignSelf: 'center',
                            width: '48%',
                            height: Normalize(35),
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderColor: Colors.primary,
                            borderWidth: Normalize(1),
                            borderRadius: Normalize(100),
                            marginBottom: Normalize(10),
                            paddingHorizontal: Normalize(3)
                          }}>
                          <Text style={{
                            fontSize: Normalize(10),
                            color: Colors.primary,
                            fontFamily: "Outfit-SemiBold",
                            textAlign: 'center',
                          }}>
                            {item.help_categories_to_language_api.title}
                          </Text>
                        </TouchableOpacity>
                      ))
                    }
                  </View>
                </ScrollView>
              </View>

            </View>


          </View>
        </CurveDesing_Component>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}


