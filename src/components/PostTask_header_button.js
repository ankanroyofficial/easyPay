import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors } from '../constants/colors';
import Normalize from '../helpers/Dimens';
import { fontfmliy } from './WhichFontFamily';
export default function PostTask_header_button({ active }) {
  const findActive = val => {
    return val == active ? true : false;
  };

  const [task_page_list, setTask_page_list] = useState([
    {
      title: 'Task Details',
      style: 'postdetailspage',
    },
    {
      title: 'Date & Time',
      style: 'postplacetime',
    },
    // {
    //   title: 'Images',
    //   style: 'postimage',
    // },
    {
      title: 'Budget',
      style: 'Budget',
    },
  ]);
  return (
    <View style={styles.mainView}>
      <View style={styles.subContainer}>
        {task_page_list.map((item, index) => (
          <View
            key={index}
            style={findActive(item.style) ? styles.activeBox : styles.eachBox}>
            <Text style={findActive(item.style) ? styles.activeText : styles.inactiveText} >{item.title}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  mainView: {
    height: Normalize(40),
    width: '100%',
    paddingHorizontal: Normalize(8),
    marginTop: Normalize(10),
    marginBottom: Normalize(10),
  },
  subContainer: {
    flex: 1,
    backgroundColor: Colors.grayf5,
    flexDirection: 'row',
    borderRadius: 100,
    overflow: 'hidden',
  },
  eachBox: {
    flex: 0.85,
    justifyContent: 'center',
    alignItems: 'center',
  },
  activeBox: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:Colors.secondary,
    borderRadius: Normalize(100),
  },
  activeText: { fontSize: Normalize(11), color: Colors.white, fontFamily: fontfmliy.bold },
  inactiveText: { fontSize: Normalize(11), color: Colors.disableText, fontFamily: fontfmliy.regular }
});
