import {
  View,
  Text,
  SafeAreaView,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Modal,
  Pressable,
} from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import { Colors } from '../../../../../constants/colors';
import Header from '../../../../../components/Header';
import CurveDesing_Component from '../../../../../constants/CurveDesing_Component';
import globalstyles from '../../../../../constants/globalStyles/Global_Styles';
import images from '../../../../../constants/images';
import Button from '../../../../../components/Button';
import axiosInstance from '../../../../../constants/AxiosCallPage';
import Toast from 'react-native-simple-toast';
import { useNavigation } from '@react-navigation/native';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import NewLoaderPage from '../../../../../components/NewLoaderPage';
import { myContext } from '../../../../../constants/ContextApi';
import { testingText } from '../../../../../constants/TestingConstant';
import { fontfmliy } from '../../../../../components/WhichFontFamily';
export default function BecomeTasker_Agree(props) {

  const { imageFormData } = props.route.params
  const {
    document_selection, setDocument_selection,
    front_uri, setFront_uri,
    back_uri, setBack_uri,
    front_details, setFront_details,
    back_details, setBack_details,
    front_details_prev, setFront_details_prev,
    back_details_prev, setBack_details_prev } = useContext(myContext)

  // console.log(imageFormData)

  const navigation = useNavigation();
  const [point_1, setPoint_1] = useState(false);
  const [point_2, setPoint_2] = useState(false);
  const [point_3, setPoint_3] = useState(false);
  const [point_4, setPoint_4] = useState(false);
  const [point_5, setPoint_5] = useState(false);
  const [loader, setLoader] = useState(false);
  const [sucessPage, setSucessPage] = useState(false);

  const onpressSucessPage = () => {
    setSucessPage(!sucessPage);
  };
  const onpressPoint1 = () => {
    setPoint_1(!point_1);
  };
  const onpressPoint2 = () => {
    setPoint_2(!point_2);
  };
  const onpressPoint3 = () => {
    setPoint_3(!point_3);
  };
  const onpressPoint4 = () => {
    setPoint_4(!point_4);
  };
  const onpressPoint5 = () => {
    setPoint_5(!point_5);
  };

  const getdata = async () => {
    try {
      setLoader(true);
      const res = await axiosInstance.post('show-become-a-co-worker');
      // console.log(res.data)

      if (res.data.result) {
        var data = res.data.result;
        setPoint_1(data.point_1 == 'yes' ? true : false);
        setPoint_2(data.point_2 == 'yes' ? true : false);
        setPoint_3(data.point_3 == 'yes' ? true : false);
        setPoint_4(data.point_4 == 'yes' ? true : false);
        setPoint_5(data.point_5 == 'yes' ? true : false);
        setLoader(false);
      }
      setLoader(false);
    } catch (error) {
      setLoader(false);
      console.log('showPrevData----', error);
    }
  };
  useEffect(() => {
    getdata();
  }, []);

  const onpressSubmit = async () => {
    try {
      if (!point_1 || !point_2 || !point_3 || !point_4 || !point_5) {
        Toast.show('Please accept all Term and Conditions');
      } else {

        if (imageFormData == "") {

          // console.log("finalApiCall")

          finalApiCall()
        } else {
          // console.log("imageSave")
          imageSave();
        }
      }
    } catch (error) {
      console.log('onpressSubmit', error);
    }
  };
  const finalApiCall = async () => {
    try {
      setLoader(true);
      const data = {
        point_1: point_1 ? 'yes' : 'no',
        point_2: point_2 ? 'yes' : 'no',
        point_3: point_3 ? 'yes' : 'no',
        point_4: point_4 ? 'yes' : 'no',
        point_5: point_5 ? 'yes' : 'no',
      };
      const res = await axiosInstance.post('become-a-co-worker', data);
      // console.log(res.data)
      if (res.data.result) {
        setLoader(false);
        // Toast.show(res.data.result.meaning);
        setSucessPage(true);
      } else {
        setLoader(false);
        Toast.showWithGravity(res.data.error.meaning, Toast.LONG, Toast.BOTTOM);
      }
    } catch (error) {
      setLoader(false);
      console.log('finalApiCall---', error);
    }
  };



  const imageSave = async () => {
    try {
      // console.log("--------------------")
      setLoader(true)
      let res = await axiosInstance.post("new-upload-document-verification", imageFormData)
      // console.log(res.data)
      if (res.data.result) {
        // onpressSucessPage();
        finalApiCall()
        setLoader(false)
      } else {
        Toast.showWithGravity(res.data.error.meaning, Toast.LONG, Toast.BOTTOM);
        setLoader(false)
      }
    } catch (error) {
      console.log("imageSave", error)
      setLoader(false)
    }
  }



  const onModalOff = () => {
    setSucessPage(false)

    setDocument_selection("National Identity Card/Driving Licence")
    setFront_uri("")
    setBack_uri("")
    setFront_details(null)
    setBack_details(null)
    setFront_details_prev(null)
    setBack_details_prev(null)

    navigation.navigate('MyProfile',{from:"BeafixerStep4"});
  };

  return (
    <SafeAreaView style={{ backgroundColor: Colors.primary, flex: 1 }}>
      <Header back name={'Bocome a Co-Tasker'} />
      <View style={{ flex: 1, backgroundColor: Colors.white }}>
        <View
          style={[globalstyles.container, { marginTop: Normalize(10) }]}>

          <Text
            style={[
              globalstyles.plantext_Outfit_Medium,
              {
                color: Colors.black,
                fontSize: Normalize(14),
                paddingBottom: Normalize(10),

              },
            ]}>
            To continue with your application,please agree to our
            Community Guidelines for Co-Taskers
          </Text>
          <ScrollView showsVerticalScrollIndicator={false}>
            {/* point 1 */}

            <Pressable
              onPress={onpressPoint1} style={styles.eachTask_Main_view}>
              <View style={styles.eachText}>
                <Text
                  style={[
                    globalstyles.plantext_outfit_regular,
                    { color: Colors.greyText, fontSize: Normalize(13) },
                  ]}>
                  I will not start work/go to a task location until i'm
                  officially booked
                </Text>
              </View>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text
                  style={[
                    globalstyles.plantext_Outfit_Medium,
                    {
                      color: Colors.greyText,
                      paddingHorizontal: Normalize(5),
                    },
                  ]}>
                  I agree
                </Text>
                <View
                  style={{ height: Normalize(15), width: Normalize(15) }}>
                  <Image
                    source={point_1 ? images.checked : images.unchecked}
                    style={{
                      height: '100%',
                      width: '100%',
                      resizeMode: 'cover',
                    }}
                  />
                </View>
              </View>
            </Pressable>
            {/* point 2 */}

            <Pressable
              onPress={onpressPoint2}
              style={styles.eachTask_Main_view}>
              <View style={styles.eachText}>
                <Text
                  style={[
                    globalstyles.plantext_outfit_regular,
                    { color: Colors.greyText, fontSize: Normalize(13) },
                  ]}>
                  I will not share/ask for personal info (e.g phone
                  number,address) until i'm officially booked
                </Text>
              </View>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text
                  style={[
                    globalstyles.plantext_Outfit_Medium,
                    {
                      color: Colors.greyText,
                      paddingHorizontal: Normalize(5),
                    },
                  ]}>
                  I agree
                </Text>
                <View
                  style={{ height: Normalize(15), width: Normalize(15) }}>
                  <Image
                    source={point_2 ? images.checked : images.unchecked}
                    style={{
                      height: '100%',
                      width: '100%',
                      resizeMode: 'cover',
                    }}
                  />
                </View>
              </View>
            </Pressable>
            {/* point 3 */}

            <Pressable
              onPress={onpressPoint3}
              style={styles.eachTask_Main_view}>
              <View style={styles.eachText}>
                <Text
                  style={[
                    globalstyles.plantext_outfit_regular,
                    { color: Colors.greyText, fontSize: Normalize(13) },
                  ]}>
                  I understand that when i'm booked for a task i enter a
                  legally binding contract and i'm obliged to complete the
                  task in full
                </Text>
              </View>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text
                  style={[
                    globalstyles.plantext_Outfit_Medium,
                    {
                      color: Colors.greyText,
                      paddingHorizontal: Normalize(5),
                    },
                  ]}>
                  I agree
                </Text>
                <View

                  style={{ height: Normalize(15), width: Normalize(15) }}>
                  <Image
                    source={point_3 ? images.checked : images.unchecked}
                    style={{
                      height: '100%',
                      width: '100%',
                      resizeMode: 'cover',
                    }}
                  />
                </View>
              </View>
            </Pressable>
            {/* point 4 */}

            <Pressable
              onPress={onpressPoint4}
              style={styles.eachTask_Main_view}>
              <View style={styles.eachText}>
                <Text
                  style={[
                    globalstyles.plantext_outfit_regular,
                    { color: Colors.greyText, fontSize: Normalize(13) },
                  ]}>
                  I will only apply for tasks that i can complete
                  professionally and i will respect all users on the
                  platform
                </Text>
              </View>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text
                  style={[
                    globalstyles.plantext_Outfit_Medium,
                    {
                      color: Colors.greyText,
                      paddingHorizontal: Normalize(5),
                    },
                  ]}>
                  I agree
                </Text>
                <View

                  style={{ height: Normalize(15), width: Normalize(15) }}>
                  <Image
                    source={point_4 ? images.checked : images.unchecked}
                    style={{
                      height: '100%',
                      width: '100%',
                      resizeMode: 'cover',
                    }}
                  />
                </View>
              </View>
            </Pressable>
            {/* point 5 */}

            <Pressable
              onPress={onpressPoint5}
              style={styles.eachTask_Main_view}>
              <View style={styles.eachText}>
                <Text
                  style={[
                    globalstyles.plantext_outfit_regular,
                    { color: Colors.greyText, fontSize: Normalize(13) },
                  ]}>
                  I have read and will follow the Community Guidelines as
                  mentioned here
                </Text>
              </View>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text
                  style={[
                    globalstyles.plantext_Outfit_Medium,
                    {
                      color: Colors.greyText,
                      paddingHorizontal: Normalize(5),
                    },
                  ]}>
                  I agree
                </Text>
                <View

                  style={{ height: Normalize(15), width: Normalize(15) }}>
                  <Image
                    source={point_5 ? images.checked : images.unchecked}
                    style={{
                      height: '100%',
                      width: '100%',
                      resizeMode: 'cover',
                    }}
                  />
                </View>
              </View>
            </Pressable>

            {/* button */}

            {sucessPage && (
              <Modal
                animationType="fade"
                transparent={true}
                visible={sucessPage}
                onRequestClose={onModalOff}>
                <View
                  style={{
                    flex: 1,
                    backgroundColor: 'rgba(0,0,0,0.5)',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <View
                    style={{
                      paddingVertical: Normalize(10),
                      width: Normalize(250),
                      backgroundColor: 'white',
                      borderRadius: Normalize(8),
                      paddingVertical: Normalize(10),
                    }}>
                    <View style={{
                      height: Normalize(60), width: Normalize(60), alignSelf: 'center', backgroundColor: Colors.white, marginTop: Normalize(-40),
                      borderRadius: Normalize(30), alignItems: 'center', justifyContent: 'center'
                    }}>
                      <View style={{
                        height: Normalize(50), width: Normalize(50), backgroundColor: Colors.secondary,
                        borderRadius: Normalize(25), alignSelf: 'center', justifyContent: 'center', alignItems: 'center'
                      }} >
                        <FontAwesome
                          name="user"
                          size={Normalize(30)}
                          color={Colors.white}
                        />
                      </View>
                    </View>
                    <Text
                      style={[
                        globalstyles.plantext_outfit_semibold,
                        {
                          paddingTop: Normalize(20),
                          textAlign: 'center',
                          fontSize: Normalize(15),
                          color: Colors.greyText,
                          fontFamily: 'Lato-Bold'
                        },
                      ]}>
                      Verification Submitted
                    </Text>
                    <Text
                      style={[
                        globalstyles.plantext_outfit_regular,
                        {
                          paddingTop: Normalize(5),
                          textAlign: 'center',
                          fontSize: Normalize(14),
                          color: Colors.greyText,
                          paddingHorizontal: Normalize(10),
                        },
                      ]}>Thank you!{"\n"}Your documents have been submitted
                    </Text>
                    <Text
                      style={[
                        globalstyles.plantext_outfit_regular,
                        {
                          paddingTop: Normalize(5),
                          marginBottom: Normalize(20),
                          textAlign: 'center',
                          fontSize: Normalize(14),
                          color: Colors.greyText,
                          paddingHorizontal: Normalize(10),
                        },
                      ]}>
                      We will notify you when you have been successfuly verified
                    </Text>

                  </View>
                  <Pressable
                    onPress={onModalOff}
                    style={{ height: Normalize(50), width: Normalize(50), borderRadius: Normalize(50) / 2, backgroundColor: Colors.white, elevation: 10, justifyContent: "center", alignItems: "center", marginTop: Normalize(10) }} >
                    <Entypo name="cross" color={Colors.textinput_inner_text} size={Normalize(35)} />
                  </Pressable>
                </View>
              </Modal>
            )}
          </ScrollView>
        </View>
        {(testingText.lastupdateDate).length > 0 && <Text style={{ textAlign: "center", color: Colors.green_new, fontSize: Normalize(12), fontFamily: fontfmliy.bold }} >{testingText.lastupdateDate}</Text>}
        {(testingText.text).length > 0 && <Text style={{ textAlign: "center", color: Colors.red_old, fontSize: Normalize(12), fontFamily: fontfmliy.bold }} >{testingText.text}</Text>}
        <Button
          style={{ marginHorizontal: Normalize(16), marginBottom: Normalize(10) }}
          name={'Submit'}
          onPress={onpressSubmit}
        />
        {
          loader &&
          <NewLoaderPage />
        }

      </View>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  eachTask_Main_view: { paddingVertical: Normalize(12), flexDirection: 'row' },
  eachText: { flex: 3, paddingRight: Normalize(3) },
});
