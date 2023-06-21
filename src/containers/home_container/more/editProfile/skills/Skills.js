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
  Platform,
  Pressable,
  Modal,
  Image,
  BackHandler
} from 'react-native';
import { withRtl, useRtlContext } from 'react-native-easy-localization-and-rtl';
import Toast from 'react-native-simple-toast';
import { Colors } from './../../../../../constants/colors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Normalize from './../../../../../helpers/Dimens';
import Header from './../../../../../components/Header';
import styles from './Styles';
import Button from './../../../../../components/Button';
import strings from './../../../../../constants/lng/LocalizedStrings';
import axios from 'axios';
import LoaderPage from '../../../../../components/LoaderPage';
import { axiosUrl } from '../../../../../constants/LinkPage';
import axiosInstance from '../../../../../constants/AxiosCallPage';
import CurveDesing_Component from '../../../../../constants/CurveDesing_Component';
import globalstyles from '../../../../../constants/globalStyles/Global_Styles';
import { myContext } from '../../../../../constants/ContextApi';
import Feather from 'react-native-vector-icons/Feather';
import Entypo from 'react-native-vector-icons/Entypo';
import { is_search } from '../../../../../constants/KeyWordSearch';
import images from '../../../../../constants/images';
import NewLoaderPage from '../../../../../components/NewLoaderPage';
function Skills({ navigation }) {
  const {
    slugName,
    allSkill, setAllSkill,
    isSettingSkillLoad, setIsSettingSkillLoad
  } = useContext(myContext)

  const [loader, setLoader] = useState(false)
  const [isSkillModal, setIsSkillModal] = useState(false)
  const [skill_search_keyword, setSkill_search_keyword] = useState("")
  const skilldata = async () => {
    try {
      setIsSettingSkillLoad(true)
      setLoader(true)
      var data = await axios.post(`${axiosUrl.URL}public-profile`, {
        "jsonrpc": "2.0",
        "params": {
          "slug": `${slugName}`
        }
      })
      // console.log(data.data.result.user.get_user_skill)
      if (data.data.result != undefined) {
        let oldArry = allSkill;
        let newArry = [];
        oldArry.map((item) => {
          item.isSelected = false
          newArry.push(item)
        })
        modify_Skill_as_database(newArry, data.data.result.user.get_user_skill)
      }
      setLoader(false)
    } catch (error) {
      console.log(error)
    }
  }

  const isSkilldataLoad = () => {
    if (!isSettingSkillLoad) {
      skilldata()
    }
  }
  useEffect(() => {
    isSkilldataLoad()
    return () => {
      isSkilldataLoad()
    }
  }, [slugName])



  const modify_Skill_as_database = (allskill, selectedSkill) => {
    try {
      var new_array = [];
      allskill.map((item, index) => {
        if (skillFind(item.id, selectedSkill)) {
          item.isSelected = true
          new_array.push(item)
        } else {
          item.isSelected = false
          new_array.push(item)
        }
      })
      setAllSkill(new_array)
    } catch (error) {
      console.log("modify_Skill_as_database", error)
    }
  }
  const skillFind = (val, selectedSkill) => {
    const a = selectedSkill.some(item => item.get_skill.category_id == val)
    return a
  }
  const onpressSkill = () => {
    // setIsSkillModal(!isSkillModal)
    navigation.navigate("SkillSelect", { from: "Skills" })

  }
  const isArrDataEmpty = (val) => {
    var count = 0
    val.map((item) => {
      if (item.isSelected) {
        ++count;
      }
    })
    return count > 0 ? true : false;
  }
  const onpress_skill = (val) => {
    var old_category = allSkill
    var new_category = []
    old_category.map((item, index) => {
      if (item.id == val.id) {
        item.isSelected = !item.isSelected
        new_category.push(item)
      } else {
        new_category.push(item)
      }
    })
    setAllSkill(new_category)
  }
  const saveButton = () => {
    if (!isArrDataEmpty(allSkill)) {
      Toast.show("Select atleast 1 skill")
    } else {
      finalApicall()
    }
  }
  const finalApicall = async () => {
    try {
      setLoader(true)
      var selectedSkill = [];
      allSkill.map((item, index) => {
        if (item.isSelected) {
          selectedSkill.push(item.id)
        }
      })
      const data = {
        "jsonrpc": "2.0",
        "params": {
          "skill": selectedSkill.toString()
        }
      }
      const res = await axiosInstance.post("edit-profile-skills-step-2", data)
      console.log(res.data)

      if (res.data.result) {
        setLoader(false)
        Toast.show(res.data.result.status.meaning)
        navigation.goBack()
      } else {
        Toast.show("Something Error in API call ")
        setLoader(false)
      }
      setLoader(false)
    } catch (error) {
      setLoader(false)
      console.log("finalApicall--skill", error)
    }
  }

  const handleBackButtonClick = () => {
    navigation.navigate("Settings")
    setIsSettingSkillLoad(false)
    return true;
  }
  useEffect(() => {
    const a = BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
    return () => {
      a.remove();
    };
  }, []);






  return (
    <SafeAreaView style={{ backgroundColor: Colors.primary, flexDirection: 'column', flex: 1 }}>
      <KeyboardAvoidingView
        behavior={(Platform.OS === 'ios') ? "padding" : null} style={styles.container}>
        <Header back backFunc={handleBackButtonClick} name={strings.SKILLS.HEADERTEXT} navigation={navigation} />

        <View style={{ flex: 1 }} >

          {
            loader ?
              <NewLoaderPage />
              :
              <CurveDesing_Component  >
                <View style={{
                  flex: 1,
                  paddingHorizontal: Normalize(16)
                }} >
                  <ScrollView
                    showsVerticalScrollIndicator={false}
                    keyboardShouldPersistTaps="always"
                  >
                    <Text style={[globalstyles.page_Header_Text, { marginTop: Normalize(8), }]}>{strings.SKILLS.INPUTHEADING}</Text>

                    <Text style={[globalstyles.page_SubHeader_Text, { marginBottom: Normalize(15), color: Colors.greyText, lineHeight: Normalize(16), fontSize: Normalize(13) }]}>{strings.SKILLS.INPUTSUBHEADING}</Text>
                    <Pressable
                      onPress={onpressSkill}
                      style={[globalstyles.textinput_onlyBox_Style, { backgroundColor: Colors.primary }]} >
                      <View style={{ flex: 1 }} >
                        <Text style={[globalstyles.textinput_onlyText_Style, { color: Colors.white }]}>
                          Select Skills
                        </Text>
                      </View>
                      <View style={{ justifyContent: "center", alignItems: "center", marginRight: Normalize(8) }}>
                        <Entypo name="chevron-down" color={Colors.white} size={Normalize(15)} />
                      </View>
                    </Pressable>
                    <View style={{ marginTop: Normalize(8), flexDirection: "row", flexWrap: "wrap" }} >
                      {
                        allSkill.map((item, index) => (
                          item.isSelected &&
                          <TouchableOpacity
                            onPress={() => onpress_skill(item)}
                            key={index} style={{ flexDirection: "row", alignItems: "center", backgroundColor: Colors.secondaryBackground, borderWidth: Normalize(0.5), borderColor: Colors.secondaryBorder, margin: Normalize(4), borderRadius: Normalize(5) }} >
                            <Text style={{ padding: Normalize(2), fontSize: Normalize(10), color: Colors.greylightText, borderRadius: Normalize(3), margin: Normalize(3) }}>{item.name}</Text>
                            <View>
                              <Entypo name="cross" color={Colors.secondary} size={Normalize(15)} />
                            </View>
                          </TouchableOpacity>
                        ))
                      }
                    </View>
                  </ScrollView>
                  <Button
                    nextarrow
                    onPress={saveButton}
                    style={styles.saveBtn}
                    name={strings.SKILLS.SAVE}
                  />
                </View>
              </CurveDesing_Component>
          }
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

export default withRtl(Skills);