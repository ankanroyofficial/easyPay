import React, { useContext, useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { withRtl, useRtlContext } from 'react-native-easy-localization-and-rtl';
import styles from './Styles';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Header from '../../../../components/Header';
import Normalize from '../../../../helpers/Dimens';
import { Colors } from '../../../../constants/colors';
import strings from '../../../../constants/lng/LocalizedStrings';
import { myContext } from '../../../../constants/ContextApi';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axiosInstance from '../../../../constants/AxiosCallPage';
import Toast from 'react-native-simple-toast';
import { LoginManager } from 'react-native-fbsdk';
import WarningPage from '../../../../components/WarningPage';

function Settings({ navigation }) {
  const { setActiveTab } = useContext(myContext);
  const [signup_from, setSignup_from] = useState('A');
  const [logoutModal, setLogoutModal] = useState(false)

  useEffect(async () => {
    setActiveTab('Edit');
    const a = await AsyncStorage.getItem('last_login_from');
    setSignup_from(a);
  }, []);
  const moreItems = [
    {
      name: strings.SETTINGS.BADGES,
      route: 'Dashboard',
    },
    {
      name: strings.SETTINGS.ACCOUNTS,
      route: 'EditProfile',
    },
    {
      name: strings.SETTINGS.SKILLS,
      route: 'Skills',
    },
    {
      name: strings.SETTINGS.PORTFOLIO,
      route: 'Portfolio',
    },
    {
      name: strings.MORESCREEN.CHANGEPASS,
      route: 'password',
    },
    {
      name: "Delete account",
      route: 'delete',
    },
  ];
  const deleteaccount = async () => {
    try {
      let email = await AsyncStorage.getItem("email");

      let a = {
        "params": {
          "email": email
        }
      }
      const res = await axiosInstance.post("user-delete-temporarily", a)
      console.log("---", res.data)
      if (res.data.error) {
        Toast.show(res.data.error.meaning)
      } else {
        await AsyncStorage.removeItem('token')
        await AsyncStorage.removeItem('slug')
        await AsyncStorage.removeItem('@profiledata')
        await AsyncStorage.removeItem('email')
        await AsyncStorage.removeItem('password')
        await AsyncStorage.removeItem('normal_login_details')
        await AsyncStorage.removeItem('google_login_details')
        await AsyncStorage.removeItem('facebook_login_details')
        await AsyncStorage.removeItem("last_login_from")
        await AsyncStorage.setItem('application', "logout");
        await AsyncStorage.removeItem('fcmtoken')
        await AsyncStorage.removeItem('filterData')
        await messaging().deleteToken();
        LoginManager.logOut(),
          setId(""),
          setCategory_id(""),
          setCategory_image(""),
          setSubcategory_id(""),
          setTitle(""),
          setDescription(""),
          setType("O"),
          setTime(""),
          setDate(""),
          setBudget_type("T"),
          setBudget(""),
          setHourly_rate(""),
          setNumber_of_hour(""),
          setLocation(""),
          setLat(""),
          setLng(""),
          setImage([]),
          setMust_Have([]),
          setDate_type("B"),
          setImageFinalArray([]),
          setY2(),
          setD2(),
          setM2(),
          setTaskDetails(),
          setTaskData([]),
          setMyTaskData([]),
          setMytaskValue(""),
          setAllVerified(false),
          setAllMsg([]),
          setUnreadMsg([]),
          setselectedTaskType("A"),
          setStartLoader_myTask("0"),
          setStartLoader_BrowserTask("0"),
          setProfileData(null),
          setTierData(""),
          setUserData(""),
          setAllData(""),
          setNext_TierData(""),
          setTierDetails(""),
          setAllCategory([]),
          setAllSubcategory([]),
          setListingCategory([]),
          setListing_Page("")
        setPhone_Code('65')
        setSignupPhoneNumer_details({
          "created_at": null,
          "flag": "sg.png",
          "id": 196,
          "international_prefix": 0,
          "max_no_of_digitis": 8,
          "min_no_of_digits": 8,
          "name": "Singapore",
          "national_prefix": 0,
          "phonecode": 65,
          "sortname": "SG",
          "updated_at": null,
          "utc_dst": "+1"
        })
        get_Category()


        setIsBrowseTaskLoad(false)
        setIsMyTaskLoad(false)
        setBrowserLocation("")
        setBrowserLat("")
        setBrowserLng("")

        setBrowsertype("")
        setDistance(20)
        setPrevDistance(20)
        setIsAvaliable(false)
        setTaskOrMap(true)


        setAllNewMyTask({
          as_a_eazypayer: {
            "active_task": [],
            "complete_task": [],
            "offers_or_questions": []
          },
          as_a_client: {
            "booked": [],
            "completed": [],
            "post_task": []
          }
        })




        Toast.show("Account Deleted Successfully")
        logoutOnpress()
        setLoader(false)
        logoutHandle()
      }
    } catch (error) {
      console.log("delete_account_data----------", error)
      // autoLoad()
    }
  }
  const logoutOnpress = () => {
    setLogoutModal(!logoutModal)
  }
  const logoutHandle = () => {
    navigation.dispatch(
      CommonActions.reset({
        index: 1,
        // routes: [{ name: "SignIn" }]
        routes: [{ name: "IntroVideoScreen" }]
      }));
  }
  const cancelOnpress = () => {
    logoutOnpress()
  }
  const { RtlStyles, isRtl, language, setLanguage } = useRtlContext();

  const Title_View = (items, index) => {
    return (
      <TouchableOpacity
        onPress={() => {
          if (items.route == 'EditProfile') {
            navigation.navigate('BasicInfo');
          } else if (items.route == 'Portfolio') {
            navigation.navigate('Portfolio');
          } else if (items.route == 'delete') {
            logoutOnpress();
          } else {
            navigation.navigate(items.route);
          }
        }}
        key={index}
        style={styles.cardContainer}>
        <View style={language == 'en' && styles.rowView}>
          <Text style={[styles.cardText, { fontFamily: 'Outfit-Medium', color: items.name == 'Delete account' ? 'red' : Colors.greyText }]}>
            {items.name}
          </Text>
          {items.name == 'Settings' ? (
            <MaterialIcons
              name="arrow-forward-ios"
              size={Normalize(15)}
              color={Colors.greyText}
            />
          ) : null}
        </View>
      </TouchableOpacity>
    );
  };
  return (
    <SafeAreaView
      style={{ backgroundColor: Colors.primary, flex: 1, flexDirection: 'column' }}>
      <View style={styles.container}>
        <Header
          navigation={navigation}
          back
          name={strings.SETTINGS.HEADERTEXT}
        />
        <ScrollView showsVerticalScrollIndicator={false}>
          {moreItems.map((items, index) =>
            items.route == 'password'
              ? signup_from === 'A'
                ? Title_View(items, index)
                : null
              : Title_View(items, index),
          )}
          {
            logoutModal &&
            <WarningPage
              onPress={logoutOnpress}
              ispress={logoutModal}
              warningTitle={'Delete Account'}
              warningSubTitle={'Are you Sure?'}
              okOnpress={deleteaccount}
              cancelOnpress={cancelOnpress} />}
          {/* <VerifyModalComponent /> */}

          <View
            style={{
              width: '100%',
              height: 0.3,
              backgroundColor: Colors.lightGrey,
            }}
          />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

// export default More;
export default withRtl(Settings);
