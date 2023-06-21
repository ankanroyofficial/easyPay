import React, { useContext, useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  BackHandler
} from 'react-native';
import Toast from "react-native-simple-toast";
import Header from '../../../../components/Header';
import { withRtl, useRtlContext } from 'react-native-easy-localization-and-rtl';
import strings from '../../../../constants/lng/LocalizedStrings';
import styles from './Styles';
import Button from '../../../../components/Button';
import { myContext } from '../../../../constants/ContextApi';
import { Colors } from '../../../../constants/colors';
import LoaderPage from '../../../../components/LoaderPage';
import { leftOrRight, rowOrRowreverse } from '../../../../constants/RowOrRowreverse';
import axiosInstance from '../../../../constants/AxiosCallPage';
import Listing_header_button from '../../../../components/Listing_header_button';
import CurveDesing_Component from '../../../../constants/CurveDesing_Component';
import globalstyles from '../../../../constants/globalStyles/Global_Styles';
import Entypo from 'react-native-vector-icons/Entypo';
import NewLoaderPage from '../../../../components/NewLoaderPage';
const LMS1 = ({ navigation, route }) => {
  const { isSlug } = route.params;
  const { language } = useRtlContext();
  const {
    token, setToken,
    lMS_id, setLMS_id,
    lMS_category_title, setLMS_category_title,
    lMS_subcategory_title, setLMS_subcategory_title,
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
    lMS_prev_single_Images, setLMS_prev_single_Images,
    lMS_prev_Multi_Images, setLMS_prev_Multi_Images,


    open, setOpen,
    open2, setOpen2,
    open3, setOpen3,
    open4, setOpen4,
    open5, setOpen5,
  } = useContext(myContext)
  const [catagory, setcatagory] = useState([]);
  const [loader, setLoader] = useState(false)
  const get_category = async () => {
    try {
      const data = await axiosInstance.post("get-category")
      if (data) {
        setcatagory(data.data.result.get_category)
      }
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(async () => {
    await get_category()
  }, [token]);
  const nextButton = () => {
    if (lMS_category_title == "" || lMS_category_id == "") {
      Toast.show(strings.LMS.LMS1_TOAST_1)
    } else {
      navigation.navigate('LMS2')

    }
    try {
    } catch (error) {
      console.log("LMS1_nextButton", nextButton)
    }
  }
  const newOrEdit = () => {
    try {
      if (isSlug != "") {
        get_listingData()
      }
    } catch (error) {
      console.log("newOrEdit", error)
    }
  }
  useEffect(() => {
    newOrEdit()
  }, [isSlug])
  const get_listingData = async () => {
    try {
      setLoader(true)
      const data = {
        "params": {
          "slug": isSlug,
        }
      }
      const res = await axiosInstance.post("listing-details", data)
      if (res.data.result) {
        const data = res.data.result.listing
        setLMS_id(data.id)
        setLMS_category_title(data.get_category.name)
        setLMS_category_id(data.get_category.id)
        // setLMS_subcategory_title(data.get_subcategory.name)
        // setLMS_subcategory_id(data.get_subcategory.id)

        setLMS_title(data.title)

        var a = [];
        {
          data.get_search_tag.length > 0 &&
            data.get_search_tag.map((item, index) => {
              a.push({ name: item.get_tag.tag, id: new Date().toString() + index })
            })
        }
        setLMS_search_tag(a)
        setLMS_description(data.description)

        setLMS_type(data.type)
        setLMS_location(data.location)
        setLMS_distance(data.distance)
        if (data.lat != null) {
          setLMS_lat(data.lat)
          setLMS_lng(data.lng)
        }

        setLMS_avalibility(data.avalibility)

        {
          data.message != null &&
            setLMS_message(data.message)
        }
        // setLMS_prev_single_Images(data.image)
        setLMS_single_Images(data.image)
        setLMS_prev_Multi_Images(data.my_listing_to_gallery)

        var arr = data.my_listing_to_package
        packageData_fillup(arr)
        setLoader(false)
      }
    } catch (error) {
      setLoader(false)
      console.log("get_listingData", error)
    }
  }
  const packageData_fillup = (val) => {
    var a = val.length
    var arr = val
    if (a === 1) {
      setOpen(true)
      setLMS_package_price_1((arr[0].price).toString())
      setLMS_package_id_1(arr[0].id)
      setLMS_package_name_1(arr[0].name)
      setLMS_package_description_1(arr[0].description)
    } else if (a === 2) {

      setOpen(true)
      setLMS_package_price_1((arr[0].price).toString())
      setLMS_package_id_1(arr[0].id)
      setLMS_package_name_1(arr[0].name)
      setLMS_package_description_1(arr[0].description)

      setOpen2(true)
      setLMS_package_price_2((arr[1].price).toString())
      setLMS_package_id_2(arr[1].id)
      setLMS_package_name_2(arr[1].name)
      setLMS_package_description_2(arr[1].description)
    } else if (a === 3) {

      setOpen(true)
      setLMS_package_price_1((arr[0].price).toString())
      setLMS_package_id_1(arr[0].id)
      setLMS_package_name_1(arr[0].name)
      setLMS_package_description_1(arr[0].description)

      setOpen2(true)
      setLMS_package_price_2((arr[1].price).toString())
      setLMS_package_id_2(arr[1].id)
      setLMS_package_name_2(arr[1].name)
      setLMS_package_description_2(arr[1].description)

      setOpen3(true)
      setLMS_package_price_3((arr[2].price).toString())
      setLMS_package_id_3(arr[2].id)
      setLMS_package_name_3(arr[2].name)
      setLMS_package_description_3(arr[2].description)

    } else if (a === 4) {

      setOpen(true)
      setLMS_package_price_1((arr[0].price).toString())
      setLMS_package_id_1(arr[0].id)
      setLMS_package_name_1(arr[0].name)
      setLMS_package_description_1(arr[0].description)

      setOpen2(true)
      setLMS_package_price_2((arr[1].price).toString())
      setLMS_package_id_2(arr[1].id)
      setLMS_package_name_2(arr[1].name)
      setLMS_package_description_2(arr[1].description)

      setOpen3(true)
      setLMS_package_price_3((arr[2].price).toString())
      setLMS_package_id_3(arr[2].id)
      setLMS_package_name_3(arr[2].name)
      setLMS_package_description_3(arr[2].description)

      setOpen4(true)
      setLMS_package_price_4((arr[3].price).toString())
      setLMS_package_id_4(arr[3].id)
      setLMS_package_name_4(arr[3].name)
      setLMS_package_description_4(arr[3].description)
    } else if (a === 5) {

      setOpen(true)
      setLMS_package_price_1((arr[0].price).toString())
      setLMS_package_id_1(arr[0].id)
      setLMS_package_name_1(arr[0].name)
      setLMS_package_description_1(arr[0].description)

      setOpen2(true)
      setLMS_package_price_2((arr[1].price).toString())
      setLMS_package_id_2(arr[1].id)
      setLMS_package_name_2(arr[1].name)
      setLMS_package_description_2(arr[1].description)

      setOpen3(true)
      setLMS_package_price_3((arr[2].price).toString())
      setLMS_package_id_3(arr[2].id)
      setLMS_package_name_3(arr[2].name)
      setLMS_package_description_3(arr[2].description)

      setOpen4(true)
      setLMS_package_price_4((arr[3].price).toString())
      setLMS_package_id_4(arr[3].id)
      setLMS_package_name_4(arr[3].name)
      setLMS_package_description_4(arr[3].description)

      setOpen5(true)
      setLMS_package_price_5((arr[4].price).toString())
      setLMS_package_id_5(arr[4].id)
      setLMS_package_name_5(arr[4].name)
      setLMS_package_description_5(arr[4].description)
    } else {
      console.log("OMG")
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
        <Header back name={strings.LMS.HEADER} navigation={navigation} backFunc={handleBackButtonClick} />
        <CurveDesing_Component  >
          <View>
            <Listing_header_button
              category="red_background"
              description="gray_border"
              pricingPackaging="gray_border"
              location="gray_border"
              availability="gray_border"
              images="gray_border"
              bookingMessage="gray_border"
            />
          </View>
          <View
            style={globalstyles.container_only_padding} >
            <Text style={[globalstyles.blue_Text, { textAlign: leftOrRight(language) }]}>{strings.LMS.LMS1_TEXT_1}</Text>
            <Text style={[globalstyles.page_SubHeader_Text, { fontSize: Normalize(11.5) }]}>{strings.LMS.LMS1_TEXT_2}</Text>
            <Text style={[globalstyles.textinput_Header_Style, { textAlign: leftOrRight(language), marginTop: Normalize(8) }]}>{strings.LMS.CHOOSECATEGORYTITLE}</Text>
            <Pressable
              onPress={() => {
                navigation.navigate("LmsCategorySelection")
              }}
              style={[globalstyles.textinput_onlyBox_Style, {}]}>
              <View style={{ flex: 1 }} >
                <Text style={[globalstyles.textinput_onlyText_Style, { color: Colors.greyText }]}>
                  {
                    lMS_category_title ? lMS_category_title : strings.LMS.CHOOSECATEGORYPLACEHOLDER
                  }
                </Text>
              </View>
              <View style={{ height: "100%", width: Normalize(15), marginRight: Normalize(5), justifyContent: "center", alignItems: "center" }}>
                <Entypo
                  name="chevron-down"
                  color={Colors.greyText}
                  size={Normalize(18)}
                />
              </View>
            </Pressable>
            <View style={{ flex: 1 }} />
            <Button
              onPress={nextButton}
              name={strings.POSTTASK.NEXT}
              nextarrow
              style={{
                marginTop: Normalize(15),
                marginBottom: Normalize(15),
              }}
            />
          </View>
        </CurveDesing_Component>
        {
          loader &&
          <NewLoaderPage />
        }
      </KeyboardAvoidingView >
    </SafeAreaView>
  );
};

export default withRtl(LMS1);
