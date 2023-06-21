import React, { useContext, useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal
} from 'react-native';
import { withRtl, useRtlContext } from 'react-native-easy-localization-and-rtl';
import Entypo from 'react-native-vector-icons/Entypo';
import Normalize from './../../../../../helpers/Dimens';
import Button from './../../../../../components/Button';
import strings from '../../../../../constants/lng/LocalizedStrings';
import { Colors } from '../../../../../constants/colors';
import { leftOrRight, rowOrRowreverse } from '../../../../../constants/RowOrRowreverse';
import { myContext } from '../../../../../constants/ContextApi';
import { addCommaAndTranslateInPersian } from '../../../../../constants/NumberWithCommaAndInPersian';
import { nameShorting } from '../../../../../constants/NameShorting';
import { useNavigation } from '@react-navigation/native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { fontfmliy } from '../../../../../components/WhichFontFamily';
import axiosInstance from '../../../../../constants/AxiosCallPage';
function AfterBooking({ ispress, onPress, slugName, name, onPressViewBooking }) {
  const { language } = useRtlContext();
  const { setAllNewMyTask, setNewOfferPageMessageArry, setNewOfferPageMessageWithTaskerArry,setTaskdetailsData } = useContext(myContext);
  const navigation = useNavigation();
  const data = [
    {
      id: 1,
      title_en: "The Tasker will review your booking request and confirm their availability",
      title_pr: "مجری/پیمانکار درخواست رزرو شما را بررسی کرده و از طریق کار/پروژه ساخته شده با شما در تماس خواهد بود"
    },
    {
      id: 2,
      title_en: `Discuss task details and requirements in the "Question" section`,
      title_pr: `اگر سئوال و یا ابهامی درارتباط با'جزئیات و‌نیازمندی های کار/پروژه ایجاد شده دارید می توانید آن را در بخش سئوالات مطرح نمایید.برای این منظور به کار/پروژه ایجاد شده بروید و در قسمت انتهایی صفحه در بخش سئوالات میتوانید با مجری/پیمانکار درارتباط باشید`
    },
    {
      id: 3,
      title_en: "Once they confirm, assign the Tasker, secure payment and get the job done!",
      title_pr: "پس از رسیدن به نقطه مشترک برای محول کردن کار/پروژه به مجری/پیمانکار مورد نظر فقط کافیست یک پرداخت امن انجام دهید. پرداختی شما تا زمان پایان کار/پروژه و اعلام رضایت شما به صورت امن توسط ایران تسکر نگهداری میگردد."
    }

  ]


  const onTaskSucess = async () => {
    try {
      const res = {
        "jsonrpc": "2.0",
        "params": {
          "slug": slugName
        }
      }
      const data = await axiosInstance.post("get-task-details", res)
      // console.log("oooooooooooooooo",data.data)
      if (data.data.result) {
        onPress()
        setNewOfferPageMessageArry([])
        setNewOfferPageMessageWithTaskerArry([])

        let a = data.data.result;
        let oldTaskdata = data.data.result.task;
        oldTaskdata.lowest_offers = a.lowest_offers;
        oldTaskdata.highest_offers = a.highest_offers;
        oldTaskdata.nearbyfixeroffer = a.nearbyfixeroffer;
        oldTaskdata.recommended_fixer_sort_based_on_rating = a.recommended_fixer_sort_based_on_rating
        // console.log(oldTaskdata)                     
        setTaskdetailsData(oldTaskdata)
        navigation.navigate('TaskDetails', { show: oldTaskdata, from: "requestbooking", taskSlug: slugName })
        loadMyTask()
      }
    } catch (error) {
      console.log("getData_taskdetails---------- afterbooking ", error)
    }
  };

  const loadMyTask = async () => {
    try {
      const data = await axiosInstance.post("new-my-task")
      if (data.data.as_a_client && data.data.as_a_eazypayer) {
        setAllNewMyTask({
          as_a_eazypayer: {
            "active_task": data.data.as_a_eazypayer.active_task,
            "complete_task": data.data.as_a_eazypayer.complete_task,
            "offers_or_questions": data.data.as_a_eazypayer.offers_or_questions
          },
          as_a_client: {
            "booked": data.data.as_a_client.booked,
            "completed": data.data.as_a_client.completed,
            "post_task": [...data.data.as_a_client.post_task, ...data.data.as_a_client.cancelled_task]
          }
        })
      }
    } catch (error) {
      console.log("loadMyTask", error)
    }
  }




  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={ispress}
      onRequestClose={onPressViewBooking}
    >
      <View style={{ flex: 1, backgroundColor: "rgba(52,52,52,0.5)", padding: Normalize(15), justifyContent: "center", alignItems: "center" }} >
        <View style={{ paddingVertical: Normalize(20), width: "95%", backgroundColor: Colors.white, elevation: 10, borderRadius: Normalize(8) }} >



          <View style={{ alignItems: "center" }}>

            <View style={{
              height: Normalize(60), width: Normalize(60), backgroundColor: Colors.white, marginTop: Normalize(-50),
              borderRadius: Normalize(30), alignItems: 'center', justifyContent: 'center'
            }}>
              <View style={{
                height: Normalize(50), width: Normalize(50), backgroundColor: Colors.secondary,
                borderRadius: Normalize(25), alignSelf: 'center', justifyContent: 'center', alignItems: 'center'
              }} >
                <MaterialIcons
                  name="verified"
                  size={Normalize(35)}
                  color={Colors.white}
                />
              </View>
            </View>


            <Text style={{
              fontSize: Normalize(14),
              fontFamily: fontfmliy.bold,
              color: Colors.primary,
              textAlign: "center",
              lineHeight: Normalize(20)

            }}>
              Your booking request was sent to{'\n'}{nameShorting(name)}
            </Text>


            <View style={{ paddingHorizontal: Normalize(10), width: "100%" }} >
              <Text style={{
                fontSize: Normalize(12),
                fontFamily: fontfmliy.bold,
                color: Colors.greyText,
                marginVertical: Normalize(10),
                textAlign: leftOrRight(language),
              }}>{strings.LMS.WHATHAPPENS}</Text>


              {
                data.map((item, index) => (
                  <View key={index} style={{ flexDirection: rowOrRowreverse(language), marginBottom: Normalize(5), }} >
                    <View style={{
                      height: Normalize(15),
                      width: Normalize(15),
                      backgroundColor: Colors.green2,
                      justifyContent: "center",
                      alignItems: "center",
                      borderRadius: Normalize(15) / 2,
                      marginRight: Normalize(5)
                    }} >
                      <Text style={{
                        fontSize: Normalize(11),
                        fontFamily: fontfmliy.bold,
                        color: Colors.white,
                      }}>{item.id}</Text>
                    </View>


                    <Text style={{
                      fontSize: Normalize(12),
                      fontFamily: fontfmliy.regular,
                      color: Colors.greyText,
                      lineHeight: Normalize(14), width: "90%"
                    }}>{item.title_en}</Text>

                  </View>
                ))
              }
            </View>
          </View>
          <Button
            style={{ height: Normalize(35), marginTop: Normalize(15), marginHorizontal: Normalize(15) }}
            onPress={onTaskSucess}
            name={strings.LMS.VIEWBOOKINGREQUEST}
          />



        </View>
        <TouchableOpacity
          onPress={onPressViewBooking}
          style={{ height: Normalize(50), width: Normalize(50), borderRadius: Normalize(50) / 2, backgroundColor: Colors.white, elevation: 10, justifyContent: "center", alignItems: "center", marginTop: Normalize(10) }} >
          <Entypo name="cross" color={Colors.textinput_inner_text} size={Normalize(35)} />
        </TouchableOpacity>
      </View>


    </Modal>
  );
}

export default withRtl(AfterBooking);
