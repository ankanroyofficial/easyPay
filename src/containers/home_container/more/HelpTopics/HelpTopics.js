import React from 'react';
import {View, Text, ScrollView, TouchableOpacity,SafeAreaView} from 'react-native';
import {withRtl, useRtlContext} from 'react-native-easy-localization-and-rtl';
import styles from './Styles';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Header from '../../../../components/Header';
import Normalize from '../../../../helpers/Dimens';
import {Colors} from '../../../../constants/colors';
import strings from '../../../../constants/lng/LocalizedStrings';
import { fontfmliy } from '../../../../components/WhichFontFamily';

function HelpTopics({navigation}) {
  const moreItems = [
    {
      name: strings.HELPTOPICS.HELP,
      route: 'HelpCenter',
    },  {
      name: strings.HELPTOPICS.CG,
      route: 'CommunityGuidelines',
    },
    {
      name: strings.HELPTOPICS.TANDC,
      route: 'Termsandcondition',
    },
    // {
    //   name: strings.HELPTOPICS.EARNMONEY,
    //   route: 'EarnMoney',
    // },
    // {
    //   name: strings.HELPTOPICS.HIW,
    //   route: 'Howitworks',
    // },
    {
      name: strings.HELPTOPICS.PP,
      route: 'PrivacyPolicy',
    },
    {
      name: strings.HELPTOPICS.BLOG,
      route: 'Blog',
    },   
    {
      name: strings.HELPTOPICS.CONTACTUS,
      route: 'ContactUs',
    },
    {
      name: strings.HELPTOPICS.ABOUTUS,
      route: 'AboutUs',
    },
    // {
    //   name: strings.HELPTOPICS.FAQ,
    //   route: 'FAQ',
    // },
    
   
   
   
  
  ];
  const {RtlStyles, isRtl, language, setLanguage} = useRtlContext();

  return (
    <SafeAreaView style={{backgroundColor: Colors.primary,flex:1, flexDirection:'column'}}>

    <View style={styles.container}>
      <Header navigation={navigation} back name={strings.HELPTOPICS.HEADERTEXT} />
      <ScrollView
      showsVerticalScrollIndicator={false}
      >
        {moreItems.map((items, index) => (
          <TouchableOpacity
            onPress={() => navigation.navigate(items.route)}
            key={index}
            style={styles.cardContainer}>
            <View style={language == 'en' && styles.rowView}>
              <Text
                style={[
                  styles.cardText,{fontFamily: fontfmliy.bold}]}>
                {items.name}
              </Text>
              {items.name == 'Help Topics' ? (
                <MaterialIcons
                  name="arrow-forward-ios"
                  size={Normalize(15)}
                  color={Colors.greyText}
                />
              ) : null}
            </View>
            
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
    </SafeAreaView>
  );
}

// export default More;
export default withRtl(HelpTopics);
