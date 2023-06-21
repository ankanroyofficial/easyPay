import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView, TextInput,SafeAreaView } from 'react-native';
import Header from '../../../../components/Header';
import styles from './Styles';
import CustomTab from '../../../../components/CustomTabforMessageDetalis';
import { withRtl, useRtlContext } from 'react-native-easy-localization-and-rtl';
import { Colors } from '../../../../constants/colors';
import images from '../../../../constants/images';
import Normalize from '../../../../helpers/Dimens';
import strings from '../../../../constants/lng/LocalizedStrings';
import { leftOrRight, rowOrRowreverse } from '../../../../constants/RowOrRowreverse';
import TaskDetailsinMsg from '../taskDetailsinMessagePage/TaskDetailsinMsg';

export default function Messages2({ navigation, route }) {
  const { show } = route.params;
  const { master_id } = route.params;
  const { RtlStyles, isRtl, language, setLanguage } = useRtlContext();
  return (
    <SafeAreaView style={{backgroundColor: Colors.primary,flex:1, flexDirection:'column'}}>

    <View style={styles.container}>
      <Header navigation={navigation} back name={strings.TASKDETAILS.HEADERTEXT} />
      <View style={{ flex: 1, backgroundColor: "red" }} >
        <TaskDetailsinMsg show={show} master_id={master_id} navigation={navigation} />
      </View>
      <View style={{ flex: 1, position: "absolute", bottom: 30, right: 25 }} >
        <TouchableOpacity activeOpacity={0.9}
          onPress={() => navigation.goBack()}
          style={{ height: Normalize(38), width: Normalize(38), backgroundColor: Colors.primary, borderRadius: Normalize(38) / 2, overflow: "hidden", elevation:Normalize(2), justifyContent: "center", alignItems: "center", paddingTop: Normalize(3) }} >
          <Image source={images.chat} style={{ height: "75%", width: "75%", resizeMode: "contain" }} />
        </TouchableOpacity>
      </View>
    </View>
    </SafeAreaView>
  );
}








































{/* <View style={{ flexDirection: 'row', padding: 15, justifyContent: 'space-between', backgroundColor: '#F2F6FF' }}>
            <Text style={styles.heading}>Need a duplicate key cut for toyata Cam ry 2002</Text>
            <Image source={images.info}
              style={{ height: 25, width: 25, margin: 5 }}
            />
          </View> */}
{/* <View style={{ flexDirection: 'row', flex: 1, alignSelf: 'center', padding: 10, marginTop: 10 }}>
            <View style={{ flexDirection: 'row', width: '100%', alignSelf: 'center' }}>
              <Image style={{ width: 50, height: 50, alignSelf: 'center' }}
                source={images.thumbImage}
                resizeMode="contain" />
              <View style={{ flexDirection: 'column', marginLeft: 7, flex: 1, alignSelf: 'center' }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                  <Text style={{
                    color: '#38393e', marginLeft: 2, fontFamily: 'roboto-bold',
                    fontSize: Normalize(12)
                  }}>Mark Decascos</Text>

                </View>
                <Text numberOfLines={1} style={{
                  color: '#818181', marginLeft: 2, fontFamily: 'roboto-regular',
                  lineHeight: 20, fontSize: 13, marginTop: 2, marginRight: 50, fontSize: Normalize(11)
                }}>1m ago</Text>

              </View>
            </View>
          </View> */}