import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import LineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import { Colors } from './../constants/colors';
import Normalize from './../helpers/Dimens';
import images from '../constants/images';
import axios from 'axios';
import { axiosUrl } from '../constants/LinkPage';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Header({
  loader, setLoader,
  navigation,
  name,
  back,
  routeName,
  backFunc,
  edit,
  userSlug
}) {
  const whichBack = (val) => {
    if (val == undefined) {
      navigation.goBack()
    } else {
      backFunc()
    }
  }
  const get_profileDetailsHeader = async () => {
    try {
      setLoader(true)
      const data = await axios.post(`${axiosUrl.URL}public-profile`, {
        jsonrpc: '2.0',
        params: {
          slug: userSlug,
        },
      });
      // console.log(data.data.result.UserToCertificate)
      if (data.data.result.user) {
        setLoader(false)
        const propsUserAllData = JSON.stringify(data.data.result)
        await AsyncStorage.setItem('propsUserAllData', propsUserAllData)
        navigation.navigate("SimpleEditProfile",{from:"ProfileHeader"})
      }
    } catch (error) {
      setLoader(false)
      console.log('get_profileDetailsHeader', error);
    }
  };


  const onpressEditButton = () => {
    try {
      get_profileDetailsHeader(userSlug)
    } catch (error) {
      console.log("onpressEditButton", error)
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        {/* back button */}
        <View style={styles.view1}>
          {back ? (
            <TouchableOpacity
              // onPress={() => navigation.goBack()}
              onPress={() => whichBack(backFunc)}

            >
              <Feather
                name="arrow-left"
                color={Colors.white}
                size={Normalize(20)}
              />
            </TouchableOpacity>
          ) : null}
        </View>
        {/* Heading */}
        <View style={styles.view2}>
          <Text style={styles.headingText}>{name}</Text>
        </View>
        {/* 2nd icon */}
        <View style={styles.view3}>

          {edit &&
            <TouchableOpacity
              onPress={onpressEditButton}>
              <Image
                source={images.new_edit}
                style={{ height: Normalize(20), width: Normalize(20) }}
              />
            </TouchableOpacity>
          }
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.primary,
    height: Normalize(50),
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: Normalize(8),
    elevation: 3
  },
  innerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 10,
  },
  headingText: {
    fontSize: Normalize(15),
    color: Colors.white,
    textAlign: 'center',
    fontFamily: 'roboto-medium',
  },
  view1: {
    width: '20%',
  },
  view2: {
    width: '60%',
    alignItems: 'center',
  },
  view3: {
    width: '20%',
    alignItems: 'flex-end',
  },
});
