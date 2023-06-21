import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  // I18nManager,
} from 'react-native';
import { Colors } from './../../constants/colors';
import images from './../../constants/images';
import styles from './Styles';
import strings from './../../constants/lng/LocalizedStrings';
import Toast from 'react-native-simple-toast';
import { setLng, getLng } from './../../helpers/changeLng';
import { withRtl, useRtlContext } from 'react-native-easy-localization-and-rtl';
import Button from './../../components/Button';
import Normalize from './../../helpers/Dimens';
// import RNRestart from 'react-native-restart';
// import AsyncStorage from '@react-native-async-storage/async-storage';

const SelectLang = ({ navigation }) => {
  const [selectedLang, setSelectedLang] = useState('');
  const { RtlStyles, isRtl, language, setLanguage } = useRtlContext();

  useEffect(() => {
    selectedLng();
  }, []);

  const handleLanguageSelection = lang => {
    if (lang == 'en') {
      setSelectedLang(selectedLang == 'en' ? '' : 'en');
    } else {
      setSelectedLang(selectedLang == 'pr' ? '' : 'pr');
    }
  };
  const selectedLng = async () => {
    const lngData = await getLng();
    if (!!lngData) {
      strings.setLanguage(lngData);
      setLanguage(lngData);
      setSelectedLang(lngData);
    }
  };
  const handleContinue = async () => {
    if (selectedLang === '') {
      Toast.show('Please select your language');
      return;
    } else if (selectedLang === 'en') {
      setLng('en');


      // navigation.navigate('SignIn');
      // navigation.navigate('Home');


      setLanguage('en');
      // await I18nManager.forceRTL(false);
      // RNRestart.Restart();
      // await AsyncStorage.setItem('langType', 'en');
      return;
    } else {
      setLng('pr');


      // navigation.navigate('SignIn');
      // navigation.navigate('Home');


      setLanguage('pr');
      // await I18nManager.forceRTL(true);
      // RNRestart.Restart();
      // await AsyncStorage.setItem('langType', 'pr');
      return;
    }
  };

  return (
    <View style={styles.container}>
      {/* image container */}
      <View style={styles.imageContainer}>
        <Image
          resizeMode="stretch"
          style={styles.image}
          source={images.backImage}
        />
        <Image
          resizeMode="contain"
          style={styles.imageText}
          source={require('./../../../assets/icon-5.png')}
        />
      </View>
      {/* body */}
      <View style={{ flex: 1 }}>
        <Text style={styles.headingText}>
          {selectedLang == "en" ? "Select your preferred \nlanguage" : selectedLang == "" ? "Select your preferred \nlanguage" : "\nزبان مورد نظر خود را انتخاب کنید"}
          {/* {strings.SELECTLANG} */}
        </Text>
        <View style={{ flex: 1, justifyContent: "space-evenly" }}>
          <View style={{ flexDirection: "row", justifyContent: "space-evenly", alignItems: "center" }}>


            <TouchableOpacity onPress={() => handleLanguageSelection('en')}

              style={{ height: Normalize(135), width: Normalize(135), justifyContent: "center", alignItems: "center", borderRadius: Normalize(8), borderWidth: 0.8, borderColor: selectedLang === 'en' ? Colors.primary : Colors.grey, backgroundColor: "white" }}>
              <View style={{ height: Normalize(65), width: Normalize(65), justifyContent: "center", alignItems: "center", overflow: "hidden", borderRadius: (Normalize(65)) / 2 }}>
                <Image
                  resizeMode="contain"
                  style={{ height: "100%", width: "100%", resizeMode: "cover" }}
                  source={images.flag1}
                />
                {selectedLang === 'en' ? (
                  <View style={{
                    flex: 1,
                    backgroundColor: '#027CFC',
                    opacity: 0.5,
                    position: 'absolute',
                  }}>
                    <Image
                      resizeMode="contain"
                      style={[styles.lanCardIcon, styles.activeIcon]}
                      source={images.correctIcon}
                    />
                  </View>
                ) : null}
              </View>
              <Text
                style={[
                  styles.textStyle,
                  { color: selectedLang === 'en' ? Colors.primary : Colors.black },
                ]}>
                English
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleLanguageSelection('pr')}
              style={{ height: Normalize(135), width: Normalize(135), justifyContent: "center", alignItems: "center", borderRadius: Normalize(8), borderWidth: 0.8, borderColor: selectedLang === 'pr' ? Colors.primary : Colors.grey, backgroundColor: "white" }}>
              <View style={{ height: Normalize(65), width: Normalize(65), justifyContent: "center", alignItems: "center", overflow: "hidden", borderRadius: (Normalize(65)) / 2 }}>
                <Image
                  resizeMode="contain"
                  style={{ height: "100%", width: "100%", resizeMode: "cover" }}
                  source={images.flag2}
                />
                {selectedLang === 'pr' ? (
                  <View style={{
                    flex: 1,
                    backgroundColor: '#027CFC',
                    opacity: 0.5,
                    position: 'absolute',


                  }}>
                    <Image
                      resizeMode="contain"
                      style={[styles.lanCardIcon, styles.activeIcon]}
                      source={images.correctIcon}
                    />
                  </View>
                ) : null}
              </View>
              <Text
                style={[
                  styles.textStyle,
                  { color: selectedLang === 'pr' ? Colors.primary : Colors.black },
                ]}>
                فارسی
              </Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity onPress={handleContinue} style={{ height: Normalize(45), backgroundColor: Colors.secondary, width: "90%", alignSelf: "center", borderRadius: Normalize(30), justifyContent: "center", alignItems: "center" }}>
            <Text style={{ color: "white", fontSize: Normalize(14), fontWeight: "bold" }}>
              {selectedLang == "en" ? "Save & Continue" : selectedLang == "" ? "Save & Continue" : "ذخیره و ادامه دهید"}
            </Text>

          </TouchableOpacity>
        </View>

      </View>
    </View>
  );
};
export default withRtl(SelectLang);
