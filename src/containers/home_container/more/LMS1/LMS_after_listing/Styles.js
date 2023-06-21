import React from 'react';
import { StyleSheet } from 'react-native';
import { Colors } from './../../../../../constants/colors';
import Normalize from './../../../../../helpers/Dimens';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  h1: {
    fontSize: Normalize(13),
    fontFamily: 'roboto-medium',
    color: Colors.black,
    marginVertical: Normalize(5),
  },
  h2: {
    fontSize: Normalize(13),
    fontFamily: 'roboto-regular',
    color: Colors.grey,
    marginVertical: Normalize(5),
  },
  scrollView: {
    flex: 1,
    paddingVertical: Normalize(10),
  },
  mainView: {
    flex: 1,
    // justifyContent: 'space-between',
    paddingTop: Normalize(10),
  },
  bodyView: {
    marginHorizontal: Normalize(15),
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: Normalize(10),
  },
  input: {
    borderWidth: Normalize(1),
    height: Normalize(45),
    borderColor: Colors.lightGrey,
    borderRadius: 6,
    fontFamily: 'roboto-medium',
    color: '#000000',
    paddingHorizontal: Normalize(10),
  },
  addBtn: {
    alignItems: 'center',
    justifyContent: 'center',

    paddingVertical: Normalize(10),
  },
  addBtnText: {
    fontSize: Normalize(13),
    fontFamily: 'roboto-medium',
    color: Colors.primary,
  },
  skillsContainer: {
    marginTop: Normalize(10),
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  skillChip: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: Normalize(1),
    borderColor: Colors.lightGrey,
    borderRadius: 6,
    alignSelf: 'flex-start',
    paddingHorizontal: Normalize(10),
    paddingVertical: Normalize(3),
    marginRight: Normalize(10),
    marginBottom: Normalize(10),
  },
  skillChipRtl: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: Normalize(1),
    borderColor: Colors.lightGrey,
    borderRadius: 6,
    alignSelf: 'flex-start',
    paddingHorizontal: Normalize(10),
    paddingVertical: Normalize(3),
    marginLeft: Normalize(10),
    marginBottom: Normalize(10),
  },
  crossIcon: {
    marginLeft: Normalize(10),
  },
  crossIconRtl: {
    marginRight: Normalize(10),
  },
  saveBtn: {
    height: Normalize(40),
    marginHorizontal: Normalize(15),
    marginBottom:40,
  },
});

export default styles;
