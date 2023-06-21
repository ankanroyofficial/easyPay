import React from 'react';
import { View, Text, SafeAreaView, Image, } from 'react-native';
import styles from './Styles';
import { withRtl, useRtlContext } from 'react-native-easy-localization-and-rtl';
import images from '../../../constants/images';
import SkeletonPlaceholder from "react-native-skeleton-placeholder";
import { rowOrRowreverse } from '../../../constants/RowOrRowreverse';
import { Colors } from '../../../constants/colors';

function Loader_Task() {
  const { RtlStyles, language } = useRtlContext();

  return (
    <>
      {
        [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 13, 14, 15, 16].map((item, index) => (
          <View key={index} style={{backgroundColor:Colors.white}} >
             <SkeletonPlaceholder direction={language == "en" ? 'right' : 'left'} >
            <View
              style={[styles.taskCard, { flexDirection: rowOrRowreverse(language) }]}
            >
              <View style={{ width: Normalize(5), backgroundColor: Colors.grayf5,height:Normalize(120) }} />
              <View style={[styles.cardBody, { alignItems: language == "en" ? "flex-start" : "flex-end" }]}>
                {/* <View style={{
                height: Normalize(13), width: Normalize(195),
                marginVertical: Normalize(5)}} /> */}
                <View
                  style={[styles.rowView, { flexDirection: rowOrRowreverse(language), }]}>
                  <View style={{
                    height: Normalize(13), width: Normalize(195), marginRight: Normalize(5),
                    marginVertical: Normalize(5),
                  }} />
                </View>
                <View
                  style={[styles.rowView ,{alignItems: language == "en" ? "flex-start" : "flex-end"}]}>
                  <View
                    style={[styles.rowView, { flexDirection: rowOrRowreverse(language) }]}>
                    <View style={[styles.iconStyle]} />
                    <View style={{
                      height: Normalize(11), width: Normalize(80),
                      marginRight: Normalize(5),
                      marginVertical: Normalize(5),
                    }} />
                  </View>
                  <View style={{ flexDirection: rowOrRowreverse(language) }} >
                    <View
                      style={[styles.rowView, { flexDirection: rowOrRowreverse(language) }]}>
                      <View style={[styles.iconStyle]} />
                      <View style={{
                        height: Normalize(11), width: Normalize(120),
                        marginRight: Normalize(5),
                        marginVertical: Normalize(5),
                      }} />
                    </View>
                    
                  </View>
                </View>
                <View
                  style={[styles.rowView, { flexDirection: rowOrRowreverse(language) }]}>
                  <View style={{
                    height: Normalize(11), width: Normalize(50), marginVertical: Normalize(5),
                    marginHorizontal: Normalize(5),
                  }} />
                  <View style={[styles.dotIconStyle]} />
                  <View style={{
                    height: Normalize(11), width: Normalize(50), marginRight: Normalize(5),
                    marginVertical: Normalize(5),
                  }} />
                </View>
              </View>
              <View style={[styles.thumbContainer]}>
                <View style={[styles.thumbIconStyle, { backgroundColor: "red" }]}
                />
                <View style={{ flexDirection: language == "en" ? 'row-reverse' : 'row' }}>
                  <View style={{
                    height: Normalize(11), width: Normalize(50), marginVertical: Normalize(5),
                  }} />
                </View>
              </View>
            </View>
          </SkeletonPlaceholder>
          </View>
        ))
      }
    </>
  );
}

export default withRtl(Loader_Task);
