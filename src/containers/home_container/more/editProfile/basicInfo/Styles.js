import React from 'react';
import { StyleSheet } from 'react-native';
import { Colors } from './../../../../../constants/colors';
import Normalize from './../../../../../helpers/Dimens';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  input: {
    fontSize: Normalize(12),
    fontFamily: 'roboto-regular',
    color: Colors.greyText,
  },
  uploadBtn: {
    width: Normalize(80),
    height: Normalize(80),
    overflow: "hidden",
  },
  uploadBtnImg: {
    width: "100%",
    height: "100%",
  },
  galleryorcamera_icon: {
    height: Normalize(75), width: Normalize(75), borderRadius: Normalize(75) / 2, backgroundColor: Colors.disable_textinput_background, marginBottom: Normalize(5), justifyContent: "center", alignItems: "center"
  },
  tobedone: {
    height: "100%", width: "30%", justifyContent: "center", alignItems: "center",
    borderWidth: 0.9,
    borderColor: Colors.borderColor,
    borderRadius: 6,
  },
  customtab: {
    flexDirection: 'row',
    alignSelf: 'center',
    width: '92%',

    marginBottom: Normalize(5),
    width: '100%',
    marginVertical: Normalize(5),
    height: Normalize(40),
    flexDirection: "row",
    justifyContent: "space-between"
  },
  rowView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: Normalize(5)
  },



  imageUploadBtn: {
    borderWidth: 0.8,
    borderColor: Colors.primary,
    backgroundColor: Colors.disable_textinput_background,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    borderRadius: 8,
    width: '100%',
    marginTop: Normalize(5),
    marginBottom: Normalize(15),
  },
  iconStyle: {
    height: Normalize(25),
    width: Normalize(25),
  },
  saveBtn: {
    marginBottom: Normalize(20),
    marginTop: Normalize(5)
  },

});

export default styles;
