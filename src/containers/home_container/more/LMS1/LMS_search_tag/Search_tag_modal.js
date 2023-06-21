import React, { useContext, useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import { withRtl, useRtlContext } from 'react-native-easy-localization-and-rtl';
import Entypo from 'react-native-vector-icons/Entypo';
import Toast from 'react-native-simple-toast';
// import { Colors } from './../../../../../constants/colors';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import Normalize from './../../../../../helpers/Dimens';
import styles from './Styles';
import Button from './../../../../../components/Button';
import axios from 'axios';
import LoaderPage from '../../../../../components/LoaderPage';
import strings from '../../../../../constants/lng/LocalizedStrings';
import Header from '../../../../../components/Header';
import { Colors } from '../../../../../constants/colors';
import { leftOrRight } from '../../../../../constants/RowOrRowreverse';
import { myContext } from '../../../../../constants/ContextApi';

function Search_tag_modal({ navigation }) {
  const [tagText, setTagText] = useState("");
  const [skillArray, setSkillArray] = useState([]);
  const { RtlStyles, isRtl, language, setLanguage } = useRtlContext();

  const {
    lMS_id, setLMS_id,
    lMS_category_id, setLMS_category_id,
    lMS_subcategory_id, setLMS_subcategory_id,
    lMS_title, setLMS_title,
    lMS_search_tag, setLMS_search_tag,
    lMS_description, setLMS_description,

    lMS_package_price_1, setLMS_package_price_1,
    lMS_package_id_1, setLMS_package_id_1,
    lMS_package_name_1, setLMS_package_name_1,
    lMS_package_description_1, setLMS_package_description_1,

    lMS_package_price_2, setLMS_package_price_2,
    lMS_package_id_2, setLMS_package_id_2,
    lMS_package_name_2, setLMS_package_name_2,
    lMS_package_description_2, setLMS_package_description_2,

    lMS_package_price_3, setLMS_package_price_3,
    lMS_package_id_3, setLMS_package_id_3,
    lMS_package_name_3, setLMS_package_name_3,
    lMS_package_description_3, setLMS_package_description_3,

    lMS_package_price_4, setLMS_package_price_4,
    lMS_package_id_4, setLMS_package_id_4,
    lMS_package_name_4, setLMS_package_name_4,
    lMS_package_description_4, setLMS_package_description_4,

    lMS_package_price_5, setLMS_package_price_5,
    lMS_package_id_5, setLMS_package_id_5,
    lMS_package_name_5, setLMS_package_name_5,
    lMS_package_description_5, setLMS_package_description_5,


    lMS_type, setLMS_type,
    lMS_location, setLMS_location,
    lMS_distance, setLMS_distance,

    lMS_lat, setLMS_lat,
    lMS_lng, setLMS_lng,
    lMS_avalibility, setLMS_avalibility,
    lMS_message, setLMS_message,

    lMS_Multi_Images, setLMS_Multi_Images,
    lMS_single_Images, setLMS_single_Images,

  } = useContext(myContext)





  const handleAddSkills = () => {
    let array = skillArray;
    let skill = tagText;
    if (skill.length == 0 || skill.trim() == "") {
      Toast.show("Enter a search tag")
    } else {
      const data = {
        id: new Date().toString(),
        name: skill,
      };
      array.push(data);
      setSkillArray(array);
      setTagText('');
      return;
    }
  };
  const handleDeleteSkills = async (id) => {
    try {
      const idx = id.toString();
      let array = skillArray;
      let newArr = array.filter(item => item.id != idx);
      Toast.show("Search tag deleted successfully")
      setSkillArray(newArr);
    } catch (error) {
      console.log(error)
    }
  };
  const saveButton = () => {
    // console.log(skillArray)
    setLMS_search_tag(skillArray)
  }
  return (

    <SafeAreaView style={{ backgroundColor: Colors.primary, flexDirection: 'column', flex: 1 }}>
      <KeyboardAvoidingView
        behavior={(Platform.OS === 'ios') ? "padding" : null} style={styles.container}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="always"
          style={{
            flex: 1,
            paddingVertical: Normalize(10),
          }}>
          <View style={{ flex: 1, paddingTop: Normalize(10), }}>
            <View style={{ marginHorizontal: Normalize(15), }}>
              <Text style={{
                color: Colors.grey, fontSize: 13, marginBottom: 5,
                textAlign: leftOrRight(language)
              }}>Type and enter up to 15 search terms customers might use when searching for your listing</Text>

              {/* skill text box and add button */}

              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginTop: Normalize(10),
                }}>
                <TextInput
                  value={tagText}
                  style={[
                    styles.input,
                    {
                      textAlign: language == 'pr' ? 'right' : 'left',
                      width: language == 'pr' ? '75%' : '85%',
                    },
                  ]}
                  placeholder={strings.SKILLS.PLACEHOLDER}
                  placeholderTextColor={Colors.textinput_inner_text}
                  onChangeText={text => setTagText(text)}
                />
                <TouchableOpacity
                  style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    paddingVertical: Normalize(10), width: language == 'pr' ? '25%' : '15%',
                  }}
                  onPress={handleAddSkills}>
                  <Text
                    style={{
                      fontSize: Normalize(13),
                      fontFamily: 'roboto-medium',
                      color: Colors.primary, paddingRight: language == 'pr' ? 5 : 0
                    }}>
                    {strings.SKILLS.ADDBTN}
                  </Text>
                </TouchableOpacity>
              </View>

              {
                skillArray.length != 0 &&
                <Text style={{
                  fontSize: Normalize(11),
                  fontFamily: 'roboto-medium',
                  color: Colors.primary,
                  marginTop: Normalize(20),
                  marginBottom: Normalize(5),
                  textAlign: language == "en" ? "left" : "right"
                }}>Search tag</Text>
              }

              {skillArray.length !== 0 && (
                <View
                  style={{
                    marginTop: Normalize(10),
                    flexDirection: 'row',
                    alignItems: 'center',
                    flexWrap: 'wrap',
                  }}>
                  {skillArray.map(item => {
                    return (
                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          borderWidth: Normalize(1),
                          borderColor: Colors.lightGrey,
                          borderRadius: 6,
                          alignSelf: 'flex-start',
                          paddingHorizontal: Normalize(10),
                          paddingVertical: Normalize(3),
                          marginRight: Normalize(10),
                          marginBottom: Normalize(10),
                        }}
                        key={item.id}>
                        <Text style={{ fontSize: Normalize(13), fontFamily: 'roboto-regular', color: Colors.grey, marginVertical: Normalize(5), }}>
                          {item.name ? item.name : item.get_skill.skill}
                        </Text>
                        <TouchableOpacity
                          onPress={() => handleDeleteSkills(item.id)}>
                          <Entypo
                            name="cross"
                            size={Normalize(20)}
                            color={Colors.grey}
                            style={
                              language == 'pr'
                                ? styles.crossIconRtl
                                : styles.crossIcon
                            }
                          />
                        </TouchableOpacity>
                      </View>
                    );
                  })}
                </View>
              )}

            </View>

          </View>
        </ScrollView>
        <Button
          onPress={saveButton}
          style={{ height: Normalize(40), marginHorizontal: Normalize(15), marginBottom: 40, }}
          name={strings.SKILLS.SAVE}
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

export default withRtl(Search_tag_modal)