import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Image,
  SafeAreaView,
  ActivityIndicator,
  FlatList,
  Dimensions,
  Pressable
} from 'react-native';   
import { withRtl, useRtlContext } from 'react-native-easy-localization-and-rtl';
import { Colors } from '../../../../../constants/colors';
import images from '../../../../../constants/images';
import Normalize from '../../../../../helpers/Dimens';
import Header from '../../../../../components/Header';
import styles from './Styles';
import Button from '../../../../../components/Button';
import strings from '../../../../../constants/lng/LocalizedStrings';
import axios from 'axios';
import Toast from 'react-native-simple-toast';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Entypo from 'react-native-vector-icons/Entypo';
import { axiosUrl } from '../../../../../constants/LinkPage';
import axiosInstance from '../../../../../constants/AxiosCallPage';
import LoaderPage from '../../../../../components/LoaderPage';
import globalstyles from '../../../../../constants/globalStyles/Global_Styles';
import CurveDesing_Component from '../../../../../constants/CurveDesing_Component';
const { height, width } = Dimensions.get("window")
function Extra({ navigation }) {
  const { RtlStyles, isRtl, language, setLanguage } = useRtlContext();

  const go=()=>{
    navigation.navigate("Dashboard")
  }
  
  return (
    
          <SafeAreaView style={{ backgroundColor: Colors.primary, flex: 1, flexDirection: 'column' }}>

            <View style={{ backgroundColor: Colors.white, flexDirection: 'column', flex: 1 }}>
              <View style={styles.container}>
                <Header
                  name={""}
                  navigation={navigation}
                />
                <CurveDesing_Component  >
                  <View style={{
                    flex: 1,
                    paddingHorizontal: Normalize(16)
                  }}>
                    <ScrollView
                      showsVerticalScrollIndicator={false}
                      
                      style={{}}
                    >
                    <View style={{flex:1,padding:Normalize(20),marginTop:Normalize(30)}}>
                     <View style={{height:Normalize(60),width:Normalize(60),borderRadius:Normalize(30),alignSelf:'center',backgroundColor:Colors.primary,
                     alignItems:'center',justifyContent:'center',margin:Normalize(20)}}>
                    <Image source={images.correctIcon}
                    style={{height:Normalize(40),width:Normalize(40)}}/>
                    </View>
                    <Text style={[globalstyles.plantext_Outfit_Medium,{fontSize: Normalize(20),color:Colors.greyText,marginTop:0,
                                textAlign:'center',marginBottom:Normalize(20)}]}>Success!</Text>

                    <Text style={[globalstyles.plantext_outfit_regular,{fontSize: Normalize(16),color:Colors.grey,marginTop:0,
                                textAlign:'center',marginBottom:Normalize(20)}]}>Your verification will complete after documents are approved by admin.</Text>

                    </View>
                    <Button
                      onPress={go}
                      style={styles.saveBtn}
                      name={"Go to Dashboard"}
                    />
                    </ScrollView>
                    
                  </View>
                </CurveDesing_Component>
              </View>
            </View>
          </SafeAreaView>
      
  );
}

export default withRtl(Extra);