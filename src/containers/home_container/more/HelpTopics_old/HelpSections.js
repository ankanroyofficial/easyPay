import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView, SafeAreaView } from 'react-native';
import Header from '../../../../components/Header';
import styles from './Styles2';
import { withRtl, useRtlContext } from 'react-native-easy-localization-and-rtl';
import { Colors } from '../../../../constants/colors';
import strings from '../../../../constants/lng/LocalizedStrings';
import axiosInstance from '../../../../constants/AxiosCallPage';
import LoaderPage from '../../../../components/LoaderPage';
import CurveDesing_Component from '../../../../constants/CurveDesing_Component';
import Normalize from '../../../../helpers/Dimens';

export default function Help({ navigation, route }) {
  const { RtlStyles, isRtl, language, setLanguage } = useRtlContext();
  const { value } = route.params;
  const [text, setText] = useState("");
  const [loader, setLoader] = useState(false);

  const [catdata, setcatdata] = useState([]);

  useEffect(() => {
    getData()
  }, []);

  const getData = async () => {
    try {
      setLoader(true)
      setcatdata([])
      const data = {
        "params": {
          "slug": value.slug
        }
      }
      const res = await axiosInstance.post("help-section-details", data)
      // console.log("-----------",res.data)
      setcatdata(res.data.result.help_category.get_all_sections)
      setLoader(false)
    } catch (error) {
      setLoader(false)
      console.log("----", error)
    }
  }


  return (
    <SafeAreaView style={{ backgroundColor: Colors.primary, flex: 1, flexDirection: 'column' }}>

      <View style={[styles.container]}>
        <Header navigation={navigation} back name={strings.HELP.HEADER} />
        {
          loader ?
            <LoaderPage />
            :
            <CurveDesing_Component  >
              <ScrollView
                showsVerticalScrollIndicator={false}
              >
                <View style={{ flex: 1 }}>

                  <View style={{
                    flexDirection: 'column',
                    alignSelf: 'center', width: '90%',
                    marginTop: Normalize(8),
                  }}>

                    <Text style={{
                      fontSize: Normalize(20),
                      color: Colors.primary,
                      fontFamily: "Outfit-Medium",
                    }}>{value.help_categories_to_language_api.title}</Text>
                    {catdata.map((item, index) => (
                      <TouchableOpacity key={index} onPress={() => navigation.navigate("HelpArticles", { value: item })}>
                        <Text style={{
                          fontSize: Normalize(14), color: "#444", fontFamily: "Outfit-Medium", marginTop: 20
                        }}>{item.help_section_to_language_api.title}</Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                </View>
              </ScrollView>
            </CurveDesing_Component>
        }
        {/* <Text>Messages</Text> */}
      </View>
    </SafeAreaView>
  );
}


